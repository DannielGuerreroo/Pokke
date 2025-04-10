function mostrarlista(pokemones) {
    const seccion = document.createElement("section");
    seccion.classList.add("c-lista");

    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Pokémon...";
    buscador.addEventListener("input", (evento) => buscarPoke(evento, pokemones));
    //filtro
    const tipos = [
        "All",
        "normal", "fighting", "flying", "poison", "ground", "rock",
        "bug", "ghost", "steel", "fire", "water", "grass", "electric",
        "psychic", "ice", "dragon", "dark", "fairy", "stellar", "shadow", "unknown"
    ];
    let listaTipos = "";
    for (let i = 0; i < tipos.length; i++) {
        listaTipos += `<button onclick="filtrarPorTipo('${tipos[i]}')">${tipos[i]}</button>`
    }
    const filtro = document.createElement("div");
    filtro.classList.add("filtro");
    filtro.innerHTML = listaTipos;

    // Generar la lista inicial
    seccion.innerHTML = generarLista(pokemones);

    // Agregar elementos al DOM
    app.appendChild(buscador);
    app.appendChild(filtro);
    app.appendChild(seccion);
}


function generarLista(pokemones) {
    let listaHTML = "";
    for (let i = 0; i < pokemones.length; i++) {
        let id = pokemones[i].url.split("/")[6];
        listaHTML += `
        <div class="c-lista-pokemon poke-${id}" onclick="mostrarDetalle('${id}')">
            <p>#${id}</p>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" width="auto" height="60" loading="lazy" alt="${pokemones[i].name}">
            <p>${pokemones[i].name}</p>
        </div>`;
    }

    return listaHTML;
}

function buscarPoke(evento, pokemones) {
    const texto = evento.target.value.toLowerCase();
    if (texto.length >= 3 && isNaN(texto)) {
        const listaFiltrada = pokemones.filter((pokemon) => pokemon.name.includes(texto));
        document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
    }

    if (!isNaN(texto)) {
        const listaFiltrada = pokemones.filter((pokemon) => pokemon.url.includes("/" + texto));
        document.querySelector(".c-lista").innerHTML = generarLista(listaFiltrada);
    }

    if (texto.length === 0) {
        document.querySelector(".c-lista").innerHTML = generarLista(pokemones);
    }
}




async function filtrarPorTipo(untipo) {
    if(untipo == "All"){
        conexionLista()
    }else{
        try {
            const respuesta = await fetch(`https://pokeapi.co/api/v2/type/${untipo}`);
            const datos = await respuesta.json();
    
            const pokemonesFiltrados = datos.pokemon.map(p => p.pokemon);
    
            mostrarLista(pokemonesFiltrados);
        } catch (error) {
            console.error("Error al filtrar por tipo:", error);
            document.getElementById("app").innerHTML = `<p>Error al cargar Pokémon de tipo "${untipo}".</p>`;
        }
    }
}
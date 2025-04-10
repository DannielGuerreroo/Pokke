let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
function mostrarDetalle(id) {
    // Obtener favoritos del localStorage
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Función para alternar el estado de favorito
    const toggleFavorito = (id, nombre) => {
        id = Number(id);
        const esFavorito = favoritos.some(pokemon => Number(pokemon.id) === id);

        if (esFavorito) {
            // Eliminar del array de favoritos
            favoritos = favoritos.filter(p => Number(p.id) !== id);
            document.getElementById(`corazon-${id}`).textContent = '🤍';
        } else {
            // Agregar a favoritos
            favoritos.push({
                id,
                nombre,
                url: `https://pokeapi.co/api/v2/pokemon/${id}/`
            });
            document.getElementById(`corazon-${id}`).textContent = '❤️';
        }

        // Guardar favoritos en localStorage
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    };

    // Función para actualizar el icono del favorito cuando se carga el detalle
    const actualizarIconoFavorito = (id) => {
        id = Number(id);
        const corazonIcono = document.getElementById(`corazon-${id}`);
        if (!corazonIcono) return;

        // Si el pokemon está en favoritos, mostrar el icono de favorito
        if (favoritos.some(pokemon => Number(pokemon.id) === id)) {
            corazonIcono.textContent = '❤️';
        } else {
            corazonIcono.textContent = '🤍';
        }
    };

    // Obtener el detalle del Pokémon usando la API
    fetch('https://pokeapi.co/api/v2/pokemon/' + id)
        .then(res => res.json())
        .then(data => {
            // Generar el texto con los tipos de Pokémon
            let tipoPoke = data.types.map(tipo => `<span>${tipo.type.name}</span>`).join(' ');

            // Verificar si el Pokémon está en favoritos
            const esFavorito = favoritos.some(pokemon => Number(pokemon.id) === id);

            // Crear el HTML para mostrar el detalle
            const detalle = `
                <section class="c-detalle">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" alt="${data.name}" height="120" width="auto">
                    <p>${data.name}</p>
                    <p>ID: ${data.id}</p>
                    <p>Tipos: ${tipoPoke}</p>
                    <p>Altura: ${data.height / 10} m / Peso: ${data.weight / 10} kg</p>
                    <p>HP: ${data.stats[0].base_stat}</p>
                    <p>Velocidad: ${data.stats[5].base_stat}</p>
                    <p>Ataque: ${data.stats[1].base_stat} / Defensa: ${data.stats[2].base_stat}</p>
                    <p>Ataque Especial: ${data.stats[3].base_stat} / Defensa Especial: ${data.stats[4].base_stat}</p>

                    <button id="favorito-btn-${id}" onclick="toggleFavorito(${id}, '${data.name}')">
                        <span id="corazon-${id}" class="corazon">${esFavorito ? '❤️' : '🤍'}</span> Favorito
                    </button>
                </section>
            `;

            // Mostrar el detalle del Pokémon en el DOM
            const app = document.getElementById("app");
            app.innerHTML = detalle;

            // Actualizar el icono de favorito
            actualizarIconoFavorito(id);
        })
        .catch(error => {
            console.error("Error al obtener los detalles del Pokémon:", error);
        });
}

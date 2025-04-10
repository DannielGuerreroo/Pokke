function mostrarAleatorios() {
    const app = document.getElementById("app");
    app.innerHTML = "Aleatorios";

    // Obtener los números de Pokémon almacenados en el localStorage o crear un array vacío
    var misNumeros = JSON.parse(localStorage.getItem("misNumeros")) || [];

    // Obtener los Pokémon desde la API
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1000') // Obtendremos 1000 Pokémon
        .then(res => res.json())
        .then(data => {
            const totalPokes = data.results.length;
            let pokesAleatorios = '<section class="c-aleatorio c-lista">';

            // Mostrar 4 Pokémon aleatorios
            for (let i = 0; i < 4; i++) {
                let num;
                let repetido;

                // Generar un número aleatorio único
                do {
                    num = Math.floor(Math.random() * totalPokes) + 1;
                    repetido = misNumeros.includes(num);
                } while (repetido);

                // Guardar el número para no repetirlo
                misNumeros.push(num);
                localStorage.setItem("misNumeros", JSON.stringify(misNumeros));

                // Obtener el nombre y la imagen del Pokémon usando el ID
                const pokemon = data.results[num - 1];

                pokesAleatorios += `
                <div class="c-lista-pokemon c-un_aleatorio">
                    <p>${num}</p>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png" alt="${pokemon.name}" width="60" height="60">
                    <p>${pokemon.name}</p>
                </div>`;
            }

            pokesAleatorios += "</section>";
            app.innerHTML = pokesAleatorios;
        })
        .catch(error => {
            console.error("Error al obtener los Pokémon:", error);
            app.innerHTML = "Hubo un error al cargar los Pokémon aleatorios.";
        });
}


const namePoke = document.getElementById('name_poke');
const typePoke = document.getElementById('type_poke');
const heightPoke = document.getElementById('height_poke');
const weightPoke = document.getElementById('weight_poke');
const biqPoke = document.getElementById('biq_poke');
const searchInput = document.getElementById('name');
const picturePoke = document.getElementById('pictuer_poke');
const suggestions = document.getElementById('suggestions');

searchInput.value = 'miraidon';

async function getData(pokeName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`);
        if (!response.ok) {
            throw new Error('Pokémon không tìm thấy');
        }
        const data = await response.json();
        picturePoke.src = data.sprites.front_shiny;
        namePoke.innerHTML = data.name;
        typePoke.innerHTML = data.types.map(typeInfo => typeInfo.type.name).join('/');
        heightPoke.innerHTML = data.height / 10 + ' m';
        weightPoke.innerHTML = data.weight / 10 + ' kg';
        biqPoke.innerHTML = data.base_experience;
    } catch (err) {
        console.error(err);
        picturePoke.src = '';
        namePoke.innerHTML = '';
        typePoke.innerHTML = '';
        heightPoke.innerHTML = '';
        weightPoke.innerHTML = '';
        biqPoke.innerHTML = '';
    }
}

// Gọi hàm để hiển thị thông tin của "miraidon" khi trang được tải
getData('miraidon');

searchInput.addEventListener('input', async function() {
    const query = searchInput.value.toLowerCase();
    if (query.length > 0) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
            const data = await response.json();
            const filteredPokemons = data.results.filter(pokemon => pokemon.name.includes(query));
            displaySuggestions(filteredPokemons);
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    } else {
        suggestions.innerHTML = '';
    }
});

function displaySuggestions(pokemons) {
    suggestions.innerHTML = '';
    pokemons.forEach(pokemon => {
        const li = document.createElement('li');
        li.textContent = pokemon.name;
        li.addEventListener('click', () => {
            searchInput.value = pokemon.name;
            suggestions.innerHTML = '';
            getData(pokemon.name);
        });
        suggestions.appendChild(li);
    });
}

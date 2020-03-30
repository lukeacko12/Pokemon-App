
const apiData = {
    url: 'https://pokeapi.co/api/v2/',
    type: 'item',
    id: '1',
}

const {url, type, id} = apiData

createListOfPokemon()

const apiURL = `${url}${type}/${id}`

fetch(apiURL)
.then( (data) => data.json())
.then( (pokemon) => generatePokemonHtml(pokemon))


function createListOfPokemon(){
    fetch("https://pokeapi.co/api/v2/item?offset=0&limit=964")
    .then( (data) => data.json())
    .then( (listOfPokemon => generateList(listOfPokemon)))
}

const generateList = (data) => {
    var listDiv = document.getElementById('pokemon-list')
    var ul=document.createElement('ul');
    ul.id='myUL'
    for (var i = 0; i < data.results.length; ++i) {
        var li=document.createElement('li')
        const html = `
            <a  onclick="onClick(this)">${data.results[i].name}</a>
        `
        li.innerHTML = html;   // Use innerHTML to set the text

        ul.appendChild(li);                                 
    }
    listDiv.appendChild(ul);

}

function onClick(a){
    const name = a.textContent
    const apiURL=`https://pokeapi.co/api/v2/item/${name}`
    fetch(apiURL)
    .then( (data) => data.json())
    .then( (pokemon) => generatePokemonHtml(pokemon))
    const generatePokemonHtml = (data) => {
        console.log(data)
        console.log(data.effect_entries[0].short_effect)
        const html = `
            <div class="name">${data.name}</div>
            <img src=${data.sprites.default}>
            <div class="details">
                <span class="margin-50">Cost: ${data.cost}</span>
                <span>Use: ${data.effect_entries[0].short_effect}</span>
            </div>
        `
        const pokemonDiv = document.querySelector('.pokemon')
        pokemonDiv.innerHTML = html
    }
}

function  inputFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('Input');

    filter = input.value.toUpperCase();

    ul = document.getElementById("myUL");

    li = ul.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0]
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
}

const generatePokemonHtml = (data) => {
    console.log(data)
    console.log(data.effect_entries[0].short_effect)
    const html = `
        <div class="name">${data.name}</div>
        <img src=${data.sprites.default}>
        <div class="details">
            <span class="margin-50">Cost: ${data.cost}</span>
            <span>Use: ${data.effect_entries[0].short_effect}</span>
        </div>
    `
    const pokemonDiv = document.querySelector('.pokemon')
    pokemonDiv.innerHTML = html
}
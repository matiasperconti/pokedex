const cardImg = document.querySelector('.card__img');
const cardTitle = document.querySelector('.card__title');
const cardNumber = document.querySelector('.card__number');
const cardType = document.querySelector('.card__type');
const cardStats = document.querySelectorAll('.stat__value');
const searchInput = document.querySelector('.search__input')
const searchBtn = document.querySelector('.search__btn');
const cardBubble = document.querySelector('.bubble');
const menuBtn = document.querySelector('.main-nav__menubtn');
const alertSign = document.querySelector('.main-nav__alert');
const alertClose = document.getElementById('xAlert');

const colors = {
    bug: '#A2FAA3',
    dark: '#55325D',
    dragon: '#DA627D',
    electric: '#FFEA70',
    fairy: '#EFD1DA',
    fighting: '#BF5448',
    fire: '#FF675C',
    flying: '#7AE7C7',
    ghost: '#694592',
    grass: '#84B957',
    ground: '#D2B074',
    ice: '#AFEAFD',
    normal: '#B09398',
    poison: '#795663',
    psychic: '#FFC6D9',
    rock: '#999799',
    steel: '#1D8A99',
    water: '#0596C7'
};

const getRandomInt = (min, max) =>{
    return Math.floor(Math.random() * (max-min)) +min;
};

const randomPokemon = getRandomInt(1,251);

let pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`;

document.addEventListener('DOMContentLoaded', () =>{
    fetchData();
});

const fetchData = async () => {
    try {
        const res = await fetch(pokemonUrl);
        const data = await res.json();
        
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            number: data.id,
            type: data.types[0].type.name,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            specialAttack: data.stats[3].base_stat,
            specialDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
        }

        fillCard(pokemon);
        cardBubble.style.background = '#369FBE';
    }
    catch (error){
        console.log(error);
        pokemonNotFound();
    }
};

const fillCard = (pokemon) => {
    cardImg.setAttribute('src', pokemon.img);
    cardTitle.textContent = pokemon.name;
    cardTitle.style.textTransform = 'capitalize';
    cardNumber.textContent = `#${pokemon.number}`;
    cardNumber.style.color = '#DCEEDF';
    cardType.textContent = pokemon.type;
    paintType(pokemon);
    cardStats[0].textContent = pokemon.attack;
    cardStats[1].textContent = pokemon.defense;
    cardStats[2].textContent = pokemon.hp;
    cardStats[3].textContent = pokemon.specialAttack;
    cardStats[4].textContent = pokemon.specialDefense;
    cardStats[5].textContent = pokemon.speed;
};

const paintType = (pokemon) => {
    cardType.style.background = colors[pokemon.type];
};

const searchPokemon = (event) =>{
    event.preventDefault();
    const {value} = event.target.pokemonSearched;
    const valueCased = value.toLowerCase().trim();
    pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${valueCased}`;
    cardBubble.style.background = '#A7E8ED';
    fetchData();
};

const pokemonNotFound = () => {
    cardImg.setAttribute('src', 'img/poke-shadow.png');
    cardTitle.textContent = 'Pokemon not found';
    cardTitle.style.textTransform = 'uppercase';
    cardNumber.textContent = 'ERR';
    cardNumber.style.color = colors.fire;
    cardType.textContent = 'ERROR';
    cardType.style.background = colors.fire;
    for (i = 0; i < cardStats.length; i++){
        cardStats[i].textContent = 'X';
    };
};

menuBtn.addEventListener('click', () => {
    alertSign.style.display = 'flex';
});

alertClose.addEventListener('click', () =>{
    alertSign.style.display = 'none';
});
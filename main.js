// seletores
const img = document.querySelector('img');
const input = document.querySelector('input');
const form = document.querySelector('form');
const div = document.querySelector('div');
const points = document.querySelector('span');

//funções
const gerarPokemon = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random()*149+1)}`)
    .then((resposta) => { return resposta.json() })
    .then((pokemon) => { 
        img.setAttribute('src', pokemon.sprites.front_default);
        localStorage.setItem('pokemon', pokemon.name);
    })
}

const checkAnswer = (event) => {
    event.preventDefault();
    let answer = input.value;
    if (answer == localStorage.getItem('pokemon')) {
       div.style.backgroundColor = '#4caf50';  
       localStorage.setItem(
           'pontuacao',
           String(parseInt(localStorage.getItem('pontuacao')) + 100)
    )
    } else {
        div.style.backgroundColor = '#ff5722';
        localStorage.setItem(
            'pontuacao',
            String(parseInt(localStorage.getItem('pontuacao')) - 100)
     )
    }

    input.value = "";
    input.focus();
    img.style.filter = 'none';

    setTimeout(() => {
        div.style.backgroundColor = '#f9f9f9';
        img.style.filter = 'brightness(0)';
        gerarPokemon();
        pontuation();
    }, 1000);
}

const pontuation = () => {
    if (localStorage.getItem('pontuacao') == null) {
        localStorage.setItem('pontuacao', '0');  
    }

    points.innerHTML = localStorage.getItem('pontuacao');
}

// eventos
window.onload = () => {
    gerarPokemon();
    pontuation();
};
form.onsubmit = checkAnswer;

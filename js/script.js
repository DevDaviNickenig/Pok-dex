const pokemonNome = document.querySelector('.pokemon__nome');
const pokemonNumero = document.querySelector('.pokemon__numero');
const pokemonImagem = document.querySelector('.pokemon__imagem'); 

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const botaoProximo =  document.querySelector('.botao__proximo');
const botaoAnterior = document.querySelector('.botao__anterior');

let procurarPokemon = 1;


const fetchPokemon = async (pokemon) => {
  const APIReponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

  if (APIReponse.status === 200) {
    const data = await APIReponse.json();
    return data;
  } 
}

const renderPokemon = async (pokemon) => {

  pokemonNome.innerHTML = 'Carregando...';
  pokemonNumero.innerHTML = '';
  
  const data = await fetchPokemon(pokemon);
  
  if (data) {
    pokemonImagem.style.display = 'block';
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id + " -";
    pokemonImagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];  
    input.value = '';
    procurarPokemon = data.id;
  } else {
    pokemonImagem.style.display = 'none';
    pokemonNome.innerHTML = 'Não Encontrado :(';
    pokemonNumero.innerHTML = '';
  }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());    
    
});

botaoAnterior.addEventListener('click', () => {
    if (procurarPokemon > 1) {
      procurarPokemon -= 1;
      renderPokemon(procurarPokemon); 
    } else {
      procurarPokemon = 649;
      renderPokemon(procurarPokemon);
    }
    
  
});

botaoProximo.addEventListener('click', () => {
    if (procurarPokemon <= 648) {
      procurarPokemon += 1;
      renderPokemon(procurarPokemon);
    } else {
      procurarPokemon = 1;
      renderPokemon(procurarPokemon);
    };
    
});

renderPokemon(procurarPokemon);


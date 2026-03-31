
const input = document.getElementById("inputBusca");
const botao = document.getElementById("btnBuscar");
const lista = document.getElementById("listaPokemons");
const loading = document.getElementById("loading");

async function buscarPokemon() {
  const nome = input.value.toLowerCase().trim();

  if (nome === "") return;

  loading.style.display = "block";
  lista.innerHTML = "";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);

    if (!response.ok) {
      throw new Error("Não encontrado");
    }

    const data = await response.json();

    lista.innerHTML = `
      <div class="pokemon">
        <h3>${data.name}</h3>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>ID: ${data.id}</p>
      </div>
    `;

  } catch (erro) {
    lista.innerHTML = `<p>Pokémon não encontrado</p>`;
  }

  loading.style.display = "none";
}

// clique no botão
botao.addEventListener("click", buscarPokemon);

// apertar ENTER
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    buscarPokemon();
  }
});

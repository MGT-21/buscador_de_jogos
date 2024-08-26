// Selecionando os elementos do DOM (Document Object Model)
const searchInput = document.getElementById('search-input');
const gamesList = document.getElementById('games-list');

// URL base da API do RAWG
const apiKey = '9362fcc2459e47b5948234fb532f9f2a'; // Substitua por sua chave da API do RAWG
const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}`;

// Função que será executada quando o usuário digita no campo de busca
searchInput.addEventListener('input', () => {
  const query = searchInput.value; // Obtendo o valor do campo de busca
  if (query) {
    fetchGames(query); // Chamando a função para buscar os jogos
  } else {
    gamesList.innerHTML = ''; // Limpa a lista de jogos se o campo de busca estiver vazio
  }
});

// Função que faz a chamada à API e obtém os dados dos jogos
function fetchGames(query) {
  const url = `${baseUrl}&search=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        displayGames(data.results); // Exibindo os resultados
      } else {
        gamesList.innerHTML = '<li class="error-mensage"><p>Não foi encontrado nenhum jogo</p></li>'; // Exibe mensagem de erro se não houver resultados
      }
    })
    .catch(error => {
      console.error('Erro ao buscar os jogos:', error);
      gamesList.innerHTML = '<li class="error-mensage"><p>Erro ao buscar os jogos. Tente novamente mais tarde.</p></li>'; // Exibe mensagem de erro se ocorrer um erro na busca
    });
}

// Função que exibe os detalhes dos jogos na página
function displayGames(games) {
  gamesList.innerHTML = ''; // Limpa a lista de jogos antes de exibir novos resultados

  games.forEach(game => {
    // Cria um item de lista para cada jogo
    const gameItem = document.createElement('li');
    gameItem.innerHTML = `
        <img src="${game.background_image}" alt="${game.name} Cover"/>
        <h2>${game.name}</h2>
        <div class="game__paragraphs">
          <p class="paragraph">Plataformas: ${game.platforms.map(platform => platform.platform.name).join(', ')}</p>
          <p class="paragraph">Publisher: ${game.publishers && game.publishers.length > 0 ? game.publishers.map(pub => pub.name).join(', ') : 'Informação não disponível'}</p>
        </div>
        <p class="data">Data de lançamento: ${game.released}</p>
    `;

    // Adiciona o item de lista à lista de jogos
    gamesList.appendChild(gameItem);
  });
}
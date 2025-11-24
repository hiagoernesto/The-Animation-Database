let cardContainer = document.querySelector(".card-container"); // O container principal dos cards
let campoBusca = document.querySelector(".search-container input"); // O campo de input para a busca
let botaoBusca = document.getElementById("botao-busca"); // O botão de busca
let dados = [];

// Função para buscar e carregar os dados iniciais do JSON
async function carregarDados() {
    cardContainer.innerHTML = "<p>Carregando filmes...</p>"; // Feedback inicial
    try {
        let resposta = await fetch("data.json");
        if (!resposta.ok) {
            throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        dados = await resposta.json();
        renderizarCards(dados); // Renderiza todos os cards inicialmente
    } catch (error) {
        console.error("Não foi possível carregar os dados dos filmes:", error);
        cardContainer.innerHTML = "<p>Ocorreu um erro ao carregar os filmes. Tente novamente mais tarde.</p>";
    }
}

// Função que realiza a busca
function realizarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const resultados = dados.filter(filme => {
        const nomeFilme = filme.nome.toLowerCase();
        const descricaoFilme = filme.descrição.toLowerCase();
        return nomeFilme.includes(termoBusca) || descricaoFilme.includes(termoBusca);
    });
    renderizarCards(resultados);
}

// Função para renderizar os cards na tela
function renderizarCards(filmes) {
    cardContainer.innerHTML = ""; // Limpa o container antes de renderizar novos cards

    if (filmes.length === 0) {
        cardContainer.innerHTML = `<p class="feedback-message">Nenhum filme encontrado com o termo "${campoBusca.value}".</p>`;
        return;
    }

    for (let filme of filmes) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <img src="${filme.imagem}" alt="Pôster do filme ${filme.nome}">
        <div class="card-content">
            <h2>${filme.nome} (${filme.ano})</h2>
            <p>${filme.descrição}</p>
            <a href="${filme.link}" target="_blank" class="saiba-mais-btn">
                <i class="fa-solid fa-plus"></i> Saiba Mais
            </a>
        </div>
        `
        cardContainer.appendChild(article);
    }
}

// Adiciona os "escutadores" de eventos
botaoBusca.addEventListener('click', realizarBusca);
campoBusca.addEventListener('keyup', realizarBusca); // Busca em tempo real enquanto digita

// Inicia o carregamento dos dados quando a página é carregada
document.addEventListener("DOMContentLoaded", carregarDados);
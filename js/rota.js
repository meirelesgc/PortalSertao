document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const gameBoard = document.getElementById('game-board');
    const rollDiceBtn = document.getElementById('roll-dice-btn');
    const diceResultEl = document.getElementById('dice-result');
    const currentPlayerEl = document.getElementById('current-player');
    const cardModal = document.getElementById('card-modal');
    const cardContentEl = document.getElementById('card-content');
    const playerSetup = document.getElementById('player-setup');
    const gameControls = document.getElementById('game-controls');
    const startGameBtn = document.getElementById('start-game-btn');
    const numPlayersSelect = document.getElementById('num-players');

    // Dados do Jogo
    const municipios = [
        "Início", "Água Fria", "Amélia Rodrigues", "Anguera", "Antônio Cardoso", "Conceição da Feira",
        "Conceição do Jacuípe", "Coração de Maria", "Elísio Medrado", "Feira de Santana", "Ipecaetá",
        "Irará", "Santa Bárbara", "Santanópolis", "Santo Estêvão", "São Gonçalo dos Campos", "Tanquinho", "Teodoro Sampaio", "Fim"
    ];

    const cartas = [
        { tipo: 'desafio', pergunta: 'Qual a principal força econômica de Santo Estêvão?', opcoes: ['Agricultura', 'Pecuária', 'Comércio e Serviços', 'Indústria'], resposta: 'Comércio e Serviços' },
        { tipo: 'desafio', pergunta: 'Qual apelido Feira de Santana recebeu por sua localização estratégica?', opcoes: ['Princesa do Sertão', 'Rainha do Agreste', 'Portal do Sertão', 'Capital da Pecuária'], resposta: 'Princesa do Sertão' },
        { tipo: 'desafio', pergunta: 'A Maniçoba, prato típico da região de Cachoeira, é feita com folhas de qual planta?', opcoes: ['Couve', 'Aipim (Mandioca)', 'Taioba', 'Espinafre'], resposta: 'Aipim (Mandioca)' },
        { tipo: 'obstaculo', texto: 'Seca na região! Fique uma rodada sem jogar.' },
        { tipo: 'bonus', texto: 'Você encontrou um atalho na feira livre! Avance 2 casas sem precisar responder.' },
        { tipo: 'curiosidade', texto: 'Irará é famosa por sua lagoa e pela lenda de uma serpente gigante que dorme sob a Igreja Matriz.' },
    ];

    // Estado do Jogo
    let players = [];
    let currentPlayerIndex = 0;
    let diceRoll = 0;

    // Funções do Jogo
    function startGame() {
        const numPlayers = parseInt(numPlayersSelect.value);
        players = [];
        for (let i = 1; i <= numPlayers; i++) {
            players.push({ id: i, position: 0, blockedTurns: 0 });
        }
        currentPlayerIndex = 0;

        playerSetup.style.display = 'none';
        gameControls.style.display = 'block';

        renderizarTabuleiro();
        atualizarInfoJogador();
    }

    function renderizarTabuleiro() {
        gameBoard.innerHTML = '';
        municipios.forEach((municipio, index) => {
            const space = document.createElement('div');
            space.className = 'board-space';
            space.textContent = `${index}. ${municipio}`;
            space.dataset.index = index;
            if (index === 0) space.classList.add('start');
            if (index === municipios.length - 1) space.classList.add('end');
            gameBoard.appendChild(space);
        });
        atualizarPosicoesDosJogadores();
    }

    function atualizarPosicoesDosJogadores() {
        document.querySelectorAll('.player-marker').forEach(marker => marker.remove());
        players.forEach(player => {
            const currentSpaceDiv = document.querySelector(`.board-space[data-index='${player.position}']`);
            if (currentSpaceDiv) {
                const playerMarker = document.createElement('div');
                playerMarker.className = `player-marker player-${player.id}`;
                playerMarker.textContent = player.id;
                currentSpaceDiv.appendChild(playerMarker);
            }
        });
    }

    function atualizarInfoJogador() {
        currentPlayerEl.textContent = `Jogador ${players[currentPlayerIndex].id}`;
        document.querySelector('.game-info').style.borderColor = `var(--player-color-${players[currentPlayerIndex].id})`;
    }

    function rolarDado() {
        const currentPlayer = players[currentPlayerIndex];
        if (currentPlayer.blockedTurns > 0) {
            alert(`Jogador ${currentPlayer.id} está bloqueado nesta rodada!`);
            currentPlayer.blockedTurns--;
            proximoJogador();
            return;
        }

        diceRoll = Math.floor(Math.random() * 6) + 1;
        diceResultEl.textContent = `Você tirou: ${diceRoll}`;
        rollDiceBtn.disabled = true;

        setTimeout(puxarCarta, 500);
    }

    function puxarCarta() {
        const carta = cartas[Math.floor(Math.random() * cartas.length)];
        mostrarCarta(carta);
    }

    function mostrarCarta(carta) {
        cardContentEl.innerHTML = '';
        if (carta.tipo === 'desafio') {
            let opcoesHtml = carta.opcoes.map(opt => `<button class="card-option-btn" data-resposta="${opt}">${opt}</button>`).join('');
            cardContentEl.innerHTML = `<h3>Desafio!</h3><p>${carta.pergunta}</p><div class="card-options">${opcoesHtml}</div><p id="feedback-resposta"></p>`;
        } else if (carta.tipo === 'obstaculo') {
            cardContentEl.innerHTML = `<h3>Obstáculo!</h3><p>${carta.texto}</p><button class="card-close-btn">Ok</button>`;
            players[currentPlayerIndex].blockedTurns = 1;
        } else if (carta.tipo === 'bonus') {
            cardContentEl.innerHTML = `<h3>Bônus!</h3><p>${carta.texto}</p><button class="card-close-btn">Avançar!</button>`;
            moverJogador(2); // Avança 2 casas diretamente
        } else if (carta.tipo === 'curiosidade') {
            cardContentEl.innerHTML = `<h3>Curiosidade</h3><p>${carta.texto}</p><button class="card-close-btn">Interessante!</button>`;
        }
        cardModal.style.display = 'flex';
    }

    function moverJogador(passos) {
        const currentPlayer = players[currentPlayerIndex];
        currentPlayer.position += passos;

        if (currentPlayer.position >= municipios.length - 1) {
            currentPlayer.position = municipios.length - 1;
            atualizarPosicoesDosJogadores();
            setTimeout(() => {
                alert(`Parabéns, Jogador ${currentPlayer.id}, você venceu o jogo!`);
                resetGame();
            }, 500);
        } else {
            atualizarPosicoesDosJogadores();
        }
    }

    function resetGame() {
        players = [];
        currentPlayerIndex = 0;
        playerSetup.style.display = 'block';
        gameControls.style.display = 'none';
        gameBoard.innerHTML = '';
        diceResultEl.textContent = '';
    }

    function proximoJogador() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        atualizarInfoJogador();
        diceResultEl.textContent = '';
        rollDiceBtn.disabled = false;
    }

    // Event Listeners
    startGameBtn.addEventListener('click', startGame);
    rollDiceBtn.addEventListener('click', rolarDado);

    cardModal.addEventListener('click', (e) => {
        // Lógica para fechar o modal
        if (e.target.classList.contains('card-close-btn') || e.target === cardModal) {
            cardModal.style.display = 'none';
            proximoJogador();
        }

        // Lógica para responder a um desafio
        if (e.target.classList.contains('card-option-btn')) {
            const cartaDesafio = cartas.find(c => c.pergunta === e.target.closest('#card-content').querySelector('p').textContent);
            const respostaUsuario = e.target.dataset.resposta;
            const feedbackEl = document.getElementById('feedback-resposta');

            // Desabilita os botões para evitar cliques múltiplos
            e.target.parentElement.querySelectorAll('.card-option-btn').forEach(btn => btn.disabled = true);

            if (respostaUsuario === cartaDesafio.resposta) {
                feedbackEl.textContent = `Resposta Correta! Avance ${diceRoll} casas.`;
                feedbackEl.style.color = 'var(--accent-cyan)';
                moverJogador(diceRoll);
            } else {
                feedbackEl.textContent = 'Resposta Incorreta! Você fica onde está.';
                feedbackEl.style.color = 'var(--accent-orange)';
            }
            setTimeout(() => {
                cardModal.style.display = 'none';
                proximoJogador();
            }, 2000);
        }
    });
});
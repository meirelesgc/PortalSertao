document.addEventListener('DOMContentLoaded', () => {

    const gameBoard = document.getElementById('memory-game-board');
    const difficultyButtons = document.querySelectorAll('.difficulty-btn');
    const gameFeedback = document.getElementById('game-feedback');

    // ONDE VOCÊ IRÁ ADICIONAR E MODIFICAR OS CARTÕES
    const allCards = [
        { name: 'cangaceiro', type: 'image', content: '../images/cangaceiro.png', info: 'Cangaceiros eram nômades bandoleiros do nordeste brasileiro.' },
        { name: 'mandioca', type: 'image', content: '../images/mandioca.png', info: 'A mandioca é uma raiz fundamental na culinária do sertão.' },
        { name: 'cordel', type: 'image', content: '../images/cordel.png', info: 'A literatura de cordel é uma manifestação literária popular do interior do Nordeste.' },
        { name: 'sanfona', type: 'image', content: '../images/sanfona.png', info: 'A sanfona é um instrumento musical central no forró.' },
        { name: 'vaqueiro', type: 'image', content: '../images/vaqueiro.png', info: 'O vaqueiro é uma figura icônica do sertão, conhecido por sua bravura e vestimentas de couro.' },
        { name: 'xilogravura', type: 'image', content: '../images/xilogravura.png', info: 'A xilogravura é uma técnica de impressão muito usada nas capas dos cordéis.' },
        { name: 'forro', type: 'audio', content: '../audio/forro.mp3', info: 'O forró é um gênero musical e dança popular no Nordeste.' },
        { name: 'sotaque', type: 'audio', content: '../audio/sotaque.mp3', info: 'O sotaque sertanejo é uma marca cultural da região.' }
    ];

    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function createBoard(difficulty) {
        gameBoard.innerHTML = '';
        let numPairs = 0;

        if (difficulty === 'easy') numPairs = 4;
        else if (difficulty === 'medium') numPairs = 6;
        else if (difficulty === 'hard') numPairs = 8;

        let cardSet = allCards.slice(0, numPairs);
        let gameCards = [...cardSet, ...cardSet];
        gameCards.sort(() => 0.5 - Math.random());

        gameCards.forEach(cardData => {
            const card = document.createElement('div');
            card.classList.add('memory-card');
            card.dataset.name = cardData.name;

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front"></div>
                    <div class="card-back">
                        ${cardData.type === 'image' ? `<img src="${cardData.content}" alt="${cardData.name}">` : ''}
                        ${cardData.type === 'audio' ? `<span class="audio-icon">?</span>` : ''}
                    </div>
                </div>
            `;
            gameBoard.appendChild(card);
            card.addEventListener('click', () => flipCard(card, cardData));
        });
    }

    function flipCard(card, cardData) {
        if (lockBoard || card.classList.contains('flipped') || card === firstCard) return;

        card.classList.add('flipped');

        if (!firstCard) {
            firstCard = { element: card, data: cardData };
            return;
        }

        secondCard = { element: card, data: cardData };
        lockBoard = true;
        checkForMatch();
    }

    function checkForMatch() {
        let isMatch = firstCard.data.name === secondCard.data.name;
        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.element.removeEventListener('click', flipCard);
        secondCard.element.removeEventListener('click', flipCard);

        const cardData = firstCard.data;
        if (cardData.type === 'audio') {
            const audio = new Audio(cardData.content);
            audio.play();
        }
        gameFeedback.innerHTML = `<p>${cardData.info}</p>`;

        resetBoard();

        if (document.querySelectorAll('.memory-card:not(.flipped)').length === 0) {
            gameFeedback.innerHTML += '<h2>Parabéns, você completou o jogo!</h2>';
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.element.classList.remove('flipped');
            secondCard.element.classList.remove('flipped');
            resetBoard();
        }, 1200);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    difficultyButtons.forEach(button => {
        button.addEventListener('click', () => {
            createBoard(button.dataset.difficulty);
            gameFeedback.innerHTML = '';
        });
    });

    // Inicia o jogo no modo fácil por padrão
    createBoard('easy');
});
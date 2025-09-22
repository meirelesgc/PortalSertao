document.addEventListener('DOMContentLoaded', () => {
    const podcastListContainer = document.getElementById('podcast-list');
    const modalPlayer = document.getElementById('modal-player');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const videoContainer = document.getElementById('modal-video-container');

    const episodios = [
        {
            youtubeId: 'Vl7KdY-E5JQ',
            titulo: 'A Cultura do Sisal em Valente',
            autor: 'Grupo A - 7º Ano',
            data: '15 de Setembro, 2025',
            embeddable: true // Este vídeo permite incorporação
        },
        {
            youtubeId: '5mR0xulaI8U',
            titulo: 'Entrevista com Artesão de Couro',
            autor: 'Grupo B - 8º Ano',
            data: '18 de Setembro, 2025',
            embeddable: false // ESTE NÃO PERMITE, será um link direto
        },
        {
            youtubeId: 'KKDhSxcDr48',
            titulo: 'As Lendas Urbanas de Feira de Santana',
            autor: 'Grupo C - 7º Ano',
            data: '20 de Setembro, 2025',
            embeddable: true // Este vídeo permite incorporação
        },
        {
            youtubeId: 'KR_xdjePnuQ',
            titulo: 'Debate: O Futuro do Comércio Local',
            autor: 'Equipe do Grêmio Estudantil',
            data: '21 de Setembro, 2025',
            embeddable: true // Este vídeo permite incorporação
        },
        {
            youtubeId: 'MFVFlZ5GRco',
            titulo: 'A História da Culinária Sertaneja',
            autor: 'Grupo D - 9º Ano',
            data: '22 de Setembro, 2025',
            embeddable: false // ESTE NÃO PERMITE, será um link direto
        }
    ];

    function renderizarEpisodios() {
        if (!podcastListContainer) return;
        podcastListContainer.innerHTML = '';

        episodios.forEach(ep => {
            const thumbnailUrl = `https://img.youtube.com/vi/${ep.youtubeId}/hqdefault.jpg`;
            const cardContent = `
                <div class="card-thumbnail">
                    <img src="${thumbnailUrl}" alt="Thumbnail do episódio ${ep.titulo}">
                    <div class="play-overlay">
                        ${ep.embeddable ? '▶' : '<span>Assistir no YouTube ↗</span>'}
                    </div>
                </div>
                <div class="card-info">
                    <h3>${ep.titulo}</h3>
                    <p>${ep.autor}</p>
                    <span>${ep.data}</span>
                </div>
            `;

            if (ep.embeddable) {
                const card = document.createElement('div');
                card.className = 'podcast-card';
                card.dataset.youtubeId = ep.youtubeId;
                card.innerHTML = cardContent;
                podcastListContainer.appendChild(card);
            } else {
                const link = document.createElement('a');
                link.className = 'podcast-card direct-link';
                link.href = `https://www.youtube.com/watch?v=${ep.youtubeId}`;
                link.target = '_blank'; // Abre em nova aba
                link.rel = 'noopener noreferrer';
                link.innerHTML = cardContent;
                podcastListContainer.appendChild(link);
            }
        });
    }

    function abrirPlayer(youtubeId) {
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        modalPlayer.style.display = 'flex';
    }

    function fecharPlayer() {
        modalPlayer.style.display = 'none';
        videoContainer.innerHTML = '';
    }

    podcastListContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.podcast-card:not(.direct-link)');
        if (card) {
            e.preventDefault();
            abrirPlayer(card.dataset.youtubeId);
        }
    });

    modalCloseBtn.addEventListener('click', fecharPlayer);
    modalPlayer.addEventListener('click', (e) => {
        if (e.target === modalPlayer) fecharPlayer();
    });

    renderizarEpisodios();
});
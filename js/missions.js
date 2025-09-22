document.addEventListener('DOMContentLoaded', () => {

    const missionsContainer = document.getElementById('missions-container');

    const missoes = [
        {
            titulo: "O Coração Econômico",
            local: "Santo Estêvão",
            descricao: "Santo Estêvão é um importante polo comercial na região. Sua principal atividade econômica impulsiona toda a cidade.",
            pontos: 150,
            tarefaDigital: {
                pergunta: "Qual é a principal força econômica de Santo Estêvão?",
                opcoes: ["Agricultura de Laranja", "Pecuária Extensiva", "Um forte setor de Comércio e Serviços", "Indústria Têxtil"],
                respostaCorreta: "Um forte setor de Comércio e Serviços"
            }
        },
        {
            titulo: "A Lenda da Serpente",
            local: "Irará",
            descricao: "Reza a lenda que uma gigantesca serpente dorme sob a cidade de Irará, e se acordar, causará um grande desastre.",
            pontos: 120,
            tarefaDigital: {
                pergunta: "De acordo com a lenda, sob qual construção a serpente de Irará está adormecida?",
                opcoes: ["A prefeitura", "A lagoa da cidade", "A Igreja Matriz", "Uma gameleira antiga"],
                respostaCorreta: "A Igreja Matriz"
            }
        },
        {
            titulo: "O Portal do Sertão",
            local: "Feira de Santana",
            descricao: "Feira de Santana é o maior município do interior nordestino e um vital entroncamento rodoviário, o que lhe rendeu um famoso apelido.",
            pontos: 180,
            tarefaDigital: {
                pergunta: "Qual apelido Feira de Santana recebeu por sua localização estratégica?",
                opcoes: ["Princesa do Sertão", "Rainha do Agreste", "Capital da Pecuária", "Cidade Universitária"],
                respostaCorreta: "Princesa do Sertão"
            }
        },
        {
            titulo: "Sabores da Bahia",
            local: "Cachoeira",
            descricao: "A culinária de Cachoeira é rica em sabores herdados das culturas africana e indígena. Um de seus pratos mais famosos é a Maniçoba.",
            pontos: 130,
            tarefaDigital: {
                pergunta: "A Maniçoba, prato típico da região, é feita com as folhas de qual planta?",
                opcoes: ["Couve", "Aipim (Mandioca)", "Taioba", "Jiló"],
                respostaCorreta: "Aipim (Mandioca)"
            }
        }
        // ADICIONE MAIS MISSÕES DIGITAIS AQUI
    ];

    function renderizarMissoes() {
        if (!missionsContainer) return;
        missionsContainer.innerHTML = ''; // Limpa antes de renderizar

        missoes.forEach((missao, index) => {
            const missionCard = document.createElement('div');
            missionCard.className = 'mission-card';
            missionCard.dataset.missionId = index;

            let opcoesHtml = '';
            missao.tarefaDigital.opcoes.forEach(opcao => {
                opcoesHtml += `
                    <label class="mission-option">
                        <input type="radio" name="missao_${index}" value="${opcao}">
                        <span>${opcao}</span>
                    </label>
                `;
            });

            missionCard.innerHTML = `
                <div class="mission-header">
                    <div class="mission-title">
                        <h3>${missao.titulo}</h3>
                        <span>${missao.local}</span>
                    </div>
                    <div class="mission-points">
                        ${missao.pontos} PTS
                    </div>
                </div>
                <div class="mission-body">
                    <p class="mission-description">${missao.descricao}</p>
                    <div class="mission-task">
                        <h4>Sua Tarefa:</h4>
                        <p>${missao.tarefaDigital.pergunta}</p>
                        <div class="mission-options-container">
                            ${opcoesHtml}
                        </div>
                        <button class="mission-submit-btn">Concluir Missão</button>
                        <div class="mission-feedback"></div>
                    </div>
                </div>
            `;
            missionsContainer.appendChild(missionCard);
        });

        // Adiciona os eventos após a criação dos elementos
        adicionarEventos();
    }

    function adicionarEventos() {
        document.querySelectorAll('.mission-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const card = e.currentTarget.closest('.mission-card');
                if (!card.classList.contains('completed')) {
                    card.classList.toggle('active');
                }
            });
        });

        document.querySelectorAll('.mission-submit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const card = e.currentTarget.closest('.mission-card');
                const missionId = parseInt(card.dataset.missionId);
                verificarMissao(missionId);
            });
        });
    }

    function verificarMissao(id) {
        const missao = missoes[id];
        const card = document.querySelector(`.mission-card[data-mission-id='${id}']`);
        const feedbackEl = card.querySelector('.mission-feedback');
        const selectedOption = card.querySelector(`input[name='missao_${id}']:checked`);

        if (!selectedOption) {
            feedbackEl.textContent = "Por favor, selecione uma resposta.";
            feedbackEl.style.color = '#E07A5F'; // Laranja
            return;
        }

        if (selectedOption.value === missao.respostaCorreta) {
            feedbackEl.textContent = `Missão Concluída! +${missao.pontos} Pontos!`;
            feedbackEl.style.color = '#5BC0BE'; // Ciano
            card.classList.add('completed');
            card.classList.remove('active');
            // Desabilita as opções após a conclusão
            card.querySelectorAll('input[type="radio"]').forEach(input => input.disabled = true);
            card.querySelector('.mission-submit-btn').style.display = 'none';
        } else {
            feedbackEl.textContent = "Resposta incorreta. Tente novamente!";
            feedbackEl.style.color = '#E07A5F'; // Laranja
        }
    }

    renderizarMissoes();
});
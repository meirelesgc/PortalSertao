document.addEventListener('DOMContentLoaded', () => {

    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-quiz-btn');
    const resultadoContainer = document.getElementById('resultado');

    const perguntasQuiz = [
        {
            pergunta: "Qual destes municípios é conhecido como a 'Capital do Recôncavo'?",
            opcoes: ["Santo Antônio de Jesus", "Cruz das Almas", "Santo Amaro", "Feira de Santana"],
            respostaCorreta: "Santo Antônio de Jesus"
        },
        {
            pergunta: "A Festa da Boa Morte, uma importante manifestação cultural e religiosa, ocorre em qual cidade?",
            opcoes: ["Salvador", "Cachoeira", "Nazaré", "Valença"],
            respostaCorreta: "Cachoeira"
        },
        {
            pergunta: "Qual o principal produto agrícola historicamente associado à região do Recôncavo Baiano?",
            opcoes: ["Café", "Cacau", "Cana-de-açúcar", "Soja"],
            respostaCorreta: "Cana-de-açúcar"
        }
        // ADICIONE MAIS PERGUNTAS AQUI, SEGUINDO O MESMO FORMATO
        /*
        ,{
            pergunta: "Sua nova pergunta aqui",
            opcoes: ["Opção A", "Opção B", "Opção C", "Opção D"],
            respostaCorreta: "Opção C"
        }
        */
    ];

    function montarQuiz() {
        let output = '';
        perguntasQuiz.forEach((perguntaAtual, numeroPergunta) => {
            let opcoesOutput = '';
            perguntaAtual.opcoes.forEach(opcao => {
                opcoesOutput += `
                    <label class="quiz-opcao">
                        <input type="radio" name="pergunta${numeroPergunta}" value="${opcao}">
                        ${opcao}
                    </label>
                `;
            });
            output += `
                <div class="pergunta-bloco">
                    <p class="pergunta-titulo">${numeroPergunta + 1}. ${perguntaAtual.pergunta}</p>
                    <div class="opcoes-container">
                        ${opcoesOutput}
                    </div>
                </div>
            `;
        });
        quizContainer.innerHTML = output;
    }

    function mostrarResultado() {
        const respostasContainers = quizContainer.querySelectorAll('.opcoes-container');
        let acertos = 0;

        perguntasQuiz.forEach((perguntaAtual, numeroPergunta) => {
            const respostasContainer = respostasContainers[numeroPergunta];
            const seletor = `input[name=pergunta${numeroPergunta}]:checked`;
            const respostaUsuario = (respostasContainer.querySelector(seletor) || {}).value;

            if (respostaUsuario === perguntaAtual.respostaCorreta) {
                acertos++;
                respostasContainer.style.color = '#5BC0BE'; // Verde da paleta
            } else {
                respostasContainer.style.color = '#E07A5F'; // Laranja/Vermelho da paleta
            }
        });

        resultadoContainer.innerHTML = `
            <h2>Você acertou ${acertos} de ${perguntasQuiz.length} perguntas!</h2>
        `;
    }

    montarQuiz();
    submitButton.addEventListener('click', mostrarResultado);
});
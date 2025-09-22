document.addEventListener('DOMContentLoaded', () => {
    console.log('Hub inicializado com sucesso!');

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            console.log(`Mouse sobre o card: ${card.querySelector('h2').textContent}`);
        });
    });
});
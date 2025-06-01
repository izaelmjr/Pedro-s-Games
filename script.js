// ... (previous functions remain the same until filterGames) ...

function filterGames() {
    const selectedGenre = document.getElementById('genre-filter').value;
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        if (selectedGenre === 'all' || card.dataset.genre === selectedGenre) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// ... (rest of the previous functions remain the same) ...
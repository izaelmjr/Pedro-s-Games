let cart = [];

function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

function filterByGenre() {
    const genreFilter = document.getElementById('genreFilter').value;
    const games = document.querySelectorAll('.game-card');

    games.forEach(game => {
        const genre = game.getAttribute('data-genre');
        if (genreFilter === 'all' || genre === genreFilter) {
            game.style.display = 'block';
        } else {
            game.style.display = 'none';
        }
    });
}

function addToCart(id, title, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            title,
            price,
            quantity: 1
        });
    }
    
    updateCart();
    
    const gameCard = document.querySelector(`[data-id="${id}"]`);
    const button = gameCard.querySelector('button');
    
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    
    const cartCount = document.getElementById('cart-count');
    cartCount.style.animation = 'none';
    cartCount.offsetHeight;
    cartCount.style.animation = 'bounce 0.5s ease';
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.style.marginBottom = '1rem';
        itemElement.style.padding = '1rem';
        itemElement.style.backgroundColor = '#1a1a1a';
        itemElement.style.borderRadius = '5px';
        itemElement.style.animation = 'fadeIn 0.3s ease';
        
        itemElement.innerHTML = `
            <h3>${item.title}</h3>
            <p>Quantidade: ${item.quantity}</p>
            <p>Preço: R$ ${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart(${item.id})" style="background-color: #ff4757; padding: 0.5rem; border: none; color: white; border-radius: 3px; cursor: pointer;">
                Remover
            </button>
        `;
        
        cartItems.appendChild(itemElement);
        total += item.price * item.quantity;
    });
    
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    
    alert('Compra finalizada com sucesso! Seus jogos serão adicionados à sua biblioteca.');
    cart = [];
    updateCart();
    toggleCart();
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (email && password) {
        const button = event.target.querySelector('button');
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
        button.disabled = true;
        
        setTimeout(() => {
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html';
        }, 1500);
    }
    
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    
    const elements = document.querySelectorAll('.game-card, .about-section');
    elements.forEach(el => observer.observe(el));
});
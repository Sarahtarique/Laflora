// Function to format price in Indian Rupees
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem('lafloraCart')) || {};

// Function to render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let total = 0;

    Object.values(cart).forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${formatPrice(item.price)}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="decrement" data-id="${item.id}">-</button>
                <p>${item.quantity}</p>
                <button class="increment" data-id="${item.id}">+</button>
            </div>
            <p>${formatPrice(item.price * item.quantity)}</p>
        `;

        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = formatPrice(total);

    // Add event listeners for quantity buttons
    addQuantityListeners();
}

// Function to add quantity increment and decrement functionality
function addQuantityListeners() {
    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            cart[id].quantity++;
            saveCart();
            renderCart();
        });
    });

    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (cart[id].quantity > 1) {
                cart[id].quantity--;
                saveCart();
                renderCart();
            }
        });
    });
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('lafloraCart', JSON.stringify(cart));
}

// Initialize cart rendering
document.addEventListener('DOMContentLoaded', renderCart);

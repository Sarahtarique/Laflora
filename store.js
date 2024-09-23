const products = [
    {
        "id": 1,
        "name": "Stylish Spectacles",
        "category": "Spectacles",
        "image": "./Images/stylish_spectacles.jpg",
        "description": "Stylish and comfortable spectacles for everyday wear.",
        "price": 1200,
        "actualPrice": 1500,
        "rating": 4
    },
    {
        "id": 2,
        "name": "Premium Lenses",
        "category": "Contact Lenses",
        "image": "./Images/premium_lenses.jpg",
        "description": "High-quality contact lenses for a clear vision.",
        "price": 800,
        "actualPrice": 1000,
        "rating": 5
    },
    {
        "id": 3,
        "name": "Trendy Sunglasses",
        "category": "Sunglasses",
        "image": "./Images/trendy_sunglasses.jpg",
        "description": "Fashionable sunglasses with UV protection.",
        "price": 1500,
        "actualPrice": 1800,
        "rating": 4.5
    },
    {
        "id": 4,
        "name": "Luxury Itar",
        "category": "Perfumes",
        "image": "./Images/luxury_itar.jpg",
        "description": "Exquisite Itar perfume with a long-lasting fragrance.",
        "price": 2500,
        "actualPrice": 3000,
        "rating": 5
    },
    {
        "id": 5,
        "name": "Reading Glasses",
        "category": "Spectacles",
        "image": "./Images/reading_glasses.jpg",
        "description": "Classic design reading glasses for comfortable reading.",
        "price": 1000,
        "actualPrice": 1300,
        "rating": 4
    },
    {
        "id": 6,
        "name": "Disposable Lenses",
        "category": "Contact Lenses",
        "image": "./Images/disposable_lenses.jpg",
        "description": "Convenient daily disposable contact lenses.",
        "price": 600,
        "actualPrice": 800,
        "rating": 4.5
    },
    {
        "id": 7,
        "name": "Sporty Sunglasses",
        "category": "Sunglasses",
        "image": "./Images/sporty_sunglasses.jpg",
        "description": "Sunglasses designed for sports and outdoor activities.",
        "price": 1800,
        "actualPrice": 2200,
        "rating": 4.8
    },
    {
        "id": 8,
        "name": "Floral Itar",
        "category": "Perfumes",
        "image": "./Images/floral_itar.jpg",
        "description": "A refreshing floral scent for daily wear.",
        "price": 2300,
        "actualPrice": 2700,
        "rating": 4.7
    },
    // Add more products as needed
];

let cart = {};

// Function to format price in Indian Rupees
function formatPrice(price) {
    return `₹${price.toLocaleString('en-IN')}`;
}

// Function to render products
function renderProducts() {
    const productContainer = document.getElementById('productContainer');
    productContainer.innerHTML = '';

    products.forEach(product => {
        const template = document.getElementById('productTemplate').content.cloneNode(true);
        template.querySelector('.category').textContent = product.category;
        template.querySelector('.productImage').src = product.image;
        template.querySelector('.productName').textContent = product.name;
        template.querySelector('.productDescription').textContent = product.description;
        template.querySelector('.productPrice').textContent = formatPrice(product.price);
        template.querySelector('.productActualPrice').textContent = formatPrice(product.actualPrice);
        
        // Set rating stars
        const stars = template.querySelector('.productRating');
        stars.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('i');
            star.className = i < product.rating ? 'fa-solid fa-star' : 'fa-regular fa-star';
            stars.appendChild(star);
        }

        // Quantity management
        let quantity = 1;
        const quantityDisplay = template.querySelector('.productQuantity');
        template.querySelector('.cartIncrement').onclick = () => {
            quantity++;
            quantityDisplay.textContent = quantity;
        };
        template.querySelector('.cartDecrement').onclick = () => {
            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        };

       // Function to update the cart count display
        function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        const totalItems = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        }

        // Modify the Add to cart button click handler
        template.querySelector('.add-to-cart-button').onclick = () => {
        if (cart[product.id]) {
          cart[product.id].quantity += quantity;
        } else {
          cart[product.id] = { ...product, quantity };
        }
       updateCartCount(); // Update the cart count display
      };


        productContainer.appendChild(template);
    });
}

// Call the render function on load
document.addEventListener('DOMContentLoaded', renderProducts);

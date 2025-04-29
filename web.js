// Menu Items Data
const menuItems = [
    {
        id: 1,
        name: "Chocolate Truffle Cake",
        category: "cakes",
        price: 32.99,
        image: "chocolate-cake.jpg",
        description: "Rich chocolate layers with truffle filling"
    },
    {
        id: 2,
        name: "French Macarons",
        category: "pastries",
        price: 18.99,
        image: "macarons.jpg",
        description: "Assorted flavors of delicate French macarons"
    },
    {
        id: 3,
        name: "Chocolate Chip Cookies",
        category: "cookies",
        price: 12.99,
        image: "cookies.jpg",
        description: "Classic homemade chocolate chip cookies"
    },
    // Add more menu items as needed
];

// Cart State
let cart = [];

// DOM Elements
const menuGrid = document.getElementById('menuGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartModal = document.getElementById('cartModal');
const cartIcon = document.querySelector('.cart-icon');
const closeCart = document.querySelector('.close-cart');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cartTotal');

// Initialize Menu
function initializeMenu() {
    displayMenuItems('all');
    setupEventListeners();
}

// Display Menu Items
function displayMenuItems(category) {
    const filteredItems = category === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);

    menuGrid.innerHTML = filteredItems.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">$${item.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${item.id}">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Setup Event Listeners
function setupEventListeners() {
    // Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            displayMenuItems(btn.dataset.category);
        });
    });

    // Cart Toggle
    cartIcon.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);

    // Add to Cart Buttons
    menuGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            addToCart(parseInt(e.target.dataset.id));
        }
    });
}

// Toggle Cart Modal
function toggleCart() {
    cartModal.classList.toggle('active');
}

// Add to Cart
function addToCart(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCart();
}

// Update Cart
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">×</button>
        </div>
    `).join('');

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', initializeMenu);

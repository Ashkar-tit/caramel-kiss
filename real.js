// script.js
let cart = [];
let cartTotal = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    showCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <div>
                    <span>₹${item.price}</span>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });
    
    cartCount.textContent = cart.length;
    cartTotal.textContent = `₹${total}`;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function showCart() {
    document.getElementById('cart-sidebar').classList.add('active');
}

function hideCart() {
    document.getElementById('cart-sidebar').classList.remove('active');
}

// Event Listeners
document.querySelector('.cart-icon').addEventListener('click', showCart);
document.querySelector('.close-cart').addEventListener('click', hideCart);

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Checkout button
document.querySelector('.checkout-btn').addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! We will process it shortly.');
    cart = [];
    updateCart();
    hideCart();
});
// Add to script.js
document.addEventListener('DOMContentLoaded', function() {
    // Flavor tag selection
    const flavorTags = document.querySelectorAll('.flavor-tag');
    flavorTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // Suggestion form submission
    const suggestionForm = document.getElementById('suggestion-form');
    suggestionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const selectedFlavors = Array.from(document.querySelectorAll('.flavor-tag.active'))
            .map(tag => tag.textContent);
        
        // Here you would typically send this to your backend
        alert('Thank you for your suggestion! Our pastry chefs will review it.');
        this.reset();
        document.querySelectorAll('.flavor-tag.active')
            .forEach(tag => tag.classList.remove('active'));
    });

    // Creation slider functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.creation-slide');
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    document.querySelector('.next-slide').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    document.querySelector('.prev-slide').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Show first slide initially
    showSlide(0);

    // Auto-rotate slides
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// Add this to your existing addToCart function
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
    showCart();
    
    // Add animation feedback
    const notification = document.createElement('div');
    notification.className = 'add-to-cart-notification';
    notification.textContent = 'Added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

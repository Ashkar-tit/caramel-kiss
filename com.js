// Sample shop data (in real application, this would come from a database)
const shops = [
    {
        id: 1,
        name: "Sweet Delights Downtown",
        location: "123 Main St",
        specialties: ["Chocolate Cake", "Macarons", "Cheesecake"],
        priceRange: "$$",
        rating: 4.5,
        popularItems: ["New York Cheesecake", "Dark Chocolate Truffles"],
        openHours: "9:00 AM - 9:00 PM"
    },
    {
        id: 2,
        name: "Sweet Delights Uptown",
        location: "456 Park Ave",
        specialties: ["Croissants", "Eclairs", "Tarts"],
        priceRange: "$$$",
        rating: 4.8,
        popularItems: ["French Croissants", "Fruit Tarts"],
        openHours: "8:00 AM - 8:00 PM"
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeShopSelectors();
    setupEventListeners();
});

function initializeShopSelectors() {
    const shop1Select = document.getElementById('shop1-select');
    const shop2Select = document.getElementById('shop2-select');

    shops.forEach(shop => {
        shop1Select.add(new Option(shop.name, shop.id));
        shop2Select.add(new Option(shop.name, shop.id));
    });
}

function setupEventListeners() {
    const compareBtn = document.getElementById('compare-btn');
    compareBtn.addEventListener('click', compareShops);
}

function compareShops() {
    const shop1Id = document.getElementById('shop1-select').value;
    const shop2Id = document.getElementById('shop2-select').value;

    if (!shop1Id || !shop2Id) {
        alert('Please select two shops to compare');
        return;
    }

    if (shop1Id === shop2Id) {
        alert('Please select different shops to compare');
        return;
    }

    const shop1 = shops.find(shop => shop.id == shop1Id);
    const shop2 = shops.find(shop => shop.id == shop2Id);

    displayComparison(shop1, shop2);
}

function displayComparison(shop1, shop2) {
    const resultsDiv = document.getElementById('comparison-results');
    resultsDiv.innerHTML = `
        <div class="shop-comparison">
            <h3>Comparison Results</h3>
            <div class="comparison-grid">
                <div class="shop-details">
                    <h4>${shop1.name}</h4>
                    <p>Location: ${shop1.location}</p>
                    <p>Price Range: ${shop1.priceRange}</p>
                    <p>Rating: ${shop1.rating}/5</p>
                    <p>Hours: ${shop1.openHours}</p>
                    <p>Popular Items: ${shop1.popularItems.join(', ')}</p>
                </div>
                <div class="shop-details">
                    <h4>${shop2.name}</h4>
                    <p>Location: ${shop2.location}</p>
                    <p>Price Range: ${shop2.priceRange}</p>
                    <p>Rating: ${shop2.rating}/5</p>
                    <p>Hours: ${shop2.openHours}</p>
                    <p>Popular Items: ${shop2.popularItems.join(', ')}</p>
                </div>
            </div>
        </div>
    `;
    
    resultsDiv.classList.add('active');
}

// Mobile menu functionality
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

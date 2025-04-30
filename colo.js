// comparison.js
class DessertComparison {
    constructor() {
        this.dessertData = {
            'caramel-kiss':[
                {
                    shop: 'Caramel Kiss',
                    portionSize: '150g',
                    qualityRating: 5,
                    tasteRating: 5,
                    details: {
                        ingredients: 'Premium ingredients',
                        freshness: 'Made fresh daily',
                        presentation: 'Artistic plating'
                    }
                },
                {
                    shop: 'Sweet Corner',
                    portionSize: '120g',
                    qualityRating: 4,
                    tasteRating: 4,
                    details: {
                        ingredients: 'Good quality',
                        freshness: 'Daily batch',
                        presentation: 'Standard plating'
                    }
                },
                {
                    shop: 'Dessert Haven',
                    portionSize: '130g',
                    qualityRating: 3,
                    tasteRating: 4,
                    details: {
                        ingredients: 'Standard quality',
                        freshness: 'Made daily',
                        presentation: 'Simple presentation'
                    }
                },
      
                {
                    shop: 'choco boy',
                    portionSize: '100g',
                    qualityRating: 4,
                    tasteRating: 4,
                    details: {
                        ingredients: 'Premium ingredients',
                        freshness: 'Made fresh daily',
                        presentation: 'Artistic plating'
                    }
                },
               {
                    shop: 'quality walls',
                    portionSize: '120g',
                    qualityRating: 3,
                    tasteRating: 4,
                    details: {
                        ingredients: 'Premium ingredients like mexican toppings',
                        freshness: 'Made fresh daily',
                        presentation: 'Artistic plating'
                    }
                },
            ],
            // Add more dessert comparisons here
        };

        this.initializeComparison();
    }

    initializeComparison() {
        const dessertSelect = document.getElementById('dessert-select');
        dessertSelect.addEventListener('change', () => {
            this.updateComparison(dessertSelect.value);
        });
    }

    updateComparison(dessertType) {
        const comparisonBody = document.getElementById('comparison-body');
        comparisonBody.innerHTML = '';

        if (!dessertType || !this.dessertData[dessertType]) return;

        this.dessertData[dessertType].forEach(shop => {
            const row = document.createElement('tr');
            const overallScore = ((shop.qualityRating + shop.tasteRating) / 2).toFixed(1);

            row.innerHTML = `
                <td>${shop.shop}</td>
                <td>
                    <div class="portion-size">
                        ${shop.portionSize}
                        ${this.getPortionSizeIndicator(shop.portionSize)}
                    </div>
                </td>
                <td>
                    <div class="rating-stars">
                        ${this.generateStars(shop.qualityRating)}
                    </div>
                </td>
                <td>
                    <div class="rating-stars">
                        ${this.generateStars(shop.tasteRating)}
                    </div>
                </td>
                <td>
                    <strong>${overallScore}/5</strong>
                    <div class="quality-indicator ${this.getQualityClass(overallScore)}"></div>
                </td>
            `;

            comparisonBody.appendChild(row);
        });
    }

    generateStars(rating) {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }

    getPortionSizeIndicator(size) {
        const grams = parseInt(size);
        if (grams >= 150) return '🔵 Large';
        if (grams >= 120) return '🟢 Medium';
        return '🟡 Small';
    }

    getQualityClass(score) {
        if (score >= 4.5) return 'excellent';
        if (score >= 4.0) return 'good';
        if (score >= 3.0) return 'average';
        return 'below-average';
    }
}

// Initialize comparison feature
document.addEventListener('DOMContentLoaded', () => {
    const comparison = new DessertComparison();
});

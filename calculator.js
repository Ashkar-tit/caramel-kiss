// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

function calculateROI() {
    const investment = parseFloat(document.getElementById('investment').value);
    const duration = parseFloat(document.getElementById('duration').value);
    const annualRate = parseFloat(document.getElementById('rate').value);

    if (isNaN(investment) || isNaN(duration) || isNaN(annualRate)) {
        alert('Please enter valid numbers in all fields');
        return;
    }

    // Monthly rate
    const monthlyRate = annualRate / 12 / 100;
    
    // Calculate future value
    const futureValue = investment * Math.pow(1 + monthlyRate, duration);
    const totalReturns = futureValue - investment;
    const monthlyReturns = totalReturns / duration;

    // Format numbers to Indian currency format
    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    });

    const resultContent = `
        <div style="margin: 1rem 0;">
            <p><strong>Initial Investment:</strong> ${formatter.format(investment)}</p>
            <p><strong>Investment Duration:</strong> ${duration} months</p>
            <p><strong>Annual Return Rate:</strong> ${annualRate}%</p>
            <p><strong>Total Value:</strong> ${formatter.format(futureValue)}</p>
            <p><strong>Total Returns:</strong> ${formatter.format(totalReturns)}</p>
            <p><strong>Monthly Average Returns:</strong> ${formatter.format(monthlyReturns)}</p>
        </div>
    `;

    const resultCard = document.getElementById('result');
    resultCard.classList.add('active');
    document.getElementById('resultContent').innerHTML = resultContent;
}

// Add input validation
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value < 0) this.value = 0;
    });
});

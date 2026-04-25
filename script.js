let currentCurrency = 'INR';
const exchangeRate = 83; 

// Toggle the currency menu visibility
function toggleCurrencyMenu() {
    const menu = document.getElementById('currencyMenu');
    menu.classList.toggle('hidden');
}

// Close menu if user clicks outside
window.onclick = function(event) {
    if (!event.target.matches('.currency-trigger') && !event.target.matches('.currency-trigger *')) {
        const menu = document.getElementById('currencyMenu');
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    }
}

function setCurrency(type) {
    currentCurrency = type;
    document.getElementById('currentText').innerText = type;
    document.getElementById('currentFlag').innerText = (type === 'USD') ? '$' : '₹';
    document.getElementById('currencyMenu').classList.add('hidden');

    const prices = document.querySelectorAll('.price-display');
    prices.forEach(el => {
        const baseINR = parseFloat(el.getAttribute('data-base'));
        if (type === 'USD') {
            el.innerText = `$${(baseINR / exchangeRate).toFixed(2)}/mo`;
        } else {
            el.innerText = `₹${baseINR}/mo`;
        }
    });
}

function openAuth() { document.getElementById('authModal').classList.remove('hidden'); }

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('payName').value = document.getElementById('authName').value;
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
});

function openCheckout(name, priceINR) {
    let sym = (currentCurrency === 'USD') ? "$" : "₹";
    let base = (currentCurrency === 'USD') ? (priceINR / exchangeRate) : priceINR;
    let tax = base * 0.18;
    
    document.getElementById('checkPlanName').innerText = name;
    document.getElementById('checkBase').innerText = sym + base.toFixed(2);
    document.getElementById('checkTax').innerText = sym + tax.toFixed(2);
    document.getElementById('checkTotal').innerText = sym + (base + tax).toFixed(2);
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function closeCheckout() { document.getElementById('checkoutModal').classList.add('hidden'); }
function scrollToSolutions() { document.getElementById('solutions-grid').scrollIntoView({ behavior: 'smooth' }); }

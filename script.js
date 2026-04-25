function scrollToSolutions() {
    document.getElementById('solutions-grid').scrollIntoView({ behavior: 'smooth' });
}

function openAuth() {
    document.getElementById('authModal').classList.remove('hidden');
}

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('landingPage').classList.add('hidden');
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    window.scrollTo(0, 0);
});

function filterServices() {
    let input = document.getElementById('gameSearch').value.toLowerCase();
    let cards = document.getElementsByClassName('plan-card');
    for (let card of cards) {
        card.style.display = card.getAttribute('data-name').includes(input) ? "block" : "none";
    }
}

function openCheckout(name, price) {
    let tax = price * 0.18;
    document.getElementById('checkPlanName').innerText = name;
    document.getElementById('checkBase').innerText = "₹" + price;
    document.getElementById('checkTax').innerText = "₹" + tax.toFixed(2);
    document.getElementById('checkTotal').innerText = "₹" + (price + tax).toFixed(2);
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.add('hidden');
}

function proceedToPay() {
    document.getElementById('checkoutModal').classList.add('hidden');
    document.getElementById('paymentModal').classList.remove('hidden');
}

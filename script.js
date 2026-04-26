// Functionality Fixes
function scrollToSolutions() { document.getElementById('solutions-grid').scrollIntoView({ behavior: 'smooth' }); }
function openAuth() { document.getElementById('authModal').classList.remove('hidden'); }

// Login Flow
document.getElementById('authForm').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('landingPage').style.display = 'none';
    document.getElementById('authModal').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    window.scrollTo(0,0);
};

// Currency Logic
function changeCurrency(label, rate, symbol) {
    document.getElementById('currentText').innerText = label;
    document.getElementById('currentFlag').innerText = symbol;
    document.querySelectorAll('.price-display').forEach(p => {
        const base = parseFloat(p.getAttribute('data-base'));
        p.innerText = symbol + (base * rate).toFixed(0) + "/mo";
    });
}

// Checkout Logic
let currentPriceLabel = "₹";
function openCheckout(name, price) {
    const symbol = document.getElementById('currentFlag').innerText;
    const rate = symbol === '$' ? 0.012 : 1;
    const total = (price * rate * 1.18).toFixed(2);
    
    document.getElementById('checkPlanName').innerText = name;
    document.getElementById('checkTotal').innerText = symbol + total;
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function proceedToPay() {
    if(!document.getElementById('custName').value || !document.getElementById('custPhone').value) {
        return alert("Please fill in your details.");
    }
    document.getElementById('finalPayAmount').innerText = document.getElementById('checkTotal').innerText;
    document.getElementById('checkoutModal').classList.add('hidden');
    document.getElementById('paymentModal').classList.remove('hidden');
}

// Cursor Movement
window.addEventListener('mousemove', (e) => {
    const dot = document.querySelector('.cursor-dot');
    const out = document.querySelector('.cursor-outline');
    dot.style.display = out.style.display = 'block';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    out.animate({ left: e.clientX + 'px', top: e.clientY + 'px' }, { duration: 400, fill: "forwards" });
});

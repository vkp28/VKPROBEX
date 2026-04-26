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
let checkoutData = {};

function openCheckout(name, price) {
    const symbol = document.getElementById('currentFlag').innerText;
    const rate = symbol === '$' ? 0.012 : 1;
    const total = (price * rate * 1.18).toFixed(2);
    
    document.getElementById('checkPlanName').innerText = name;
    document.getElementById('checkTotal').innerText = symbol + total;
    document.getElementById('checkoutModal').classList.remove('hidden');
}

function proceedToPay() {
    const name = document.getElementById('custName').value;
    const phone = document.getElementById('custPhone').value;
    const plan = document.getElementById('checkPlanName').innerText;
    const total = document.getElementById('checkTotal').innerText;

    if(!name || !phone) {
        return alert("Please fill in your details.");
    }

    checkoutData = {
        name: name,
        phone: phone,
        plan: plan,
        amount: total
    };

    document.getElementById('finalPayAmount').innerText = total;
    document.getElementById('checkoutModal').classList.add('hidden');
    document.getElementById('paymentModal').classList.remove('hidden');
}

function sendDataToFormspree() {
    const btn = document.getElementById('confirmPayBtn');
    btn.innerText = "VERIFYING...";
    btn.disabled = true;

    // REPLACE 'your_formspree_id' with your actual Formspree ID
    fetch('https://formspree.io/f/your_formspree_id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutData)
    })
    .then(response => {
        alert("Payment details sent for verification!");
        location.reload();
    })
    .catch(error => {
        alert("Error sending details. Please try again.");
        btn.innerText = "I HAVE PAID";
        btn.disabled = false;
    });
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

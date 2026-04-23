const items = [
    { id: "ax-core", name: "AX-CORE V.1", price: "$4,200", img: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000" },
    { id: "neural-unit", name: "NEURAL UNIT", price: "$1,450", img: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1000" },
    { id: "hydra", name: "HYDRA ACTUATOR", price: "$2,890", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000" },
    { id: "flux", name: "FLUX BATTERY", price: "$1,100", img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1000" }
];

// Tracking Cart Items
let cartStorage = {}; 
let totalUnits = 0;

const grid = document.getElementById('product-grid');

// Build Product Grid
items.forEach(item => {
    grid.innerHTML += `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${item.img}')"></div>
            <div>
                <h3 style="font-size: 2.2rem; letter-spacing: -2px;">${item.name}</h3>
                <p style="opacity: 0.5;">PRC // ${item.price}</p>
            </div>
            <div style="display: flex; flex-direction: column;">
                <button class="card-btn" onclick="addToCart('${item.id}', '${item.name}')">[ ADD TO ARCHIVE ]</button>
                <button class="card-btn" onclick="openModal()">[ QUICK BUY ]</button>
            </div>
        </div>
    `;
});

// Add to Cart Logic
window.addToCart = function(id, name) {
    if (!cartStorage[id]) {
        cartStorage[id] = { name: name, qty: 1 };
    } else {
        cartStorage[id].qty += 1;
    }
    totalUnits++;
    updateUI();
    openCart();
};

function updateUI() {
    document.getElementById('cart-count').innerText = totalUnits;
    document.getElementById('drawer-count').innerText = totalUnits;
    
    const list = document.getElementById('cart-items-list');
    list.innerHTML = ""; // Clear existing

    // Generate Side-by-Side rows
    Object.keys(cartStorage).forEach(key => {
        const item = cartStorage[key];
        list.innerHTML += `
            <div class="cart-item">
                <span class="item-name">${item.name}</span>
                <span class="item-qty">QTY: ${item.qty}</span>
            </div>
        `;
    });

    if (totalUnits === 0) list.innerHTML = "<p>// ARCHIVE EMPTY</p>";
}

// Drawer Controls
window.openCart = function() { document.getElementById('cart-drawer').classList.add('active'); };
window.closeCart = function() { document.getElementById('cart-drawer').classList.remove('active'); };

// Modal Controls
window.openModal = function() { closeCart(); document.getElementById('payment-modal').style.display = 'flex'; };
window.closeModal = function() { document.getElementById('payment-modal').style.display = 'none'; };

window.processPayment = function() {
    const name = document.getElementById('user-name').value;
    if(!name) return;
    document.getElementById('modal-content').innerHTML = `
        <h1 style="font-size: 2rem; margin-bottom: 20px;">REQUEST ACCEPTED.</h1>
        <p style="margin-bottom: 20px; color: #555;">THANK YOU, ${name.toUpperCase()}</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SUCCESS" style="filter: invert(1);">
    `;
};

// Effects
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e) => { gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 }); });
gsap.from(".split-text", { y: 100, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" });

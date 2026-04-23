const items = [
    { name: "AX-CORE V.1", price: "$4,200", img: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000" },
    { name: "NEURAL UNIT", price: "$1,450", img: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1000" },
    { name: "HYDRA ACTUATOR", price: "$2,890", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000" },
    { name: "FLUX BATTERY", price: "$1,100", img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1000" }
];

let cartCount = 0;
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
                <button class="card-btn" onclick="updateCart()">[ ADD TO ARCHIVE ]</button>
                <button class="card-btn" onclick="openModal()">[ QUICK BUY ]</button>
            </div>
        </div>
    `;
});

// Cursor Logic
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
});

// Cart Drawer Functions
window.updateCart = function() {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    document.getElementById('drawer-count').innerText = cartCount;
    openCart();
};

window.openCart = function() {
    document.getElementById('cart-drawer').classList.add('active');
    const list = document.getElementById('cart-items-list');
    list.innerHTML = cartCount === 0 
        ? "<p>// ARCHIVE IS EMPTY</p>" 
        : `<p>// ${cartCount} UNITS SECURED AND READY FOR DISPATCH.</p>`;
};

window.closeCart = function() {
    document.getElementById('cart-drawer').classList.remove('active');
};

// Modal Functions
window.openModal = function() {
    closeCart();
    document.getElementById('payment-modal').style.display = 'flex';
};

window.closeModal = function() {
    document.getElementById('payment-modal').style.display = 'none';
};

window.processPayment = function() {
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;

    if(!name || !email || !phone) {
        return; // Just stop if empty
    }

    document.getElementById('modal-content').innerHTML = `
        <h1 style="font-size: 2rem; margin-bottom: 20px;">REQUEST ACCEPTED.</h1>
        <p style="margin-bottom: 20px; color: #555;">THANK YOU, ${name.toUpperCase()}</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SUCCESS" style="filter: invert(1);">
        <p style="margin-top: 20px; font-size: 0.7rem;">ENCRYPTED RECEIPT GENERATED</p>
    `;
};

gsap.from(".split-text", { y: 100, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" });

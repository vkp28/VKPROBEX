const products = [
    { id: 1, name: "Alpha Sentinel", price: "$2,499", img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Neural Link Drone", price: "$899", img: "https://images.unsplash.com/photo-1508921334172-b68ed301dc82?auto=format&fit=crop&q=80&w=400" },
    { id: 3, name: "Cyber Limb v4", price: "$5,100", img: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=400" }
];

let cartCount = 0;

// 1. Initialize Products
const grid = document.getElementById('product-grid');
products.forEach(p => {
    grid.innerHTML += `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price}</p>
            <div class="btn-group">
                <button class="add-btn" onclick="addToCart()">Add to Cart</button>
                <button class="buy-btn" onclick="openModal()">Buy Now</button>
            </div>
        </div>
    `;
});

// 2. Cursor Follow
window.addEventListener('mousemove', (e) => {
    gsap.to(".cursor-dot", { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(".cursor-outline", { x: e.clientX, y: e.clientY, duration: 0.15 });
});

// 3. Cart Logic
function addToCart() {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    alert("Item added to cart!");
}

// 4. Payment Flow
function openModal() {
    document.getElementById('payment-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('payment-modal').style.display = 'none';
    // Reset modal content
    document.getElementById('modal-content').innerHTML = `
        <input type="email" id="user-email" placeholder="Email ID" class="glass-input">
        <input type="tel" id="user-phone" placeholder="Phone Number" class="glass-input">
        <button class="buy-btn" onclick="processPayment()">Confirm Order</button>
    `;
}

function processPayment() {
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;

    if (email === "" || phone === "") {
        alert("Please enter Email and Phone No.");
        return;
    }

    document.getElementById('modal-content').innerHTML = `
        <h3 style="color: #00f2ff">Request Accepted</h3>
        <p style="margin: 15px 0">Scan to pay via Robo-X secure link</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ROBOX-PAYMENT-SUCCESS" style="border: 10px solid white; border-radius: 10px;">
    `;
}

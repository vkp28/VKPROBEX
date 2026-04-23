// 1. PRODUCT DATABASE
const items = [
    { 
        name: "AX-CORE V.1", 
        price: "$4,200", 
        img: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000" 
    },
    { 
        name: "NEURAL UNIT", 
        price: "$1,450", 
        img: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1000" 
    },
    { 
        name: "HYDRA ACTUATOR", 
        price: "$2,890", 
        img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000" 
    },
    { 
        name: "SENS-ARRAY 5", 
        price: "$600", 
        img: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=1000" 
    },
    { 
        name: "TITAN FRAME", 
        price: "$9,000", 
        img: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?q=80&w=1000" 
    },
    { 
        name: "FLUX BATTERY", 
        price: "$1,100", 
        img: "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1000" 
    }
];

// 2. INITIALIZE VARIABLES
const grid = document.getElementById('product-grid');
let cartCount = 0;

// 3. RENDER PRODUCTS TO THE BENTO GRID
items.forEach(item => {
    grid.innerHTML += `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${item.img}')"></div>
            <div>
                <h3 style="font-size: 2.2rem; letter-spacing: -2px; text-transform: uppercase;">${item.name}</h3>
                <p style="opacity: 0.5; margin-top: 5px; font-weight: 700;">SPEC // ${item.price}</p>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
                <button class="card-btn" onclick="updateCart()">[ ADD TO CART ]</button>
                <button class="card-btn" onclick="openModal()">[ QUICK BUY ]</button>
            </div>
        </div>
    `;
});

// 4. PROFESSIONAL CURSOR FOLLOW LOGIC
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { 
        x: e.clientX, 
        y: e.clientY, 
        duration: 0.1,
        ease: "power2.out" 
    });
});

// 5. HERO TEXT REVEAL ANIMATION
gsap.from(".split-text", { 
    y: 100, 
    opacity: 0, 
    duration: 1.2, 
    stagger: 0.15, 
    ease: "power4.out" 
});

// 6. CART FUNCTIONS
function updateCart() {
    cartCount++;
    const cartDisplay = document.getElementById('cart-count');
    cartDisplay.innerText = cartCount;
    
    // Visual feedback on the cart counter
    gsap.fromTo(cartDisplay, 
        { scale: 2, color: "#ffffff" }, 
        { scale: 1, color: "#ffffff", duration: 0.4 }
    );
}

function openCart() {
    if (cartCount === 0) {
        alert("SYSTEM MESSAGE: YOUR CART IS CURRENTLY EMPTY.");
    } else {
        alert("SYSTEM MESSAGE: " + cartCount + " UNITS ARCHIVED IN CART. PROCEED TO QUICK BUY FOR CHECKOUT.");
    }
}

// 7. MODAL & CHECKOUT LOGIC
function openModal() {
    document.getElementById('payment-modal').style.display = 'flex';
    // Smooth fade in for modal content
    gsap.from(".checkout-box", { opacity: 0, y: 20, duration: 0.5 });
}

function closeModal() {
    document.getElementById('payment-modal').style.display = 'none';
}

function processPayment() {
    const email = document.getElementById('user-email').value;
    const phone = document.getElementById('user-phone').value;

    // Amazon-style requirement check
    if(!email || !phone) {
        alert("CRITICAL ERROR: EMAIL AND PHONE DATA REQUIRED FOR DISPATCH.");
        return;
    }

    // High-end result display
    document.getElementById('modal-content').innerHTML = `
        <div style="padding: 20px 0;">
            <h1 style="font-size: 2.5rem; margin-bottom: 10px; color: #fff;">REQUEST ACCEPTED.</h1>
            <p style="color: #555; margin-bottom: 30px;">PROTOCOL: SECURE DISPATCH INITIALIZED</p>
            <div style="background: #fff; padding: 15px; display: inline-block; border-radius: 10px;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=ORDER-${Math.random()}" style="display: block;">
            </div>
            <p style="color: #888; font-size: 0.7rem; margin-top: 30px; letter-spacing: 2px;">SCAN TO COMPLETE TRANSACTION</p>
        </div>
    `;
}

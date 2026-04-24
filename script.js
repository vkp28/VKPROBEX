let isSignUp = true;
document.body.classList.add('scroll-gradient');

const panels = {
    game: { url: "gp.vkprex.cloud", sidebar: ["Console", "Mods", "Plugins", "Players", "Settings"], content: `<img src="game-panel.png" class="w-full h-full object-cover">` },
    web: { url: "smartweb.vkprex.cloud", sidebar: ["Files", "Databases", "SSL", "Email", "Installer"], content: `<img src="web-panel.png" class="w-full h-full object-cover">` },
    vps: { url: "vps.vkprex.cloud", sidebar: ["Reinstall", "SSH Keys", "Stats", "Firewall"], content: `<img src="vps-panel.png" class="w-full h-full object-cover">` },
    reseller: { url: "reseller.vkprex.cloud", sidebar: ["Clients", "Logs", "Profit", "Branding"], content: `<img src="reseller-panel.png" class="w-full h-full object-cover">` }
};

function toggleModal() { document.getElementById('loginModal').classList.toggle('hidden'); }

function toggleAuthMode() {
    isSignUp = !isSignUp;
    document.getElementById('modalTitle').innerText = isSignUp ? "Sign Up" : "Welcome Back";
    document.getElementById('submitBtn').innerText = isSignUp ? "Create Account" : "Login";
    document.getElementById('toggleBtn').innerText = isSignUp ? "Switch to Login" : "Switch to Sign Up";
}

document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    if (isSignUp) {
        localStorage.setItem(`vkp_rex_${email}`, pass);
        alert("VKP.REX Account Created!"); toggleAuthMode();
    } else {
        if (localStorage.getItem(`vkp_rex_${email}`) === pass) {
            localStorage.setItem('rex_session', 'active');
            localStorage.setItem('rex_email', email);
            enterDashboard(email);
        } else { alert("Access Denied: Incorrect credentials."); }
    }
});

function switchTab(type) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active-tab'));
    document.getElementById(`tab-${type}`).classList.add('active-tab');
    const data = panels[type];
    document.getElementById('urlBar').innerText = data.url;
    document.getElementById('panelView').innerHTML = data.content;
    document.getElementById('sidebar').innerHTML = data.sidebar.map(item => `
        <div class="sidebar-item">
            <span>${item}</span>
            <i class="fas fa-chevron-right text-[10px]"></i>
        </div>
    `).join('');
}

function enterDashboard(email) {
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('landingPage').classList.add('hidden');
    document.body.style.overflow = 'hidden'; 
    switchTab('game');
}

function logout() { localStorage.clear(); location.reload(); }

window.onload = () => { if (localStorage.getItem('rex_session') === 'active') enterDashboard(localStorage.getItem('rex_email')); };

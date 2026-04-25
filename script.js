let isSignUp = false;

function openAuth() { document.getElementById('authModal').classList.remove('hidden'); }
function closeModal() { document.getElementById('authModal').classList.add('hidden'); }

function toggleAuthMode() {
    isSignUp = !isSignUp;
    document.getElementById('authTitle').innerText = isSignUp ? "Register" : "Identity";
    document.getElementById('authName').classList.toggle('hidden', !isSignUp);
    document.getElementById('toggleText').innerText = isSignUp ? "Back to Login" : "Create Account";
}

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const pass = document.getElementById('authPass').value;

    if (isSignUp) {
        localStorage.setItem(email, JSON.stringify({ email, pass }));
        alert("Success. Please Log In."); toggleAuthMode();
    } else {
        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.pass === pass) {
            closeModal();
            document.getElementById('landingPage').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            initDashboard();
        } else { alert("Access Denied."); }
    }
});

function initDashboard() {
    document.getElementById('sidebar').innerHTML = `
        <div class="p-5 bg-white/5 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest">Instance Console</div>
        <div class="p-5 bg-white/5 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest">Secure Files</div>
        <div class="p-5 bg-white/5 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest">Database</div>
    `;
    document.getElementById('panelView').innerHTML = `
        <div class="opacity-10 flex flex-col items-center">
            <i class="fas fa-terminal text-7xl mb-6"></i>
            <h2 class="text-3xl font-black uppercase italic tracking-[0.4em]">Node Online</h2>
        </div>
    `;
}

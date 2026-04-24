let isSignUp = true;

function toggleModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.toggle('hidden');
    document.getElementById('authError').classList.add('hidden');
}

function toggleAuthMode() {
    isSignUp = !isSignUp;
    const title = document.getElementById('modalTitle');
    const sub = document.getElementById('modalSub');
    const btn = document.getElementById('submitBtn');
    const toggleText = document.getElementById('toggleText');
    const toggleBtn = document.getElementById('toggleBtn');

    if (isSignUp) {
        title.innerText = "Join VKP.REX";
        sub.innerText = "Secure your spot in the cloud.";
        btn.innerText = "Sign Up";
        toggleText.innerText = "Already a member?";
        toggleBtn.innerText = "Login";
    } else {
        title.innerText = "Access Rex Panel";
        sub.innerText = "Authorized access only.";
        btn.innerText = "Login";
        toggleText.innerText = "New to the realm?";
        toggleBtn.innerText = "Sign Up";
    }
}

document.getElementById('authForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const errorEl = document.getElementById('authError');

    if (isSignUp) {
        // Save to browser memory
        localStorage.setItem(`vkp_rex_user_${email}`, pass);
        alert("VKP.REX Account Created! You can now Login.");
        toggleAuthMode();
    } else {
        // Check browser memory
        const savedPass = localStorage.getItem(`vkp_rex_user_${email}`);

        if (savedPass === null) {
            errorEl.innerText = "Rex ID not found. Please Sign Up.";
            errorEl.classList.remove('hidden');
        } else if (pass === savedPass) {
            localStorage.setItem('rex_session', 'active');
            localStorage.setItem('rex_user_email', email);
            enterDashboard(email);
        } else {
            errorEl.innerText = "Invalid Rex Password!";
            errorEl.classList.remove('hidden');
        }
    }
});

function enterDashboard(email) {
    document.getElementById('welcomeUser').innerText = `Welcome, ${email}`;
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('loginModal').classList.add('hidden');
    document.body.style.overflow = 'hidden'; 
}

window.onload = () => {
    const session = localStorage.getItem('rex_session');
    const email = localStorage.getItem('rex_user_email');
    if (session === 'active' && email) {
        enterDashboard(email);
    }
};

function logout() {
    localStorage.removeItem('rex_session');
    localStorage.removeItem('rex_user_email');
    location.reload();
}

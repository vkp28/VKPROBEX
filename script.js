let isSignUp = false;

// SMOOTH SCROLL FOR EXPLORE BUTTON
function scrollToSolutions() {
    document.getElementById('solutions-grid').scrollIntoView({ behavior: 'smooth' });
}

// MODAL CONTROLS
function openAuth() { 
    document.getElementById('authModal').classList.remove('hidden'); 
}

function closeModal() { 
    document.getElementById('authModal').classList.add('hidden'); 
}

function toggleAuthMode() {
    isSignUp = !isSignUp;
    document.getElementById('authTitle').innerText = isSignUp ? "Sign Up" : "Identity";
    document.getElementById('authName').classList.toggle('hidden', !isSignUp);
    document.getElementById('toggleText').innerText = isSignUp ? "Back to Login" : "Create Account";
}

// AUTHENTICATION LOGIC
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('authEmail').value;
    const pass = document.getElementById('authPass').value;

    if (isSignUp) {
        localStorage.setItem(email, JSON.stringify({ email, pass }));
        alert("Registration Successful. Please Login."); 
        toggleAuthMode();
    } else {
        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.pass === pass) {
            closeModal();
            document.getElementById('landingPage').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
        } else { 
            alert("Critical Error: Unauthorized Access."); 
        }
    }
});

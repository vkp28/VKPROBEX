let isSignUp = false;

// Open/Close Auth Modal
function openAuth() {
    document.getElementById('authModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('authModal').classList.add('hidden');
}

// Toggle between Login and Sign Up
function toggleAuthMode() {
    isSignUp = !isSignUp;
    document.getElementById('authTitle').innerText = isSignUp ? "Create Identity" : "Login";
    document.getElementById('toggleText').innerText = isSignUp ? "Already Registered? Login" : "New Account? Sign Up";
    document.getElementById('authName').classList.toggle('hidden', !isSignUp);
    
    // Reset name field if switching to login
    if (!isSignUp) document.getElementById('authName').value = "";
}

// Handle Auth Logic
document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('authName').value;
    const email = document.getElementById('authEmail').value;
    const pass = document.getElementById('authPass').value;

    if (isSignUp) {
        // Save unique user data (locked to email)
        const userData = { name, email, pass };
        localStorage.setItem(email, JSON.stringify(userData));
        alert("Identity logged into local database. Please proceed to login.");
        toggleAuthMode();
    } else {
        // Verification logic
        const storedData = localStorage.getItem(email);
        if (storedData) {
            const user = JSON.parse(storedData);
            if (user.pass === pass) {
                alert("Welcome, " + (user.name || "Operator") + ". Session initialized.");
                closeModal();
            } else {
                alert("Error: Verification failed. Invalid password.");
            }
        } else {
            alert("Error: No record found for this email address.");
        }
    }
});

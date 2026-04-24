function toggleModal() {
    document.getElementById('loginModal').classList.toggle('hidden');
}

// Check login status on page load
if (localStorage.getItem('userSession') === 'active') {
    document.getElementById('dashboard').classList.remove('hidden');
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    // Static check (Change these to whatever you want)
    if(email === "admin@ateex.com" && pass === "12345") {
        localStorage.setItem('userSession', 'active');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('loginModal').classList.add('hidden');
    } else {
        document.getElementById('errorMsg').classList.remove('hidden');
    }
});

function logout() {
    localStorage.removeItem('userSession');
    location.reload();
}

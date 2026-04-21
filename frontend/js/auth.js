function isLoggedIn() {
    return !!localStorage.getItem('token');
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}

function showError(msg) {
    const el = document.getElementById('error-msg');
    const text = document.getElementById('error-text');
    if (el && text) {
        text.textContent = msg;
        el.classList.remove('hidden');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const data = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', data.token);
        window.location.href = 'dashboard.html';
    } catch (err) {
        showError(err.data?.errors?.[0]?.msg || err.data?.error || 'Klaida');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (isLoggedIn() && window.location.pathname.includes('index')) {
        window.location.href = 'dashboard.html';
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});

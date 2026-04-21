const params = new URLSearchParams(window.location.search);
const editId = params.get('id');

document.addEventListener('DOMContentLoaded', () => {
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }

    if (editId) {
        document.getElementById('form-title').setAttribute('data-i18n', 'editSubscription');
        document.getElementById('form-title').textContent = t('editSubscription');
        loadSubscription(editId);
    }

    document.getElementById('subscription-form').addEventListener('submit', handleSubmit);
});

async function loadSubscription(id) {
    try {
        const data = await api.get(`/subscriptions/${id}`);
        document.getElementById('name').value = data.name;
        document.getElementById('category').value = data.category;
        document.getElementById('price').value = data.price;
        document.getElementById('currency').value = data.currency;
        document.getElementById('billing_cycle').value = data.billing_cycle;
        document.getElementById('next_payment_date').value = data.next_payment_date.split('T')[0];
        document.getElementById('is_active').checked = data.is_active === 1;
        document.getElementById('notes').value = data.notes || '';
    } catch (err) {
        showError(t('errorGeneral'));
    }
}

async function handleSubmit(e) {
    e.preventDefault();

    const body = {
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        price: parseFloat(document.getElementById('price').value),
        currency: document.getElementById('currency').value,
        billing_cycle: document.getElementById('billing_cycle').value,
        next_payment_date: document.getElementById('next_payment_date').value,
        is_active: document.getElementById('is_active').checked ? 1 : 0,
        notes: document.getElementById('notes').value || null
    };

    try {
        if (editId) {
            await api.put(`/subscriptions/${editId}`, body);
        } else {
            await api.post('/subscriptions', body);
        }
        window.location.href = 'dashboard.html';
    } catch (err) {
        const msg = err.data?.errors?.[0]?.msg || err.data?.error || t('errorGeneral');
        showError(msg);
    }
}

function showError(msg) {
    const el = document.getElementById('error-msg');
    const text = document.getElementById('error-text');
    el.classList.remove('hidden');
    text.textContent = msg;
}

document.addEventListener('DOMContentLoaded', () => {
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    loadStats();
    loadUpcoming();
    loadSubscriptions();
});

function onLangChange() {
    loadUpcoming();
    loadSubscriptions();
}

async function loadStats() {
    try {
        const data = await api.get('/stats');
        document.getElementById('stat-active').textContent = data.active;
        document.getElementById('stat-monthly').textContent = data.monthly_cost;
    } catch (err) {
        showMsg(t('errorGeneral'));
    }
}

async function loadUpcoming() {
    try {
        const data = await api.get('/subscriptions/upcoming?days=7');
        const list = document.getElementById('upcoming-list');
        list.innerHTML = '';

        if (data.length === 0) {
            list.innerHTML = '<li>-</li>';
            return;
        }

        data.forEach(sub => {
            const li = document.createElement('li');
            li.textContent = `${sub.name} — ${formatDate(sub.next_payment_date)} (${sub.price} ${sub.currency})`;
            list.appendChild(li);
        });
    } catch (err) {
        showMsg(t('errorGeneral'));
    }
}

async function loadSubscriptions() {
    const category = document.getElementById('filter-category').value;
    const active = document.getElementById('filter-active').value;
    const sort = document.getElementById('filter-sort').value;

    let endpoint = '/subscriptions?';
    if (category) endpoint += `category=${category}&`;
    if (active !== '') endpoint += `active=${active}&`;
    if (sort) endpoint += `sort=${sort}`;

    try {
        const data = await api.get(endpoint);
        const container = document.getElementById('subscriptions-list');
        container.innerHTML = '';

        if (data.length === 0) {
            container.innerHTML = `<p>${t('noSubscriptions')}</p>`;
            return;
        }

        data.forEach(sub => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p>
                    <strong>${sub.name}</strong> — ${sub.category} — ${sub.price} ${sub.currency} / ${t(sub.billing_cycle)}
                    <br>
                    ${t('nextPayment')}: ${formatDate(sub.next_payment_date)}
                    ${sub.is_active ? '' : ' [' + t('inactive') + ']'}
                    <br>
                    <a href="subscription-form.html?id=${sub.id}">${t('edit')}</a>
                    <button onclick="deleteSubscription(${sub.id})">${t('delete')}</button>
                </p>
                <hr>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        showMsg(t('errorGeneral'));
    }
}

async function deleteSubscription(id) {
    if (!confirm(t('confirmDelete'))) return;

    try {
        await api.delete(`/subscriptions/${id}`);
        showMsg(t('successDeleted'));
        loadStats();
        loadSubscriptions();
    } catch (err) {
        showMsg(t('errorGeneral'));
    }
}

function showMsg(msg) {
    const el = document.getElementById('msg');
    el.textContent = msg;
    setTimeout(() => { el.textContent = ''; }, 3000);
}

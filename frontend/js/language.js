function getLang() {
    return localStorage.getItem('lang') || 'lt';
}

function setLang(lang) {
    localStorage.setItem('lang', lang);
    applyTranslations();
    if (typeof onLangChange === 'function') onLangChange();
}

function t(key) {
    const lang = getLang();
    return translations[lang]?.[key] || translations['lt'][key] || key;
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString(getLang() === 'lt' ? 'lt-LT' : 'en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
}

document.addEventListener('DOMContentLoaded', applyTranslations);

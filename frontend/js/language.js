function getLang() {
    return localStorage.getItem('lang') || 'lt';
}

function setLang(lang) {
    localStorage.setItem('lang', lang);
    applyTranslations();
}

function t(key) {
    const lang = getLang();
    return translations[lang]?.[key] || translations['lt'][key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
}

document.addEventListener('DOMContentLoaded', applyTranslations);

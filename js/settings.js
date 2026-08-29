function changeLanguageSafe(lang) {
            localStorage.setItem('cod_lang', lang);
            const botSel = document.getElementById('settings-lang-dropdown');
            if (botSel) botSel.value = lang;
            const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : translations['en'];
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (t && t[key]) el.textContent = t[key];
            });
            const placeholderBox = document.getElementById('result-placeholder-box');
            if (placeholderBox && t['report_placeholder']) placeholderBox.textContent = t['report_placeholder'];
            const heroPlaceholder = document.getElementById('hero-report-placeholder');
            if (heroPlaceholder && t['hero_report_placeholder']) heroPlaceholder.textContent = t['hero_report_placeholder'];
        }
function setTheme(themeClass) { document.body.className = `app-layout ${themeClass}`; localStorage.setItem('cod_theme', themeClass); }
function renewSubscription() { alert("Redirecting to secure subscription renewal gateway..."); }
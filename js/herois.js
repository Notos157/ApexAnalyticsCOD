let heroState = { cur: { 1: 0, 2: 0, 3: 0, 4: 0 }, target: { 1: 0, 2: 0, 3: 0, 4: 0 } };

// Tabela de custos acumulados exata baseada na imagem enviada (Lendário e Épico)
const cumulativeCosts = {
    legendary: [0, 10, 20, 35, 50, 80, 110, 150, 190, 235, 280, 330, 380, 455, 530, 610, 690],
    epic: [0, 10, 20, 30, 50, 70, 90, 110, 140, 170, 200, 230, 270, 310, 350, 390, 440]
};

function setSkillLevel(skillIndex, type, level) {
    if (heroState[type][skillIndex] === level) { 
        heroState[type][skillIndex] = 0; 
    } else { 
        heroState[type][skillIndex] = level; 
    }
    
    const trackContainer = document.getElementById(`track-${type}-${skillIndex}`);
    trackContainer.querySelectorAll('.pill-btn').forEach((btn, idx) => {
        const btnLevel = idx + 1;
        btn.classList.remove('current-active', 'target-active');
        if (btnLevel === heroState[type][skillIndex]) {
            if (type === 'cur') btn.classList.add('current-active');
            else btn.classList.add('target-active');
        }
    });
    updateLiveHeroSummary();
}

function updateLiveHeroSummary() {}

function runHeroAudit() {
    const rarity = document.getElementById('hero-rarity').value;
    const costTable = cumulativeCosts[rarity] || cumulativeCosts.legendary;

    // Conversão direta do nível da habilidade (1 a 5) para a quantidade de melhorias somadas
    // Nível 1 = 0 melhorias gastas, Nível 5 = 4 melhorias gastas por habilidade.
    let cur1 = heroState.cur[1] > 0 ? heroState.cur[1] - 1 : 0;
    let cur2 = heroState.cur[2] > 0 ? heroState.cur[2] - 1 : 0;
    let cur3 = heroState.cur[3] > 0 ? heroState.cur[3] - 1 : 0;
    let cur4 = heroState.cur[4] > 0 ? heroState.cur[4] - 1 : 0;
    
    let target1 = heroState.target[1] > 0 ? heroState.target[1] - 1 : 0;
    let target2 = heroState.target[2] > 0 ? heroState.target[2] - 1 : 0;
    let target3 = heroState.target[3] > 0 ? heroState.target[3] - 1 : 0;
    let target4 = heroState.target[4] > 0 ? heroState.target[4] - 1 : 0;

    let currentGlobalUpgrades = cur1 + cur2 + cur3 + cur4;
    let targetGlobalUpgrades = target1 + target2 + target3 + target4;
    
    if (targetGlobalUpgrades < currentGlobalUpgrades) {
        targetGlobalUpgrades = currentGlobalUpgrades;
    }

    let totalMissing = costTable[targetGlobalUpgrades] - costTable[currentGlobalUpgrades];
    
    const currentLang = localStorage.getItem('cod_lang') || 'en';
    const t = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : {};
    
    document.getElementById('audit-total-missing').textContent = `${totalMissing} ${t.hero_tokens_suffix || 'Fichas'}`;
    document.getElementById('audit-rarity-desc').textContent = `${t.hero_audit_desc || 'Custo apurado'} (${rarity === 'epic' ? (t.hero_opt_epic || 'Épico') : (t.hero_opt_legendary || 'Lendário')}).`;
    document.getElementById('hero-report-container').style.display = 'block';
    document.getElementById('hero-report-placeholder').style.display = 'none';
}

function clearHeroAudit() {
    for (let i = 1; i <= 4; i++) {
        heroState.cur[i] = 0; 
        heroState.target[i] = 0;
        document.querySelectorAll(`#track-cur-${i} .pill-btn, #track-target-${i} .pill-btn`).forEach(b => b.classList.remove('current-active', 'target-active'));
    }
    document.getElementById('hero-report-container').style.display = 'none';
    document.getElementById('hero-report-placeholder').style.display = 'block';
}
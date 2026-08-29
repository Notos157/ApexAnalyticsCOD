function calculateTroopsCustom() {
    const baseWood = parseCleanNumber('base-wood');
    const baseOre = parseCleanNumber('base-ore');
    const baseMana = parseCleanNumber('base-mana');
    const baseGold = parseCleanNumber('base-gold');
    const baseTimeSec = parseFloat(document.getElementById('base-time-seconds').value) || 0;
    const targetAmount = parseCleanNumber('troop-amount');
    const stoneBuff = parseFloat(document.getElementById('buff-stone-percent').value) || 0;
    const kingdomBuff = document.getElementById('buff-kingdom').checked ? 15 : 0;

    const totalWood = baseWood * targetAmount;
    const totalOre = baseOre * targetAmount;
    const totalMana = baseMana * targetAmount;
    const totalGold = baseGold * targetAmount;
    const totalBaseSeconds = baseTimeSec * targetAmount;
    const finalSeconds = totalBaseSeconds / (1 + ((stoneBuff + kingdomBuff) / 100));
    const savedSeconds = totalBaseSeconds - finalSeconds; // Tempo economizado

    // Sistema de tradução seguro com fallback para português
    const currentLang = localStorage.getItem('cod_lang') || 'pt';
    const t = (typeof translations !== 'undefined' && translations[currentLang]) ? translations[currentLang] : {};

    const lblTarget = t.target_recruitment || 'Recrutamento Alvo:';
    const lblUnits = t.res_units || 'unidades';
    const lblTotalRes = t.total_resources_needed || 'Total de Recursos Necessários:';
    const lblWood = t.res_wood || 'Madeira';
    const lblOre = t.res_ore || 'Minério';
    const lblMana = t.res_mana || 'Mana';
    const lblGold = t.res_gold || 'Ouro';
    const lblFinalTime = t.final_training_time || 'Tempo Final de Treinamento:';
    const lblTimeNoBuffs = t.time_without_buffs || 'Tempo sem buffs:';

    document.getElementById('troop-results').innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <div class="result-group">
                <h4 style="color: #a78bfa; margin-bottom: 5px; font-size: 0.95rem;">${lblTarget}</h4>
                <p style="color: #fff; font-size: 1.2rem; font-weight: bold;">${formatNumber(targetAmount)} ${lblUnits}</p>
            </div>
            
            <div class="result-group">
                <h4 style="color: #a78bfa; margin-bottom: 10px; font-size: 0.95rem;">${lblTotalRes}</h4>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px; color: #d1d5db; font-size: 0.95rem; padding: 0; margin: 0;">
                    <li><span>${lblWood}</span>: <strong style="color: #fff; float: right;">${formatNumber(totalWood)}</strong></li>
                    <li><span>${lblOre}</span>: <strong style="color: #fff; float: right;">${formatNumber(totalOre)}</strong></li>
                    <li><span>${lblMana}</span>: <strong style="color: #fff; float: right;">${formatNumber(totalMana)}</strong></li>
                    <li><span>${lblGold}</span>: <strong style="color: #fff; float: right;">${formatNumber(totalGold)}</strong></li>
                </ul>
            </div>

            <div class="result-group">
                <h4 style="color: #a78bfa; margin-bottom: 5px; font-size: 0.95rem;">${lblFinalTime}</h4>
                <p style="font-size: 1.5rem; font-weight: bold; color: #34d399; margin-bottom: 8px;">${formatTime(finalSeconds)}</p>
                <p style="font-size: 0.8rem; color: #9ca3af; margin-bottom: 8px;"><span>${lblTimeNoBuffs}</span> <span style="text-decoration: line-through;">${formatTime(totalBaseSeconds)}</span></p>
                
                <!-- Área de destaque do Tempo Economizado -->
                <div style="background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.3); padding: 10px 12px; border-radius: 8px; margin-top: 8px;">
                    <span style="font-size: 0.85rem; color: #34d399; display: block; font-weight: bold;">⚡ Tempo Economizado com Buffs:</span>
                    <span style="font-size: 1.1rem; color: #fff; font-weight: bold;">${formatTime(savedSeconds)}</span>
                </div>
            </div>
        </div>`;
}

// Função para limpar o formulário e resetar o painel de resultados
function clearTroopsForm() {
    document.getElementById('base-wood').value = '';
    document.getElementById('base-ore').value = '';
    document.getElementById('base-mana').value = '';
    document.getElementById('base-gold').value = '';
    document.getElementById('base-time-seconds').value = '';
    document.getElementById('troop-amount').value = '';
    document.getElementById('buff-stone-percent').selectedIndex = 0;
    document.getElementById('buff-kingdom').checked = false;

    document.getElementById('troop-results').innerHTML = `
        <div id="result-placeholder-box" class="result-group" style="text-align: center; color: #6b7280; font-style: italic; padding: 40px 20px;" data-i18n="report_placeholder">
            Preencha os parâmetros à esquerda e clique no botão de cálculo para gerar o relatório estratégico completo.
        </div>`;
}

// Funções Utilitárias Globais
function parseCleanNumber(elementId) {
    const el = document.getElementById(elementId);
    if (!el || !el.value) return 0;
    return parseFloat(el.value.replace(/\./g, '').replace(',', '.')) || 0;
}

function applyNumberMask(input) {
    let value = input.value.replace(/\D/g, '');
    if (value !== '') {
        value = Number(value).toLocaleString('pt-BR');
    }
    input.value = value;
}

function formatNumber(num) {
    if (isNaN(num)) return '0';
    return Math.round(num).toLocaleString('pt-BR');
}

function formatTime(totalSeconds) {
    if (isNaN(totalSeconds) || totalSeconds <= 0) return '0s';
    
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    let result = '';
    if (days > 0) result += `${days}d `;
    if (hours > 0 || days > 0) result += `${hours}h `;
    if (minutes > 0 || hours > 0 || days > 0) result += `${minutes}m `;
    result += `${seconds}s`;

    return result.trim();
}
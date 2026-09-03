const buildingCumulativeCosts = [0, 2, 7, 15, 30, 50, 80, 120, 170, 240, 320, 420, 545, 695, 995, 1495, 2195, 3095, 4295, 5795, 7595, 9595, 12095, 15095, 20095];

function initTreatiesArrowsSelects() {
    const curT = document.getElementById('tf-treaty-cur');
    const targetT = document.getElementById('tf-treaty-target');
    const curA = document.getElementById('tf-arrow-cur');
    const targetA = document.getElementById('tf-arrow-target');
    
    if(!curT) return;
    
    let optionsHtml = '';
    for(let i=1; i<=25; i++) {
        optionsHtml += `<option value="${i}">Nível ${i}</option>`;
    }
    curT.innerHTML = optionsHtml;
    targetT.innerHTML = optionsHtml;
    curA.innerHTML = optionsHtml;
    targetA.innerHTML = optionsHtml;
    
    targetT.value = "25";
    targetA.value = "25";
}

function calculateTreatiesArrows() {
    const curTreaty = parseInt(document.getElementById('tf-treaty-cur').value) || 1;
    const targetTreaty = parseInt(document.getElementById('tf-treaty-target').value) || 1;
    const curArrow = parseInt(document.getElementById('tf-arrow-cur').value) || 1;
    const targetArrow = parseInt(document.getElementById('tf-arrow-target').value) || 1;

    // Custo máximo total para o nível 25 (índice 24)
    const maxItemCost = buildingCumulativeCosts[24];
    
    // Tratados
    let treatyNeeded = 0;
    if (targetTreaty > curTreaty) {
        treatyNeeded = buildingCumulativeCosts[targetTreaty - 1] - buildingCumulativeCosts[curTreaty - 1];
    }
    const treatyGems = treatyNeeded * 10;

    // Flechas
    let arrowNeeded = 0;
    if (targetArrow > curArrow) {
        arrowNeeded = buildingCumulativeCosts[targetArrow - 1] - buildingCumulativeCosts[curArrow - 1];
    }
    const arrowGems = arrowNeeded * 10;

    // Atualiza os textos dos valores faltantes
    document.getElementById('tf-treaty-missing').innerHTML = `${formatNumber(treatyNeeded)} <span style="font-size: 0.7rem; color: #94a3b8; font-weight: normal;">un</span>`;
    document.getElementById('tf-treaty-gems').textContent = `💎 ${formatNumber(treatyGems)} Gemas`;

    document.getElementById('tf-arrow-missing').innerHTML = `${formatNumber(arrowNeeded)} <span style="font-size: 0.7rem; color: #94a3b8; font-weight: normal;">un</span>`;
    document.getElementById('tf-arrow-gems').textContent = `💎 ${formatNumber(arrowGems)} Gemas`;

    // Porcentagem individual baseada estritamente no NÍVEL ATUAL em relação ao máximo (Nível 25)
    const treatyInvested = buildingCumulativeCosts[curTreaty - 1];
    let treatyPercent = Math.round((treatyInvested / maxItemCost) * 100);
    if (treatyPercent > 100) treatyPercent = 100;
    if (isNaN(treatyPercent)) treatyPercent = 0;

    const arrowInvested = buildingCumulativeCosts[curArrow - 1];
    let arrowPercent = Math.round((arrowInvested / maxItemCost) * 100);
    if (arrowPercent > 100) arrowPercent = 100;
    if (isNaN(arrowPercent)) arrowPercent = 0;

    // Circunferência exata baseada em r = 70 (2 * pi * 70 = 439.82)
    const circumference = 439.8;

    // Atualiza UI Tratados
    document.getElementById('tf-treaty-percent').textContent = `${treatyPercent}%`;
    const treatyCircle = document.getElementById('tf-ring-treaty');
    if (treatyCircle) {
        const offset = circumference - (treatyPercent / 100) * circumference;
        treatyCircle.style.strokeDashoffset = offset;
    }

    // Atualiza UI Flechas
    document.getElementById('tf-arrow-percent').textContent = `${arrowPercent}%`;
    const arrowCircle = document.getElementById('tf-ring-arrow');
    if (arrowCircle) {
        const offset = circumference - (arrowPercent / 100) * circumference;
        arrowCircle.style.strokeDashoffset = offset;
    }
}

function clearTreatiesArrows() {
    document.getElementById('tf-treaty-cur').value = "1";
    document.getElementById('tf-treaty-target').value = "25";
    document.getElementById('tf-arrow-cur').value = "1";
    document.getElementById('tf-arrow-target').value = "25";
    calculateTreatiesArrows();
}

window.addEventListener('DOMContentLoaded', () => {
    initTreatiesArrowsSelects();
    calculateTreatiesArrows();
});
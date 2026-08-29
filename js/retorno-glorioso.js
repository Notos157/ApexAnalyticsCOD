function calculateGloriousReturn() {
    const totalTroopsInput = parseCleanNumber('glorious-troops-input');
    
    const sizePromo1 = 10000;
    const totalLotes = Math.ceil(totalTroopsInput / sizePromo1);
    const totalTroops = totalLotes * sizePromo1;
    
    const limitPromo1 = 20; 
    const costPromo1 = 300;
    const costPromo2 = 600;

    let remainingLotes = totalLotes;
    let promo1Lotes = 0;
    let promo2Lotes = 0;

    if (remainingLotes <= limitPromo1) {
        promo1Lotes = remainingLotes;
        remainingLotes = 0;
    } else {
        promo1Lotes = limitPromo1;
        remainingLotes -= limitPromo1;
    }

    promo2Lotes = remainingLotes;

    const promo1Troops = promo1Lotes * sizePromo1;
    const promo2Troops = promo2Lotes * sizePromo1;

    const cost1 = promo1Lotes * costPromo1;
    const cost2 = promo2Lotes * costPromo2;
    const totalGems = cost1 + cost2;

    document.getElementById('glor-res-total-gems').textContent = `${formatNumber(totalGems)} 💎`;
    document.getElementById('glor-res-promo1').innerHTML = `${formatNumber(promo1Troops)} <span style="font-size: 0.8rem; color: #94a3b8; font-weight: normal;">tropas (${formatNumber(cost1)} gemas)</span>`;
    document.getElementById('glor-res-promo2').innerHTML = `${formatNumber(promo2Troops)} <span style="font-size: 0.8rem; color: #94a3b8; font-weight: normal;">tropas (${formatNumber(cost2)} gemas)</span>`;

    let breakdownText = `Calculado com sucesso para pacotes de 10.000 tropas (baseado em ${formatNumber(totalTroopsInput)} informadas).`;
    if (totalLotes > limitPromo1) {
        breakdownText = `Limite de 20 lotes da 1ª promoção atingido. O excedente foi contado automaticamente na 2ª promoção (600 gemas por lote).`;
    }
    document.getElementById('glor-res-breakdown').textContent = breakdownText;

    document.getElementById('glorious-results-container').style.display = 'flex';
}

function resetGloriousReturn() {
    document.getElementById('glorious-troops-input').value = '';
    document.getElementById('glorious-results-container').style.display = 'none';
}
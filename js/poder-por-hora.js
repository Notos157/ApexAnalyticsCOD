function getTimeInHours(daysId, hoursId, minutesId) {
    const days = parseCleanNumber(daysId) || 0;
    const hours = parseCleanNumber(hoursId) || 0;
    const minutes = parseCleanNumber(minutesId) || 0;

    return (days * 24) + hours + (minutes / 60);
}

function calculatePowerHour() {
    const powerA = parseCleanNumber('poh-power-a');
    const hoursA = getTimeInHours('poh-days-a', 'poh-hours-a', 'poh-minutes-a');

    const powerB = parseCleanNumber('poh-power-b');
    const hoursB = getTimeInHours('poh-days-b', 'poh-hours-b', 'poh-minutes-b');

    const powerPerHourA = hoursA > 0 ? powerA / hoursA : 0;
    const powerPerHourB = hoursB > 0 ? powerB / hoursB : 0;

    document.getElementById('poh-res-a').textContent = formatNumber(powerPerHourA);
    document.getElementById('poh-res-b').textContent = formatNumber(powerPerHourB);

    // Determinar o vencedor e porcentagem de diferença
    const winnerTitle = document.getElementById('poh-winner-title');
    const winnerDesc = document.getElementById('poh-winner-desc');
    const diffPercentEl = document.getElementById('poh-diff-percent');

    if (powerPerHourA > powerPerHourB) {
        winnerTitle.textContent = "Opção A é a melhor!";
        winnerDesc.textContent = "Ela gera mais poder por hora do que a Opção B.";
        const diff = powerPerHourB > 0
            ? ((powerPerHourA - powerPerHourB) / powerPerHourB) * 100
            : 100;
        diffPercentEl.textContent = `${Math.round(diff)}%`;
    } else if (powerPerHourB > powerPerHourA) {
        winnerTitle.textContent = "Opção B é a melhor!";
        winnerDesc.textContent = "Ela gera mais poder por hora do que a Opção A.";
        const diff = powerPerHourA > 0
            ? ((powerPerHourB - powerPerHourA) / powerPerHourA) * 100
            : 100;
        diffPercentEl.textContent = `${Math.round(diff)}%`;
    } else {
        winnerTitle.textContent = "Empate técnico!";
        winnerDesc.textContent = "Ambas as opções geram o mesmo poder por hora.";
        diffPercentEl.textContent = "0%";
    }

    document.getElementById('poh-main-result-box').style.display = 'flex';
}

function resetPowerHour() {
    document.getElementById('poh-power-a').value = '';
    document.getElementById('poh-days-a').value = '';
    document.getElementById('poh-hours-a').value = '';
    document.getElementById('poh-minutes-a').value = '';
    document.getElementById('poh-res-a').textContent = '0';

    document.getElementById('poh-power-b').value = '';
    document.getElementById('poh-days-b').value = '';
    document.getElementById('poh-hours-b').value = '';
    document.getElementById('poh-minutes-b').value = '';
    document.getElementById('poh-res-b').textContent = '0';

    document.getElementById('poh-main-result-box').style.display = 'none';
}

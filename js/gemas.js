function calculateGemsPanel() {
            const currentGems = parseCleanNumber('gem-current');
            const gainPerDay = parseCleanNumber('gem-gain-day');
            const spendPerDay = parseCleanNumber('gem-spend-day');
            const targetGems = parseCleanNumber('gem-target');
            const days = parseCleanNumber('gem-days');

            const netPerDay = gainPerDay - spendPerDay;
            const totalGain = gainPerDay * days;
            const totalSpend = spendPerDay * days;
            const finalGems = currentGems + (netPerDay * days);
            
            const missingGems = Math.max(0, targetGems - finalGems);
            
            let daysNeeded = 0;
            if (netPerDay > 0 && currentGems < targetGems) {
                daysNeeded = Math.ceil((targetGems - currentGems) / netPerDay);
            } else if (currentGems >= targetGems) {
                daysNeeded = 0;
            } else {
                daysNeeded = 999;
            }

            let percentage = targetGems > 0 ? Math.round((finalGems / targetGems) * 100) : 0;
            if (percentage > 100) percentage = 100;
            if (percentage < 0) percentage = 0;

            // Atualiza UI dos Cards Principais
            document.getElementById('res-final-gems').innerHTML = `${formatNumber(finalGems)} <span style="font-size: 1.2rem;">💎</span>`;
            document.getElementById('res-missing-gems').innerHTML = `${formatNumber(missingGems)} <span style="font-size: 1rem;">💎</span>`;
            document.getElementById('res-percent-label').textContent = `${percentage}%`;
            document.getElementById('res-progress-bar').style.width = `${percentage}%`;

            // Atualiza Círculo SVG de Progresso
            document.getElementById('gem-ring-percent').textContent = `${percentage}%`;
            const circle = document.getElementById('gem-ring-progress');
            if (circle) {
                const circumference = 440;
                const offset = circumference - (percentage / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }

            // Métricas secundárias
            document.getElementById('res-net-day').innerHTML = `${formatNumber(netPerDay)} <span style="color: #fbbf24; font-size: 0.9rem;">💎</span>`;
            document.getElementById('res-days-needed').innerHTML = `${daysNeeded === 999 ? '∞' : daysNeeded} <span style="font-size: 0.9rem;">📅</span>`;
            document.getElementById('res-target-display').innerHTML = `${formatNumber(targetGems)} <span style="color: #fbbf24; font-size: 0.9rem;">💎</span>`;

            // Resumo inferior consolidado
            document.getElementById('sum-current').textContent = `${formatNumber(currentGems)} 💎`;
            document.getElementById('sum-period-label').textContent = `Ganho total (${days} dias)`;
            document.getElementById('sum-total-gain').textContent = `${formatNumber(totalGain)} 💎`;
            document.getElementById('sum-gain-rate').textContent = `(${formatNumber(gainPerDay)}/dia)`;
            
            document.getElementById('sum-spend-label').textContent = `Gastos total (${days} dias)`;
            document.getElementById('sum-total-spend').textContent = `${formatNumber(totalSpend)} 💎`;
            document.getElementById('sum-spend-rate').textContent = `(${formatNumber(spendPerDay)}/dia)`;
            
            const finalBalEl = document.getElementById('sum-final-balance');
            finalBalEl.textContent = `${formatNumber(finalGems)} 💎`;
            finalBalEl.style.color = finalGems >= targetGems ? '#34d399' : '#f87171';

            // Torna visível a seção do relatório analítico de resultados
            document.getElementById('gem-results-container').style.display = 'flex';
        }
function resetGemsPanel() {
            document.getElementById('gem-current').value = '0';
            document.getElementById('gem-gain-day').value = '0';
            document.getElementById('gem-spend-day').value = '0';
            document.getElementById('gem-target').value = '0';
            document.getElementById('gem-days').value = '0';
            document.getElementById('gem-results-container').style.display = 'none';
        }

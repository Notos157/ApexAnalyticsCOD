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

            const maxTotal = buildingCumulativeCosts[24] * 2;
            
            let treatyNeeded = 0;
            if (targetTreaty > curTreaty) {
                treatyNeeded = buildingCumulativeCosts[targetTreaty - 1] - buildingCumulativeCosts[curTreaty - 1];
            }
            const treatyGems = treatyNeeded * 10;

            let arrowNeeded = 0;
            if (targetArrow > curArrow) {
                arrowNeeded = buildingCumulativeCosts[targetArrow - 1] - buildingCumulativeCosts[curArrow - 1];
            }
            const arrowGems = arrowNeeded * 10;

            document.getElementById('tf-treaty-missing').innerHTML = `${formatNumber(treatyNeeded)} <span style="font-size: 0.7rem; color: #94a3b8; font-weight: normal;">un</span>`;
            document.getElementById('tf-treaty-gems').textContent = `💎 ${formatNumber(treatyGems)} Gemas`;

            document.getElementById('tf-arrow-missing').innerHTML = `${formatNumber(arrowNeeded)} <span style="font-size: 0.7rem; color: #94a3b8; font-weight: normal;">un</span>`;
            document.getElementById('tf-arrow-gems').textContent = `💎 ${formatNumber(arrowGems)} Gemas`;

            const currentInvested = buildingCumulativeCosts[curTreaty - 1] + buildingCumulativeCosts[curArrow - 1];
            let percentage = Math.round((currentInvested / maxTotal) * 100);
            if (percentage > 100) percentage = 100;
            if (isNaN(percentage)) percentage = 0;

            document.getElementById('tf-total-percent').textContent = `${percentage}%`;

            const circle = document.getElementById('tf-ring-progress');
            if (circle) {
                const circumference = 440;
                const offset = circumference - (percentage / 100) * circumference;
                circle.style.strokeDashoffset = offset;
            }
        }
function clearTreatiesArrows() {
            document.getElementById('tf-treaty-cur').value = "1";
            document.getElementById('tf-treaty-target').value = "25";
            document.getElementById('tf-arrow-cur').value = "1";
            document.getElementById('tf-arrow-target').value = "25";
            calculateTreatiesArrows();
        }
window.addEventListener('DOMContentLoaded',()=>{initTreatiesArrowsSelects();calculateTreatiesArrows();});

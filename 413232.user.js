// ==UserScript==
// @name         CSGO Lounge Bet Stats
// @author       bD
// @description  Stats of your bets on CSGOLounge.com
// @include      http://csgolounge.com/myprofile
// @run-at       document-end
// @grant        none
// @version      1.0
// ==/UserScript== 

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

	var ajaxCont = document.getElementById('ajaxCont');
	if (ajaxCont != null) {
		ajaxCont.addEventListener('DOMSubtreeModified', function(ev) {
			var losses = ajaxCont.getElementsByClassName('lost').length;
			var wins = ajaxCont.getElementsByClassName('won').length;
			var isBetHistory = (losses > 0) || (wins > 0);

			if (isBetHistory && !document.getElementById('betStats')) {
				var statTrakColor = "#CF6A32";
				var souvenirColor = "#FFD700";
				var starColor = "#8650AC";
                var consumerColor = "#B0C3D9";
                var industrialColor = "#5E98D9";
                var milSpecColor = "#4B69FF";
                var restrictedColor = "#8847FF";
                var classifiedColor = "#D32CE6";
                var covertColor = "#EB4B4B";
				var statTrakGain = 0;
				var souvenirGain = 0;
				var starGain = 0;
                var consumerGain = 0;
                var industrialGain = 0;
                var milSpecGain = 0;
                var restrictedGain = 0;
                var classifiedGain = 0;
                var covertGain = 0;
				var totalGain = 0;
				var commonsGain = 0;
				var totalWins = 0;
				var totalGames = 0;
				var teamMap = {};
				
				var baseGain = "-webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; -moz-background-clip: padding; -webkit-background-clip: padding-box; background-clip: padding-box; padding: 2px; display: inline-block; font-weight: bold; line-height: 14px; color: #fff; vertical-align: baseline; text-shadow: 0 -1px 0 rgba(0,0,0,0.25); font-size: 12px; "
				
				// addGlobalStyle('p { font-size: large ! important; }');
				var betStyle = 	".statTrakGain { " + baseGain + " background-color: " + statTrakColor + "; } .souvenirGain { " + baseGain + " background-color: " + souvenirColor + "; } .starGain { " + baseGain + " background-color: " + starColor + "; } .consumerGain { " + baseGain + " background-color: " + consumerColor + "; } .industrialGain { " + baseGain + " background-color: " + industrialColor + "; } .milSpecGain { " + baseGain + " background-color: " + milSpecColor + "; } .restrictedGain { " + baseGain + " background-color: " + restrictedColor + "; } .classifiedGain { " + baseGain + " background-color: " + classifiedColor + "; } .covertGain { " + baseGain + " background-color: " + covertColor + "; } #betStats ul { list-style-type:none; !important } #betStats li { margin-left: 10px; }";
				addGlobalStyle(betStyle);

				var betTable = ajaxCont.getElementsByTagName('table')[0];
				var betRows = betTable.getElementsByTagName('tr');
				for (var n = 0; n < betRows.length - 2; n += 3) {
					var won = (betRows[n].getElementsByClassName('won').length > 0);
					var lost = (betRows[n].getElementsByClassName('lost').length > 0);
					var closed = (!won && !lost);

					var teamA = betRows[n].getElementsByTagName('a')[1].textContent;
					var teamB = betRows[n].getElementsByTagName('a')[3].textContent;

					if (!closed) {
						if (!teamMap[teamA]) {
							teamMap[teamA] = { 'wins': 0, 'games': 0 };
						}
						if (!teamMap[teamB]) {
							teamMap[teamB] = { 'wins': 0, 'games': 0 };
						}
						++teamMap[teamA].games;
						++teamMap[teamB].games;
						++totalGames;
					}

					if (won) {
						statTrakGain += betRows[n + 2].getElementsByClassName('StatTrak').length;
						souvenirGain += betRows[n + 2].getElementsByClassName('Souvenir').length;
						consumerGain += betRows[n + 2].getElementsByClassName('Consumer').length;
						industrialGain += betRows[n + 2].getElementsByClassName('Industrial').length;
						milSpecGain += betRows[n + 2].getElementsByClassName('Mil-Spec').length;
						restrictedGain += betRows[n + 2].getElementsByClassName('Restricted').length;
						classifiedGain += betRows[n + 2].getElementsByClassName('Classified').length;
						covertGain += betRows[n + 2].getElementsByClassName('Covert').length;
                        totalGain += betRows[n + 2].getElementsByClassName('item').length;
						++teamMap[teamA].wins;
						++teamMap[teamB].wins;
						++totalWins;
					} else if (lost) {
						statTrakGain -= betRows[n + 1].getElementsByClassName('StatTrak').length;
						souvenirGain -= betRows[n + 1].getElementsByClassName('Souvenir').length;
						consumerGain -= betRows[n + 1].getElementsByClassName('Consumer').length;
						industrialGain -= betRows[n + 1].getElementsByClassName('Industrial').length;
						milSpecGain -= betRows[n + 1].getElementsByClassName('Mil-Spec').length;
						restrictedGain -= betRows[n + 1].getElementsByClassName('Restricted').length;
						classifiedGain -= betRows[n + 1].getElementsByClassName('Classified').length;
						covertGain -= betRows[n + 1].getElementsByClassName('Covert').length;
                        totalGain -= betRows[n + 1].getElementsByClassName('item').length;
					}
				}
				var betStats = document.createElement('div');
				betStats.id = 'betStats';
				betTable.parentNode.insertBefore(betStats, betTable);
				betStats.style.display = 'none';
				betStats.style.fontSize = '12px';

				var betStatsToggler = document.createElement('a');
				betStatsToggler.id = 'betStatsToggler';
                betStatsToggler.className = 'button';
				betStatsToggler.textContent = 'Bet Stats';
				betStats.parentNode.insertBefore(betStatsToggler, betStats);
				betStatsToggler.addEventListener('click', function(ev) {
					if (betStats.style.display == 'none') {
						betStats.style.display = 'block';
					} else {
						betStats.style.display = 'none';
					}
				}, false);

				var betProfit = document.createElement('div');
				betProfit.id = 'betProfit';
				betProfit.innerHTML = 'Profit from betting: ' + totalGain + ' items (<span class="consumerGain">' + consumerGain + ' Consumer</span>, <span class="industrialGain">' + industrialGain + ' Industrial</span>, <span class="milSpecGain">' + milSpecGain + ' Mil-Spec</span>, <span class="restrictedGain">' + restrictedGain + ' Restricted</span>, <span class="classifiedGain">' + classifiedGain + ' Classified</span>, <span class="covertGain">' + covertGain + ' Covert</span>), including <span class="statTrakGain">' + statTrakGain + ' StatTrak</span> & <span class="souvenirGain">' + souvenirGain + ' Souvenir</span>.';
				betStats.appendChild(betProfit);

				var overallRate = document.createElement('div');
				overallRate.id = 'overallRate';
				overallRate.innerHTML = 'Overall win rate: ' + totalWins + ' / ' + totalGames + ' (' + (totalWins / totalGames * 100).toFixed(2) + '%)';
				betStats.appendChild(overallRate);

				var perTeamStats = document.createElement('ul');
				perTeamStats.id = 'perTeamStats';

				var teamList = [];
				for (var team in teamMap) {
					teamList.push({'name': team, 'wins': teamMap[team].wins, 'games': teamMap[team].games, 'ratio': teamMap[team].wins / teamMap[team].games});
				}
				teamList.sort(function(a, b) {
					if (a.ratio != b.ratio) {
						return b.ratio - a.ratio;
					} else if (a.games != b.games) {
						return b.games - a.games;
					}
					return 0;
				});
				for (var i = 0; i < teamList.length; ++i) {
					var team = teamList[i];
					var item = document.createElement('li');
					item.textContent += team.name + ': ' + team.wins + '/' + team.games + ' (' + (team.ratio * 100).toFixed(2) + '%)';
					perTeamStats.appendChild(item);
				}
				betStats.appendChild(perTeamStats);
			}
		}, false);
	}

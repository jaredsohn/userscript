// ==UserScript==
// @name           Referal Part of Earnings (Envato Marketplaces)
// @namespace      Adds referal earnings in the bar charts on the earnings page of the Envato Marketplaces
// @include        http://activeden.net/user/*/earnings
// @include        http://themeforest.net/user/*/earnings
// @include        http://codecanyon.net/user/*/earnings
// @include        http://3docean.net/user/*/earnings
// @include        http://videohive.net/user/*/earnings
// @include        http://audiojungle.net/user/*/earnings
// @include        http://graphicriver.net/user/*/earnings
// ==/UserScript==

Reftable = document.getElementById('referrals_table')
RefTRs = Reftable.getElementsByTagName('tr')
RefArray = new Array();
for (var i in RefTRs) {
	if (RefTRs[i].getElementsByTagName('td')[0].getElementsByTagName('strong').length > 0) {
		month = RefTRs[i].getElementsByTagName('td')[0].getElementsByTagName('strong')[0].innerHTML
		refearnings = RefTRs[i].getElementsByTagName('td')[4].innerHTML.substring(1)
		RefArray.push(new Array(month,refearnings))
	}
}
EarningsGraph = document.getElementById('earnings_graph')
EarDivs = EarningsGraph.getElementsByTagName('div')
EarArray = new Array();
for (var i in EarDivs) {
	if (EarDivs[i].getElementsByTagName('strong').length > 0) {
		month = EarDivs[i].getElementsByTagName('strong')[0].innerHTML
		width = EarDivs[i].getElementsByTagName('div')[0].style['width']
		class = invertClass(EarDivs[i].getElementsByTagName('div')[0].className)
		earnings = EarDivs[i].getElementsByTagName('div')[1].innerHTML
		EarArray.push(new Array(month,width.substring(0,width.length - 2),earnings.substring(1),i, class))
	}
}
counter = 0;
for (var i in EarArray) {
	earnings = findRefEarnings(EarArray[i][0])
	if (earnings > 0) {
		n = (EarArray[i][3]*1+counter)
		percentageRef = earnings / EarArray[i][2]
		//EarDivs[n].getElementsByTagName('div')[0].style['width'] = (1-percentageRef)*EarArray[i][1] + 'px'
		EarDivs[n].getElementsByTagName('div')[0].style['width'] = 1*EarArray[i][1] + 'px'
		tempdiv = EarDivs[n].getElementsByTagName('div')[1]
		EarDivs[n].removeChild(EarDivs[n].getElementsByTagName('div')[1])
		EarDivs[n].innerHTML += "<div class='"+ EarArray[i][4] +"' style='border-left:0px;width:"+percentageRef*EarArray[i][1]+"px;'></div>";
		EarDivs[n].appendChild(tempdiv)
		//EarDivs[n].getElementsByTagName('div')[2].innerHTML =  "$" + EarArray[i][2] + " ($"+decround(EarArray[i][2]-earnings*1) + " + $" + earnings + ")"
		EarDivs[n].getElementsByTagName('div')[2].innerHTML =  "$" + (decround(EarArray[i][2])+earnings*1) + " ($" + EarArray[i][2] + " + $" + earnings + ")"
		counter++;
	}
}

function decround(n) {
	return Math.round(n*100)/100 
}

function invertClass(class) {
	if (class == 'graph_1') {
		return 'graph_2'
	}
	return 'graph_1';
}

function findRefEarnings(month) {
	for (var j in RefArray) {
		if (RefArray[j][0] == month) {
			return RefArray[j][1]
		}
	}
}
// ==UserScript==
// @name           Virtual Manager Total Stats in Search
// @namespace      kongregatehack.vman2
// @description    Viser hver spillers samlede stats.
// @include        *://www.virtualmanager.com/auctions?*
// ==/UserScript==

start();

function start(){
	var abilityElms = document.getElementsByClassName('abilities');
	var totalElms = document.getElementsByClassName('total');
	
	for(var i = 1; i < abilityElms.length - 1; i++){
		var total = getTotalStats(i);
		
		totalElms[i - 1].innerHTML = "<span>" + total + "</span>";
	}
}

function getTotalStats(i){
	var statsElms = document.getElementsByClassName('abilities')[i].getElementsByClassName('value');
	var totalStats = 0;
	
	for(var j = 0; j < statsElms.length; j++){
		totalStats += parseInt(statsElms[j].innerHTML);
	}
	
	return totalStats;
}
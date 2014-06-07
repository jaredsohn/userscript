// ==UserScript==
// @name           Virtual Manager Total Stats in Player Abilities List
// @namespace      kongregatehack.vman3
// @description    Viser hver spillers samlede stats.
// @include        *://www.virtualmanager.com*player_abilities
// ==/UserScript==

start();

function start(){
	var abilityElms = document.getElementById('player_list').getElementsByTagName('tr');
	
	for(var i = 1; i < abilityElms.length; i++){
		var total = document.createTextNode(getTotalStats(abilityElms[i]));
		var totalElm = document.createElement('td');
		totalElm.setAttribute('style', 'font-weight: bold;');
		totalElm.appendChild(total);
		
		
		abilityElms[i].appendChild(totalElm);
	}
}

function getTotalStats(elm){
	var statsElms = elm.getElementsByClassName('ability');
	var totalStats = 0;
	
	for(var j = 0; j < statsElms.length; j++){
		totalStats += parseInt(statsElms[j].innerHTML);
	}
	
	return totalStats;
}
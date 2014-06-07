// ==UserScript==
// @name           team_formation_stamina
// @namespace      rubysoccer
// @include        http://www.rubysoccer.com/game/formation*
// ==/UserScript==

function createSpan(value){
	var span = document.createElement('span');
	span.innerHTML = value;
	span.style.backgroundColor = attr_colors[parseInt((value - 1) / 5)];
	span.style.color = '#fff';
	span.style.padding = '2px';
	span.style.marginLeft = '5px';
	
	return span;
}

var listItens = document.getElementsByClassName('available_player');
var attr_colors = ['#cc0044','#cc0033','#cc0022','#cc1111','#bb2200','#aa3300','#994400','#885500','#886600','#777700','#777700','#668800','#558800','#449900','#33aa00','#22bb00','#11cc00','#00dd00','#00ee00','#00ff00'];

for(var i = 0; i < listItens.length; i++){
	var playerId = listItens[i].getAttribute('id');
	var index = document.body.innerHTML.indexOf('new Tip(\''+playerId+'\'');
	var temp = document.body.innerHTML.substr(index);
	index = temp.indexOf('Vigor: ')+'Vigor: '.length;
	var vigor = temp.substring(index, temp.indexOf(', {')-1);
	vigor = parseInt(vigor);	
		
	listItens[i].appendChild(createSpan(vigor));
}
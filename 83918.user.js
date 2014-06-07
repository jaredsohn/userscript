// ==UserScript==
// @name           BattleManager Mini
// @namespace      What's that?
// @description    Dodaje managera walki na polach bitwe eRepublik
// @include        http://www.erepublik.com/*/battlefield/*
// ==/UserScript==

var nick = 'Gosc';

var i,odnosniki = document.getElementsByTagName('a')
for(i = 0 ; i < odnosniki.length ; i++)
	if(odnosniki[i].className == 'citizen_name') nick = odnosniki[i].innerHTML;
nick = nick.replace(/^\s+|\s+$/g, '');

var battlemanager = document.createElement('object');
	battlemanager.setAttribute('width', 686);
	battlemanager.setAttribute('height', 380);
	battlemanager.setAttribute('data', 'http://nokianseries.yoyo.pl/bm_mini/BattleManagerMini.swf?nick=' + nick);
	battlemanager.setAttribute('type', "application/x-shockwave-flash");
	var allowScriptAccess = document.createElement('param');
		allowScriptAccess.setAttribute('name', "allowScriptAccess");
		allowScriptAccess.setAttribute('value', "sameDomain");
	battlemanager.appendChild(allowScriptAccess);

var h1 = document.createElement('h1');
	h1.innerHTML = 'Wpisz koordynaty (x,y) pola na ktorym jestes!';

document.getElementById('client').parentNode.appendChild(h1);
document.getElementById('client').parentNode.appendChild(battlemanager);
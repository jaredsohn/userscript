// ==UserScript==
// @name           gefundenen plunder in der Uebersicht
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ )
// @description    gefundenen plunder in der Uebersicht
// @include        http://*game.de/overview/*
// ==/UserScript==


GM_xmlhttpRequest({
		method: 'GET', 
		url: 'http://'+document.location.hostname+'/activities/',
		onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var plunder = content.split('Du hast zuletzt ')[1].split(' ')[1].replace('href="/stock/plunder/">','').replace('</a>','');
		document.getElementsByClassName('status')[0].innerHTML += '<br><a href="/stock/plunder/">Du hast zuletzt '+plunder+' gefunden</a>';
		}})
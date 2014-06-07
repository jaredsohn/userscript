// ==UserScript==
// @name           Pfandwarner Pennergame Alle Games by Boggler
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ )
// @description    Alert bei Kurs von xx (im Script einstellbar)
// @include        http://*pennergame.de*
// @include        http://*menelgame.pl*
// @include        http://*clodogame.fr*
// @include        http://*mendigogame.es*
// @include        http://*dossergame.co.uk*
// @include        http://*serserionline.com*
// @include        http://*bumrise.com*
// @include        http://*bichionline.ru*
// @include        http://*pivetgame.com.br*
// @exclude        http://*board*
// @exclude        http://*redirect*
// @license	   Creative Commons by-nc-sa
// ==/UserScript==

var abwann = 15;

GM_xmlhttpRequest({
		method: 'GET', 
		url: 'http://'+window.location.hostname+'/stock/bottle/',
		onload: function(responseDetails) {
		var content = responseDetails.responseText;
		
		var aktuellerkurs = content.split('&euro;')[2].split(' ')[0];
		var aktuellerkurs = aktuellerkurs.replace('0,','');       
		var aktuellerkurs 
		if(Number(aktuellerkurs) >= abwann){
		var alarm = confirm('Achtung! Der Kurs hat '+aktuellerkurs+'Cent erreicht!\nKlicke Ok um zur Verkaufsseite zu gelangen\nMfg Boggler');
		if(alarm == true){
		document.location.href = 'http://'+document.location.hostname+'/stock/bottle/';
		}
		}
		}})
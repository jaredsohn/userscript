// ==UserScript==
// @name           Lg games Counter V3
// @namespace      Landgrab_gamescount3
// @description    Counts active, ended, going etc. games
// @include        http://landgrab.net/landgrab/Home*
// @include        http://www.landgrab.net/landgrab/Home*
// ==/UserScript==

var active = 0;
var unactive = 0;
var defeated = 0;
var total = 0;
var putHere;
var counter = 0;

CountMeAtAll();

function CountMeAtAll(){
	var oEl = document.getElementById("active_games_column_div1");
	var oI = oEl.firstChild;
	while(oI = oI.nextSibling){
		counter == counter++;
		font: 'arial';
		if (counter == 1) putHere = oI;
		if(!oI.tagName) continue;
		var tag = oI.tagName.toLowerCase();
		if(tag != 'div') continue;
		if(oI.id.substring(0,9) != 'game_div_') continue;
		var oT = oI.childNodes[1].childNodes[1];
		info2 = oT.tagName;
		var sHref = oT.rows[0].cells[1].childNodes[1].src;
		if(sHref == 'http://landgrab.net/landgrab/images/homestar_yellow.png') active++;
		else if(sHref == 'http://landgrab.net/landgrab/images/homestar1.png') unactive++;
		else defeated++; 
		total = defeated + active + unactive;
	}
putHere.innerHTML += '<div style= "color: #60bb54;">' + '<center />'+total+' Games: '+active+'/'+unactive+'/'+defeated+' (Active/Inactive/Defeated)</center />';
}
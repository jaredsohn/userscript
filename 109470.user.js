// ==UserScript==
// @name          Total Game Time Steam
// @description   gives total ammount of time played on all games in game info area of steam profile.
// @include       http://steamcommunity.com/id/*/games*
// @include       http://steamcommunity.com/profiles/*/games*
// ==/UserScript==

var info = document.body.getElementsByTagName('h5');
var total = 0;
for(i=0;i<info.length;i++)
{
	var string = info[i].innerHTML.split(" ",1)[0];
	if(!isNaN(string)){
	total+=string-0;}
}
var header = document.getElementById('BG_top').getElementsByTagName('h2')[0];
header.innerHTML+=" - " + roundNumber(total, 2) + " Hours Played";

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}
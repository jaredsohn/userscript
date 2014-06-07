// ==UserScript==
// @name          Rating Voter
// @namespace     http://www.aconnor.com
// @description   votes for the band's rating
// @include       http://www.bestmusiconcampus.com/band/default.aspx?bandID=1678*
// ==/UserScript==

window.onload = vote();

function vote(){
	
	var time = Math.round(Math.random() * 10000) + 5000;
	window.setTimeout(function() { window.location.href = "javascript:vote(5);" }, time);
	window.setTimeout(function() { window.location.href = "http://www.bestmusiconcampus.com/band/default.aspx?bandID=1678" }, time+1000);
	
}
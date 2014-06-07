// ==UserScript==
// @name          Voter
// @namespace     http://www.aconnor.com
// @description   votes for the band
// @include       http://www.bestmusiconcampus.com/contests/woodies1.aspx*
// ==/UserScript==

window.onload = vote();

function vote(){

	unsafeWindow.woodiesVoteResponse = function() {
		window.location.href=window.location.href;
	}

	
	var time = Math.round(Math.random() * 10000) + 5000;
	window.setTimeout(function() { window.location.href = "javascript:promoVote(49,1678);" }, time);
	
}
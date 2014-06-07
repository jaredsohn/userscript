// ==UserScript==
// @name           Open games
// @namespace      arreloco
// @include        http://www.kongregate.com/*
// ==/UserScript==

var lnk = new Array();
var left;
var right;
var n;
var l;
var l2;
var game;
var lins;

function getEveryLink(){
	
}

document.getElementById("feature").childNodes[5].childNodes[5].childNodes[7].innerHTML += "<li style='float: right; width: auto;'><div id='game-opener'><a href='#' >Open every game</a></div></li>";
linksButton = document.getElementById("game-opener");
linksButton.addEventListener('click',function () {
	for(left=1;left<9;left++){
		n = "game_browser_game_row_"+left;
		l = document.getElementById(n).firstElementChild.firstElementChild.firstElementChild.firstElementChild.href;
		lnk.push(l);
	}
	for(right = 9; right<23; right+=2){
		game = right-4;
		l2 = document.getElementById("feature").childNodes[5].childNodes[5].childNodes[3].childNodes[game].childNodes[1].childNodes[3].firstElementChild.firstElementChild.href;
		lnk.push(l2);
	}
	alert("AS");
	for(var lins in lnk){
		window.open(lnk[lins]);
	}
},false)

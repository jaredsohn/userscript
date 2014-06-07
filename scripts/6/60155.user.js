// ==UserScript==
// @name KingsAge : Inbox Keypresses
// @namespace http://userscripts.org/scripts/show/60155
// @description Adds keypress functionality to the inbox where messages can be browsed with left and right direction keys.
// @date 2009-10-19
// @creator mkey
// @include http://*.kingsage.org/game.php?village=*&s=messages&m=in&id=*
// @include http://*.kingsage.org/game.php?village=*&s=messages&m=in&mbox=0&id=*
// @exclude
// ==/UserScript==

function keydown(e){
	var table;
	var links;
	var division;
	
	e = window.event || e;
	e = e.charCode || e.keyCode;
	
	if (e != 39	&& e != 37) return;
	
	table = document.getElementsByClassName("borderlist");
	if (!table) return;
	
	table = table[table.length-1];
	
	division = table.getElementsByTagName("td");
	if (!division) return;
	
	if (e == 37) links = division[0].getElementsByTagName("a");
	else links = division[1].getElementsByTagName("a");
	
	if (!links[0]) return;
	window.location.href = links[0].getAttribute("href");
}

(function (){
	if (document.addEventListener) document.addEventListener('keypress', keydown, false);
	else if (document.attachEvent) document.body.attachEvent('onkeypress', keydown);
})()
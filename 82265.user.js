// ==UserScript==
// @name           Pigskin Empire: Scouting Link on PRO Boxscore Page
// @description    This script will give a new link in the second tab that will link you to the scouting page for a pro game. This does not work with college games
// @namespace      crbengal
// @copyright      2010, crbengal
// @version        1.0.2
// @include	   http://beta.pigskinempire.com/proscore.asp*
// ==/UserScript==

window.setTimeout( 
	function() {
		main();
	}, 
	100
);

function main() {
	var list = document.getElementsByTagName("ul")[2];
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.href = window.location.toString().replace("proscore.asp?w","scout.asp?level=pro&gnum");
	a.innerHTML = "SCOUT GAME";
	li.appendChild(a);
	list.appendChild(li);
}
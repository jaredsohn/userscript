// ==UserScript==
// @name           Pigskin Empire: Scouting Link on COLLEGE Boxscore Page
// @description    This script will give a new link in the second tab that will link you to the scouting page for a college game. This does not work with pro games
// @namespace      crbengal
// @copyright      2010, crbengal
// @version        1.0
// @include	   http://beta.pigskinempire.com/boxscore.asp*
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
	a.href = window.location.toString().replace("boxscore.asp?w","scout.asp?gnum");
	a.innerHTML = "SCOUT GAME";
	li.appendChild(a);
	list.appendChild(li);
}

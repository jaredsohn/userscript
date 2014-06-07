// ==UserScript==
// @name           Pigskin Empire: College Scout - New Site 
// @copyright      2011, Jdog
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        6.29.11
// @include        http://pigskinempire.com/boxscore.aspx?w=*&s=*
// @include        http://*.pigskinempire.com/boxscore.aspx?w=*&s=*
// @description    Scout College games on the new site 
// ==/UserScript==
 
window.setTimeout( 
	function() {
		main();
	}, 
	100
);

function main() {
	
	var menu = document.getElementById("ctl00_CollegeSubNav");
	var list = menu.getElementsByTagName("ul")[0];
	var li = document.createElement("li");
	var a = document.createElement("a");
	a.href = window.location.toString().replace("boxscore.aspx?w","scout.aspx?level=College&gnum");
	a.innerHTML = "SCOUT GAME";
	li.appendChild(a);
	list.appendChild(li);
}
 
 
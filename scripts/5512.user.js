// This script will add the player search box to the bottom of your team page to allow for quick and convienient player searches.
//
// ==UserScript==
// @name         Yahoo Fantasy NFL Player Search Box on Team Page
// @namespace     http://www.digivill.net/~joykillr/firefox
// @description   Adds a player search box to your yahoo fantasy foorball team page for quick and easy player searches.
// @include       http://football.fantasysports.yahoo.com/f*
// ==/UserScript==
//

var firstre = new RegExp
firstre = /^http\:\/\/football\.fantasysports\.yahoo\.com\/f\d{1}\/\d{1,7}\/\d{1,2}/i;

if (location.href.match(firstre)) {

	// Get href vars
	if (location.href.match("/f1/")) {
		var str1 = location.href.split("/f1/")[1].split("/")[0];
		var pf = "f1";
	} else if (location.href.match("/f2/")) {
		var str1 = location.href.split("/f2/")[1].split("/")[0];
		var pf = "f2";
	};

	// add table with search box
	var sboxl = document.createElement("div");
	sboxl.setAttribute("id", "playersearch");
	sboxl.innerHTML = '<table style="width:98%;text-align:center;border:1px dotted black;margin-left:auto;margin-right:auto;">' +
		'<tr><td style="text-align:right;">' +
		'<h3> Quick Player Search </h3>' +
		'</td><td style="width:8%" />' +
		'<td style="width:55%;text-align:left;">' +
		'<form method="post" action="/' + pf + '/' + str1 +'/playersearch">' +
		'<label for="playersearchtext"> Search By Last Name: <input name="search" class="text" id="playersearchtext" value="" type="text">' +
		'</label> <input class="button" value="Find Player" type="submit"> </form>' +
		'</td></tr></table>';
		
	document.getElementById('yspfooter').insertBefore(sboxl, document.getElementById('yspfooter').firstChild);
};

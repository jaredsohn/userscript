// ==UserScript==
// @name          	Wikipedia Auto Login
// @author		CennoxX
// @description   	This Script allows a oneclick login on Wikipedia.
// @include		http://en.wikipedia.org/w/index.php?title=Special:UserLogin*
// @include		https://en.wikipedia.org/w/index.php?title=Special:UserLogin*
// @include		http://en.wikipedia.org/w/index.php?title=Special:UserLogout*
// @include		https://en.wikipedia.org/w/index.php?title=Special:UserLogout*
// ==/UserScript==
var zurueck = document.getElementById("mw-returnto");
if(zurueck){
	var zurueckLink = zurueck.getElementsByTagName("a")[0];
	if(zurueckLink){
		location.href = zurueckLink.href;
	}
}
window.setTimeout("document.getElementById('wpRemember').click(); ", 10);
if (document.forms['userlogin'].wpName.value)
window.setTimeout("document.getElementById('wpLoginAttempt').click(); ", 10);
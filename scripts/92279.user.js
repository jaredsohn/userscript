// ==UserScript==
// @name          	Wikipedia Auto-LogIn
// @author		CennoxX
// @description   	Dieses Script erledigt die Anmeldung bei Wikipedia mit einem Klick.
// @include		http://de.wikipedia.org/w/index.php?title=Spezial:Anmelden*
// @include		https://de.wikipedia.org/w/index.php?title=Spezial:Anmelden*
// @include		http://de.wikipedia.org/w/index.php?title=Spezial:Abmelden*
// @include		https://de.wikipedia.org/w/index.php?title=Spezial:Anmelden*
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
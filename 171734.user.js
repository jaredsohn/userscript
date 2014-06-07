// ==UserScript==
// @name        Fraktionsverwaltung
// @namespace   PaveLow45
// @include     *cp.rpg-city.de/index.php?funktion=_member*
// @version     1
// ==/UserScript==

var test = document.createElement("a");
test.innerHTML = "Bewerbungen ablehnen";
test.addEventListener("click", bAbgelehnt);
test.href = "#";

var oB = document.body.innerHTML.match(/\$/g).length-5;
document.getElementsByTagName("h1")[2].innerHTML += " ("+oB+") - ";
document.getElementsByTagName("h1")[2].appendChild(test);
	
function bAbgelehnt()
{
	if(confirm("Möchtest du alle Bewerbungen ablehnen?"))
	{
		for(i = 15; i < document.getElementsByTagName("a").length-1; i++)
		{
			GM_xmlhttpRequest({
			  method: "POST",
			  url: document.getElementsByTagName("a")[i].href,
			  data: "beschreibung=Sehr geehrter Bewerber, \n \nleider muessen wir Ihnen mitteilen das Sie abgelehnt wurden. Trotzdem vielen Dank für Ihre Bewerbung. \n \nHochachtungsvoll, \nLeaderschaft&aktion=Abgelehnt",
			  headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			  },
			});
		}
		alert("Alle Bewerbungen abgelehnt");
	}
	else
	{
		alert("Aktion abgebrochen");
	}
}
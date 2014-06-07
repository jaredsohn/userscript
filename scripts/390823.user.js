// ==UserScript==
// @id             ilias.studium.kit.edu-ed2e40e5-6853-472a-a922-28df8bd6c5ae@scriptish
// @name           Mit Shibboleth anmelden
// @version        0.2.2014-02-18
// @namespace      
// @author         Sinan
// @description    Möglichst immer den Shibboleth-Anmeldebutton drücken. Nur sinnvoll, wenn Passwort-Autofill aktiviert
// @include        *.kit.edu/*
// @run-at         document-start
// ==/UserScript==

function clickIt() {
	console.log("Clicking shibboleth button: " + elSubmit);
	elSubmit.style.outline = "2px solid #f00";
	elSubmit.focus();
	elSubmit.click();
	return;
}

var elSubmit,
	found = false;

elSubmit = document.evaluate(".//input[@type='submit' and @value='Mit KIT-Account anmelden']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (!elSubmit) {
	console.log("Shibboleth button not found on first try, trying again after page loaded");
	
	window.addEventListener('load', function() {
		console.log("Shibboleth button search restarting...");
		var links = document.getElementsByTagName('a');
		
		if (links.length > 0) {
			var i = links.length;
			
			while (i --> 0) {
				console.log("href:" + links[i].getAttribute("href"));
				console.log("innerHTML:" + links[i].innerHTML);
				if (links[i] &&	
					(
						(links[i].getAttribute("class")
							&& links[i].getAttribute("class").indexOf("shib-login") !== -1)
						||
						(links[i].getAttribute("href")
							&& links[i].getAttribute("href").substr(0,24) == "/Account/LoginShibboleth")
					)
					// ignore button in upper left corner
					&& links[i].innerHTML != "Anmelden") {
					
					console.log("Finally found shibboleth login link!");
					elSubmit = links[i];
					clickIt();
					break;
				}
			}
			
			console.log("End of Shibboleth button search");
		}
	}, false);
}
else {
	clickIt();
}
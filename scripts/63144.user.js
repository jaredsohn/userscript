// ==UserScript==
// @name           Gmx Logout Link
// @namespace      Dikaios
// @include        http://service.gmx.net/de*
// ==/UserScript==

function addElementLogoutElement() {

	var productLink = document.getElementById('nav-sub').childNodes[0].childNodes[0].getAttribute("href");
	var sid = productLink.substr(productLink.indexOf("&sid") + 5);
	
	var navSubElement = document.getElementById("nav-sub");
	var navSubLinks = navSubElement.getElementsByTagName("a");
	
	/*Nach dem Datensatz Sonstige Optionen suchen*/
	for (var i = 0; i < navSubLinks.length; i++) 
	{
		// Testen, ob es sich um das Element mit dem Titel "Sonstige Optionen" handelt
		if (navSubLinks[i].firstChild.nodeValue=="Sonstige Optionen") 
		{
			//Wenn gefunden, dann klonen
			var newElement = navSubLinks[i].parentNode.cloneNode(true);
			
			// link element selektieren und attribute setzen
			var newElementLink = newElement.firstChild;
			newElementLink.innerHTML="Logout";
			newElementLink.setAttribute("href", 'http://service.gmx.net/de/cgi/g.fcgi/application/navigator/logout/applications?sid='+sid);
			
			// einfügen 
			navSubLinks[i].parentNode.parentNode.insertBefore(newElement, navSubLinks[i].parentNode.nextSibling());
			break;
		}
	}
}

addElementLogoutElement();
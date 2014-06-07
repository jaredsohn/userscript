// ==UserScript==
// @name           GMX Logout Link im Menü
// @namespace      gotU
// @include        http://service.gmx.net/de*
// @include        https://service.gmx.net/de*
// @version        0.1
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
/*
			//Wenn gefunden, dann klonen
			var newElement = navSubLinks[i].parentNode.cloneNode(true);
			
			// link element selektieren und attribute setzen
			var newElementLink = newElement.firstChild;
			newElementLink.innerHTML="Logout1";
			newElementLink.setAttribute("href", 'http://service.gmx.net/de/cgi/g.fcgi/application/navigator/logout/applications?sid='+sid);
			//newElementLink.setAttribute("target", "navigator");
			//newElementLink.setAttribute("target", "_top");
			//newElementLink.setAttribute("target", "_parent");
			//newElementLink.setAttribute("target", "_self");
			//newElementLink.setAttribute("target", "iframe_mail");


			// einfügen 
			navSubLinks[i].parentNode.parentNode.insertBefore(newElement, navSubLinks[i].parentNode.nextSibling());

*/


			//Wenn gefunden, dann klonen
			var newElement2 = navSubLinks[i].parentNode.cloneNode(true);
			
			//link löschen
			var newElementLink2 = newElement2.firstChild;
			newElementLink2.parentNode.removeChild(newElementLink2); 

			//eneuer Link
			var newA = document.createElement("a");
			newA.innerHTML="Logout";
			
			newA.setAttribute("onmouseup", "top.location = 'http://service.gmx.net/de/cgi/g.fcgi/application/navigator/logout/applications?sid="+sid+"'");
			
			// einfügen
			newElement2.appendChild(newA);
			navSubLinks[i].parentNode.parentNode.insertBefore(newElement2, navSubLinks[i].parentNode.nextSibling());



			break;
		}
	}


//document.getElementById('nav-sub').getElementsByTagName('ul')[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0].innerHTML="Debug";


}

addElementLogoutElement();
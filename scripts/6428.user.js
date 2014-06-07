// ==UserScript==
// @name           Die Staemme Erweiterung
// @namespace      El_Presidente
// @description    fuegt Premium-Features hinzu
// @include        http://ds*.die-staemme.de/game.php*
// ==/UserScript==

function VArgumente() {
	var erg = new Array();
	var arg = new Array();
	var location = window.location.search;
	if (location.length > 0) {
		location = location.substr(1, location.length - 1);
		erg = location.split("&");
		for (i=0; i<erg.length; i++) {
			var x = new Array();
			x = erg[i].split("=");
		arg[x[0]] = x[1];
		}
	}
	else {
		arg[0] = false;
	}
	return arg;
}


// functionName = der verwendete Kurztag
// frontendName = die vollstaendige Fassung
// extraURI = extra URI Parameter
// position = Positionsnummer

function InsertElement(functionName, frontendName, extraURI, position){
	var main, newElement;
	main = document.getElementsByTagName('table')[1].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('a')[position];

	if(main){
		var newElementLink = document.createElement('a');
		var newElementLinkHref = document.createAttribute('href');
		var parameter = VArgumente();
		if (parameter['village']){
			var village = "&village="+parameter['village'];
		}
		if (parameter['t']) { var t = parameter['t']; 
			if (t) { extraURI+="&t="+t; }
		}
		newElementLinkHref.nodeValue = "game.php?screen="+functionName+village+extraURI;
		newElementLink.setAttributeNode(newElementLinkHref);

		var newElementImage = document.createElement('img');
		var newElementImageSrc = document.createAttribute('src');
		newElementImageSrc.nodeValue = "graphic/buildings/"+functionName+".png";
		newElementImage.setAttributeNode(newElementImageSrc);
		var newElementImageTitle = document.createAttribute('title');
		newElementImageTitle.nodeValue = frontendName;
		newElementImage.setAttributeNode(newElementImageTitle);
		var newElementImageAlt = document.createAttribute('alt');
		newElementImageAlt.nodeValue = "";
		newElementImage.setAttributeNode(newElementImageAlt);

		var newElementText1 = document.createTextNode(" - ");
		var newElementText2 = document.createTextNode(frontendName);

		newElementLink.appendChild(newElementText2);

		main.parentNode.insertBefore(newElementImage, main);
		main.parentNode.insertBefore(newElementLink, main);
		main.parentNode.insertBefore(newElementText1, main);
	}
}

InsertElement('smith','Schmiede','',4);
InsertElement('market','Marktplatz','',6);
InsertElement('market','fremde Angebote','&mode=other_offer',7);

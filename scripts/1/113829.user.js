// ==UserScript==
// @name           expedition
// @namespace      Mwa
// @description    Ajoute un bouton "16" sur la page de destination de votre flotte
// @include        *ogame.fr/game/index.php?page=fleet2*
// ==/UserScript==

function simulerTouche(xPath, caractere) {
	var fausseTouche = document.createEvent("KeyboardEvent");
	fausseTouche.initKeyEvent ("keypress", true, false, window, 0, 0, 0, 0, 0, caractere.charCodeAt(0));
	var element = document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if (element)
	{
		element.dispatchEvent(fausseTouche);
		return true;
	}
	else
		return false;
}

function cliquer(xPath)
{
	var fauxClick = document.createEvent('MouseEvents');
    fauxClick.initMouseEvent('click', false, false, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
	var element = document.evaluate(xPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
	if (element)
	{
		element.dispatchEvent(fauxClick);
		return true;
	}
	else
		return false;
}

var element = document.evaluate("//td[@id='target']/div[@class='target']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
if (element != null)
{
	var lien16 = document.createElement("a");
	lien16.innerHTML = '16';
	lien16.id = 'lien16';
	lien16.setAttribute("class", 'debris');
	element.appendChild(lien16);
	document.getElementById('lien16').addEventListener('click', function(e) {
		var element = document.evaluate("//input[@id='position']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
		element.focus();
		simulerTouche("//input[@id='position']", "1");
		simulerTouche("//input[@id='position']", "6");
		cliquer("//a[@id='pbutton']");
		
	}, true);
}
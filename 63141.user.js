// ==UserScript==
// @name           Datové schránky - CAPTCHA
// @namespace      http://mojedatovaschranka.cz/
// @description    Doplní bezpečnostní kód pro přihlášní k datovým schránkám
// @include        https://www.mojedatovaschranka.cz/portal/ISDS/checkUser1.jsp
// ==/UserScript==
function doplnitKod() {
	var odpovedElement = document.getElementById("answer");
	if (odpovedElement == null) {
		return;
	}
	var parentElement = document.evaluate("//div[@id='cpt_menu3']/following-sibling::div[1]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var poradiElement = document.evaluate("div[1]/p[2]/b[1]", parentElement, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var poradi = poradiElement.textContent.split(/, | a /);
	
	var cisliceElements = document.evaluate("div[1]/p[3]/span", parentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var cislice = new Array();
	for (var i = 0; i < cisliceElements.snapshotLength; i++) {
		cislice[i] = cisliceElements.snapshotItem(i).textContent;
	}
	var nazvy = {
		"první" : 1,
		"druhou" : 2,
		"třetí": 3,
		"čtvrtou": 4,
		"pátou": 5,
		"šestou": 6,
		"sedmou": 7,
		"osmou": 8,
		"devátou": 9,
		"desátou": 10,
		"jedenáctou": 11,
		"dvanáctou": 12
	}
	var odpoved = "";
	for (var i = 0; i < poradi.length; i++) {
		odpoved += cislice[nazvy[poradi[i]]-1];
	}
	odpovedElement.value = odpoved;
}

doplnitKod();

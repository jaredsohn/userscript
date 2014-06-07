// ==UserScript==
// @name           link floriterapia
// @namespace      http://userscripts.org/notediterapie
// @description    fix some links of schede dei prodotti
// @include        http://www.otiomeopatici.com/cd/medicina_naturale/fitoterapia/floriterapia/FLOWER%27S%20ENERGY/_Flower%27s%20energy_index.htm
// ==/UserScript==

var snapshotResults = document.evaluate("//a[contains(@href,'FLOWER')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snapshotResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapshotResults.snapshotItem(i);
		elm.parentNode.removeChild(elm);
	}

var snapResults = document.evaluate("//h4",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var eln = snapResults.snapshotItem(i);
		var elm = document.createElement("h4");
		var link = document.createElement("a");
		elm.appendChild(link);
		var a = i + 1;
		link.setAttribute("href","FLOWER" + a + ".htm");
		link.appendChild(document.createTextNode("FLOWER energy " + a));
		link.appendChild(document.createElement("br"));
		eln.parentNode.replaceChild(elm,eln);
	}
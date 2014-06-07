// ==UserScript==
// @name           ThePirateBay (TPB) No-YIFY HD Movies
// @description    Filter results on the HD Movies section for the YIFY releases
// @grant          none
// @version        1.1
// @include        http://thepiratebay.*/browse/207*
// @include        https://thepiratebay.*/browse/207*
// @copyright      Hernan Cano based on code from Aviem Zur
// ==/UserScript==
//================================ Set the Groups you don't want to see ================================
var filter = new Array(
    "YIFY"
);
//======================================================================================================
var links = document.evaluate("//tr/td[2]/div/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var even = false;
for (var i = 0; i < links.snapshotLength; i++) {
	var link = links.snapshotItem(i);
    var foundMatch=0;
	for (var k = 0; k < filter.length; k++) {
		if (link.text.toLowerCase().replace(/\s/g,"").replace(/\./g,"")
            .indexOf(filter[k].toLowerCase().replace(/\s/g,"").replace(/\./g,"")) 
            != -1) {
			foundMatch=1
			break;
		}
	}
    var row = link.parentNode.parentNode.parentNode;
    if (foundMatch) {
        row.parentNode.removeChild(row);
    }
}
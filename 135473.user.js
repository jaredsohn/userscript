// ==UserScript==
// @name        change ffn
// @description Allow Frequent flyer number editing on iberia.com
// @include     https://www.iberia.com/OneToOne/v3/infoPasajerosSimplFF.do
// @version     1
// ==/UserScript==

var akeys;

akeys = document.evaluate('//*[@disabled="disabled"]', document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (!akeys.snapshotLength) {
	return;
}
for (var i = 0; i < akeys.snapshotLength; i++) {
	var a = akeys.snapshotItem(i);
	a.removeAttribute("disabled");
}

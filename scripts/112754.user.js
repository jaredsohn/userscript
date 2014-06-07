// ==UserScript==
// @name           Gravity Theme
// @namespace      Conster
// @description    Prevents you from picking Floating On Air as opening theme
// @include        http://*animecubed.com/billy/bvs/themesdifficulty.html
// ==/UserScript==

var foaradio = document.evaluate("//input[@type='radio' and @value = '7']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//var speedInput = document.evaluate("//input[@name='shift' and @value='" + shiftInput+ "']", document, null,
if (foaradio.snapshotLength != 0) {
	//we have Floating on Air - disable it
	foaradio.snapshotItem(0).wrappedJSObject.disabled = true;
}
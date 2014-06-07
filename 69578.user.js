// ==UserScript==
// @name           Munsell Hue Test Hack
// @namespace      info.luosheng.colorhack
// @description    Double click the page to see the correct order of the color boxes.
// @include        http://www.spectralcolor.com/game/huetest_kiosk
// ==/UserScript==

~function() {
	var showTip = false;
	document.addEventListener('dblclick', function() {
		showTip = !showTip;
		var allDivs = document.evaluate(
			"//div[@class='drag_patch']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		for (var i = 0; i < allDivs.snapshotLength; i++) {
			var dragPatch = allDivs.snapshotItem(i);
			dragPatch.innerHTML = showTip
				? parseInt(dragPatch.id.substring(dragPatch.id.lastIndexOf('_') + 1)) - 1
				: '';
		}
	}, true);

}();
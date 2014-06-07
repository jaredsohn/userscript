// ==UserScript==
// @name           YouTube - remove seen
// @description    remove seen videos on new YouTube homepage layout
// @author         Sigi_cz
// @version        1.03
// @include        http://www.youtube.com/
// ==/UserScript==

(function () {

function doClick(elm) { var e = document.createEvent('MouseEvents'); e.initEvent('click', true, true, window, 0); elm.dispatchEvent(e); }

// select elements by 'tagname' '#ID' '.class' './xpath' '//xpath'
function $(q, root, single) {
	if (root && typeof root === 'string') {
		root = $(root, null, true);
		if (!root) { return null; }
	}
	root = root || document;
	if (q[0]==='#') { return root.getElementById(q.substr(1)); }
	else if (q[0]==='/' || (q[0]==='.' && q[1]==='/')) {
		if (single) { return document.evaluate(q, root, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; }
		return document.evaluate(q, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else if (q[0]==='.') { return root.getElementsByClassName(q.substr(1)); }
	return root.getElementsByTagName(q);
}

function start() {

	function dors() {
		var elms = $('//*[@id="ALL-data"]//*[contains(@class,"feedmodule-item-with-x") and contains(@class,"watched")]//*[@class="feedmodule-x-button"]'),
		    lng = elms.snapshotLength;
		while (lng--) { doClick(elms.snapshotItem(lng)); };
		window.location.reload();
	}

	if ($('#ytrs')) { return; }
	try {
		var newBtn = document.createElement('div');
		newBtn.id = 'ytrs';
		newBtn.innerHTML = 'remove seen';
		newBtn.setAttribute('style', 'float: right; border: 1px dotted grey; text-color: black;');
		$('#user-navbar-sections').appendChild(newBtn);
		newBtn.addEventListener('click', dors, false);
	} catch(x) {  }

}
document.addEventListener('DOMContentLoaded', start(), false);
}())
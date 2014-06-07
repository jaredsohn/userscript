// ==UserScript==
// @name Unfuck Slashdot Navigation Bars
// @description Make the new Slashdot layout use screen space more efficiently by removing the sidebars and fixing the top bar.
// @include http://slashdot.org/*
// @include http://*.slashdot.org/*
// ==/UserScript==

(function () {
	var elem;

	// Remove left sidebar.
	elem = document.evaluate("//div[@class='col_1']", document, null,
	                         XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	                         null);
	for (var i = 0; i < elem.snapshotLength; i++) {
		var item = elem.snapshotItem(i);
		item.parentNode.removeChild(item);
	}

	// Remove right sidebar.
	elem = document.getElementById('slashboxes');
	if (elem) {
		elem.parentNode.removeChild(elem);
	}

	// Fix up margins
	elem = document.getElementById('firehose');
	if (elem) {
		elem.style.marginLeft = 0;
		elem.style.marginRight = 0;
	}

	elem = document.getElementById('comments');
	if (elem) {
		elem.style.marginLeft  = "20px";
		elem.style.marginRight = "20px";
	}

	// Fix up the styles.
	elem = document.createElement('style');
	elem.type = "text/css";
	elem.innerHTML = ".col_2, #content { min-width: 0 !important; }\n";
	document.getElementsByTagName('head')[0].appendChild(elem);
})();

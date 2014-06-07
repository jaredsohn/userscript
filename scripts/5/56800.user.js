// Copyright (C) 2005, temp_h.
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Disable HATENA keyword
// @namespace      http://www.pandora.nu/tempo-depot/js
// @description    Disable HATENA keyword ancher. Ancher nodes will be replaced with span nodes.
// @author         temp_h <temp_h@pandora.nu>
// @include        http://d.hatena.ne.jp/*
// @include        http://*g.hatena.ne.jp/*
// @include        http://anond.hatelabo.jp/*
// ==/UserScript==

(function () {
	var kwNodes = document.evaluate(
		'(/descendant::A[attribute::class = "keyword"]|/descendant::A[attribute::class = "okeyword"])',
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
	);
	for (var i = 0; i < kwNodes.snapshotLength; i++){
		var n = kwNodes.snapshotItem(i);
		var r = document.createElement('SPAN');
		//r.className = 'keyword';
		for(var j = 0; j < n.childNodes.length; j++)
			r.appendChild(n.childNodes[j].cloneNode(true));
		n.parentNode.replaceChild(r, n);
	}
})();



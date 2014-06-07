// ==UserScript==
// @name           pcbeta ads Remover
// @description    Remove bbs.pcbeta.com ads for ChinaList
// @author         Gythialy
// @include        http://bbs.pcbeta.com/*
// @version        1.0.3
// ==/UserScript==
(function() {
	var DEBUG = 0;
	function log(message) {
		if (DEBUG && GM_log) {
			GM_log(message);
		}
	}

	function x(xpath, parent, type, result) {
		return document.evaluate(xpath, parent || document, null, type || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, result);
	}

	function remove(elm) {
		if (elm.snapshotItem) {
			for ( var i = 0; i < elm.snapshotLength; i++) {
				remove(elm.snapshotItem(i));
			}
		} else if (elm[0]) {
			while (elm[0]) {
				remove(elm[0]);
			}
		} else {
			elm.parentNode.removeChild(elm);
		}
	}

	var t = x('//div[@id="wp"]/div[@style]');
	for ( var i = 0; i < t.snapshotLength; i++) {
		var node = t.snapshotItem(i);
		log(node.style.height);
		if (node.style.height === '437px') {
			node.style.height = 'inherit';
			break;
		}
	}

	remove(x('//div[@style="padding:0 10px 10px;background:#d0dae4;"]/div[contains(@style,"height:90px")]'));
	remove(x('//div[contains(@style,"height:170px")]'));
	remove(x('.//div[@id="sitefocus"][@class="focus"]'));
})();
// ==UserScript==
// @name           spash extract tuing
// @namespace      org.eroim.essime
// @include        http://www.tiung.com/x/download.php?file=*
// @version        0.1.0
// ==/UserScript==
(function() {

	var code = x('/html/body/center/table[2]/tbody/tr/td/center/center/form/table/tbody/tr/td/font/b/font', 'code');
	var store = x('/html/body/center/table[2]/tbody/tr/td/center/center/form/table/tbody/tr/td[2]/font/strong/input', 'store');
	
	console.log(code[0].textContent);
	
	store[0].setAttribute('value', code[0].textContent);
	console.dir(store);
	
	function x(_xpath, msg) {
		var nodes = document.evaluate(_xpath, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodesArray = [];
		for ( var i = 0; i < nodes.snapshotLength; i++) {
			nodesArray.push(nodes.snapshotItem(i));
		}
		if (nodesArray.length < 1) {
			log.warn(msg + ": node array is NULL." + nodesArray.length);
			return null;
		} else {
			return nodesArray;
		}
	}
	
})();
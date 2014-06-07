// ==UserScript==
// @name kjclub list image openner
// @namespace org.positrium.gm
// @include http://*kjclub.com/*/club/targetBoardList.php*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.5
// ==/UserScript==
(function() {
	const ELEMENT_NODE = 1;
	const IMAGE_WIDTH = 100;
	const IMAGE_HEIGHT = 100;

	var list = x("/html/body/table[3]/tbody/tr/td[3]/table[4]/tbody");
	var clist = list.snapshotItem(0).childNodes;
	// GM_log(clist.length);
	var record = new Object();
	var p = 0;
	for (var i = 0; i < clist.length; i++) {
		if (i % 4 == 0) {
			// GM_log(i + " = " + clist[i] + " / " + clist[i].textContent);
			record[p] = clist[i];
			p++;
		}
	}

	const TITLE_AND_FILE = 3;
	// for (var i = 0; i < p; i++) {

	var get_uris = new Object();
	var change_nodes = new Object();

	for (var i = 0; i < p; i++) {
		var row = record[i];
		// GM_log("[msg_tr]=" + msg.textContent);
		var msg_elems = row.childNodes;
		var elem = msg_elems[TITLE_AND_FILE];
		// GM_log("[elem] " + TITLE_AND_FILE + " =" +elem.nodeName + " / " +
		// elem.textContent)
		var tail_item = elem.childNodes.length - 1;
		var file = elem.childNodes[tail_item];
		change_nodes[i] = elem.childNodes[2];

		if (file.nodeType == ELEMENT_NODE) {
			var get_uri = new String("");
			get_uris[i] = file.toString();
		} else {
			get_uris[i] = 'x';
		}
	}

	// =========== extracted URI and CHANGE NODE ======================

	for (var i in get_uris) {
		// ====== create IMG ===========
		if (get_uris[i] != 'x') {
			var img = document.createElement("img");
			img.setAttribute("src", get_uris[i]);
			img.setAttribute("border", "0");
			img.setAttribute("width", IMAGE_WIDTH);
			img.setAttribute("height", IMAGE_HEIGHT);
			// === end ==
			change_nodes[i].insertBefore(img, change_nodes[i].firstChild);
		} else {
//			var span = document.createElement("span");
//			change_nodes[i].insertBefore(span, change_nodes[i].firstChild);
		}
	}

	// ==============================
	function x(path, d) {
		if (!d)
			d = unsafeWindow;// document; // document is self.
		return document.evaluate(path, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	// ========== add from snippet ================
	new UpdateChecker({
				script_name : 'kjclub list image openner'
				,
				script_url : 'http://userscripts.org/scripts/source/42964.user.js' // required
				,
				current_version : '0.0.5' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/42964' // optional
			});
})();
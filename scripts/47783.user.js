// ==UserScript==
// @name kjclub bbs hidden
// @namespace org.positrium.gm
// @description hide bbs link
// @include http://*kjclub.com/*/club/*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.1
// ==/UserScript==
(function() {
	var ignore = {
		tname : 'bbs_board_717',
		bid : new Array(3, 5)
	}

	var result = new Object();
	if (params(window.location)['FILE'] == 'targetBoardWrite.php') {
		result = x('/html/body/center/table/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/b/a');
	} else {
		result = x('/html/body/table[3]/tbody/tr/td/table/tbody/tr[4]/td/table/tbody/tr/td/b/a');
	}
	// GM_log(result.snapshotLength);
	for (var i = 0; i < result.snapshotLength; i++) {
		var elem = result.snapshotItem(i);
		// var bid = document.createTextNode(param(elem.href)['bid']);
		// elem.appendChild(bid);

		for (var j = 0; j < ignore['bid'].length; j++) {
			// GM_log(ignore_bid[j]);
			if (params(elem.href)['tname'] == ignore['tname']) {
				if (params(elem.href)['bid'] == ignore['bid'][j]) {
					var b = elem.parentNode;
					var td = b.parentNode;
					var abone = document.createTextNode('- abone -');

					td.replaceChild(abone, b);
				}
			}
		}

	}

	// ========== add from snippet ================
	function params(str_url) {
		var url = new String(str_url);
		var PROTOCOL = 0, DOMAIN = 2, LANG = 3, FILE = 5;

		var array = new Array();

		var hostline = url.split("?")[0].split("/");
		array['PROTOCOL'] = hostline[PROTOCOL];
		array['DOMAIN'] = hostline[DOMAIN];
		array['LANG'] = hostline[LANG];
		array['FILE'] = hostline[FILE];

		// for(var i in hostline){
		// GM_log(i +" ; "+ hostline[i]);
		// }
		var paramline = url.split("?")[1].split("&");

		for (var i in paramline) {
			array[paramline[i].split("=")[0]] = paramline[i].split("=")[1];
		}

		return array;
	}

	// ========== add from snippet ================
	function x(path, d) {
		if (!d)
			d = unsafeWindow;// document; // document is self.
		return document.evaluate(path, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	// ========== add from snippet ================
	new UpdateChecker({
				script_name : 'kjclub bbs hidden' // required
				,
				script_url : 'http://userscripts.org/scripts/source/47783.user.js' // required
				,
				current_version : '0.0.1' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/47783' // optional
			});
})();
// ==UserScript==
// @name kjclub message mailman bridge
// @namespace org.positrium.gm
// @description bridge kjclub.com and mailman
// @include http://*kjclub.com/*/club/targetBoardRead.php?*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.3
// ==/UserScript==
(function() {
	var mailman = {
		path : "http://positrium.org/mailman/index.php",
		icon : 'data:image/gif;base64,'
				+ 'R0lGODlhDwAJAJEAAACZM////////wAAACH5BAEHAAIALAAAAAAPAAkAAAIYhI8Jwe1tgkIsvisX'
				+ 'ziuq6mnYkW3PhAIFADs='
	};

	var result = x('//td[@valign="top"][@rowspan="2"]//b');

	var names = new Array();
	var self_identify = new Object();
	// GM_log("result.len:" + result.snapshotLength);
	// for (var z = 0; z < result.snapshotLength; z++) {
	// GM_log(z + ":" + result.snapshotItem(z).textContent);
	// }
	var idx = 0;
	for (var i = 0; i < result.snapshotLength; i++) {
		if (9 <= i && i < (result.snapshotLength - 2)) {
			names[idx] = result.snapshotItem(i);
			idx++;
		} else if (i == result.snapshotLength - 1) {
			self_identify = result.snapshotItem(i).textContent
					.replace(/ /g, '');
			self_identify = self_identify.substr(0, self_identify.length - 1);
		}
	}

	// GM_log(names.length);
	// for (var j in names) {
	// GM_log(j + ":" + names[j].textContent);
	// }

	for (var k = 0; k < names.length; k++) {
		var dest_identify = names[k].textContent.replace(/ /g, '');
		if (self_identify != dest_identify) {
			var mail_link = cE('A', {
						href : mailman['path'] + "?id=" + self_identify
								+ "&dest=" + dest_identify,
						target : "_new"
					});
			var mail_icon = cE('img', {
						src : mailman['icon'],
						border : 0
					});

			mail_link.appendChild(mail_icon);
			names[k].appendChild(mail_link);
		}
	}

	// ========== add from snippet ================
	function cE(name, array) {
		var d = document.createElement(name);
		for (var i in array) {
			d.setAttribute(i, array[i]);
		}
		return d;
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
				script_name : 'kjclub message mailman bridge' // required
				,
				script_url : 'http://userscripts.org/scripts/source/47194.user.js' // required
				,
				current_version : '0.0.3' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/47194' // optional
			});

})();
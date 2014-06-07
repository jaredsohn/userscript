// ==UserScript==
// @name kjclub comment auto link
// @namespace org.positrium.gm
// @description modify start with http:// string to standard link on comment list
// @include http://*kjclub.com/*/club/targetBoardRead.php?*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.1.2
// ==/UserScript==
(function() {
	var result = new Object();

	result = x('/html/body/table[3]/tbody/tr/td[3]/form[2]/table/tbody/tr/td/table/tbody/tr[2]/td');
	// GM_log(result.snapshotLength);

	var ignore_idx = result.snapshotLength - 1;

	for (var i = 0; i < result.snapshotLength; i++) {
		if (i != ignore_idx) {
			// GM_log('=============== idx ' + i + ' ==============');
			var comment = result.snapshotItem(i);
			// GM_log(comment.textContent);
			var start_idx = comment.textContent.indexOf('http://');
			if (start_idx == -1) {
				var https_start_idx = comment.textContent.indexOf('https://');
				if (https_start_idx == -1) {
					// GM_log('continue');
					continue;
				} else {
					start_idx = https_start_idx;
				}
			}

			// console.log(comment.textContent);
			// . $ , ; : & = ? ! * ~ @ # _ ( )
			var content = comment.textContent;
			content = content.substr(start_idx);
			content.match(/([a-zA-Z0-9/.$,;:&=?!\*~\-@#_%+]+)/);
			// var end_idx = RegExp.$1.length;
//			GM_log("regexp=[" + RegExp.$1 + "]");
			// GM_log("start=" + start_idx + " / end=" + end_idx);

			var href = RegExp.$1;
			// GM_log("href=["+href+"]");

			var others = comment.textContent.split(href);

			/* check link type */
			var new_string = new Object();
			if (extCheck(href) == "IMAGE" && validDomain(href)) {
				new_string = cE('A', {
							href : href
						});

				var img = cE('IMG', {
							src : href,
							style : "border:0xp;",
							border : 0
						})
				new_string.appendChild(img);
			} else {
				var new_string = cE('A', {
							href : href,
							style : "text-decoration:none; color:blue;"
						});
				var text = document.createTextNode(href);
				new_string.appendChild(text);
			}

			/* replace element */
			var delete_elem = comment.childNodes;
			var delete_link = 0;// = new Object();
			for (var j = 0; j < delete_elem.length; j++) {
				if (delete_elem[j].nodeName == 'A') {
					delete_link = delete_elem[j];
				}
			}
			var new_td = cE('td', {
						height : 18,
						class : 'f12-2b2b2b',
						colspan : 2
					})

			/* cut and paste comment strings */
			var prefix = document.createTextNode(others[0]);
			var suffix = document.createTextNode(others[1]);
			new_td.appendChild(prefix);
			new_td.appendChild(new_string);
			new_td.appendChild(suffix);

			if (delete_link) {
				new_td.appendChild(delete_link);
			}

			var p = comment.parentNode;
			p.replaceChild(new_td, comment);

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

	function extCheck(url) {
		var ext = url.substr(url.lastIndexOf(".") + 1, url.length);
		var img_type = new Array("jpg", "jpeg", "gif", "png");
		var ret = "UNKNOWN";

		for (idx in img_type) {
			if (ext == img_type[idx]) {
				ret = "IMAGE";
				break;
			}
		}
		return ret;
	}

	function validDomain(url) {
		var ret = true;
//		var ignore_type = new Array("fc2\.com");

		var protocol = "http://";
		var tmp_url = url.substr(protocol.length);
		var domain_idx = tmp_url.indexOf("/");

		var domain = tmp_url.substr(0, domain_idx);
//		for (idx in ignore_type) {
//			if (domain.match(ignore_type[idx])) {
//				ret = false;
//			}
//		}
		return ret;
	}
	// ========== add from snippet ================
	new UpdateChecker({
				script_name : 'kjclub comment auto link' // required
				,
				script_url : 'http://userscripts.org/scripts/source/44082.user.js' // required
				,
				current_version : '0.1.2' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/44082' // optional
			});

})();
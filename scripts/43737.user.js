// ==UserScript==
// @name kjclub comment reply helper
// @namespace org.positrium.gm
// @description If you click commentator name , I'll insert your input form [Name Date > ].
// @include http://*kjclub.com/*/club/targetBoardRead.php?*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.4
// ==/UserScript==
(function() {
	var result = x('/html/body/table[3]/tbody/tr/td[3]/form[2]/table[2]/tbody/tr/td/table/tbody/tr[3]/td/textarea');
	if (result.snapshotLength > 0) {
		execute();
	}

	function execute() {
		var input = result.snapshotItem(0);
		input.setAttribute('id', 'comment_0f944b24');

		result = x('/html/body/table[3]/tbody/tr/td[3]/form[2]/table/tbody/tr/td/table/tbody/tr/td[@class="f12-2b2b2b"]');
		// GM_log(result.snapshotLength);

		// '-1' reason : last-item is comment-area
		for (var i = 0; i < result.snapshotLength - 1; i++) {
			if (i % 2 == 0) {
				var list = result.snapshotItem(i);
				// GM_log('----for[' + i + ']----');
				var str = new String();
				var cnode = list.childNodes;
				str = cnode[0].textContent.substr(1) + ' '
						+ cnode[2].textContent + " > ";

				// GM_log(str);
				var insert_a = cE('A', {
					onclick : 'document.getElementById(\'comment_0f944b24\').value=\''
							+ str + '\'',
					style : 'cursor:pointer !important;'
				});
				
				var space = document.createTextNode(' ');
				var insert_str = document.createTextNode('>');
				insert_a.appendChild(insert_str);
				
				var parent = list.parentNode;
				list.appendChild(space);
				list.appendChild(insert_a);
			}
		}
	}

	// ========== add from snippet ================
	function x(path, d) {
		if (!d)
			d = unsafeWindow;// document; // document is self.
		return document.evaluate(path, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	// ========== add from snippet ================
	function getAttr(elem) {
		var attr = new Array();
		attrs = elem.attributes;
		for (var i in attrs) {
			attr[attrs[i].name] = attrs[i].value;
		}
		return attr;
	}

	// debug
	function AR_log(array) {
		for (var i in array) {
			GM_log(i + '=' + array[i].nodeName);
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
	new UpdateChecker({
				script_name : 'kjclub comment reply helper'
				,
				script_url : 'http://userscripts.org/scripts/source/43737.user.js' // required
				,
				current_version : '0.0.4' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/43737' // optional
			});
})();
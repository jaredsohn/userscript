// ==UserScript==
// @name kjclub thread add some link
// @namespace org.positrium.gm
// @description direct access us.org:kjclub.com
// @include http://*kjclub.com/*/club/targetBoardRead.php?*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.4
// ==/UserScript==
(function() {
	var container = getContainer();

	var site = createButton(
			'javascript:location.href=\'http://userscripts.org/tags/kjclub\'',
			'?');
	var space = document.createTextNode(' ');
	container.appendChild(space);
	container.appendChild(site);

	function createButton(cmd, value) {
		var button = new Object();
		button = document.createElement('button');
		button.setAttribute('onclick', cmd);

		var label = document.createTextNode(value);
		button.appendChild(label);

		return button;
	}

	// ========== add from snippet ================
	function x(path, d) {
		if (!d)
			d = unsafeWindow;// document; // document is self.
		return document.evaluate(path, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	
	// ========== add from snippet ================
		function getContainer() {
			var result = x('/html/body/table[3]/tbody/tr/td[3]/table/tbody/tr');
			var container = result.snapshotItem(0);
			var td = new Object();
	
			var cnodes = container.childNodes;
			var btn_container = new Object();
			var td_count = 0;
	
			for (var i = 0; i < cnodes.length; i++) {
				if (cnodes[i].nodeName == 'TD') {
					td_count++;
				}
			}
	
			if (td_count < 2) {
				td = document.createElement('td');
				td.setAttribute('width', '50%');
				td.setAttribute('id', 'btn_0f944b24');
			} else {
				td = document.getElementById('btn_0f944b24');
			}
			container.appendChild(td);
	
			return td;
		}
	// ========== add from snippet ================
	new UpdateChecker({
				script_name : 'kjclub thread add some link'
				,
				script_url : 'http://userscripts.org/scripts/source/43562.user.js' // required
				,
				current_version : '0.0.4' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/43562' // optional
			});
})();
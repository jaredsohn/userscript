// ==UserScript==
// @name kjclub thread flip language location
// @namespace org.positrium.gm
// @description flip jp to kr, kr to jp.
// @include http://*kjclub.com/*/club/targetBoardRead.php?*
// @include http://*kjclub.com/*/club/targetBoardList.php?*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.6
// ==/UserScript==

(function() {
	var container = getContainer();

	// GM_log(locationFlip(locationCheck()));
	var flip = createButton('javascript:location.href=\''
					+ locationFlip(locationCheck()) + '\'', 'flip');
	var space = document.createTextNode(' ');
	
	container.appendChild(space);
	container.appendChild(flip);

	// ========== add from snippet ================
	function locationCheck() {
		var base = 'http://www.kjclub.com/';
		var loc = new String(window.location);
		var lang = loc.substr(base.length, 2);
		if (lang != 'jp' && lang != 'kr') {
			alert('plz input valid kj url !');
		}
		return lang;
	}

	function locationFlip(mode) {
		// http://www.kjclub.com/jp/club/targetBoardRead.php
		var location = new String(window.location);
		var pf_location = location.substr(0, 'http://www.kjclub.com/'.length);
		var sf_location = location.substr('http://www.kjclub.com/'.length + 2);
		var ret = '';
		if (mode == 'jp') {
			mode = 'kr';
		} else if (mode == 'kr') {
			mode = 'jp';
		}
		return pf_location + mode + sf_location;

	}

	function flip() {
		var mode = locationCheck();
		var url = locationFlip(mode);
		location.href = url;
	}
	// ========== add from snippet ================
	function x(path, d) {
		if (!d)
			d = unsafeWindow;// document; // document is self.
		return document.evaluate(path, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	// ========== add from snippet ================
	function createButton(cmd, value) {
		var button = new Object();
		button = document.createElement('button');
		button.setAttribute('onclick', cmd);

		var label = document.createTextNode(value);
		button.appendChild(label);

		return button;
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
				script_name : 'kjclub thread flip language location'
				,
				script_url : 'http://userscripts.org/scripts/source/43458.user.js' // required
				,
				current_version : '0.0.6' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/43458' // optional
			});
})();
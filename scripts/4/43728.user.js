// ==UserScript==
// @name kjclub list show real id
// @namespace org.positrium.gm
// @description show id ( not nickname ).
// @include http://*kjclub.com/*/club/targetBoardList.php?*
// @include http://*kjclub.com/*/club/targetBoardRead.php?*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.5
// ==/UserScript==
(function() {
	if (new String(window.location).indexOf('targetBoardList') > 0) {
		// LIST
		// var result = x('/html/body/table[3]/tbody/tr/td[3]/table[4]/tbody');
		var result = x('/html/body/table[3]/tbody/tr/td[3]/table[4]/tbody/tr/td[@class="f12-2b2b2b"][@width="81"][@align="center"]');

		for (var i = 0; i < result.snapshotLength; i++) {
			var targets = result.snapshotItem(i).childNodes;
			var target = targets[0];
			// extract id string
			var onclick = getAttr(target)['onclick'];
			// GM_log(onclick);

			var str = onclick.split(',')[0].split("'")[1];
			var id_s = str.indexOf('id=');
			str = str.substr(id_s);
			str = str.substr('id='.length);
			var id = document.createTextNode(str);

			// replace profile link text
			var prof = document.createTextNode('*');
			target.replaceChild(prof, target.firstChild);

			// change position
			var fchild = target.parentNode.firstChild;
			var parent = target.parentNode;
			parent.replaceChild(id, parent.firstChild);
			parent.appendChild(fchild);
		}

	} else if (new String(window.location).indexOf('targetBoardRead') > 0) {
		// VIEW
		var result = x('/html/body/table[3]/tbody/tr/td[3]/table[3]/tbody/tr/td[3]/a');
		var target = result.snapshotItem(0);
		var onclick = getAttr(target)['onclick'];
		// console.log(onclick);

		var str = onclick.split(',')[0].split("'")[1];
		var id_s = str.indexOf('id=');
		str = str.substr(id_s);
		str = str.substr('id='.length);
		var id = document.createTextNode(str);

		// replace profile link text
		var prof = document.createTextNode('*');
//		target.removeChild(target.firstChild);
		target.replaceChild(prof, target.firstChild);

		// change position
		var fchild = target.parentNode.firstChild;
		var parent = target.parentNode;
		parent.replaceChild(id, parent.firstChild);
		parent.appendChild(fchild);

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
	// ========== add from snippet ================
	new UpdateChecker({
				script_name : 'kjclub list show real id' // required
				,
				script_url : 'http://userscripts.org/scripts/source/43728.user.js' // required
				,
				current_version : '0.0.5' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/43728' // optional
			});
})();
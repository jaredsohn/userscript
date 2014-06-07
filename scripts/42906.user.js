// ==UserScript==
// @name kjclub comment check string length
// @namespace org.positrium.gm
// @include http://*kjclub.com/*/club/targetBoardRead.php*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.9
// ==/UserScript==

(function() {
	const ignore = new RegExp(/input/i);
	var mode = locationCheck();

	var elems = x("/html/body/table[3]/tbody/tr/td[3]/form[2]/table[2]/tbody/tr/td/table/tbody/tr/td");
	var name_tr = new Object();
	try {
		name_tr = elems.snapshotItem(0);

		var cNodes = name_tr.childNodes;

		var user_name = cNodes[5].textContent;

		var name = '';
		if (mode == 'jp') {
			name = 'j_tail';
		} else if (mode == 'kr') {
			name = 'k_tail';
		}
		var textarea = document.getElementsByName(name)[0];
		textarea.style.background = "#fcc";

		document.addEventListener('keyup', function(e) {
					var date = new Date();
					var month = date.getMonth() + 1;
					var dates = date.getDate();
					var hours = date.getHours();
					var minutes = date.getMinutes();
					var seconds = date.getSeconds();
					
					if (month < 10) {
						month = "0" + month;
					}
					
					if(dates < 10){
						dates = "0"+dates;
					}
					
					if(hours < 10){
						hours = "0"+hours;
					}
					
					if(minutes < 10){
						minutes = "0"+minutes;
					}
					
					if(seconds < 10){
						seconds = "0"+seconds;
					}
					
					var base = month+"-"+dates+" "+hours+":"+minutes+"."+seconds;
					if (ignore.test(e.target.tagName))
						return;
					cNodes[5].textContent = user_name + " ( "
							+ validate(textarea.value) + "/240byte ) " + base;
				}, false);
	} catch (e) {
		// GM_log(e);
	}

	function validate(v) {
		var count1 = textbyte(v);
		if (count1 > 240) {
			alert('message length: ' + count1 + '. Its over :D .');
		}
		return count1;
	}

	function textbyte(str) {
		count = 0;
		for (i = 0; i < str.length; i++)
			(escape(str.charAt(i)).length < 4) ? count++ : count += 2;
		return count;
	}

	function locationCheck() {
		var base = 'http://www.kjclub.com/';
		var loc = new String(document.location);
		var lang = loc.substr(base.length, 2);
		if (lang != 'jp' && lang != 'kr') {
			alert('plz input valid kj url !');
		}
		return lang;
	}

	function x(path, d) {
		if (!d)
			d = unsafeWindow;// document; // document is self.
		return document.evaluate(path, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	// ========== add from snippet ================
	new UpdateChecker({
				script_name : 'kjclub comment check string length' // required
				,
				script_url : 'http://userscripts.org/scripts/source/42906.user.js' // required
				,
				current_version : '0.0.9' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/42906' // optional
			});
})();
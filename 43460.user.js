// ==UserScript==
// @name kjclub thread delete this
// @namespace org.positrium.gm
// @description delete page watching now.
// @include http://*kjclub.com/*/club/targetBoardRead.php?*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.6
// ==/UserScript==

(function() {
	var result = new Object();
	result = x('/html/body/table[3]/tbody/tr/td[3]/table[6]/tbody/tr[2]/td/table/tbody/tr/td[2]');
	var is_page_broken = (result.snapshotLength == 0)?true:false;
	
	result = x('/html/body/table[3]/tbody/tr/td[3]/table[3]/tbody/tr/td[3]');
	var author = result.snapshotItem(0).textContent.replace(/ \*/g,"");
	result = x('/html/body/table[3]/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr/td/b/font');
	var self_id = result.snapshotItem(0).textContent;
	var is_self_author = (author==self_id)?true:false;
			
	
	if (is_page_broken && is_self_author) {
		execute();
	}

	function execute() {
		var container = getContainer();

		var del_url = "http://www.kjclub.com/" + locationCheck()
				+ "/club/pds/gradeBoardDelete.php";
		var obj = new ParamSeparator();
		obj.setURL(new String(window.location));
		var items = obj.getParamArray();
		var new_location = createDirectMethod(del_url, items);

		var del_btn = createButton('javascript:location.href=\'' + new_location
						+ '\'', 'delete this');
		var space = document.createTextNode(' ');

		container.appendChild(space);
		container.appendChild(del_btn);
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
	function locationCheck() {
		var base = 'http://www.kjclub.com/';
		var loc = new String(window.location);
		var lang = loc.substr(base.length, 2);
		if (lang != 'jp' && lang != 'kr') {
			alert('plz input valid kj url !');
		}
		return lang;
	}

	// ========== add from snippet ================
	function createDirectMethod(base, items) {
		var retval = base;
		retval += '?bb_uid=' + items['bb_uid'];
		retval += '&tname=' + items['tname'];
		retval += '&bid=' + items['bid'];
		retval += '&kind=' + items['kind'];
		retval += '&re_url_num=' + items['number'];

		return retval;

	}

	// ========== add from snippet ================
	function x(path, d) {
		if (!d)
			d = unsafeWindow;// document; // document is self.
		return document.evaluate(path, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	// ========== add from snippet ================
	function ParamSeparator() {
		this.setURL = function(url) {
			this.url = url;
		}

		this.getURL = function(url) {
			var retVal = 'undefined';
			if (this.url.length > 0) {
				retVal = this.url;
			}

			return retVal;
		}

		this.getParamArray = function() {
			// alert('this.url:'+this.url);
			var start = this.url.indexOf('?') + 1;
			var param_line = this.url.substr(start);
			// alert(param_line);
			var param_array = param_line.split('&');

			var items = new Array();
			var keys = new Array();
			for (var i = 0; i < param_array.length; i++) {
				param = param_array[i];
				pair = param.split('=');
				items[pair[0]] = pair[1];
				keys[i] = pair[0];
			}
			// alert('item.length:' + items.length);
			return items;
		}

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
				script_name : 'kjclub thread delete this',
				script_url : 'http://userscripts.org/scripts/source/43460.user.js' // required
				,
				current_version : '0.0.6' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/43460' // optional
			});
})();
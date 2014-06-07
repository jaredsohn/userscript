// ==UserScript==
// @name kjclub thread check wallpapering
// @namespace org.positrium.gm
// @description kjclub thread check wallpapering
// @include http://*kjclub.com/*/club/targetBoardWrite.php?*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.1
// ==/UserScript==
(function() {
	var result = x('/html/body/center/table/tbody/tr/td[3]/table[3]/tbody/tr[2]/td[2]/table');
	var def_submit = result.snapshotItem(0);
	var new_submit = createButton('javascript:void(0);', "submit");
	// ========== add from snippet ================
	new_submit.addEventListener('click', function(e) {
				new_submit.setAttribute("disabled", "disabled");
				timeCheck();
			}, false);
	var parent_s = def_submit.parentNode;
	parent_s.replaceChild(new_submit, def_submit);

	result = x('/html/body/center/table/tbody/tr/td[3]/table[3]/tbody/tr[2]/td[3]/table');
	var def_cancel = result.snapshotItem(0);
	var new_cancel = createButton('javascript:history.back()', "cancel");
	var parent_c = def_cancel.parentNode;
	parent_c.replaceChild(new_cancel, def_cancel);

	// ========== add from snippet ================
	function cE(name, array) {
		var d = document.createElement(name);
		for (var i in array) {
			d.setAttribute(i, array[i]);
		}
		return d;
	}

	function timeCheck() {
		var max_count = 4;

		var loc = new String(window.location);
		var sep = new ParamSeparator();
		sep.setURL(loc);
		var param = sep.getParamArray();
		// GM_log(param['tname']);
		// time check core
		var now = new Date();
		// GM_log(param['tname'] + '[' + param['bid'] + "]=" + now.getHours()
		// + ":" + now.getMinutes());
		var key = param['tname'] + '[' + param['bid'] + "]";
		var val = (now.getHours() + ":" + now.getMinutes()).toString();

		var result_min = -1;
		if (GM_getValue(key + "." + max_count)
				&& GM_getValue(key + "." + max_count).split(":").length >= 2) {
			var top = GM_getValue(key + "." + max_count);
			var times = top.split(":");
			var HOUR = 0, MIN = 1;

			var now_getHours = now.getHours();
			if(now_getHours < times[HOUR]){
				// 0 - 23 = -23 --> 24 - 23 = 1
				now_getHours += 24;
			}
			result_min = ((now_getHours - times[HOUR]) * 60)
					+ (now.getMinutes() - times[MIN]);

		}

		GM_log(result_min);

		// 0 - 23 = -23*60 + -5 = -138 - 59 = - 197
		if (0 < result_min && result_min <= 60) {
			alert("caution : wall papering judge !\n" + "at least "
					+ (60 - result_min) + " mins.\n"
					+ " click [OK] then back list-page.");
			location.href = "/" + locationCheck()
					+ "/club/targetBoardList.php?tname=" + param['tname']
					+ "&bid=" + param['bid'];
		} else {

			if (GM_getValue(key + ".1")) {
				// when key.1 was fill
				for (var i = max_count; i > 1; i--) {
					var set_key = key + "." + i;
					var get_key = key + "." + (i - 1);
					GM_setValue(set_key, (!GM_getValue(get_key))
									? "-- reserve --"
									: GM_getValue(get_key));
					// GM_log(set_key + " / " + get_key);
				}
			}
			GM_setValue(key + ".1", val);

			var result = x('/html/body/center/table/tbody/tr/td[3]/table/form');
			var form = result.snapshotItem(0);
			form.submit();
		}
		GM_log(GM_listValues());
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
	function x(path, d) {
		if (!d)
			d = unsafeWindow;// document; // document is self.
		return document.evaluate(path, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	// ===== add from snippet ======
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
	function locationCheck() {
		var base = 'http://www.kjclub.com/';
		var loc = new String(window.location);
		var lang = loc.substr(base.length, 2);
		return lang;
	}

	new UpdateChecker({
				script_name : 'kjclub thread check wallpapering' // required
				,
				script_url : 'http://userscripts.org/scripts/source/47354.user.js' // required
				,
				current_version : '0.0.1' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/47354' // optional
			});
})();
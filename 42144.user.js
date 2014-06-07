// ==UserScript==
// @name           twkkyd_for_Opera
// @namespace      http://ss-o.net/
// @description    unread item highlight at twitter with_frends page.
// @include        http://twitter.com/
// @version        1.3
// ==/UserScript==
//
// this script based on twkkyd ( http://userscripts.org/scripts/show/10744 )
// by  swdyh http://d.hatena.ne.jp/swdyh/
// version: 0.0.6 2007-07-18T20:02:45+09:00
//

(function(){

	var UNREAD_STYLE = 'border-bottom:3px double #004080;';
	var DUPLICATE_BACKGROUND_STYLE = '#aaaaaa !important';
	var DUPLICATE_OPACITY_STYLE = '0.5';
	var DUPLICATE_VISIBILITY_STYLE = 'collapse';

	var _KEY = 'userjs_kkyd';

	function setValue(name, value) {
		document.cookie = [
			name, '=', escape(value),
			';expires=', (new Date(new Date().getTime() + 365 * 1000 * 60 * 60 * 24)).toGMTString()
		].join('');
	}
	function getValue(name, value) {
		var r = new RegExp(name + '=([^;]*)'), m;
		if (m = document.cookie.match(r)) {
			return unescape(m[1]);
		}
		return value;
	}
	function delValue(name, value) {
		if (getValue(name, false))
			document.cookie = name + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
	}

	function addStyle(css) {
		var head = document.getElementsByTagName('head');
		if (head.length) {
			var style = document.createElement('style');
			style.type = 'text/css';
			style.textContent = css;
			head[0].appendChild(style);
		}
	}

	var loaded = {};

	var latest = $x('//li[contains(@class,"hentry")][1]')[0];
	if (latest) {
		var latest_id = parseInt(latest.id.split('_')[1]);
		var prev_id = getValue(_KEY) || 0;
		if (prev_id) {
			var filter = function(doc) {
				setStyle(prev_id, doc);
			}
			filter();
			var _filter = function(docs) {
				docs.forEach(function(d){filter(d);});
			};
			window.addEventListener('AutoPatchWork.DOMNodeInserted',function(e){
				filter(e.target);
			},false);
			window.addEventListener('AutoPagerize_DOMNodeInserted',function(e){
				filter(e.target);
			},false);
		}
		setKkyd(latest_id);
	}

	function setKkyd(id) {
		var prev = getValue(_KEY) || 0;
		if (id > prev) {
			setValue(_KEY, id);
		}
	}

	function setStyle(id, doc) {
		var style = [];
		$x('descendant-or-self::li[contains(@class,"hentry")]', doc).forEach(function(entry,i){
			var itemId = parseInt(entry.id.split('_')[1]);
			if(!loaded[itemId]) {
				if(itemId && itemId > id) {
					style.push('#timeline #' + entry.id + ' {' + UNREAD_STYLE +'}');
				}
				loaded[itemId] = true;
			} else {
				entry.style.background= DUPLICATE_BACKGROUND_STYLE ;
				entry.style.opacity = DUPLICATE_OPACITY_STYLE;
			}
		});
		addStyle(style.join('\n'));
	}

	function log(message) {
		if(window.opera) {
			opera.postError(message);
		} else if (typeof console != 'undefined') {
			console.log(message)
		}
	}

	function $x(xpath, node) {
		node || (node = document);
		var nodesSnapshot = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var data = [];
		for (var i = 0,l = nodesSnapshot.snapshotLength; i < l; i++) {
			data.push(nodesSnapshot.snapshotItem(i));
		}
		return data;
	}

})()

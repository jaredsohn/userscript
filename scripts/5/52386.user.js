// ==UserScript==
// @name           create oquno's favorites
// @namespace      http://d.hatena.ne.jp/Uchimata/
// @description    http://oq.la/temp/fav.php
// @include        http*://twitter.com/*
// @include        http://favotter.matope.com/*
// @version        1.0.0
// ==/UserScript==


(function(){

	var DEBUG = false;

	var w = window, d = document;
	if (typeof unsafeWindow != 'undefined') w = unsafeWindow;
	function debug() { try{ w.console.log(arguments)   } catch(e) {} }
	function error() { try{ w.console.error(arguments) } catch(e) {} }

	function get_stars() {
//		return $X('//*[contains(concat(" ",normalize-space(@class)," "), " non-fav ") or contains(concat(" ",normalize-space(@class)," "), " fav ")]') || []; /**/
		return $X('//*[contains(concat(" ",normalize-space(@class)," "), " non-fav ")]') || []; /**/
	}

	function check_stars() {
		DEBUG && debug(arguments.callee, 'stars', stars.length, 'get_stars', get_stars().length);

		if (stars.length == get_stars().length) return;
		else add_oqunoEvent(stars = get_stars());
	}

	function add_oqunoEvent(stars) {
		DEBUG && debug(arguments.callee, stars.filter(function(s){ return s._oqunoed === undefined }));

		stars.filter(function(s){ return s._oqunoed === undefined }).forEach(function(s) {
			s.addEventListener('click', function(){ create_oqunoFav(this) }, false);
//			s._oqunoed = s.className.match(/non-fav/) ? false : true;
			s._oqunoed = false;
		});
	}

	function create_oqunoFav(s) {
		var status_id = null;
		if (s.id.match(/^(?:fav-|status_star_)(\d+)$/) || location.href.match(/(\d+)$/))
			status_id = RegExp.$1;

		//var url = 'http://oq.la/temp/' + (s._oqunoed ? 'un' : '') + 'fav.php?id=';

		GM_xmlhttpRequest({
			method : 'get',
			url    : 'http://oq.la/temp/fav.php?id=' + status_id,
			onload : function(res) {
				//s._oqunoed = !s._oqunoed;
				s._oqunoed = true;
				debug('oqunoed - ' + status_id + ' - ' + res.status);
			},
			onerror: function(res) {
				error('oqunofav failed - ' + status_id + ' - ' + res.status);
			},
		});
	}

	function $X(exp, context) {
		if (!context) context = document;
		var doc = context.ownerDocument || context;
			var resolver = function (prefix) {
				var o = document.createNSResolver(context)(prefix);
				return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
			}
		var exp = doc.createExpression(exp, resolver);

/*
		var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
		switch (result.resultType) {
			case XPathResult.STRING_TYPE : return result.stringValue;
			case XPathResult.NUMBER_TYPE : return result.numberValue;
			case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
			case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
*/
				var result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var ret = [];
				for (var i = 0, len = result.snapshotLength; i < len ; i++) {
					s = result.snapshotItem(i);
					ret.push(s.wrappedJSObject || s); // GOKUAKU SOLUTIONS
				}
				return len != 0 ? ret : null;
/*
			}
		}
		return null;
*/
	}

	var stars = [];
	check_stars();

	DEBUG && debug(arguments.callee, stars);

	setInterval(check_stars, 5000);

})()

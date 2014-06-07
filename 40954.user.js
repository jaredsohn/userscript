// ==UserScript==
// @name        Hatena: Ignore Ids
// @description Remove the id from our world.
// @namespace   http://lowreal.net/
// @include     http://d.hatena.ne.jp/*
// @include     http://h.hatena.ne.jp/*
// @require     http://svn.coderepos.org/share/lang/javascript/jsdeferred/trunk/jsdeferred.userscript.js
// @require     http://gist.github.com/3238.txt#$X
// @require     http://gist.github.com/49453.txt#createHTMLDocument
// ==/UserScript==
(function () { with (D()) {
//

var yourid = (function () {
	var ret = GM_getValue("yourid");
	if (!ret) ret = prompt("Your hatena id:");
	GM_setValue("yourid", ret);
	return ret;
})();


function getCachedResource (uri, expire, convertfun) {
	var d   = Deferred();
	var key = uri;
	var v   = {};
	try { v = eval(GM_getValue(key, "({})")) || {} } catch (e) { log("parse error: may be uneval bug"); v = {}; }
	d.clear = function () {
		GM_setValue(key, "");
		return this;
	};
	if (v.time && v.time > (new Date).getTime() - expire) {
		log("Cache Hitted: " + key);
		setTimeout(function () { d.call(v.body); }, 10);
	} else {
		log("Cache expired; getting... " + key);
		GM_xmlhttpRequest({
			method  : "GET",
			url     : uri,
			headers : {
			},
			onload  : function (req) { try {
				var res = convertfun(req.responseText);
				GM_setValue(key, uneval({time:(new Date).getTime(), body:res}));
				log(key, uneval({time:(new Date).getTime(), body:res}));
				log("Cached: " + key);
				d.call(res);
			} catch (e) { d.fail(e) } },
			onerror : function (e) {
				d.fail("HTTPError:"+e);
			}
		});
	}
	return d;
}

getCachedResource("http://b.hatena.ne.jp/" + yourid + "/config", duration("1 day"), function (text) {
	var doc = createDocumentFromString(text);
	var ignore_users = $X(".//input[@name='ignore_users']", doc)[0];
	return ignore_users.value.split("|");
}).
next(function (ignore_users) {
	function isIgnored (id) {
		return (" " + ignore_users.join(" ") + " ").indexOf(" " + id + " ") != -1;
	}

	if (location.hostname == "h.hatena.ne.jp") {
		var hide_entries = function () {
			$X(".//div[@class='entry'][contains(' " + ignore_users.join(" ") + " ',concat(' ', div/div/span[@class='username']/a,' '))]", Array).forEach(function (e) {
				e.parentNode.removeChild(e);
			});
		};
		hide_entries();
		unsafeWindow.Hatena.Haiku.Pager.addEventListener('loadedEntries', hide_entries);
	}

	if (location.hostname == "d.hatena.ne.jp") {
		var id = location.pathname.split("/")[1];
		if (isIgnored(id)) {
			document.documentElement.innerHTML = "";
			return xhttp.get("http://d.hatena.ne.jp/hatena404/").next(function (req) {
				document.documentElement.innerHTML = req.responseText;
			});
		}
	}

	return null;
}).
error(function (e) {
	log(e);
});


} // end with


function createDocumentFromString (s) {
	s = String(s).replace(/<script[ \t\r\n<>][\S\s]*?<\/script(?:[ \t\r\n]*>|[ \t\r\n]+)|<(?:i?frame|html|object|script)(?:[ \t\r\n][^<>]*(?:>|(?=<))|[ \t\r\n]*>)|<\/(?:i?frame|html|object|script)(?:[ \t\r\n]*>|[ \t\r\n]+)/gi, '');
	var d = createHTMLDocument();
	if (d) {
		var child, root = d.documentElement;
		while ((child = root.firstChild)) root.removeChild(child);
		var r = d.createRange();
		r.selectNodeContents(root);
		root.appendChild(r.createContextualFragment(s));
		return d;
	} else {
		throw "createHTMLDocument failed.";
	}
}

function duration (str) {
	var ret = 0, map = {
		sec : 1, min : 60, hour : 3600, day : 86400, week : 604800, month : 2592000, year : 31536000
	};
	str.replace(/(\d+)\s*(msec|sec|min|hour|day|week|month|year)s?/g, function (_, num, unit) {
		ret += +num * map[unit];
	});
	return ret * 1000;
}

function log () {
	var o = Array.prototype.concat.apply([], arguments);
	if (unsafeWindow.console) {
		unsafeWindow.console.log(o.join(", "));
	}
	if (typeof(GM_log) != "undefined") {
		GM_log(o);
	}
}

})();

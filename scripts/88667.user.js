// ==UserScript==
// @name           Includes: goo.gl urlshortener
// @namespace      http://stive.knoxx.net
// @include        qqqqqq
// ==/UserScript==


function getAuthToken(b) {
	function c() {
		for (var a = arguments, l = 0, m = 0; m < a.length; m++) l = l + a[m] & 4294967295;
		return l
	}
	function e(l) {
		for (var m = 5381, o = 0; o < l.length; o++) m = c(m << 5, m, l.charCodeAt(o));
		return m
	}
	function f(l) {
		for (var m = 0, o = 0; o < l.length; o++) m = c(l.charCodeAt(o), m << 6, m << 16, -m);
		return m
	}
	function d(l) {
		var o = 0,
			n = false,
			m = l = String(l > 0 ? l : l + 4294967296);
		for (var p = m.length - 1; p >= 0; p--) {
			var q = Number(m.charAt(p));
			if (n) {
				q *= 2;
				o += Math.floor(q / 10) + q % 10
			} else {
				o += q
			}
			n = !n
		}
		m = o % 10;
		o = 0;
		if (m != 0) {
			o = 10 - m;
			if (l.length % 2 == 1) {
				if (o % 2 == 1) o += 9;
				o /= 2
			}
		}
		return String(o) + l
	}
	var i = e(b),
		h = f(b),
		k;
	i = i >> 2 & 1073741823;
	i = i >> 4 & 67108800 | i & 63;
	i = i >> 4 & 4193280 | i & 1023;
	i = i >> 4 & 245760 | i & 16383;
	k = (i >> 2 & 15) << 4 | h & 15;
	k |= (i >> 6 & 15) << 12 | (h >> 8 & 15) << 8;
	k |= (i >> 10 & 15) << 20 | (h >> 16 & 15) << 16;
	k |= (i >> 14 & 15) << 28 | (h >> 24 & 15) << 24;
	return "7" + d(k)
}
Shortener = function (url){
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://goo.gl/api/url?user=toolbar@google.com&url=" + encodeURIComponent(url) + "&auth_token=" + getAuthToken(url),
		headers: {
			"Origin": "chrome-extension://iblijlcdoidgdpfknkckljiocdbnlagk",
			"User-Agent": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.29 Safari/533.4"
		},
		onload: function(r) {
			resHandler(r.responseText)
		}
	});

    return ShortenUrl;
}
resHandler = function(ob){
    var obj = eval("("+ ob +")");
    alert(obj.short_url);
}
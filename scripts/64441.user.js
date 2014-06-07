test = 'erik';
// @erigk test
// ==UserScript==
// @name			Goo.gl Fix
// @namespace		goo.glFix
// @include			http://goo.gl/*
// @match			http://goo.gl/*
test1 = "erik";
// @datecreated		2009-12-17
// @lastupdated		2010-06-29
// @version			0.1.3
// @author			Erik Vergobbi Vold
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description		Fixes goo.gl so that you can create goo.gl short urls.
// ==/UserScript==

(function(){
	var getUrlShorteningRequestParams = function (b){
		function c(){
			for (var l = 0, m = 0; m < arguments.length; m++) l = l + arguments[m] & 4294967295;
			return l
		};

		function d(l){
			l = l = String(l > 0 ? l : l + 4294967296);
			var m;
			m = l;
			for (var o = 0, n = false, p = m.length - 1; p >= 0; --p) {
				var q = Number(m.charAt(p));
				if (n) {
					q *= 2;
					o += Math.floor(q / 10) + q % 10
				} else o += q;
				n = !n
			}
			m = m = o % 10;
			o = 0;
			if (m != 0) {
				o = 10 - m;
				if (l.length % 2 == 1) {
					if (o % 2 == 1) o += 9;
					o /= 2
				}
			}
			m = String(o);
			m += l;
			return l = m;
		};

		function e(l){
			for (var m = 5381, o = 0; o < l.length; o++) m = c(m << 5, m, l.charCodeAt(o));
			return m;
		};

		function f(l) {
			for (var m = 0, o = 0; o < l.length; o++) m = c(l.charCodeAt(o), m << 6, m << 16, -m);
			return m;
		};

		var h = {
			byteArray_: b,
			charCodeAt: function (l) {
				return this.byteArray_[l]
			}
		};

		h.length = h.byteArray_.length;
		var i = e(h.byteArray_);
		i = i >> 2 & 1073741823;
		i = i >> 4 & 67108800 | i & 63;
		i = i >> 4 & 4193280 | i & 1023;
		i = i >> 4 & 245760 | i & 16383;
		var j = "7";
		h = f(h.byteArray_);
		var k = (i >> 2 & 15) << 4 | h & 15;
		k |= (i >> 6 & 15) << 12 | (h >> 8 & 15) << 8;
		k |= (i >> 10 & 15) << 20 | (h >> 16 & 15) << 16;
		k |= (i >> 14 & 15) << 28 | (h >> 24 & 15) << 24;
		j += d(k);
		return j;
		return i;
	};

	var	xmlhttp = new XMLHttpRequest();

	function shortify(url,callback){
		url=url.replace(/(^\s+|\s+$)/i,'');
		if(!url.length) return;
		var auth_token = getUrlShorteningRequestParams(url);
		var urlEscaped = escape(url).replace(/\+/g,"%2B");
		var req=new XMLHttpRequest();
		var url = "http://goo.gl/api/url?user=toolbar@google.com&url=" + urlEscaped;
		url += "&auth_token=" + auth_token;

		if(GM_xmlhttpRequest){
			GM_xmlhttpRequest({
				method: "POST",
				url: url,
				headers: {
				"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: callback
			});
		}
		else{
			xmlhttp.open("POST", url, false);
			xmlhttp.onload = callback;
			xmlhttp.send(null);

		}
	};

	var header = document.evaluate("//body/h1",document,null,9,null).singleNodeValue;
	if(!header) return;

	var div = document.createElement('div');
	div.innerHTML = '<div>'+
		'<form id="googlFixForm" method="get" onSubmit="return false;" action="">'+
			'<label for="googlFixURL">URL:</label>'+
			'<input id="googlFixURL" type="text" name="url" size="75" />'+
			'<input id="googlFixBtn" type="button" value="Shorten" />'+
		'</form>'+
		'<div id="googlFixOutput">&nbsp;</div>'+
		'</div>';

	var before = header.nextSibling;
	header.parentNode.insertBefore( div, before );

	var getShortURL = function(){
		var url = document.getElementById('googlFixURL').value;
		shortify( url, function(response){
			var object = eval('(' + response.responseText + ')');
			var output = document.getElementById('googlFixOutput');

			if(object.short_url == undefined) output.innerHTML = object.error_message;
			else output.innerHTML = "Goo.gl Short URL for " + 
				'<a href="' + url + '">' + url + '</a>' +
				" is " +
				'<a href="' + object.short_url + '">' + object.short_url + '</a>';
		});
		return false;
	};

	document.getElementById('googlFixForm').addEventListener('submit',function(e){
		e.preventDefault();
		getShortURL();
		return false;
	},false);

	document.getElementById('googlFixBtn').addEventListener('click',getShortURL,false);

	var qs = window.location.search.match(/^[\?&]{0,1}url=((?:[^&]|&amp;)*)/i);
	if(qs){
		qs = unescape(qs[1]);
		qs=qs.replace(/(^\s+|\s+$)/i,'');
		if(qs.length){
			document.getElementById('googlFixURL').value = qs;
			getShortURL();
		}
	}

	var temp=document.evaluate("//p[text()='Google URL Shortener is currently available for Google products and not for broader consumer use.']",document,null,9,null).singleNodeValue;
	temp.parentNode.removeChild(temp);
})();
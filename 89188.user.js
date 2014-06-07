// ==UserScript==
// @name           voz chrome
// @namespace      http://http://userscripts.org/scripts/show/89188
// @autor          merrymenvn
// @include        http://*
// @date           19/11/2010	
// @version                0.0.2
				   vver = '0.0.2';
				  vdata = '19/11/2010';
// ==/UserScript==
var Url = {
 
	// public method for url encoding
	encode : function (string) {
		return escape(this._utf8_encode(string));
	},
 
	// public method for url decoding
	decode : function (string) {
		return this._utf8_decode(unescape(string));
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}
var old_url = window.location.href;
if (old_url.indexOf("http://vozforums.com/redirect/index.php?link=") == 0) {
    pos = old_url.indexOf('=');
    new_url = old_url.substr(pos + 1);
    window.location.href = Url.decode(new_url);
}
if (old_url.indexOf("http://vozforums.com/specials/intro.php?next=") == 0) {
    pos = old_url.indexOf('=');
    new_url = old_url.substr(pos + 1);
    window.location.href = "http://vozforums.com" + Url.encode(new_url);
}
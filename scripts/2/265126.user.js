// ==UserScript==
// @name Straight Webmusic.in
// @id	straight_webmusicin_xifos
// @namespace	  in.co.tossing.toolkit.webmusic
// @description	Remove URL redirection from Webmusic.in
// @license	GPL v3 or later version
// @updateURL	  http://userscripts.org/scripts/source/265126.user.js
// @include		*://www.webmusic.in/*
// @include		*://webmusic.in/*
// @version	0.1
// @author	XiFoS
// ==/UserScript==

(function (d) {
	var b64array = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv" + "wxyz0123456789+/" + "=";
	var all_a = d.getElementsByTagName('a');
	var a = null;
	var match;
	for(i = 0; i < all_a.length; i++) {
		a = all_a.item(i);
		if(a.href) {
			match = a.href.match(/download\.php\?qHs=([A-Za-z0-9\+\/\=]+)&/);
			console.error(a.href, match);
			if(match) {
				a.href = decode64(match[1]);
			}
		}
	}

	function decode64(input) {
		var output = "";
		var hex = "";
		var chr1, chr2, chr3 = "";
		var enc1, enc2, enc3, enc4 = "";
		var i = 0;
		do {
			enc1 = b64array.indexOf(input.charAt(i++));
			enc2 = b64array.indexOf(input.charAt(i++));
			enc3 = b64array.indexOf(input.charAt(i++));
			enc4 = b64array.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if(enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if(enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
			chr1 = chr2 = chr3 = "";
			enc1 = enc2 = enc3 = enc4 = "";
		} while (i < input.length);
		return output;
	}
})(document);
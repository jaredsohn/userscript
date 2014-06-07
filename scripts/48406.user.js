// ==UserScript==
// @name           B2T - Buschfunk to Twitter
// @namespace      http://www.jakobd.de
// @description    Schickt abgesendete Nachrichten beim Buschfunk direkt zu eurem Twitter-Account
// @include        http://*.schuelervz.net/Start*
// @include	   http://*.studivz.net/Start*
// @include	   http://*.meinvz.net/Start*
// ==/UserScript==

var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
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
}

GM_registerMenuCommand( unescape("B2T: Daten zur%FCcksetzen"), reset );

function reset() {
	GM_setValue("user", "");
	GM_setValue("pass", "");
	alert(unescape("Daten zur%FCckgesetzt!"));
}

if(GM_getValue("user") == null || GM_getValue("user") == "") {
alert(unescape("-- B2T-Userscript --%0A%0ASie m%FCssen einmalig ihre Twitter-Daten angeben.%0A%0ADiese werden ausschlie%DFlich lokal gespeichert.%0A%0ASie k%F6nnen diese Daten wieder l%F6schen mit einem Rechtsklick auf den Greasemonkey-Affen -%3E Benutzerskript-Befehle -%3E B2T%3A Daten zur%FCcksetzen"));
var user = prompt("Twitter-Username", "");
var pass = prompt("Twitter-Passwort", "");
GM_setValue("user", user);
GM_setValue("pass", pass);
}

var user = GM_getValue("user");
var password = GM_getValue("pass");

var statustextarea = document.getElementById("Mod-Feedbox-Textarea");
var baseauth = Base64.encode(user + ":" + password);

function twitfunc() {
	var status = statustextarea.value;
	GM_xmlhttpRequest({
	    method: "POST",
	    url: "http://twitter.com/statuses/update.xml",
	    headers: {
	    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
	    'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization':'Basic ' + baseauth,
	    },
	    data: encodeURI("status=" + status)
	})
}

var buttonnode = document.getElementById("Feeds-Buttons");
var speicherbutton = buttonnode.childNodes[1].childNodes[1];

speicherbutton.value = "speichern und zu twitter senden";
speicherbutton.addEventListener("click", twitfunc, false);

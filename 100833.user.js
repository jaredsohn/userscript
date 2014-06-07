// ==UserScript== 
// @name          EOLRC4
// @version       2.2
// @namespace     eolrc4
// @description   Sistema de cifrado para EOL
// @include       http://www.elotrolado.net/hilo_*
// @include       http://www.elotrolado.net/posting.php*
// @match         http://www.elotrolado.net/hilo_*
// @match         http://www.elotrolado.net/posting.php*
// ==/UserScript== 

var EOLRC4 = function() {

/* RC4 symmetric cipher encryption/decryption
 * Copyright (c) 2006 by Ali Farhadi.
 * released under the terms of the Gnu Public License.
 * see the GPL for details.
 *
 * Email: ali[at]farhadi[dot]ir
 * Website: http://farhadi.ir/
 */

rc4Encrypt = function(key, pt) {
	s = new Array();
	for (var i=0; i < 256; i++) {
		s[i] = i;
	}
	var j = 0;
	var x;
	for (i=0; i<256; i++) {
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
	};
	i = 0;
	j = 0;
	var ct = "";
	for (var y=0; y<pt.length; y++) {
		i = (i + 1) % 256;
		j = (j + s[i]) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		ct += String.fromCharCode(pt.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
	};
	return ct;
};



/* Base64 Encoder/decoder
 * Made by Tyler Akins
 * Released to the public domain
 *
 * Website: http://rumkin.com/
 *
 * Modified by Marcos Vives Del Sol
 */

Base64Key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

encode64 = function(input) {
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	
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
		};
		
		output += Base64Key.charAt(enc1) + Base64Key.charAt(enc2) + Base64Key.charAt(enc3) + Base64Key.charAt(enc4);
	};
	
	return output;
};

decode64 = function(input) {
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	
	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
	
	while (i < input.length) {
		enc1 = Base64Key.indexOf(input.charAt(i++));
		enc2 = Base64Key.indexOf(input.charAt(i++));
		enc3 = Base64Key.indexOf(input.charAt(i++));
		enc4 = Base64Key.indexOf(input.charAt(i++));
		
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		
		output += String.fromCharCode(chr1);
		
		if (enc3 != 64) {
			output += String.fromCharCode(chr2);
		};
		if (enc4 != 64) {
			output += String.fromCharCode(chr3);
		};
	};
	
	return output;
};

// Gracias a pakopa por esta funcion. Sacada del codigo fuente de SmilEOL
setFunction = function(e, cb, arg0) {
	e.addEventListener("click", function() {
		cb(arg0);
	}, false);
};

/* RC4 encryption for EOL
 * Copyleft 2010 S4X8 (Marcos Vives Del Sol)
 *
 * Email: socram8888@gmail.com
 */

EOLRC4EncodeEdit = function() {
	var item = document.getElementById("message");
	if (item.value.substr(0,4) != "RC4@") {
		var key = prompt("Introduce la contraseña", "ElOtroLado.net");
		if (key != null) {
			item.value = "RC4@" + encode64(rc4Encrypt(key, item.value));
		};
	} else {
		alert("¡El texto parece estar ya cifrado!");
	};
};

EOLRC4DecodeEdit = function() {
	var item = document.getElementById("message");
	if (item.value.substr(0,4) == "RC4@") {
		var key = prompt("Introduce la contraseña", "ElOtroLado.net");
		if (key != null) {
			item.value = rc4Encrypt(key, decode64(item.value.substr(4)));
		}
	} else {
		alert("¡El texto no parece estar cifrado!");
	};
};

EOLRC4DecodePost = function(post) {
	var key = prompt("Introduce la contraseña", "ElOtroLado.net");
	if (key != null) {
		var item = post.getElementsByClassName("content")[0];
		var content = decode64(item.innerText.substr(4));
		content = rc4Encrypt(key, content);
		if (content.substr(0, 4) != "RC4@") post.getElementsByClassName("rc4postbutton")[0].innerHTML = "";
		content = bbcode2html(content);
		content = smile2html(content);
		item.innerHTML = content;
	};
};

EOLRC4CreateEditButtons = function() {
	var buttons = document.getElementById("format-buttons");
	if (buttons != null) {
		var spacing = document.createTextNode("\n");
		buttons.appendChild(spacing);
		
		var bttEncrypt = document.createElement("input");
		bttEncrypt.type = "button";
		bttEncrypt.className = "button2";
		bttEncrypt.value = "Encriptar (RC4)";
		bttEncrypt.addEventListener("click", function() { EOLRC4EncodeEdit(); }, false);
		buttons.appendChild(bttEncrypt);

		var spacing = document.createTextNode("\n");
		buttons.appendChild(spacing);
		
		var bttDecrypt = document.createElement("input");
		bttDecrypt.type = "button";
		bttDecrypt.className = "button2";
		bttDecrypt.value = "Desencriptar (RC4)";
		bttDecrypt.addEventListener("click", function() { EOLRC4DecodeEdit(); }, false);
		buttons.appendChild(bttDecrypt);
	};
};

EOLRC4CreateThreadButtons = function() {
	var post = document.getElementsByClassName("postbody");
	var a;
	var content;
	var icons;
	var curButton;
	var curImage;

	for (a = 0; a < post.length; a++) {
		try {
			content = post[a].getElementsByClassName("content")[0];
			if (content.innerText.substr(0, 4) == "RC4@") {
				var icons = post[a].getElementsByClassName("profile-icons")[0];
				var curButton = document.createElement("a");
				// curButton.addEventListener("click", function() { EOLRC4DecodePost(post[a]); }, false);
				setFunction(curButton, EOLRC4DecodePost, post[a]);
				curButton.className = "rc4postbutton";
				curButton.innerHTML = "<img src=\"http://a.imageshack.us/img825/4299/decrypt.png\" alt=\"Desencriptar\"></a>";
				icons.appendChild(curButton);
			};
		} catch (e) { };
	};
};

if (location.href.substr(0, 31) == "http://www.elotrolado.net/hilo_") {
	var BBcodescript = document.createElement("script");
	BBcodescript.src = "http://www.elotrolado.net/styles/estiloeol/template/editor_v1.js";
	BBcodescript.type = "text/javascript";
	BBcodescript.addEventListener("load", function() { EOLRC4CreateThreadButtons(); }, false);
	document.body.appendChild(BBcodescript);
} else if (location.href.substr(0, 37) == "http://www.elotrolado.net/posting.php") {
	EOLRC4CreateEditButtons();
};

};

var hold = document.createElement("script");
hold.type = "text/javascript";
hold.innerHTML = "EOLRC4 = " + EOLRC4 + "; EOLRC4();";
document.body.appendChild(hold);

// ==UserScript==
// @name           CPLinkConvert
// @description    Convert Chinese private links including Thunder/FlashGet/QQDownload/RayFile.按住Alt键，单击网页上的链接，就可以进行转换。
// @author         sixing
// @include        http://*
// @include        https://*
// @version        1.0
// ==/UserScript==

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

function decode64(input) {
/*
	// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
	var base64test = /[^A-Za-z0-9\+\/\=]/g;
	if (base64test.exec(input)) {
		alert("There were invalid base64 characters in the input text.\n" +
		"Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +
		"Expect errors in decoding.");
	}

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
*/
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	do {
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;
		
		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
		
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);

	return unescape(output);
}

function convertCPLink(e) {
	if (!e.altKey) return;
	
	var a, gota = false;
	for (a = e.target; a; a = a.parentNode) {
		if (a instanceof HTMLAnchorElement) {
			gota = true;
			break;
		}
	}
	
	if (!gota) return;

	var src = a.outerHTML.match(/[tT][hH][uU][nN][dD][eE][rR]:\/\/[a-zA-Z0-9\+\/=]+/) ||
		a.outerHTML.match(/[fF][lL][aA][sS][hH][gG][eE][tT]:\/\/[a-zA-Z0-9\+\/=]+/) ||
		a.outerHTML.match(/[qQ][qQ][dD][lL]:\/\/[a-zA-Z0-9\+\/=]+/) ||
		a.outerHTML.match(/[fF][sS]2[yY][oO][uU]:\/\/[a-zA-Z0-9\+\/=]+/);

	if (!src) return;

	src = String(src);
	src = decode64(src.substring(src.indexOf("://") + 3));

	
	if (src.match(/^AA.+ZZ$/))  // thunder
		src = src.substring(2, src.length - 2);
	else if (src.match(/^\[FLASHGET\].+\[FLASHGET\]$/)) // flashget
		src = src.substring(10, src.length - 10);
	else if (src.match(/^.+\|\d+$/)) // rayfile
		src = String("http://") + src.substring(0, src.lastIndexOf("|"));

	a.href = src;
	a.removeAttribute("onclick");
	a.removeAttribute("oncontextmenu");
}

document.addEventListener("mousedown", convertCPLink, true);

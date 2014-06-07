// ==UserScript==
// @name        Ripplicons
// @namespace   https://singpolyma.net/
// @description Annotates Ripple addresses with sigil-based identicons
// @include     *
// @version     0.3.0
// @grant       none
// ==/UserScript==

// Some code borrowed from "Linkify Plus" <http://userscripts.org/scripts/show/1352>

var notInTags = [
	'code', 'head', 'noscript', 'option', 'script', 'style',
	'title', 'textarea'
];

var textNodeXpath = ".//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]";
var titleNodeXpath = ".//abbr[@title and (not(ancestor::"+notInTags.join(') and not(ancestor::')+"))]";
var rippleAlphabet = "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz";
var rippleAddressRE = new RegExp('r([' + rippleAlphabet + ']{25,})', 'g');
// Built based on:
//  - http://en.wikipedia.org/wiki/URI_scheme
var urlRE = new RegExp(
	'('
	// leading scheme:// or "www."
	+ '\\b([a-z][-a-z0-9+.]+://|www\\.)'
	// everything until non-URL character
	+ '[^\\s\'"<>()]+'
	+ ')', 'gi');
var queue = [];

/******************************************************************************/

doRipplicons(document.body);
document.body.addEventListener('DOMNodeInserted', function(event) {
	doRipplicons(event.target);
}, false);

/******************************************************************************/

function doRipplicons(container) {
	if(container.nodeType == 3) {
		// For text, look at the parent
		container = container.parentNode;
	}

	// Prevent infinite recursion, in case X(HT)ML documents with namespaces
	// break the XPath's attempt to do so.	(Don't evaluate spans we put our
	// classname into.)
	if (container.className && container.className.match(/\bripplicon\b/)) {
		return;
	}

	// Special considerations for client
	if(window.rippleclient) {
		if((qr = document.getElementById('qr-code')) && (addr = document.getElementById('receive-address')) && addr.textContent && !document.getElementById('receive-ripplicon')) {
			var decoded = decodeRipple(addr.textContent.slice(1));
			var vp = decoded[1], vp_bitlen = decoded[2];
			var md5 = bytes2hex(bin2bytes(binl_md5(bytes2bin(vp, true), vp_bitlen), true));

			img = document.createElement('img');
			img.id = 'receive-ripplicon';
			img.style = 'float: right;';
			img.src = 'https://sigil.cupcake.io/' + md5 + '?w=252';
			qr.parentNode.insertBefore(img, qr);
		}
	}

	var xpathResult = document.evaluate(
		textNodeXpath, container, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var titleXpathResult = document.evaluate(
		titleNodeXpath, container, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var i = 0;
	function continuation() {
		var node = null, counter = 0;
		while (node = xpathResult.snapshotItem(i++)) {
			var parent = node.parentNode;
			if (!parent) continue;

			// Skip styled <pre> -- often highlighted by script.
			if ('PRE' == parent.tagName && parent.className) continue;

			if(node.nodeType == 3) {
				rippliconTextNode(node);
			} else {
				rippliconTextNode(node, true);
			}

			if (++counter > 50) {
				return setTimeout(continuation, 0);
			}
		}

		if(xpathResult !== titleXpathResult) {
			xpathResult = titleXpathResult;
			i = 0;
			setTimeout(continuation, 0);
		}
	}
	setTimeout(continuation, 0);
}

function rippliconTextNode(node, titleNode) {
	var i, l, m;
	var txt = titleNode ? node.title : node.textContent;
	var span = null, img = null;
	var p = 0;

	var isInA = false;
	for(var par = node.parentNode; par != document.body; par = par.parentNode) {
		if(par.nodeName == 'A') {
			isInA = true;
			break;
		}
	}

	if(txt.match(urlRE)) {
		// Don't link URLs
		return;
	}

	while (m = rippleAddressRE.exec(txt)) {
		var decoded = decodeRipple(m[1]);
		var bytes = decoded[0], vp = decoded[1], vp_bitlen = decoded[2];

		var chk = bin2bytes(binb_sha256(
			binb_sha256(bytes2bin(vp), vp_bitlen),
			256
		)).slice(0,4);

		if(chk.toString() == bytes.slice(-4).toString()) {
			// We md5 it because the server can't handle raw bytes in URLs well
			// The server decodes hex md5s into raw bytes on the other side
			// And it md5's any raw bytes it does get anyway
			var md5 = bytes2hex(bin2bytes(binl_md5(bytes2bin(vp, true), vp_bitlen), true));

			img = document.createElement('img');
			img.style = 'display:inline;padding-right:0.3em;';
			img.src = 'https://sigil.cupcake.io/' + md5 + '?w=12';

			if (null == span) {
				// Create a span to hold the new text with address in it.
				span = document.createElement('span');
				span.className = 'ripplicon';
			}

			if(!isInA) {
				//create a link and put it in the span
				a = document.createElement('a');
				a.className = 'ripplicon';
				a.setAttribute('href', 'https://ripple.com//contact?to=' + m[0]);
				a.style = 'white-space: nowrap;';
			}

			if(titleNode) {
				span.appendChild(img);

				if(!isInA) {
					a.setAttribute('href', 'https://ripple.com//contact?to=' + m[0] + '&name=' + encodeURIComponent(node.textContent));
					a.appendChild(node.cloneNode());
					node.parentNode.replaceChild(a, node);
					node = a;
				}
			} else {
				//put in text up to the address
				span.appendChild(document.createTextNode(txt.substring(p, m.index)));

				if(isInA) {
					span.appendChild(img);
					span.appendChild(document.createTextNode(m[0]));
				} else {
					a.appendChild(img);
					a.appendChild(document.createTextNode(m[0]));
					span.appendChild(a);
				}
			}
		}
		//track insertion point
		p = m.index+m[0].length;
	}
	if (span) {
		if(titleNode) {
			node.insertBefore(span, node.firstChild);
		} else {
			//take the text after the last link
			span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
			//replace the original text with the new span
			try {
				node.parentNode.replaceChild(span, node);
			} catch (e) {
				console.error(e);
				console.log(node);
			}
		}
	}
}

function decodeRipple(addr_no_version) {
	var base58digits = toDigits(addr_no_version);
	var bytes = toLargerBase(58,256,base58digits);
	var payload = bytes.slice(0,-4);
	for(var i = 0; i < clz(base58digits); i++) {
		// Preserve leading zeros
		payload.unshift(0);
	}

	var vp = [0].concat(payload); // Always version 0
	var vp_bitlen = vp.length * 8;

	return [bytes, vp, vp_bitlen];
}

function toDigits(str) {
	var digits = [];

	for(var i = 0; i < str.length; i++) {
		digits.push(rippleAlphabet.indexOf(str[i]));
	}

	return digits;
}

function clz(digits) {
	var i;
	for(i = 0; i < digits.length && digits[i] == 0; i++);
	return i;
}

function toLargerBase(smallbase, bigbase, digits) {
	var n = [0]; // least-sig first

	for(var i = 0; i < digits.length; i++) {
		for(var j = 0; j < n.length; j++) {
			n[j] *= smallbase;
		}

		n[0] += digits[i];
		normalizeBase(bigbase, n);
	}

	return n.reverse();
}

function normalizeBase(b, digits) {
	for(var i = 0; i < digits.length; i++) {
		if(digits[i] > b) {
			digits[i+1] = (digits[i+1] || 0) + Math.floor(digits[i] / b);
			digits[i] = digits[i] % b;
		}
	}
}

/* Hash stuff adapted from http://pajhome.org.uk/crypt/md5/ */

function bytes2bin(input, le) {
	var offset = le ? function(i){return i % 32;} : function(i) {return 24 - i % 32;};
	var output = [];
	for(var i = 0; i < input.length >> 2; i++) output.push(0);
	for(var i = 0; i < input.length * 8; i += 8)
		output[i>>5] |= (input[i / 8] & 0xFF) << offset(i);
	return output;
}

function bin2bytes(input, le) {
	var offset = le ? function(i){return i % 32;} : function(i) {return 24 - i % 32;};
	var output = [];
	for(var i = 0; i < input.length * 32; i += 8)
		output.push((input[i>>5] >>> offset(i)) & 0xFF);
	return output;
}

function bytes2hex(input) {
	var hex_tab = "0123456789abcdef";
	var output = "";
	var x;
	for(var i = 0; i < input.length; i++) {
		x = input[i];
		output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
	}
	return output;
}

/*
 * Main sha256 function, with its support functions
 */
function sha256_S (X, n) {return ( X >>> n ) | (X << (32 - n));}
function sha256_R (X, n) {return ( X >>> n );}
function sha256_Ch(x, y, z) {return ((x & y) ^ ((~x) & z));}
function sha256_Maj(x, y, z) {return ((x & y) ^ (x & z) ^ (y & z));}
function sha256_Sigma0256(x) {return (sha256_S(x, 2) ^ sha256_S(x, 13) ^ sha256_S(x, 22));}
function sha256_Sigma1256(x) {return (sha256_S(x, 6) ^ sha256_S(x, 11) ^ sha256_S(x, 25));}
function sha256_Gamma0256(x) {return (sha256_S(x, 7) ^ sha256_S(x, 18) ^ sha256_R(x, 3));}
function sha256_Gamma1256(x) {return (sha256_S(x, 17) ^ sha256_S(x, 19) ^ sha256_R(x, 10));}
function sha256_Sigma0512(x) {return (sha256_S(x, 28) ^ sha256_S(x, 34) ^ sha256_S(x, 39));}
function sha256_Sigma1512(x) {return (sha256_S(x, 14) ^ sha256_S(x, 18) ^ sha256_S(x, 41));}
function sha256_Gamma0512(x) {return (sha256_S(x, 1)  ^ sha256_S(x, 8) ^ sha256_R(x, 7));}
function sha256_Gamma1512(x) {return (sha256_S(x, 19) ^ sha256_S(x, 61) ^ sha256_R(x, 6));}

var sha256_K = [
	1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993,
	-1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987,
	1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
	264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
	-1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585,
	113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
	1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885,
	-1035236496, -949202525, -778901479, -694614492, -200395387, 275423344,
	430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
	1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872,
	-1866530822, -1538233109, -1090935817, -965641998
];

function binb_sha256(m, l)
{
	var HASH = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225];
	var W = new Array(64);
	var a, b, c, d, e, f, g, h;
	var i, j, T1, T2;

	/* append padding */
	m[l >> 5] |= 0x80 << (24 - l % 32);
	m[((l + 64 >> 9) << 4) + 15] = l;

	for(i = 0; i < m.length; i += 16)
	{
		a = HASH[0];
		b = HASH[1];
		c = HASH[2];
		d = HASH[3];
		e = HASH[4];
		f = HASH[5];
		g = HASH[6];
		h = HASH[7];

		for(j = 0; j < 64; j++)
		{
			if (j < 16) W[j] = m[j + i];
			else W[j] = safe_add(safe_add(safe_add(sha256_Gamma1256(W[j - 2]), W[j - 7]),
																						sha256_Gamma0256(W[j - 15])), W[j - 16]);

			T1 = safe_add(safe_add(safe_add(safe_add(h, sha256_Sigma1256(e)), sha256_Ch(e, f, g)),
																													sha256_K[j]), W[j]);
			T2 = safe_add(sha256_Sigma0256(a), sha256_Maj(a, b, c));
			h = g;
			g = f;
			f = e;
			e = safe_add(d, T1);
			d = c;
			c = b;
			b = a;
			a = safe_add(T1, T2);
		}

		HASH[0] = safe_add(a, HASH[0]);
		HASH[1] = safe_add(b, HASH[1]);
		HASH[2] = safe_add(c, HASH[2]);
		HASH[3] = safe_add(d, HASH[3]);
		HASH[4] = safe_add(e, HASH[4]);
		HASH[5] = safe_add(f, HASH[5]);
		HASH[6] = safe_add(g, HASH[6]);
		HASH[7] = safe_add(h, HASH[7]);
	}
	return HASH;
}

function safe_add(x, y) {
	var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len)
{
	/* append padding */
	x[len >> 5] |= 0x80 << ((len) % 32);
	x[(((len + 64) >>> 9) << 4) + 14] = len;

	var a =  1732584193;
	var b = -271733879;
	var c = -1732584194;
	var d =  271733878;

	for(var i = 0; i < x.length; i += 16)
	{
		var olda = a;
		var oldb = b;
		var oldc = c;
		var oldd = d;

		a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
		d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
		c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
		b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
		a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
		d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
		c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
		b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
		a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
		d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
		c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
		b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
		a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
		d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
		c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
		b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

		a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
		d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
		c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
		b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
		a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
		d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
		c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
		b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
		a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
		d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
		c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
		b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
		a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
		d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
		c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
		b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

		a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
		d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
		c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
		b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
		a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
		d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
		c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
		b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
		a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
		d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
		c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
		b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
		a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
		d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
		c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
		b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

		a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
		d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
		c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
		b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
		a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
		d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
		c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
		b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
		a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
		d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
		c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
		b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
		a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
		d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
		c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
		b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

		a = safe_add(a, olda);
		b = safe_add(b, oldb);
		c = safe_add(c, oldc);
		d = safe_add(d, oldd);
	}

	return [a, b, c, d];
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
	return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
	return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
	return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
	return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
	return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
	return (num << cnt) | (num >>> (32 - cnt));
}

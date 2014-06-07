// ==UserScript==
// @name           Includes : JsCode
// @namespace      http://gm.wesley.eti.br/includes
// @description    JsCode Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @homepage       http://gm.wesley.eti.br
// @license        GNU GPL
// @version        1.3.2
// @language       en
// @include        nowhere
// @exclude        *
// @require        https://raw.github.com/einars/js-beautify/master/js/lib/beautify.js
// @history        1.3.2 Updated @require#beautify.js
// @history        1.3.1 Fixed minor bug (packed)
// @history        1.3.0.0 Added another kind of deobfuscation (unzip)
// @history        1.2.0.0 Some fx 4.0 bug fixes
// @history        1.1.0.2 Back to 1.0.3.0
// @history        1.1.0.1 Changed single-quoted strings to double-quoted ones
// @history        1.1.0.0 Added another kind of deobfuscation
// @history        1.0.3.0 Made the code a little more generic
// @history        1.0.2.3 1.0.2.2 was buggy
// @history        1.0.2.2 Made the deobfuscation process much more powerful
// @history        1.0.2.1 Added support for "atob"
// @contributor    Marti (http://userscripts.org/messages/95655)
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

JsCode = function () {};

JsCode.beautify = function (text) {
	return js_beautify(text.replace(/[“”]/g, '"'), {indent_size: 1, indent_char: '\t'});
};

JsCode.deobfuscate = function (text, variables) {
	var s = JsCode.beautify(text).replace(/(?:new )?Array\((.*?)\);?$/gm, function(m, c) {
		return ( parseInt(c, 10) ? m : "[" + c + "];" );
	}).replace(/([\(\[])0x([\da-f]+)([\]\)])/gi, function(x, b, m, a) {
		return b + parseInt(m, 16) + a;
	}),
	matches,
	temp_vars = {},
	keys = "",
	tvars = {"last":-1,"next":0,"keys":{},"used":{}},
	tident = {"next":0, "keys":{}},
	re = /^(?:var |const |)(\w+)\s*=\s*(\[.+\])\s*;$/gim;

	while (matches = re.exec(s)) {	// gets all arrays
		keys += "|" + matches[1];
		eval(matches[0]);
		temp_vars[matches[1]] = eval(matches[2]);
	}

	//first deobfuscation (inaccurate)
	re = /(\w+)\[(\d+)\]/g;
	while (matches = re.exec(s)) {	// replaces static arrays
		if (matches[1] in temp_vars) {
			s = s.replace(matches[0], "\"" + temp_vars[matches[1]][matches[2]].replace(/"/g, "\\\"").replace(/\n/g, "\\n") + "\"", "g");
		}
	}

	// second deobfuscation (accurate)
	if (keys.length) {
		// modifier "g" would abruptly decrease the time taken to deobfuscate the script, but this does not guarantee it would be deobfuscated in all cases.
		var re = new RegExp("(" + keys.substr(1) + ")\\[(\\d+)\\]");

		while (matches = re.exec(s))	// replaces static arrays
		if (matches[1] in temp_vars)
		s = s.replace(matches[0], "\"" + temp_vars[matches[1]][matches[2]].replace(/"/g, "\\\"").replace(/\n/g, "\\n") + "\"", "g");
	}

	return s.replace(/(".+?")\.z\(\)/g, function($0, $1) {
		return $1.split("").reverse().join("");
	}).replace(/eval\(function\([^]+?(["'])(.+)\1, (\d+), (\d+), \1(.+?)\1.+?$/gm, function (match) {	// unpacker
		//	http://userscripts.org/scripts/review/161209
		return JsCode.deobfuscate(eval("String" + match.slice(4)).replace(/\\/g, "\\\\"), variables);
 	}).replace(/unescape\(([\"\'])(.+?)\1\)/g, function(match, q, p) {
		return q + unescape(p) + q;
	}).replace(/\\u([0-9a-f]{4})/gi, function(x, m) {	// converts unicode to string
		switch (m.toUpperCase()) {
			case "0022":	// (")
				return "\\\"";
			case "000A":	// (line feed)
				return "\\n";
			case "000D":	// (carriage return)
				return "\\r";
			default:
				return String.fromCharCode(parseInt(m, 16));
		}
	}).replace(/\\x([0-9a-f]{2})/gi, function(x, m) {	// converts hexa to string
		switch (m.toUpperCase()) {
			case "5D":	// (\\)
				return "\\\\";
			case "22":	// (")
				return "\\\"";
			case "0A":	// (line feed)
				return "\\n";
			case "0D":	// (carriage return)
				return "\\r";
			default:
				return String.fromCharCode(parseInt(m, 16));
		}
	}).replace(/\\0([0-7]{2})/g, function(x, m) {	// converts octa to string
		switch (m.toUpperCase()) {
			case "42":	// (")
				return "\\\"";
			case "12":	// (line feed)
				return "\\n";
			case "15":	// (carriage return)
				return "\\r";
			default:
				return String.fromCharCode(parseInt(m, 8));
		}
	}).replace(/\[(["'])(\w+)\1\]\(/g, function(x, p, func) {	//	["test"]( => .test(
		return "." + func + "(";
	}).replace(/\b0x([0-9a-f]+)([\];,) ])/gi, function(x, m, a) {
		return parseInt(m, 16) + a;
	}).replace(/\w+(?:(?:\("[\w\/]+"\))?(?:\[(['"]?)\w+\1\])+)+/g, function(m) {	// replaces the "array notation" (document["appendChild"]) to the "dot notation" (document.appendChild)
		var output = "", match, lastIndex = -1, re = /\[(['"])(\w+)\1\]/g;
		while (match = re.exec(m)) {
			output += m.substring(lastIndex, match.index);
			lastIndex = match.index + match[0].length;

			output += "." + match[2];
		}

		return (lastIndex == -1 ? m : output);
	}).replace(/unzip\((["'])(.+?)\1\)/gi, function (m, p, code) {	// http://userscripts.org/scripts/review/152277
		// <@TODO> make these parameters customizable or automatically calculated
		var p = "narutoayan",
		cksum = 209;
		// </@TODO>

		function _unzip (s) {
			for (var x = 256;x;--x) {
				var sum = (x + cksum) % 256,
				out = "$(" + p + ");",
				cc = 32, a, b;
				for (a = 0; a < s.length; a += 2) {
					var c = parseInt(s.substr(a, 2), 16);
					for (b = 0; b < 5; b++) {
						cc ^= out.charCodeAt((a >> 1) + b);
					}
					out += String.fromCharCode(c ^ cc ^ sum);
					cc = out.charCodeAt(out.length - 1);
				}

				if (out.indexOf("// === End") >= 0) {
					if (cksum != sum) {
						console.log("New cksum", sum);
					}
					return JsCode.deobfuscate(out.substr(p.length + 4), variables);
				}
			}
			
			return "unzip('" + s + "'); // <-- unable to unzip it";
		}

		return _unzip(code);
	}).replace(/(base64)?decode\((["'])(.+?)\2\)/gi, function(m, b, p, code) {	// http://userscripts.org/scripts/review/51702
		function _decode(a) {
			var b = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,;.:-_@#°+]}[{^?\'=)(/&%$£"!\\|~<> ';
			var c = ['toHmN9g+Z@.:°GIp"f2,B7i8<!J3ckdK_&/S5F{r$^au[;hs\\Eql%OUn)01VWA£>DMPy\'Q(Y-|z~vxL6}w=?RT]4jX#e bC', ')TLOM\\%1Gr"yh]wFb/4.t?xPo{dp°#N-W8}+i&Bcz~3Y20jC<;nef gH(,S^uJ|kRvEaK5\'U:I@[XV!A>6_ZD=m7sQ$q9l£', 'XnW8\'b#.}p,cY{ytU3\\kgBw97CDZj/<SFxe@%JVANETI-5~fmHuhl?od1 )^qs&a6LGM(P[$0:r4+"2£K]=OQ|R_vz;i!°>', 'hH6z"x^v1&Q$eq54°iwd@O8%N>uGV=;m~\\!],)cb?kXKf</Ir:SPgjn3£p#yZloR|W_BET(\'{tU}A7+0FL Ja.DY29CMs[-', '7Hi4@LN6"on0&m£JAWxzrZTkFq#R|asj]U\\~%(5d=_GX-^I2ybO)Ew9?gPY,+<Q/3MpKl;.v}!{°[ VBDecutf$S:1C8>\'h', '\'i.|O^mdCzf°/ZKS>}jyhE5"9~R%tku_bwUT6JP8s1MGNQ?WBpvF{£[0&!(=-XceV+a]Yorg<LD:);lH24#A\\3Iq 7$n,@x', 'aq]9rU1v).@=\\;%\'TwZfD~IeWgF"!(-mAtd6:zjG+JRVE3Mh<|SH80k#Li7nP5O£2,Xx_ycuY>4Q&$°Cp}b/Ko?sNl[^{B ', 'zLIj=|i%#Y6+k£M(9\'>nb5CJ\\~l{p!]}/UT8X"ud37Ao0PH,21E.<ZQ°hetWRBKF-4qs?@r)_OfNw[Sygm^;cVD&xv:G$a ', 'oHCy5)Y4?=/|(P£BO%lh&ZQLxN>:a;rIJ9s^,$G{t3k~cEgwv_pUF°2jmnzAW\\!#6Td VK7.8"iq\'DX[fS<]@+be0M1}Ru-', 'giPQ_:AkFz3Y1WUn?,-oJHD>#e5C}xs$£IScaTqy7°B%p;GMZdOR<=v+@|/6(0^K{\'r2\\Xmj&l)!bu~tN]wL.f h49[8EV"', 'ir@5XZ/-%7tbwul}^pHdY:~?PL,O6\\jyv_;F°)K|.Wq3U#DaMBe4(&Tf>EAG\'<z8={!n9[ m1kRNQS2£hxC+]oV$0I"gJcs', '\\smf<C53°n(8B-[u$o]Xjd/w;e!ht9A~MOpJT|vi=cK)\'?U7r1zD4I{k_%,g.6SHE0NyVY2P£@>+a:Wl"Zq# FxLGR}Q^&b', 'P°<Ae7Q+F~cKXU.ouZI>x|L[0Y 8t^mNEv:1B&2)$VJh-f9sjwdS3R6=%/5"r\\\'l(a}WD!G]g_?T4Hk{My;£Oipqn,z@#Cb', 'TiE;<9._?Za{S[,/n4q:mK]BwM"W)oQ\'H@Lxv0+g°JUhyYAV>f\\bO£sz-NlC2%It!}8(~R r6X1cGuj#P&$^D5k73dF=pe|', 'XidAT3/s{,+M.2Pb>4"OFZ<WUlEQ&(}xC!Y0G:gkJ_eIwqR#pNm\']VK otnhr°)£H7u^[?56@%y-|=1\\;~vfcSzBD9j8La$', '~p=@s5K6zPhI{/\\SX°DZ>03!G-t}_ujgBR"wlxe[dqWy^rvMHVY,TN$£&<A2FQ\'i.%?7):EL;1f#acb9|4JO]8kU+( nCmo'];
			var d = c[parseInt(a.substr(a.length - 2, 2))];
			if (typeof d == 'undefined') return 'undefined';
			a = a.substr(0, a.length - 2);
			var e = '';
			for (i = 0; i < a.length; i++) {
				if (d.indexOf(a.charAt(i) > -1)) {
					e += b.charAt(d.indexOf(a.charAt(i)))
				} else {
					e += a.charAt(i)
				}
			}
			return e
		}
		function base64decode(a) {
			var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
			var c = "";
			var d, chr2, chr3;
			var e, enc2, enc3, enc4;
			var i = 0;
			a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < a.length) {
				e = b.indexOf(a.charAt(i++));
				enc2 = b.indexOf(a.charAt(i++));
				enc3 = b.indexOf(a.charAt(i++));
				enc4 = b.indexOf(a.charAt(i++));
				d = (e << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				c += String.fromCharCode(d);
				if (enc3 != 64)
				c += String.fromCharCode(chr2)
				
				if (enc4 != 64)
				c += String.fromCharCode(chr3)
			}
			c = _utf8_decode(c);
			return c
		}

		function _utf8_decode(a) {
			var b = "";
			var i = 0;
			var c = c1 = c2 = 0;
			while (i < a.length) {
				c = a.charCodeAt(i);
				if (c < 128) {
					b += String.fromCharCode(c);
					i++
				} else if ((c > 191) && (c < 224)) {
					c2 = a.charCodeAt(i + 1);
					b += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2
				} else {
					c2 = a.charCodeAt(i + 1);
					c3 = a.charCodeAt(i + 2);
					b += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3
				}
			}
			return b;
		}

		var c = code.replace(/\\+([^\\])/g, function(m, x) {
			return ( m.length-x.length == 1 && !/[B]/.test(x) ? x : m.substr(Math.floor((m.length-x.length)/2)) );
		});
		return "\"" + (b ? base64decode(c) : _decode(base64decode(_decode(c)))).replace(/"/g,"\\\"") + "\"";
	}).replace(/_0x[xa-f0-9]+/gi, function (m, offset, s) { // replaces encoded variable names to readable ones
		if (!(m in tvars)) {
			tvars[m] = [++tvars.last, false];
		}
		
		if (typeof variables != "object") {
			return "VARIABLE_" + tvars[m][0];
		} else if (m in tvars.keys) {
			return tvars.keys[m];
		} else {
			var line = s.substring(s.substr(0, offset).lastIndexOf("\n") || 0, s.indexOf("\n", offset)).replace(/^\s+/,"");

			for (var k in variables) {
				if (typeof variables[k] == "object" && !tvars.used[k] && variables[k][1].test(line)) {
					tvars.used[k] = true;
					tvars.next = 1 + parseInt(k, 10);

					return tvars.keys[m] = variables[k][0];
				}
			}

			if (typeof variables[tvars.next] == "string") {
				tvars.keys[m] = variables[tvars.next++];
			} else {
				tvars.keys[m] = "VARIABLE_" + tvars[m][0];
			}

			return tvars.keys[m];
		}
	}).replace(/[1Il]{4,}|[0oO]{4,}/g, function (match) {
		if (match.replace(/[10]+/g, "").length > 1 && match.replace(/[IoO]+/g, "").length > 1) {
			return ( match in tident.keys ? tident.keys[match] : tident.keys[match] = "identifier_" + tident.next++ );
		} else {
			return match;
		}
	}).replace(/String\.fromCharCode\(\d+(?:, \d+)*\)/g, function (match) {	// String.fromCharCode(116, 101, 115, 116) => "test"
		return "\"" + eval(match).replace(/[\\"\n\r]/g, function (match) {
			switch (match) {
				case "\n":	// (line feed)
					return "\\n";
				case "\r":	// (carriage return)
					return "\\r";
				default:
					return "\\" + match;
			}
		}) + "\"";
	}).replace(/(?!\\)(["'])\s*\+\s*\1/g, "")	// "te"+"st" => "test"
	.replace(/\u202E/g, "")
	.replace(/atob\("([\w\+\/\=]+)"\)/g, function($0, $1) {
		return "\"" + atob($1) + "\"";
	});
};
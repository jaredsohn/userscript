// ==UserScript==
// @name           Avestan Text display
// @namespace      avestan_text
// @description    Replaces Unicode Avestan text with the legacy Jamespa font (to allow viewing Avestan text when it's not supported by the browser or OS)
// @include        *
// ==/UserScript==

/***********************************************************************
 * Written by Dzmitry Kushnarou.
 *
 * This script is in public domain (or, if this is legally impossible,
 * under the terms of the CC0 license).
 ***********************************************************************/

(function() {
var avestan_part_2, textnodes, node, av_regexp;

avestan_part_2 = [
  "a",           "A", "*", "l",           "L", "\u00B5", "v", "V",
  "e",           "E", "o", "O",           "i", "I", "u", "U",
  "k",           "x", "F", "X",           "g", "J", "G", "c",
  "j",           "t", "q", "d",           "D", "T", "p", "f",
  "b",           "B", "M", "?", "\u00A3", "n", "R", "N",
  "m", "\u00A4", "%", "Y", "W",           "r", "|", "s",
  "z",           "S", "Z", "K",           "C", "h", "*", "*",
  "*",           ",", "`", "`",           "`", "`", ".", "."];

function convert_avestan(s) {
	var r, i, len, code, code2, code3;
	r = '';
	i = 0;
	len = s.length;
	while (i < len) {
		code = s.charCodeAt(i);
		if (code == 0xD802) {
			code2 = s.charCodeAt(++i);
			if (Math.floor(code2 / 256) == 0xDF) {
				code3 = code2 - 0xDF00;
				if (code3 < 64)
					r += avestan_part_2[code3];
				else
					r += '?<' + code3 +'>';
			}
			else {
				r += s[i];
			}
		}
		else
			r += s[i];
		i++;
	}
	return r.replace(/uu/g, "w").replace(/ii/g, 'y');
}

av_regexp = /[\uD802\uDF00-\uDF3F]+|[\uD802\uDF00-\uDF3F][\uD802\uDF00-\uDF3F()\[\] ._-`:{}|&]+[\uD802\uDF00-\uDF3F]/g;

function decorate_avestan(t) {
	var e = document.createElement("span");
	e.style.fontFamily = "'Jamaspa', 'ave_bl_l4', 'Wistaspa', 'Hutaosa', 'Mithra'";
	e.style.direction = 'rtl';
	e.style.unicodeBidi = 'bidi-override';
	e.appendChild(document.createTextNode(convert_avestan(t)));
	return e;
}

textnodes = document.evaluate("//text()", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < textnodes.snapshotLength; i++) {
	node = textnodes.snapshotItem(i);
	if (av_regexp.test(node.data)) {
		var s, f, t, r;
		s = node.data;
		f = document.createDocumentFragment();
		
		r = av_regexp;
		r.lastIndex = 0;
		text_ind = 0;
		while ((a = r.exec(s)) !== null)
		{
			if (a.index > text_ind) {
				var t = s.substring(text_ind, a.index)
				f.appendChild(document.createTextNode(t));
			}
			f.appendChild(decorate_avestan(a[0]));
			text_ind = r.lastIndex;
		}
		if (text_ind < s.length) {
			t = s.substring(text_ind, s.length);
			f.appendChild(document.createTextNode(t));
		}
		
		var parent = node.parentNode;
		parent.replaceChild(f, node);
    }
}

})();
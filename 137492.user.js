// ==UserScript==
// @name        LingvoWiki: add braces around Chinese  text
// @namespace   lingvowiki_chinese
// @description Adds a button to encloses all the Chinese characters into appropriate template when editing the text
// @include     http://lingvowiki.info/wiki/index.php?*action=edit*
// @include     http://wiki.lingvoforum.net/wiki/index.php?*action=edit*
// @include     http://lingvowiki.info/wiki/index.php?*action=submit*
// @include     http://wiki.lingvoforum.net/wiki/index.php?*action=submit*
// @version     1
// ==/UserScript==

function startsChineseTemplate(t, s) {
	var tpl = ['\u6F22', '\u6C49', 'Hanzi', 'hanzi', 'HANZI', 'HanZi',
		//future codes for some Chinese dialects:
		'\u7CA4', '\u7CB5', '\u5434', '\u5433', '\u95FD', '\u95A9', '\u664B', '\u6649'
	];
	for (i in tpl) {
		if (t.substr(s, tpl[i].length + 1) == tpl[i] + "|")
			return tpl[i].length + 1;
	}
	return false;
}

function encloseChinese(t, codeToInsert) {
	var i = 0;
	var l = t.length;
	var r = "";
	
	
	while (i < l) {
		var ch = t.charCodeAt(i);
		if (ch >= 0x2e80) {
			r += "{{" + codeToInsert + "|";
			while (ch >= 0x2e80) {
				r += t[i++];
				ch = t.charCodeAt(i);
			}
			r += "}}";
		}
		else if (t[i] == '{' &&  i+1 < l && '{' == t[i+1]) {
			if (startsChineseTemplate(t, i+2)) {
				var tmplen = startsChineseTemplate(t, i+2);
				r += t.substr(i, tmplen + 2);
				i += tmplen + 2;
				
				var depth = 1;
				while (i < l && depth > 0) {
					r += t[i];
					if (t[i] == '{' && i+1 < l && t[i+1] == '{')
						depth++;
					else if (t[i] == '}' &&  i+1 < l && t[i+1] == '}')
						depth--;
					i++;
				}
			}
			else {
				i += 2;
				r += '{{';
			}
		}
		else if (t[i] == '[' && i+1< l && t[i+1] == '[') {
			r += '[[';
			i += 2;
				var depth = 1;
				while (i < l && depth > 0) {
					r += t[i];
					if (t[i] == '[' && i+1 < l && t[i+1] == '[	')
						depth++;
					else if (t[i] == ']' &&  i+1 < l && t[i+1] == ']')
						depth--;
					i++;
				}
		}
		else {
			r += t[i++];
		}
	}
	
	return r;
}

function bn_simp_clicked() {
	var ta = document.getElementById('wpTextbox1');
	ta.value = encloseChinese(ta.value, "\u6C49");
}

function bn_trad_clicked() {
	var ta = document.getElementById('wpTextbox1');
	ta.value = encloseChinese(ta.value, "\u6F22");
}

function add_chinese_button(elemBefore) {
	if (!elemBefore)
		return;
	
	var div = document.createElement('div');
	var bn_simp = document.createElement('input');
	bn_simp.type = 'button';
	bn_simp.value = '\u52A0\u901F\u4F1F\u5927\u7684\u6C49\u5316';
	bn_simp.onclick = bn_simp_clicked;
	div.appendChild(bn_simp)
	
	var bn = document.createElement('input');
	bn.type = 'button';
	bn.value = '\u52A0\u901F\u5049\u5927\u7684\u6F22\u5316';
	bn.onclick = bn_trad_clicked;
	bn.style = 'margin-left: 50px;';
	div.appendChild(bn)
	elemBefore.parentNode.insertBefore(div, elemBefore);
}

add_chinese_button(document.getElementById("editpage-copywarn"))
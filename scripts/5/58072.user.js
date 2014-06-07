// ==UserScript==
// @name           Font Size Equalizer
// @namespace      http://userscripts.org/scripts/show/58072
// @description    Converts font sizes from pixels (px) to points (pt) and linearly equalizes their sizes, increasing readability of any website
// @include        *
// ==/UserScript==

// --------------------------------
//		Config

var fsize = 15;			// px size used as base (no change in size)
var fsmall = 1.4;		// multiplier for small fonts ( value >= 1 )
var fbig = 0.85;		// multiplier for big fonts ( value <= 1 )

// --------------------------------

var newstyle = new Array();
var Tag = new Array();
var ntag = 0;

if (fsmall < 1) { fsmall = 1; }
fsmall = 1/fsmall;

function conversao(px) {
	var sm;
	if (px <= fsize) { sm = fsmall; } else { sm = fbig; }
	var pt = sm*px + (1-sm)*fsize;
	pt = Math.round(pt * 7.5) / 10;
	return pt;
}

function resize(tag) {
	var codeTags = document.getElementsByTagName(tag);
	for (var i = 0; i < codeTags.length; i++) {
		var codeTag = codeTags[i];
		var style = getComputedStyle(codeTag, '');
		if (style.fontSize) {
			var sz = style.fontSize;
			var si = sz.indexOf('px');
			if (si > 0) {
				si = eval(sz.substring(0,si));
				si = conversao(si);
				Tag[ntag] = codeTag;
				newstyle[ntag++] = si + 'pt';
			}
		}
	}
}

function resize_now() {
	for (i=0; i<ntag; i++) {
		Tag[i].style.fontSize = newstyle[i];
	}
}

resize('font');
resize('p');
resize('td');
resize('span');
resize('div');
resize('li');
resize('a');
resize('h1');
resize('h2');
resize('h3');
resize('h4');
resize('h5');
resize('h6');
resize('input');
resize('select');
resize('code');
resize('pre');
resize('tt');
resize('textarea');
resize_now();


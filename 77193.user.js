// ==UserScript==
// @name           Meta Refresh Fix
// @namespace      Simon+
// @include        *
// ==/UserScript==

var m = document.getElementsByTagName('meta'),
	a = 'getAttribute', c,
	l = 'toLowerCase', o;
	
for (i in m) {
	if ((o = m[i][a]('http-equiv')) && o[l]() == 'refresh' && (c = m[i][a]('content')[l]()).charAt(0) == '0') document.location.href = c.substring(c.indexOf(';url=') + 5);
}
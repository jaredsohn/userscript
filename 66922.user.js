// ==UserScript==
// @name           COSMiQ - Fix Themensuche
// @namespace      http://userscripts.org/scripts/review/66922
// @version        20100121
// @include        http://www.cosmiq.de/qa/srch*
// @include        http://www.cosmiq.de/lili/srch*
// @include        http://www.cosmiq.de/qa/my*
// @include        http://www.cosmiq.de/lili/my*

// ==/UserScript==

(function(d){
	var out = d.createElement('div');
	out.setAttribute('id','out');
	out.style.position = 'relative';
	out.style.left = '0';
	out.style.top = '0';
	document.getElementById('add_tag').parentNode.appendChild(out);
}(document));
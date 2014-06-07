// ==UserScript==
// @name           mailto - blocker
// @namespace      http://userscripts.org/users/33073/scripts
// @description    prevents mailto links from opening your e-mail program. You'll be asked if you want to first.
// @include        *
// ==/UserScript==


function $x(p, context) {
	if (!context) context = document;
	var i, arr = [], xpr = document.evaluate(p, context, null, 6, null);
	for (i=0; item=xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}

var links = $x("//a[starts-with(@href, 'mailto:')]");
links.forEach(function(link) {
	link.setAttribute("onclick", "return confirm('Are you sure you want to e-mail "+((link.href.indexOf('?'))?link.href.slice(7).split('?')[0]:link.href.slice(7))+" ?')");
});
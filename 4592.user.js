// ==UserScript==
// @name			Bilddagboken.se stupid security fixer
// @namespace      	http://determinist.org
// @description		Allows rightclick. Bypasses stupid security.
// @include			http://*.bilddagboken.se/p/show.html?*
// @include			http://*.bilddagboken.se/p/left.html*
// @include			http://*.bilddagboken.se/p/blog.html*
// @include			http://*.bilddagboken.se/p/blogshow.tpl?*
// @include            http://*.bilddagboken.se/p/blogshow.html?*
// ==/UserScript==
/*

this is gpl:ed, as usual

Changelog:

2007-12-02	1.2a
* Another include-fix (thanks Opaque)

2006-10-09	1.2
* Little include-§fix

2006-08-02	1.1
* Now supports "blog view / min läslayout" (hah!)

*/

function xpathOne(query, context) {
	context = context ? context : document;
	
	return document.evaluate(query, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

document.body.setAttribute("oncontextmenu", "return true;");
var spacer = xpathOne("//img[contains(@src, 'spacer.gif')] | //div[@id='spacerLayer']");
if (spacer) spacer.parentNode.removeChild(spacer);

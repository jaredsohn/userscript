// ==UserScript==
// @name           MCL Embedded Iframe Viewer
// @namespace      bravo/greasemonkey
// @description    View embedded iframes
// @include        http://mycoffeelounge.net/forum-replies.php?*
// @include        http://*.mycoffeelounge.net/forum-replies.php?*
// @version        1.0.1
// ==/UserScript==

function $xu(p, c) {
	var i, r = [], x = document.evaluate(p, c || document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	while(i=x.iterateNext()) r.push(i);
	return r;
}

$xu('//td[@class="news"][2]//span').forEach(function(el)
{
	if(/&lt;iframe /i.test(el.innerHTML))
	{
		var blah = el.innerHTML;
		blah = blah.replace(/&lt;iframe (.*)&gt;&lt;\/iframe&gt;/i, '<iframe $1></iframe>');
		el.innerHTML = blah;
	}
});

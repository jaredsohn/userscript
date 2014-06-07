// ==UserScript==
// @name           SlutLoad download link
// @namespace      nipsden.blogspot.com
// @description    Provides a direct download link on SlutLoad videos
// @version        1
// @include        http://www.slutload.com/watch/*.html
// ==/UserScript==

function xpath(query) {
 return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
}

var param = xpath('//noscript');// noscript/object actually but object becomes CDATA
var ns = param.snapshotItem(0);
var s = ns.innerHTML;

var r = /value="flv=([^"]*?)"/;
var m = s.match(r);
var uenc = m[1];
if (uenc.match(/^http%3A/)) {
	// url is encoded	
	var url = unescape(uenc);

	var ref = document.getElementById('content');
	var h1 = ref.getElementsByTagName('H1')[0];
	var a = document.createElement('A');
	a.href = url;
	a.innerHTML = 'DOWNLOAD FLV';
	//ref.insertBefore(a, h1.nextSibling);
	h1.appendChild(document.createElement('BR'));
	h1.appendChild(a);
}

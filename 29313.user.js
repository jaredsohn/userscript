// ==UserScript==
// @name          4chan unroll
// @namespace     http://mauke.ath.cx/greasemonkey/
// @description   change background color of interthread links
// @include       http://img.4chan.org/*.html
// @include       http://cgi.4chan.org/*.html
// @include       http://zip.4chan.org/*.html
// @include       http://orz.4chan.org/*.html
// @include       http://img.4chan.org/*.html
// ==/UserScript==

function xpath(expr) {
	return document.evaluate(expr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var url = location.href.replace(/[#?].*/, "");

var orn = (
	/^http:\/\/[^\/]+\/[^\/]+\/[^\/.]+\.html$/.test(url)
	? 'preceding::a[text()="Reply"][1]/@href'
	: '"' + url + '"'
);

var rol = xpath('//a[@class="quotelink"][substring-before(@href,"#") != substring(' + orn + ',1 + string-length(' + orn + ') - string-length(substring-before(@href,"#")))]');

for (var i = 0; i < rol.snapshotLength; ++i) {
	var elem = rol.snapshotItem(i);
	elem.style.backgroundColor = 'silver';
}

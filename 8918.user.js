// ==UserScript==
// @name           TinyURL restorer
// @namespace      http://jmblog.jp
// @description    restore the TinyURL and show the original URL in tooltip.
// @include        *
// ==/UserScript==

// This script uses Remy Sharp's TinyURL Callback API http://remysharp.com/tinyurlapi

var snapTinyURLs = document.evaluate("//a[contains(@href,'http://tinyurl.com/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < snapTinyURLs.snapshotLength; i++){
	var tiny_url = snapTinyURLs.snapshotItem(i);
	setTitle(tiny_url, tiny_url.textContent);
}

function setTitle(elem, url) {
	elem.setAttribute('title', 'Please wait ...');
	GM_xmlhttpRequest({
		method:'GET',
		url: 'http://remysharp.com/tinyurlapi?callback=cb&url=' + url,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
		onload:function(results) {
			var restored_url = results.responseText.match(/cb\(\"(http.+)"\)/)[1];
			elem.setAttribute('title', restored_url);
			//GM_log('set title : ' + url + ' -> ' + restored_url);
		}
	});
}
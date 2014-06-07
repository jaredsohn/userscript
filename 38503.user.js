// ==UserScript==
// @name           SoF2Files Direct Download Links
// @namespace      http://userscripts.org/users/23652
// @description    Makes the 'Download now' buttons directly linked
// @include        http://soldieroffortune2.filefront.com/file/*
// @copyright      JoeSimmons
// ==/UserScript==

var links, l, i;

link = document.evaluate("//a[contains(@href, '/file/gofetch/')]", document, null, 9, null).singleNodeValue;

function sethref(r) {
link.href = r.finalUrl;
}

GM_xmlhttpRequest({
    method: 'GET',
    url: link.href,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/html,text/html',
    },
    onload: function(rd) {
        //responseDetails.status
        //responseDetails.statusText
        //responseDetails.responseText
		sethref(rd);
    }
});
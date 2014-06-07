// ==UserScript==
// @name           in reply to WHAT?
// @namespace      http://saperduper.org
// @description    Instead of an 'in reply to [someone]' link, see the actual tweet in a tooltip
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript== 

var ols = document.getElementsByTagName('ol');
var ol = ols[0];
var as = ol.getElementsByTagName('a');
for (var i = 0; i < as.length; i++) {
    var a = as[i];
    if (a.innerHTML.indexOf("in reply to") == 0) {
        reply_to(a);
    }
}

ol.addEventListener('DOMNodeInserted', function (event) {
    var links = event.target.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.innerHTML.indexOf("in reply to") == 0) {
            window.setTimeout(reply_to, 0, link);
        }
    }
},

false);

function tipsify() {
    unsafeWindow.jQuery('.meta a[title]').tipsy();
}

function reply_to(link) {
    GM_xmlhttpRequest({
        method: "GET",
        url: link.href,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/xml"
        },
        onload: function (response) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(response.responseText, "application/xml");
            var entry = dom.getElementsByTagName('text')[0].textContent;
            link.setAttribute('title', entry);
            tipsify();
        }
    });
}
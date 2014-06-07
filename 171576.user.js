// ==UserScript==
// @author         thrakt
// @name           feedly Auto Read Ads
// @namespace      http://d.hatena.ne.jp/thrakt/
// @version        2013.06.23
// @include        http://cloud.feedly.com/#latest
// @include        http://cloud.feedly.com/#subscription*
// @include        http://cloud.feedly.com/#category*
// ==/UserScript==

document.body.addEventListener("DOMNodeInserted", function(e) {
    var element = e.target;
    if (!element.className.contains('u0Entry')) return;
    if (element.attributes.getNamedItem('data-title').value.toUpperCase().match(/^(PR:|AD:|\[PR\])/i)) {
        element.click();
        var inline = document.getElementsByClassName('inlineFrame')[0];
        inline.parentNode.removeChild(inline);
    }
}, false);
//.user.js
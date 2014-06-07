// ==UserScript==
// @name           Reddit related
// @namespace      http://rory.netsoc.ucd.ie/reddit
// @description    Added related link to reddit info pages
// @include        http://*reddit.com/info*
// ==/UserScript==

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

window.location.href.match(/id=(.*)/);
id = RegExp.$1;

related_link = document.createElement('a');
related_link.href = window.location.href.replace("info", "related");
related_link.className = 'bylink';
related_link.innerHTML = "related";

related_span = document.createElement('span');
related_span.insertBefore(related_link, related_span.firstChild);

numeric_id = xpath("//input[@name='id']").snapshotItem(0).value

share_link = xpath("//a[@href=\"/share?id="+id+"\"]").snapshotItem(0);
related_span.id = "save"+numeric_id;
share_link.parentNode.insertBefore(related_span, share_link.parentNode.lastChild.nextSibling);

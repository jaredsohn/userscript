// ==UserScript==
// @name           Forum Prefix Remover
// @include        *forums.kingdomofloathing.com*
// @description    Removes Prefixes from the forums. Code by CDMoyer
// ==/UserScript==
    var taglinks = document.evaluate("//td[contains(@id,'td_threadtitle_')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var td, span, spans;
    for (i = 0; i < taglinks.snapshotLength; i++) {
        td = taglinks.snapshotItem(i);
        spans = td.getElementsByTagName("span");
        for (var j = 0; j < spans.length; j++) {
            span = spans[j];
            if (span.innerHTML.match(/\[.*\]\s*/)) {
                span.style.display = 'none';
            }   
        }   

    }
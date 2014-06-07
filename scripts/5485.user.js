// ==UserScript==
// @name          ho.com.ua ad remove
// @namespace     http://userscripts.org/
// @description   remove banner at top corner on *.ho.com.ua sites
// @include       http://*.ho.com.ua/*
// ==/UserScript==
function deleteAd() {
    var items = document.evaluate("//div[@id='bn' or @id='ch']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
    for( i=0; i<items.snapshotLength; i++ ) {
        item = items.snapshotItem(i);
        item.parentNode.removeChild( item );
    }
}
window.addEventListener( 'load', deleteAd, true );

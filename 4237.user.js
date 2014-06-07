// ==UserScript==
// @name          narod.ru ad remove
// @namespace     http://userscripts.org/
// @description   remove banner at top right corner on *.narod.ru sites
// @include       http://*.narod.ru/*
// ==/UserScript==
function deleteAd() {
    var items = document.evaluate("//div[@id='bt' or @id='bn' or @id='ch']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
    for( i=0; i<items.snapshotLength; i++ ) {
        item = items.snapshotItem(i);
        item.parentNode.removeChild( item );
    }
}
window.addEventListener( 'load', deleteAd, true );

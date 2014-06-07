// ==UserScript==
// @name           Pornbay Anonymous hider
// @namespace      Mickie, tmk
// @include        http://pornbay.org/browse.php*
// @include        http://*.pornbay.org/browse.php*
// ==/UserScript==

var header=".//table[3]/tbody/tr[3]/td/table[2]/tbody/tr/td[2]/a/b";

var torrents="/html/body/table[3]/tbody/tr[3]/td/table[2]/tbody/tr"

var torrents = document.evaluate(
        torrents, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var i=1;        
while ( (res=torrents.snapshotItem(i) ) !=null){
    var child = res.getElementsByTagName("td");
    if ( child[9].lastChild.textContent == "Anonymous" ){
        ul = res.parentNode;
        ul.removeChild(res)
        }
    i++
    }
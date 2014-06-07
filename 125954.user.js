// ==UserScript==
// @name           Pornbay low-seed hider
// @namespace      Mickie
// @include        http://pornbay.org/browse.php*
// @include        http://pornbay.org/torrents.php*
// @grant none
// ==/UserScript==

var header=".//table[3]/tbody/tr[3]/td/table[2]/tbody/tr/td[2]/a/b";

var seeders=".//*[@id='torrent_table']/tbody/tr"

var seedres = document.evaluate(
        seeders, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var i=1;        
while ( (res=seedres.snapshotItem(i) ) !=null){
    var child = res.getElementsByTagName("td");
    if ( parseInt(child[7].lastChild.textContent) < 50 ){
        ul = res.parentNode;
        ul.removeChild(res)
        }
    i++
    }
// ==UserScript==

// @name           lbTrueLinks

// @description    makes items in torrent list clickable with middle mouse button (goes to details page in new tab)

// @include        http*://www.learnbits.me/browse.php*

// ==/UserScript==



links = document.getElementsByTagName('a');



for(j=0;j<links.length;j++){

    if(links[j].id.indexOf('torrentmenu')==0){

        links[j].href='details.php?id='+links[j].id.substr(11);

    }

} 


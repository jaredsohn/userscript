// ==UserScript==
// @name       Menu input remove - masters.azs-awf.pl
// @namespace  http://wojtekk.net/
// @version    0.1
// @description  Usuwa zbędne pola z menu w Wordpressie
// @match      http://masters.azs-awf.pl/wp-admin/nav-menus.php
// @copyright  2012+, wojtekk
// ==/UserScript==

function clearWordpressMenu() {
    var toRemove = [ "edit-menu-item-classes", "edit-menu-item-xfn", "edit-menu-item-description", "menu-item-data-db-id", "menu-item-data-object-id", "menu-item-data-object", "menu-item-data-parent-id", "menu-item-data-position", "menu-item-data-type"];
    var elements = null;
    
    while( document.getElementsByClassName(toRemove[0]).length != 0 ) {
        for( c=0; c<toRemove.length; c++ ) {
            elements = document.getElementsByClassName(toRemove[c]);
            if( !elements.length ) continue;
            for( e=0; e<elements.length; e++ ) {
                p = elements[e].parentNode;
                x = p.removeChild(elements[e]);
            }
        }
    }
    console.log("Clear");
}

window.addEventListener("load", clearWordpressMenu);

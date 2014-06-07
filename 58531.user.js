// ==UserScript==
// @name           Caramelldansen Saver
// @namespace      Chorvus ( chorvus[blah]gmail.com )
// @description    Caramelldansen Saver
// @include        http://digimentalup.free.fr/caramell/caramell.html
// ==/UserScript==

function saveTime() {
    GM_setValue( "caramell_s", unsafeWindow.seconds );
    GM_setValue( "caramell_m", unsafeWindow.milisec );
}

function retrieveTime() {
    unsafeWindow.seconds = GM_getValue( "caramell_s", 0 );
    unsafeWindow.milisec = GM_getValue( "caramell_m", 0 );
}

retrieveTime();

setInterval( function() {
    saveTime();
}, 3000 );
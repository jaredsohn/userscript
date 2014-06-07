// ==UserScript==
// @name         WIW kileptetes gatlo
// @namespace    http://www.atleta.hu/gm/wiw
// @description  v0.1 Megakadalyozza, hogy uzenetiras kozben kileptessen a rendszer, es emiatt ujra be kelljen jelentkezned, esetleg elvesszen az uzeneted.
// @include      http://*wiw.hu/*
// @include      http://*wiw.net/*
// ==/UserScript==

/*
        Author: Laszlo Marai / atleta
        Date:   2007-05-14
        License: General Public License
*/

(function(){
    const VERSION = "0.1";
    const NO_VERSION = "NO VERSION INFO";
    const BASE_KEY = "WIWNoLogout.";
    const VERSION_KEY = BASE_KEY + "Version";

    const URI_BASE = document.baseURI.replace( /(http:\/\/[^\/]*\/).*/, "$1" );
    const KEEPALIVE_URL = URI_BASE + "pages/user/search.jsp";
    const INTERVAL = 90 * 1000;

    function handleUpgrade() {
        if ( GM_getValueUTF8( VERSION_KEY, NO_VERSION ) != VERSION ) {
            GM_setValueUTF8( VERSION_KEY, VERSION );
        }
    }

    function toUTF8(s) {
        return unescape( encodeURIComponent( s ) );
    }

    function fromUTF8(s) {
        return decodeURIComponent( escape( s ) );
    }

    function GM_getValueUTF8( key, deflt ) {
        return fromUTF8( GM_getValue( key, toUTF8( deflt ) ) );
    }

    function GM_setValueUTF8( key, value ) {
        GM_setValue( key, toUTF8( value ) );
    }

    function asList( iterable ) {
        var list = [];
        var item = null;
        while ( ( item = iterable.iterateNext() ) != null ) {
            list.push( item );
        }

        return list;
    }
    
    function keepAlive() {
        var request = new XMLHttpRequest();
        request.open( "GET", KEEPALIVE_URL );
        request.send( null );
    }
    
    function unload() {
        window.clearInterval( timer );
    }

    handleUpgrade();
    window.addEventListener( 'unload', unload, false );
    var timer = window.setInterval( keepAlive, INTERVAL );
})();
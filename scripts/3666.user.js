// ==UserScript==
// @name         WIW Ismerosok rendezese
// @namespace    http://www.atleta.hu/gm/wiw
// @description  v0.1 Masok ismeroseinek listazasa a kapcsolat letrejottenek ideje szerint rendezve.
// @include      http://*wiw.hu/pages/user/friends.jsp*
// @include      http://*wiw.net/pages/user/friends.jsp*
// @include      http://*wiw.hu/pages/user/userdata.jsp*
// @include      http://*wiw.net/pages/user/userdata.jsp*

// ==/UserScript==

/*
        Author: Laszlo Marai / atleta
        Date:   2006-03-03
        License: General Public License
*/

(function(){
    const LINK = "//default:li[@id='lm_friends']/default:a";

    function createResolver( resolver ) { 
        return function( ns ) { 
            return resolver.lookupNamespaceURI( ns == "default" ? "" : ns )
        }
    }

    var resolver = createResolver( 
        document.createNSResolver(document.documentElement) );

    var anchor = document.evaluate( LINK, document, 
            resolver, XPathResult.ANY_TYPE, null ).iterateNext();

    anchor.href += "&order=insdate"

})();
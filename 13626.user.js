// ==UserScript==
// @name         Tobb cimzett hozzaadasa egyszerre az uzenethez
// @namespace    http://www.atleta.hu/gm/wiw
// @description  v0.1 Tobb embert is kijelolhetsz egyszerre az ismeroseid listajabol es egy gombnyomassal felveheted oket a cimzettek koze. KERLEK TOVABBRA SE KULDJ SEMMILYEN KORLEVELET. Kivetelesen se, sose. Koszi.
// @include      http://*wiw.hu/pages/message/compose.jsp*
// @include      http://*wiw.net/pages/message/compose.jsp*
// ==/UserScript==

/*
        Author: Laszlo Marai / atleta
        Date:   2007-03-22
        License: General Public License. Egyeb kikotes: nem hasznalhato 
        koruzenetek tovabbitasara. Koruzenet alatt azokat az uzeneteket ertjuk,
        amiket ugy kapott a felhasznalo, hogy tobb cimzettje is volt a levelnek,
        majd ezt szinten tobb cimzettnek szandekozik tovabbitani. 
*/

(function(){
    const AVAILABLE_USERS = "availableUsers";

    function createResolver( resolver ) { 
        return function( ns ) { 
            return resolver.lookupNamespaceURI( ns == "default" ? "" : ns )
        }
    }

    var resolver = createResolver( 
        document.createNSResolver(document.documentElement) );

    var select = document.getElementsByName( AVAILABLE_USERS )[0];
    select.size = 15;
    select.multiple = true;
})();
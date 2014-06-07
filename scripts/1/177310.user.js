// ==UserScript==
// @name        Opencaching.de Map Link in Google Maps
// @namespace   http://flopp.net/
// @version     0.1.2
// @include     http://www.google.tld/maps*
// @include     http://maps.google.tld/*
// @include     https://www.google.tld/maps*
// @include     https://maps.google.tld/*
// @description Inserts a link to the map of opencaching.de into google maps.
// @copyright   2013+, Flopp <mail@flopp.net>
// ==/UserScript==

if( document.location.href.match( /^(http|https):\/\/maps\.google\.[a-zA-Z.]*/ ) || 
    document.location.href.match( /^(http|https):\/\/www\.google\.[a-zA-Z.]*\/maps/ ) )
{
    var ref_link = document.getElementById( "link" );
    if( ref_link )
    {
        function open_ocde()
        {
            var coordinates = ref_link.href.match( /&ll=([-0-9]*\.[0-9]*),([-0-9]*\.[0-9]*)/ );
            var zoom = ref_link.href.match( /z=([0-9]*)/ );
            if( coordinates != null && zoom != null ) 
            {
                var ocde_map_url = "http://www.opencaching.de/map2.php" + "?lat=" + coordinates[1] + "&lon=" + coordinates[2] + "&zoom=" + zoom[1];
                window.open( ocde_map_url );
            }
            else 
            {
                alert( "Diese Karte enthält leider keine Koordinatenangabe :(. Bitte die Karte verschieben." );
            }
        }
        
        var box = ref_link.parentNode;
        
        var ocde_image = document.createElement( "img" );
        ocde_image.setAttribute( "src", "http://www.opencaching.de/resource2/ocstyle/images/oclogo/oc_logo.png" );
        ocde_image.setAttribute( "title", "Zeige Gebiet bei opencaching.de" );
        ocde_image.setAttribute( "alt", "Zeige Gebiet bei opencaching.de" );
        ocde_image.setAttribute( "height", "20px" );
        
        var link = document.createElement( "a" );
        link.setAttribute( "class", "kd-button left small" );
        link.setAttribute( "title", "Zeige Gebiet bei opencaching.de" );
        link.setAttribute( "href", "#" );
        link.setAttribute( "id", "ocde_lnk" );

        link.appendChild( ocde_image );
        box.appendChild( link );
      
        document.getElementById( 'ocde_lnk' ).addEventListener( "click", open_ocde, false );
    }
}

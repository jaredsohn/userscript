// ==UserScript==
// @name        Opencaching.de Map Link in Geocaching.com Map
// @namespace   http://flopp.net/
// @version     0.1.2
// @include     http://www.geocaching.com/map*
// @description Inserts a link to the map of opencaching.de into geocaching.com's map.
// @copyright   2013+, Flopp <mail@flopp.net>
// ==/UserScript==

if( document.location.href.match( /^http:\/\/www.geocaching\.com\/map/ ) )
{
    var ref_link = document.getElementById( "map_linkto" );
    if( ref_link )
    {
        function open_ocde()
        {
            var s = ref_link.value;
            var coordinates = s.match( /ll=([-0-9]*\.[0-9]*),([-0-9]*\.[0-9]*)/ );
            var zoom = s.match( /z=([0-9]*)/ );
            if( coordinates != null && zoom != null ) 
            {
                var ocde_map_url = "http://www.opencaching.de/map2.php" + "?lat=" + coordinates[1] + "&lon=" + coordinates[2] + "&zoom=" + zoom[1];
                window.open( ocde_map_url );
            }
            else 
            {
                alert( "Diese Karte enthält leider keine Koordinatenangabe :(" );
            }
        }
        
        var permalink = ref_link.parentNode;
        
        var ocde_image = document.createElement( "img" );
        ocde_image.setAttribute( "src", "http://www.opencaching.de/resource2/ocstyle/images/oclogo/16x16-oc_logo.png" );
        
        var ocde_text = document.createElement( "span" );
        ocde_text.innerHTML = "Zeige bei Opencaching.de";
        
        var link = document.createElement( "a" );
        link.setAttribute( "class", "button" );
        link.setAttribute( "title", "Zeige Gebiet bei opencaching.de" );
        link.setAttribute( "href", "#" );
        link.setAttribute( "id", "ocde_lnk" );

        link.appendChild( ocde_image );
        link.appendChild( ocde_text );
        
        permalink.parentNode.insertBefore( link, permalink );
      
        document.getElementById( 'ocde_lnk' ).addEventListener( "click", open_ocde, false );
    }
}

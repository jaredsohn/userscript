// Ez egy kiegeszites a FireFox es Mozilla bongeszokhoz, amivel ki/be kapcsolhatod a WiW-en a gephazat. Ahhoz, hogy hasznalni tudd, eloszor fel kell
// telepitened a GreaseMonkey nevu kiegeszitot. Ezt a http://greasemonkey.mozdev.org/ oldalon tudod megtenni.
// A kiegeszites telepitese utan lepj ki a bongeszobol, inditsd ujra, majd gyere vissza erre az oldalra.
// Ezek utan kattints az [Install this script] menupontra, es kesz is vagy. Amikor legkozelebb belepsz a WiWre, el lesz rejtve a gephaz. Ha megis kivancsi vagy ra, a fejlecre kattintva visszakapcsolhatod.
// Marai Laszlo /atleta/ otletet ( http://userscripts.org/scripts/show/2275) modositotta: Lucza Gyuri
// License: General Public License
//
// ==UserScript==
// @name         WIW 'Gephaz on/off'
// @namespace   http://userscripts.org/users/57223 
// @description  v0.1 Eltunteti a gephazat
// @include      http://*wiw.*/pages/main/*
// ==/UserScript==

/*
        Author: Laszlo Marai /atleta/ otletet ( http://userscripts.org/scripts/show/2275) modositotta: Lucza Gyuri
        Date:   2006-03-27
        License: General Public License
*/

(function(){
    const STATUS_KEY = "MessageBoardStatus";
    
    const HEADINGS = [
        "//default:div[@class='contribution']/default:table/default:tr/default:td[1]",
        "//default:div[@class='mm']/default:h4",
        ];

    const CONTENTS = [
        "//default:div[@class='contribution']/default:p",
        "//default:div[@class='mm']/default:div[@class='item']",
        
        ];
    
//    GM_log( "1 - Starting" );

    function createResolver( resolver ) { 
        return function( ns ) { 
            return resolver.lookupNamespaceURI( ns == "default" ? "" : ns )
        }
    }

    var resolver = createResolver( 
        document.createNSResolver(document.documentElement) );

//    GM_log( "2 - Created resolver" );

    for ( var i = 0; i < HEADINGS.length; i++ ) {
//        GM_log( "3[" + i + "] - XPath query" );
        try {
            var heading = document.evaluate( HEADINGS[i], document, 
                resolver, XPathResult.ANY_TYPE, null ).iterateNext();

//        GM_log( "4[" + i + "] - Query OK" );
        
    	    heading.style.MozUserSelect = "none";
	

//        GM_log( "5[" + i + "] - MozUserSelect set" );
            var content = document.evaluate( CONTENTS[i], 
                document, resolver, XPathResult.ANY_TYPE, null );

//        GM_log( "6[" + i + "] - Creating listener" );
            var listener = createListener( content, STATUS_KEY + i );
//        GM_log( "7[" + i + "] - calling listener" );
            listener( null );
//        GM_log( "8[" + i + "] - adding event handler" );
            heading.addEventListener( "click", listener, false );
//        GM_log( "9[" + i + "] - OK" );
        } catch ( e ) {
	    GM_log( "Caught: " + e );
	}
    }

//    GM_log( "10 - OK" );

    function createListener( content, statusKey ) {
        var message;
        var messages = [];
        var key = statusKey;
        var status = GM_getValue( key, 0 );
        var DISPLAY = [ "none", "" ];

        while ( message = content.iterateNext() ) {
            messages.push( message );
        }

        return function ( e ) {
            for ( var j = 0; j < messages.length; j++ ) {
                messages[j].style.display = DISPLAY[status];
            }
            
            GM_setValue( key, status );
            
            status = ( status + 1 ) % 2;
        }
    }
})();

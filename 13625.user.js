// ==UserScript==
// @name         WIW off-topic hozzaszolas figyelmezteto
// @namespace    http://www.atleta.hu/gm/wiw
// @description  v0.3 Egy kattintassal figyelmezteto uzenetet kuldhetsz a renitens offoloknak.
// @include      http://*wiw.hu/pages/forum/topic.jsp*
// @include      http://*wiw.net/pages/forum/topic.jsp*
// @include      http://*wiw.hu/pages/forum/topic.jsp*
// @include      http://*wiw.net/pages/forum/topic.jsp*

// ==/UserScript==

/*
        Author: Laszlo Marai / atleta
        Date:   2007-06-12
        License: General Public License
*/

(function(){
    var xp = new XPathHelper( document );
    
    const VERSION = "0.3";
    const NO_VERSION = "NO VERSION INFO";
    const BASE_KEY = "WiWOffHammer.";
    const VERSION_KEY = BASE_KEY + "Version";

    const URI_BASE = document.baseURI.replace( /(http:\/\/[^\/]*\/).*/, "$1" );
    const SENDMSG_URL = URI_BASE + "pages/message/compose.jsp?method=SaveForm";
    const USER_ID = getUserId( xp );
    const POST_TEMPLATE = "p_recipient=%s&p_subject=%s&len_text=%s&p_text=%s";
    const PARAM_RX = /%s/g;

    const SUBJECT_KEY = "Tema";
    const SUBJECT = "Kérlek próbálj meg kulturáltabban viselkedni"

    const MAX_MSG_LEN = 4000;
    
    const MESSAGE_KEY = "Uzenet";
    const MESSAGE = "Felhasználási feltételek: \n" + 
            "A jogellenes vagy jogosulatlan tevékenységek magukba foglalják például - de nem kizárólagosan - az alábbiakat:\n" +
            "(...)\n" +
            "Nemkívánatos elektronikus kommunikáció létesítése vagy továbbítása, mint a “spam”, vagy más tagoknak " +
            "küldött lánclevelek (hoax), vagy a többi tagnak a szolgáltatás használata során bármely " +
            "egyéb módon történő zavarása, ideértve (...) az apróban vagy a fórumban, az oda nem illő zavaró, agresszív " +
            "vagy témán kívüli („offtopic”) hozzászólásokat, hirdetéseket, illetve azokat az ismételt hozzászólásokat és " +
            "hirdetéseket, amelyeket több topikban, apró témakörben vagy akár az üzenőfalon azonos tartalommal, rövid időn "+ 
            "belül „flood”-szerűen szórnak szét.\n";

    const ICON = "data:image/gif;base64,R0lGODlhDAAMAIIAAQQCBHR2dFJRUikqKRESEaytrKCgoNTS1CH5BAEAAAAALAAAAAAMAAwAAgMoCEMgLgNIYMY4xhQTIiDMEAggQU6Sha6Nx0rQO4FyytRLrdxyXvOTBAA7";
    const USER_ID_RX = /.*\?.*userID=([0-9]+)/;
    
    const HIGHLIGHT = "#B8CFFF";
    const NORMAL = "";
    
    const MARGIN = "5px";
    //const PADDING = "5px";
    
    const STYLE_HAMMER = "img.hammer { padding-left: 5px; padding-right: 5px; margin-left: 5px }\n" +
        "img.hammer:hover { background: #B8CFFF; }";
    
    //"//default:table[@class='forummessage' and default:tr/default:td/default:a[@href='/pages/user/userdata.jsp?userID=" + USER_ID + "']]/default:tr[2]/default:td[1]"; 
    //const POSTS = "//default:table[@class='forummessage']/default:tr[1]/default:td[1]";
    const POSTS = "//default:table[@class='forummessage']/default:tr[1]/default:td[1][default:a[@href!='/pages/user/userdata.jsp?userID=" + USER_ID + "']]";

    function XPathHelper( document ) {
        var createResolver = function( resolver ) {
            return function( ns ) { 
                return resolver.lookupNamespaceURI( ns == "default" ? "" : ns )
            }
        }

        this.evaluate = function( location ) {
            return myDocument.evaluate( location, myDocument, 
            resolver, XPathResult.ANY_TYPE, null );
        }

        this.getFirst = function( location ) {
            return this.evaluate( location ).iterateNext();
        }

        var resolver = createResolver( 
        document.createNSResolver(document.documentElement) );
        var myDocument = document;
    }

    function handleUpgrade() {
        if ( GM_getValueUTF8( VERSION_KEY, NO_VERSION ) != VERSION ) {
            GM_setValueUTF8( VERSION_KEY, VERSION );
            GM_setValueUTF8( SUBJECT_KEY, SUBJECT );
            GM_setValueUTF8( MESSAGE_KEY, MESSAGE );
        }
    }

    function toUTF8(s) {
        return unescape( encodeURIComponent( s ) );
    }

    function fromUTF8(s) {
        return decodeURIComponent( escape( s ) );
    }

    function GM_getValueUTF8( key, deflt ) {
        GM_log( "Get: " + key + " (" + toUTF8( deflt ) + ")" );
        return fromUTF8( GM_getValue( key, toUTF8( deflt ) ) );
/*        var ret = azazaz( key );
        GM_log( "Got: " + ret );
        return ret;*/
    }

    function GM_setValueUTF8( key, value ) {
        GM_log( "Set: " + key + " = " + value );
        GM_setValue( key, toUTF8( value ) );
    }
    function getUserId( xpath ) {
        var anchor = xpath.getFirst( "//default:div[@id='wellcome']/default:p/default:a");

        return anchor.href.split( "userID=" )[1];
    }

    function asList( iterable ) {
        var list = [];
        var item = null;
        while ( ( item = iterable.iterateNext() ) != null ) {
            list.push( item );
        }

        return list;
    }

    function messageSent ( img, request ) {
        var myImg = img;
        var myRequest = request;
        return function() {
            //GM_log( "Hammered" );
            //GM_log( "STatus: " + myRequest.status );
            //GM_log( "Resposne: " + myRequest.responseXML.textContent );
            window.setTimeout( function() { myImg.style.background = NORMAL }, 500 );
        }
    }

    function sendingFailed ( img ) {
        var myImg = img;
        return function() {
            GM_log( "Message sending failed" );
            myImg.style.background = "red";
        }
    }

    function format( string, p1 ) {
        function toArray( like, start ) {
            var array = [];

            for( i = 0; i + start < like.length; i++ ) {
                array[i] = like[i + start]
            }

            return array;
        }

        function getParams() {
            var args = arguments;
            var cnt = 0;

            return function() {
                return args[cnt++];
            }
        }

        return string.replace( PARAM_RX, getParams.apply( null, toArray( arguments, 1 ) ) );
    }

    function prepareMessage( userid ) {
        var subject = GM_getValueUTF8( SUBJECT_KEY, SUBJECT );
        var message = GM_getValueUTF8( MESSAGE_KEY, MESSAGE );
        var length = MAX_MSG_LEN - message.length;
        
        return encodeURI( format( POST_TEMPLATE, userid, subject, length, message ) );
    }

    var callback = function( target ) {
        var userurl = this.parentNode.getElementsByTagName("a")[0].href;
        var userid = USER_ID_RX.exec( userurl )[1];
        var request = new XMLHttpRequest();
        request.open( "POST", SENDMSG_URL );
        request.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
        request.onload = messageSent( this, request );
        request.onerror = sendingFailed( this );
        this.style.background = "yellow";

        request.send( prepareMessage( userid ) );
    }
    
    function mouseOver( color ) {
        var background = color;
        
        return function( target ) {
            this.style.background = background;
        }
    }

    handleUpgrade();

    var headers = asList( xp.evaluate( POSTS ) );
    GM_log( "Header count = " + headers.length );
    
    GM_addStyle( STYLE_HAMMER );

    var enter = mouseOver( HIGHLIGHT );
    var exit = mouseOver( NORMAL );
        
    for ( i = 0; i < headers.length; i++ ) {
        var icon = document.createElement( "img" );
        icon.src = ICON;
        headers[i].appendChild( icon );
        icon.addEventListener( "click", callback, false );
        //icon.addEventListener( "mouseover", enter, false );
        //icon.addEventListener( "mouseout", exit, false );
        //icon.style.marginLeft=MARGIN;
        //icon.style.paddingLeft=PADDING;
        //icon.style.paddingRight=PADDING;
        icon.className = "hammer";
    }
})();
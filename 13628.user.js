// ==UserScript==
// @name         WIW felhasznalok megjelolese szinkoddal
// @namespace    http://www.atleta.hu/gm/wiw
// @description  v0.2 Minden felhasznalo neve mellett mejelenitunk egy egyedi szinkodot. Ettol azt remeljuk, hogy felismered, ha valaki egy ismeros neveben irogat. De ez csak egy kiserlet.
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
    
    const VERSION = "0.2";
    const NO_VERSION = "NO VERSION INFO";
    const BASE_KEY = "WiwColorID.";
    const VERSION_KEY = BASE_KEY + "Version";

    const URI_BASE = document.baseURI.replace( /(http:\/\/[^\/]*\/).*/, "$1" );
    const USER_ID = getUserId( xp );
    const POST_TEMPLATE = "p_recipient=%s&p_subject=%s&len_text=%s&p_text=%s";
    const PARAM_RX = /%s/g;
    const LAST_OLD_USER = 125773; // Becsles, le kell tesztelni
    const FIRST_NEW_USER = 8000000;//8404588;
    const MAX_USERS = 5000000;
    const COLOR_MAX = 16777215;

    //const POSTS = "//default:table[@class='forummessage']/default:tr[1]/default:td[1]/default:a[@href!='/pages/user/userdata.jsp?userID=" + USER_ID + "']";
    const POSTS = "//default:table[@class='forummessage']/default:tr[1]/default:td[1]/default:a";
    const TAG_CLASS = "_atleta_wiw_colorid_tag";
    const STYLE_TAG = "img." + TAG_CLASS + " {padding-left: 2px; padding-right: 2px; margin-left: 0px; margin-right: 4px;width: 8px; height: 8px; border-style: solid; border-width: 1px; }";
    const TAG_ICON = "data:image/gif;base64,R0lGODlhDAAIAIAAAQAAAP///yH5BAEAAAEALAAAAAAMAAgAAAIIjI+py+0PYyoAOw==";
    
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
    
    function toRGB( color ) {
        rgb = [];
        for ( var j = 0; j < 2; j++ ) {
            for ( var i = 0; i < 3; i++ ) {
                rgb[i] |= ( color % 16 ) << (j*4);
                color >>= 4;
            }
        }
        return rgb;
    }

    handleUpgrade();

    var headers = asList( xp.evaluate( POSTS ) );
    GM_log( "Header count = " + headers.length );
    GM_addStyle( STYLE_TAG );
    
    for ( i = 0; i < headers.length; i++ ) {
        var tag = document.createElement( "img" );
	tag.src = TAG_ICON;
        headers[i].parentNode.insertBefore( tag, headers[i] );
        //headers[i].parentNode.appendChild( tag );
        tag.className = TAG_CLASS;
        var id = Number( headers[i].href.split( "userID=" )[1] );
        var o = id;
        id = ( id < LAST_OLD_USER ? id : id - FIRST_NEW_USER + LAST_OLD_USER );
        var color = "rgb(" + toRGB( id ).join() + ")";
        GM_log( "" + o + " -> " + id + " => " + color );
        tag.style.backgroundColor = color;
    }
})();
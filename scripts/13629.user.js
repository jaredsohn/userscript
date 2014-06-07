// ==UserScript==
// @name         WIW Torolt kapcsolat figyelo
// @namespace    http://www.atleta.hu/gm/wiw
// @description  v0.98 Megprobaljuk eszrevenni, ha valamelyik ismerosunk torolt minket, es, ha szerencsek van, meg meg is mondom, hogy ki volt az
// @include      http://*wiw.hu/pages/*
// @include      http://*wiw.net/pages/*

// ==/UserScript==

/*
        Author: Laszlo Marai / atleta
        Date:   2006-06-03
        License: General Public License
*/

(function(){
    const VERSION = "0.98";
    const COMPATIBLE = 0.5;
    const NO_VERSION = "-1";
    const VERSION_KEY = "Version";

    const NUMBERS_XPATH = "//default:div[@id='numbers']";
    const FRIENDS_XPATH = NUMBERS_XPATH + "/default:p[1]/default:span";
    const PENDING_XPATH = NUMBERS_XPATH + "/default:p[2]/default:span";
    //const FRIEND_IDS = "//default:div[@id='center']/default:div/default:table/default:tr/default:td[2]/..";
    const FRIEND_IDS = "//default:td[@id='right-cell']/default:div/default:select/default:option";
    const FRIEND_IDS2 = "//default:div[@id='sendmail']/default:div/default:div[@class='to']/default:p/default:input";
    
    var xpath = new XPathHelper( document );
    
    const NUMBERS_NODE = xpath.getFirst( NUMBERS_XPATH );
    const FRIENDS_NODE = xpath.getFirst( FRIENDS_XPATH );
    const PENDING_NODE = xpath.getFirst( PENDING_XPATH );
    
    const EMPTY = "EMPTY";

    const URI_BASE = document.baseURI.replace( /(http:\/\/[^\/]*\/).*/, "$1" );

    const USER_LIST_PAGE = "pages/message/compose.jsp";
    const USER_LIST_URI = URI_BASE + USER_LIST_PAGE;

    const USER_ID = getUserId( xpath );

    const RELATION_COUNT = "RelationCount." + USER_ID;
    const FRIEND_LIST = "FriendList." + USER_ID;
    const DELETED_LIST = "DeletedList." + USER_ID;

    const NEW_DELETED_COUNT = "NewDeletedCount." + USER_ID;

    const TEMPLATE_VAR_ID = "TEMPLATE_VAR_ID";
    const TEMPLATE_RX_ID = RegExp( TEMPLATE_VAR_ID, "g" );
    const TEMPLATE_VAR_NAME =  "TEMPLATE_VAR_NAME";
    const TEMPLATE_RX_NAME = RegExp( TEMPLATE_VAR_NAME, "g" );
    const TEMPLATE_HEAD = "<HEAD><TITLE>Törölt kapcsolatok</TITLE></HEAD>" +
        "<BODY><H1>Törölt kapcsolatok</H1><TABLE>";
    const TEMPLATE_ROW = "<TR><TD><A HREF='" + URI_BASE + 
        "pages/user/userdata.jsp?userID=" + TEMPLATE_VAR_ID + 
        "' TARGET='DeletedUser'>" + TEMPLATE_VAR_NAME + "</A></TD>" +
        "<TD><A HREF='" + URI_BASE + 
        "pages/user/userdata.jsp?method=SendRequest&userID=" + TEMPLATE_VAR_ID + 
        "' TARGET='DeletedUser'>[Ismerősnek jelölöm]</A></TD>" +
        "</TR>";
    const TEMPLATE_FOOT = "</TABLE></BODY>";
    
    const STATUS_OK = 0;
    const STATUS_UPDATING = 1;
    const STATUS_MISSING = 2;
    
    const BACKGROUND = 0;
    const NUMBERS = 1;
    const REQUEST_TIMEOUT = 90000;

    const DELETED_USER_RX = /^(?:\s*-\s*){2}\s*\[\s*-\s*\]\s*$/;
    
    //const STATUS_COLORS = [["#00ff00", "#ff0000"], 
    const STATUS_COLORS = [[NUMBERS_NODE.style.backgroundColor, FRIENDS_NODE.style.color], 
        ["#ffff00", "#ff0000"], 
        ["#ff0000", "#ffff00"]];

    const ERROR_BORDER_STYLE = "dotted";
    const ERROR_BORDER_COLOR = "RED";

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

    function getUserId( xpath ) {
        var anchor = xpath.getFirst( "//default:div[@id='wellcome']/default:div/default:a");

        return anchor.href.split( "userID=" )[1];
    }

    function handleUpgrade() {
        var currentVersion = GM_getValue( VERSION_KEY, NO_VERSION );

        if ( currentVersion != VERSION ) {
            if ( Number( currentVersion ) < COMPATIBLE ) {
                GM_setValue( FRIEND_LIST, "" );
                GM_setValue( DELETED_LIST, "" );            
            }

            GM_setValue( VERSION_KEY, VERSION );
        }
    }

    function getListProperty( property ) {
        var list = GM_getValue( property, "" );
        
        if ( list.length > 0 ) {
            list = list.split( /,/ );
        } else {
            list = [];
        }

        return list;
    }

    function highlightNumbers( status ) {
        NUMBERS_NODE.style.backgroundColor = STATUS_COLORS[status][BACKGROUND];
        FRIENDS_NODE.style.color = STATUS_COLORS[status][NUMBERS];
        PENDING_NODE.style.color = STATUS_COLORS[status][NUMBERS];
    }

    function NumbersClickHandler( missingList ) {
        var missingIDs = missingList;
        var myWindow;

        var createDocument = function( event ) {
            //event.preventDefault();
            var doc = TEMPLATE_HEAD;

            for ( var i = 0; i < missingIDs.length / 2; i++ ) { //
                doc += TEMPLATE_ROW.replace( TEMPLATE_RX_ID, missingIDs[2 * i] ).replace( TEMPLATE_RX_NAME, 
                        unescape( missingIDs[2 * i + 1] ) );
            }
            doc += TEMPLATE_FOOT;

            GM_log( "Created document: " + doc );
            return doc;
        }

        this.setMissingList = function( missingList ) {
            missingIDs = missingList;
        }

        this.addToMissingList = function( newList ) {
            missingIDs = missingIDs.concat( newList );
        }

        this.handler = function() {
            myWindow = window.open( "data:text/html;charset=UTF-8," + createDocument() );
            //myWindow.document.documentElement.innerHTML = createDocument();
            GM_setValue( NEW_DELETED_COUNT, 0 );
            return false;
        }
    }

    function userListLoaded( request, relations, requestTimer ) {
        var myRequest = request;        
        // We cant create the XPathHelper qbecause we don't have the response yet
        var xp1 = null;
        var relationCount = relations;
        var timer = requestTimer;

        this.getCurrentFriends = function() {
            var friendList = xp1.evaluate( FRIEND_IDS );
            var currentFriends = [];
            var friend = null;
            var cnt = 0;

            while ( ( friend = friendList.iterateNext() ) != null ) {
                if ( friend.textContent != "- - [-]" ) {
                    currentFriends[cnt++] = Number( friend.value );
                    currentFriends[cnt++] = escape( friend.textContent );
                }
            }

            friendList = xp1.evaluate( FRIEND_IDS2 );

            while ( ( friend = friendList.iterateNext() ) != null ) {
                if ( !DELETED_USER_RX.test( friend.nextSibling.textContent ) ) {
                    currentFriends[cnt++] = Number( friend.value );
                    currentFriends[cnt++] = escape( friend.nextSibling.textContent );
                }
            }

            return currentFriends;
        }

        this.listToMap = function( list ) {
            var map = {};
            
            for( var cnt = 0; cnt < list.length / 2; cnt++ ) {
            //
                map[list[2 * cnt]] = list[2 * cnt];
            }

            return map;
        }

        this.getLastFriends = function() {
            return getListProperty( FRIEND_LIST );
        }

        this.getPageFriendCount = function() {
            return Number( xp1.getFirst( FRIENDS_XPATH ).textContent );
        }

        this.getMissingFriends = function( currentFriends, lastFriendList ) {
            var id = null;
            var newMissing = [];
            var newMissingCnt = 0;
            for ( var i = 0; i < lastFriendList.length / 2; i++ ) {//
                id = new Number( lastFriendList[2 * i] );
                //id = lastFriendList[i];
                
                if ( !( id in currentFriends ) ) {
                  newMissing[newMissingCnt++] = id;
                  newMissing[newMissingCnt++] = lastFriendList[2 * i + 1];
                }
            }

            return newMissing;
        }

        this.updateMissingNumbers = function( currentMissing ) {
            var newDeletedCount = GM_getValue( NEW_DELETED_COUNT, 0 );
            newDeletedCount += currentMissing.length / 2; //

            var status = newDeletedCount > 0 ? STATUS_MISSING : STATUS_OK;
            clickHandler.addToMissingList( currentMissing );
            highlightNumbers( status );
            GM_setValue( NEW_DELETED_COUNT, newDeletedCount );
        }

        return function() {
//            GM_log( "Callback called" );
//            GM_log( "response: " + myRequest.responseXML );
            clearTimeout( timer );
            if ( myRequest.status == 200 ) {
                xp1 = new XPathHelper( myRequest.responseXML );

                var currentFriendList = getCurrentFriends();
                var pageFriendCount = getPageFriendCount();
                if ( currentFriendList.length == pageFriendCount * 2 ) {
                    var currentFriends = listToMap( currentFriendList );
                    var lastFriendList = getLastFriends();

                    var missingFriends = 
                        getMissingFriends( currentFriends, lastFriendList );
                    GM_log( "Missing friends: " + missingFriends );
                    updateMissingNumbers( missingFriends );

                    if ( missingFriends.length > 0 ) {
                        GM_log( "old deleted list: " + getListProperty( DELETED_LIST ) );
                        var deleted = getListProperty( DELETED_LIST );
                        deleted.push( missingFriends );
                        GM_log( "Updating deleted list to: " + deleted );
                        GM_setValue( DELETED_LIST, deleted.toString() );
                    }

                    GM_log( "Updating relation count to " + relationCount );
                    GM_setValue( RELATION_COUNT, relationCount );
                    GM_log( "Updating friend list" );
                    GM_setValue( FRIEND_LIST, currentFriendList.toString() );
                } else {
                    GM_log( "Wrong friend list. Expected " + pageFriendCount + " got " + currentFriendList.length );
                    displayError();
                }
            }
        }
    }

    function displayError() {
        NUMBERS_NODE.style.borderColor = ERROR_BORDER_COLOR;
        NUMBERS_NODE.style.borderStyle = ERROR_BORDER_STYLE;
    }


    function userListLoadFailed( request ) {
        var myRequest = request;

        return displayError;
    }

    handleUpgrade();

    var friends = Number( FRIENDS_NODE.textContent );
    var pending = Number( PENDING_NODE.textContent );

    GM_log( "Friends: " + friends + " Pending: " + pending );

    var relations = friends + pending;
    var lastRelationCount = GM_getValue( RELATION_COUNT, 0 );
    var lastFriendCount = getListProperty( FRIEND_LIST ).length / 2; //
    var newDeleted = GM_getValue( NEW_DELETED_COUNT, 0 );
    var deletedList = getListProperty( DELETED_LIST );
    

    var clickHandler = new NumbersClickHandler( deletedList );//createNumbersClickHandler( deletedList );
    clickHandler.setMissingList( deletedList );

    NUMBERS_NODE.style.cursor = "help";
    NUMBERS_NODE.addEventListener( "click", clickHandler.handler, true );

    if ( relations != lastRelationCount || friends != lastFriendCount ) {
        highlightNumbers( STATUS_UPDATING );
            
        var request = new XMLHttpRequest();
        request.open( "GET", USER_LIST_URI );
        var requestTimer = setTimeout( function() {
                request.abort(); 
                displayError();
                GM_log( USER_LIST_PAGE + ": timeout" );
            }, REQUEST_TIMEOUT );
        request.onload = userListLoaded( request, relations, requestTimer );
        request.onerror = userListLoadFailed( request );
        request.send( null );
    } else {
        highlightNumbers( newDeleted > 0 ? STATUS_MISSING : STATUS_OK );
    }
})();

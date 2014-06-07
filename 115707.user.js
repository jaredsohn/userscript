// ==UserScript==
// @name           FAM Splatt Energy Menu
// @namespace      http://fishboy.appspot.com
// @version        2.0.Slagdar
// @description    This script will add a link to the current FamSplatt target.
// @include        http://www.starpirates.net/*
// ==/UserScript==

// globals
TARGET_HREF = 'http://www.starpirates.net/profiles.php?id=52109';
TARGET_NAME = 'Slagdar';
TARGET_TITLE = 'FAM Splatt target: ' + TARGET_NAME;
START_TIME = "2011-10-13 12:00:00"
END_TIME = "2011-10-27 12:00:00"
//

function xpath(query) {
  return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function get_game_time() {
    var result = xpath( "//tr[ @class='header_general' ]" );
    result = result.snapshotItem( 0 );
    var game_time = result.childNodes[1].childNodes[0].data;
    return game_time;
}


function add_fleet_menu_items() {
    try {
        var result = xpath( "//a[ @href='gang.php' ]" );
        if( result.snapshotLength > 0 ) {
            var link = result.snapshotItem( 0 );
            var position = link.nextSibling;
            var menu = link.parentNode;

            menu.insertBefore( document.createElement( 'br' ), position );

            var img = document.createElement( 'img' );
            img.src = "images/dd_menu_item.gif";
            img.style.paddingLeft = "1em"
            menu.insertBefore( img, position );

            var target_link = document.createElement( 'a' );
            target_link.href = TARGET_HREF;
            target_link.innerHTML = "Splatt Target: " + TARGET_NAME;
            target_link.title = TARGET_TITLE;
            menu.insertBefore( target_link, position );


            menu.insertBefore( document.createElement( 'br' ), position );

            img = document.createElement( 'img' );
            img.src = "images/dd_menu_item.gif";
            img.style.paddingLeft = "1em"
            menu.insertBefore( img, position );

            var log_link = document.createElement( 'a' );
            log_link.href = "gangattacklog.php";
            log_link.innerHTML = "Attack Log";
            menu.insertBefore( log_link, position );


        } else {
            console.log( "could not find Fleet menu item." );
        }
    } catch( error ) {
        alert( error );
    }
}

game_time = get_game_time();
if( game_time >= START_TIME && game_time <= END_TIME ) {
    add_fleet_menu_items();
}


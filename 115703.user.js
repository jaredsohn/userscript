// ==UserScript==\
// @name           FAM Splat Target Link
// @namespace      http://fishboy.appspot.com
// @version        3.0.Figgin
// @description    This script will add a link to the current FamSplat target.
// @include        http://www.starpirates.net/*
// ==/UserScript==\
\
// globals\
TARGET_HREF = 'http://www.starpirates.net/profiles.php?id=55944';\
TARGET_NAME = 'Figgin';\
TARGET_TITLE = 'FAM Splat target: ' + TARGET_NAME;\
START_TIME = "2011-10-17 12:00:00"\
END_TIME = "2011-10-30 12:00:00"\
//\
\
function xpath(query) \{\
  return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);\
\}\
function get_game_time() \{\
    var result = xpath( "//tr[ @class='header_general' ]" );\
    result = result.snapshotItem( 0 );\
    var game_time = result.childNodes[1].childNodes[0].data;\
    return game_time;\
\}\
\
\
function add_target_link() \{\
    try \{\
        var result = xpath( "//a[ @href='forums/edit_profile.php' ]" );\
        if( result.snapshotLength >= 2 ) \{\
            var link = result.snapshotItem( 1 );\
            //console.log( link );\
            //console.log( link.parentNode );\
            var spacer = document.createTextNode( ' | ' );\
            var target_link = document.createElement( 'a' );\
            target_link.href = TARGET_HREF;\
            target_link.innerHTML = TARGET_NAME;\
            target_link.title = TARGET_TITLE;\
\
            link.parentNode.insertBefore( target_link, link );\
            link.parentNode.insertBefore( spacer, link );\
\
        \} else \{\
            console.log( "could not find settings link." );\
        \}\
\
    \} catch( error ) \{\
        alert( error );\
    \}\
\}\
\
game_time = get_game_time();\
if( game_time >= START_TIME && game_time <= END_TIME ) \{\
    add_target_link();\
\}\
}
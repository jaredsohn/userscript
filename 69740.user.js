// ==UserScript==
// @name          YouTube HD Lite
// @namespace     http://userscripts.org/users/78916
// @description   Automatically plays the best quality YouTube video format and removes ads, plus several optional features
// @include       http://www.youtube.com/watch*
// @version       2011-08-05
// ==/UserScript==

// Optional Features
var use1080p = true,
    use720p = true,
    wideVideo = true,
    hideAnnotations = true,
    scrollToVideo = true,
    autoPlay = true,
    hideControls = true;

    
// for console debug messages
var debug = false;


// ensure proper Youtube URL
if ( location.href.search( "watch#!" ) != -1 ) {
    var url = location.href.split( "watch#!" );
    url = url[0] + "watch?" + url[1];
    window.open( url, "_self" );
}


if ( scrollToVideo ) {
    document.getElementById( "watch-headline-title" ).scrollIntoView( true );
}

if ( wideVideo ) {
    // sidebar must be moved down
    var A = document.getElementById( "content" );
    if ( A.className.indexOf( "watch-wide" ) == -1 ) {
        A.className += " watch-wide";
    }
    // video
    A = document.getElementById( "watch-video" );
    if ( A.className.indexOf( "wide" ) == -1 ) {
        A.className += " wide";
    }
}


var player = document.getElementById( "movie_player" ),
    myPlayer = player.cloneNode( true ), 
    config = unsafeWindow.yt.getConfig( "PLAYER_CONFIG" ),
    flashvars = myPlayer.getAttribute( "flashvars" );

if ( debug ) GM_log( "flashvars unmodified: " + flashvars );


function setFlashvar( field, newVal ) 
{
    var delimited = "&" + field;
    if ( flashvars.indexOf( delimited ) == -1 ) {
        // field not found, so append it
        flashvars += delimited + "=" + newVal;
    }
    else {
        // modify existing field
        var tmp = flashvars.split( delimited );
        var tmp2 = tmp[1].indexOf( "&" );
        if ( tmp2 != -1 ) {
            flashvars = tmp[0] + delimited + "=" + newVal + tmp[1].substr( tmp2 );
        }
        else {
            flashvars = tmp[0] + delimited + "=" + newVal;
        }
    }
}
    

/**********************************************
//     2010.12.22 list of video formats 
// fmt=5    240p          vq=small     flv
// fmt=18   240p or 360p  vq=medium    mp4
// fmt=34   240p or 360p  vq=medium    flv
// fmt=35   480p          vq=large     flv
// fmt=22   720p          vq=hd720     mp4
// fmt=37  1080p          vq=hd1080    mp4
***********************************************/

var fmt_list = config.args.fmt_list;
if ( debug ) GM_log( " fmt_list: " + fmt_list ); 

// now must set the "vq" var so that the proper format is loaded
if ( use1080p && ( fmt_list.search( /37(\/[^,]+){4}/ ) != -1 )) {
    setFlashvar( "vq", "hd1080" );
}
else if ( use720p && ( fmt_list.search( /22(\/[^,]+){4}/ ) != -1 )) {
    setFlashvar( "vq", "hd720" );
}
else if ( fmt_list.search( /35(\/[^,]+){4}/ ) != -1 ) {
    setFlashvar( "vq", "large" ); 
}
else {
    setFlashvar( "vq", "medium" );
}


setFlashvar( "enablejsapi", "1" );

if ( autoPlay ) {
    setFlashvar( "autoplay", "1" );
}
else {
    setFlashvar( "autoplay", "0" );
}    

setFlashvar( "watermark", "" );

setFlashvar( "invideo", "false" );

if ( hideAnnotations ) {
    setFlashvar( "iv_load_policy", "3" );
}

if ( hideControls ) {
    setFlashvar( "autohide", "1" );
}
else {
    setFlashvar( "autohide", "0" );
}

if ( debug ) GM_log( "flashvars final: " + flashvars );

myPlayer.setAttribute( "flashvars", flashvars );


player.parentNode.replaceChild( myPlayer, player );


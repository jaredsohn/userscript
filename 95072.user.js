// ==UserScript==
// @name           YouTube alternative player - JW Player
// @description    Replaces YouTube standard player with latest JW Player. YouTube HD 720p.
// @include        http://*youtube.com/*
// @include        https://*youtube.com/*
// @author					    clicker - clickerinjo [at] gmail [dot] com
// @version                     2.2
// @license                     Free to copy and improve.
// ==/UserScript==


function show() {
	// Remove original player and take flashvars
	original_player = document.getElementById('movie_player');
	var container = original_player.parentNode;
	container.removeChild(original_player);
	flashvars = to_array(original_player.getAttribute('flashvars'));

	// vidID
	var vidID = flashvars['video_id'];
	var startTIME = flashvars['start'];
		
	// Create player
	var player = document.createElement( "object" );
		player.setAttribute( "data", "http://player.longtailvideo.com/player.swf" );
		player.setAttribute( "height", original_player.getAttribute( "height" ) );
		player.setAttribute( "width", original_player.getAttribute( "width" ) );
		player.setAttribute( "type", "application/x-shockwave-flash" );
		player.setAttribute( "id", original_player.getAttribute( "id" ) );
		player.setAttribute( "allowscriptaccess", original_player.getAttribute( "allowscriptaccess" ) );
		player.setAttribute( "allowfullscreen", original_player.getAttribute( "allowfullscreen" ) );;
		player.setAttribute( "bgcolor", "#000000" );
		player.setAttribute( "wmode", "opaque" );
		player.setAttribute( "seamlesstabbing", "true" );
		player.setAttribute( "flashvars", "plugins=fbit-1h,timeslidertooltipplugin-1h,tweetit-1h,http://plugins.longtailvideo.com/5/hd/hd.swf&provider=youtube&hd.pluginmode=FLASH&smoothing=true&autostart=true&frontcolor=0x888888&backcolor=0x000000&file="+vidID+"&start="+startTIME);
		container.appendChild( player );

}

var to_array = function( raw ) {
    var raw = raw.split( "&" );
    var parameters = new Array;
    for( i in raw ){
        parameters[raw[i].split( "=" )[0]] = raw[i].split( "=" )[1];
    }
    return parameters;
}


show();
document.getElementById('movie_player').focus();
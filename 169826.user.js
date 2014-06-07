// ==UserScript==
// @name         Youtube Annotation Destroyer
// @namespace    http://userscripts.org/users/zackton
// @description  If you want those damn annotations to go away at the start of every video, this is the right script for you!
// @grant        GM_log
// @include	 http://www.youtube.com/watch*
// @include	 https://www.youtube.com/watch*
// @include	 http://www.youtube.com/user/*
// @include	 https://www.youtube.com/user/*
// @updateURL    http://userscripts.org/scripts/source/169826.meta.js
// @version      1.3
// ==/UserScript==

function main() {
	var hideAnnotations = true,
	skipAds = true;
	
	var debug = false;

	// ensure proper Youtube URL on normal watch pages
	if ( location.href.search( "watch#!" ) != -1 ) {
		var url = location.href.split( "watch#!" );
		url = url[0] + "watch?" + url[1];
		window.open( url, "_self" );
	}
	
	if ( debug ) GM_log( "page type: " + pageType );

    var playerDetails = fetchPlayer();
    var flashvars = playerDetails[2];

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
	
	//indexOf is faster than Regex in one off use
	var start = flashvars.search("fmt_list=");
	var end = flashvars.indexOf("&", start);
	var len = ((end != -1)?end:flashVars.length) - start;
	var fmt_list = flashvars.substr(start, len);
	
	if ( debug ) GM_log( " fmt_list: " + fmt_list );
	setFlashvar( "enablejsapi", "1" );
	
	if ( skipAds ) {
		var patt = /&(ad_|infringe|watermark)[^=]*=[^&]*/g;
		flashvars = flashvars.replace(patt,"");
		setFlashvar("invideo","false");
	}

	if ( hideAnnotations ) {
		setFlashvar( "iv_load_policy", "3" );
	}
	else {
		setFlashvar( "iv_load_policy", "1" );
	}

	if ( debug ) GM_log( "flashvars final: " + flashvars );
    myPlayer = playerDetails[0];
	myPlayer.setAttribute( "flashvars", flashvars );
	player = playerDetails[1];
	player.parentNode.replaceChild( myPlayer, player );
	
}

function fetchPlayer() {
	if ($("movie_player")) var player = $("movie_player");
	else if ($("movie_player-flash")) var player = $("movie_player-flash");
	else if ($c("html5-main-video")) var player = $c("html5-main-video");
	
	var	myPlayer = player.cloneNode( true ),
		flashvars = myPlayer.getAttribute( "flashvars" );
		
	if ( debug ) GM_log( "flashvars unmodified: " + flashvars );
	
	return [myPlayer, player, flashvars];
}

// simplify get ID
function $(ID) {
	if (document.getElementById(ID)) return document.getElementById(ID);
}

//simplify getClass
function $c(className) {
	if (document.getElementsByClassName(className)) return document.getElementsByClassName(className);
}

//make sure page is ready before firing script
function readyCheck() {
	if($("movie_player") && $("footer-container") || $("ft")) {
		window.clearInterval(wait);
		main();
		//checkChanged();
	}
	i++;
	if(i == 40) window.clearInterval(wait);
	
}
var wait=window.setInterval(readyCheck, 250, main), i=0;
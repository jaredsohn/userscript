// Created By: Mike Luby
// Email: lubymike@gmail.com
// Version: 1.0.2
// ==UserScript==
// @name          Twiddeo video viewer
// @namespace     http://twiddeo.com/
// @description   View videos from twiddeo.com right on twitter
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

function checkTwitter( ) {
	//get all td's
	var tds = document.getElementsByTagName( "div" );
	var n = tds.length;
	var pages = new Array( "start", "login", "developers", "tools", "about", "user", "webcam", "mobile", "public" );
	for( var i = 0; i < n; i++ ) {
		//find all td's with the class content
		if( tds[ i ].className == "status-body" ) {
			//find all the links inside that match twiddeo.com
			var content = tds[ i ];
			var links = content.getElementsByTagName( "a" );
			var m = links.length;
			for( var x = 0; x < m; x++ ) {
				var href = links[ x ].href;
				//see what links have the twiddeo url
				if( href.indexOf( "http://beta.twiddeo.com/" ) > -1 ) {
					//pull id from url
					var parts = href.split( ".com/" );
					var twid = parts[ 1 ];
					//make sure they have something after the .com/
					if( twid.length && pages.toString().indexOf( twid ) === -1 ) {
						//append embed code to url
						addVideo( content, twid );
					}
				}
			}
		}
	}
}
//add video to page
function addVideo( ele, twiddeo_id ) {
	var wrapper = document.createElement( "div" );
	ele.appendChild( wrapper );
	wrapper.innerHTML = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" id="twiddeoPlayer" style="margin: 0pt; padding: 0pt;" width="420" height="325"><param name="allowscriptaccess" value="always" /><param name="wmode" value="transparent" /><param name="movie" value="http://beta.twiddeo.com/embed/_gm/vid=' + twiddeo_id + '" /><param name="quality" value="high" /><param name="bgcolor" value="#81b5c3" /><embed src="http://beta.twiddeo.com/embed/_gm/vid=' + twiddeo_id + '" quality="high" bgcolor="#81b5c3" wmode="transparent" allowscriptaccess="always" swliveconnect="true"  name="twiddeoPlayer" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" align="middle" width="420" height="325" allowfullscreen="true"></embed></object>';
}
//lets get this party started
checkTwitter( );
// ==UserScript==
// @name          Last.fm - Recently Played
// @description	  Adds recently played information in various places around Last.fm
// @include       http://*.last.fm/*
// ==/UserScript==
// By BooooooooB - http://www.last.fm/BooooooooB
// Version 3.1


// Add styles
lastFmRecentlyPlayed_addGlobalStyle( 'ul.usersSmall li { width: 100% !important; }' +
	'ul.usersSmall span.userImage { margin-left: -78px !important; }' +
	'ul.usersSmall li div { padding-left: 78px !important; }' +
	'ul.usersSmall span.userImage img { margin-right: 5px !important; }' +
	'span.recentlyPlayed_outer { font-size: 0.8em; display: block; padding-left: 80px; color: #555; }' +
	'span.recentlyPlayed_inner { font-weight: bold; color: #444; }' );

window.lastFmRecentlyPlayed_init = function() {
	var usersSmall = document.getElementsByClassName( 'usersSmall' ), i, j, usersSmallImages;
	for( i = 0 ; i < usersSmall.length ; i++ ) {
		usersSmallImages = usersSmall[i].getElementsByTagName( 'img' );
		for( j = 0 ; j < usersSmallImages.length ; j++ ) {
			// Replace the small profile picture with a medium sized one
			if( usersSmallImages[j].className.indexOf( 'subscriber_icon' ) == -1 ) {
				usersSmallImages[j].src = usersSmallImages[j].src.replace( '\/34s\/', '\/64\/' ).replace( 'default_user_small.png', 'default_user_medium.png' );
				usersSmallImages[j].removeAttribute( 'width' ); // The 34x34 ones are square, but the 64 ones might not be, so remove the sizing constraints
				usersSmallImages[j].removeAttribute( 'height' );
			}
		}
	}
	// Add the recently played data
	window.lastFmRecentlyPlayed_update();
};
window.addEventListener( 'load', window.lastFmRecentlyPlayed_init, true );


window.lastFmRecentlyPlayed_update = function() {
	var usersSmall = document.getElementsByClassName( 'usersSmall' ), i, j, usersSmallLis, username;
	for( i = 0 ; i < usersSmall.length ; i++ ) {
		usersSmalLis = usersSmall[i].getElementsByTagName( 'li' );
		for( j = 0 ; j < usersSmalLis.length ; j++ ) {
			// Get the username
			try {
				username = usersSmall[i].getElementsByClassName( 'nickname' )[j].innerHTML;
			} catch( e ) {
				username = ( usersSmalLis[j].getElementsByTagName( 'a' )[0].innerHTML ).replace(/\<.*\>/, '' ).replace( ' ', '' );
			}
			console.log('username:'+username);
			// If we haven't already added the container to ut the recently played stats in, then do so
			if( usersSmalLis[j].getElementsByClassName( 'recentlyPlayed_' + username )[0] == undefined ) {
				usersSmalLis[j].innerHTML += '<span class="recentlyPlayed_' + username + '"></span>';	
			}
			// Add the recently played data for this user to the appropriate target element
			window.lastFmRecentlyPlayed_updateBlock( username, usersSmalLis[j].getElementsByClassName( 'recentlyPlayed_' + username )[0] );
		}
	}
	window.setTimeout( window.lastFmRecentlyPlayed_update, 60000*5 );
};


window.lastFmRecentlyPlayed_updateBlock = function( username, target ) {
	GM_xmlhttpRequest( {
		method: 'GET',
		url: 'http://ws.audioscrobbler.com/1.0/user/' + username + '/recenttracks.xml',
		onload: function( details ) {
			var username = details.responseText.slice( details.responseText.indexOf( 'user="' ) + 6, details.responseText.indexOf( '"', details.responseText.indexOf( 'user="' ) + 6 ) );
			var recentArtist = '';
			var recentTrack = '';
			var recentTime = 0;
			var recentHTML = '';
			if( ( details.responseText ).indexOf( '<name>' ) != -1 ) {
				recentArtist = ( details.responseText ).slice( ( details.responseText ).indexOf( '>', ( details.responseText ).indexOf( '<artist' ) ) + 1, ( details.responseText ).indexOf( '</artist>' ) );
				recentTrack = ( details.responseText ).slice( ( details.responseText ).indexOf( '<name>' ) + 6, ( details.responseText ).indexOf( '</name>' ) );
				recentTime = ( details.responseText ).slice( ( details.responseText ).indexOf( '<date uts="' ) + 11, ( details.responseText ).indexOf( '<date uts="' ) + 21 );
				var recentDate = new Date();
				recentDate.setTime( parseInt(recentTime)*1000 );
				var recentHTML = '' +
							'<span class="recentlyPlayed_outer"><span class="recentlyPlayed_inner">' + recentTrack + '</span></span>' +
							'<span class="recentlyPlayed_outer">by: <span class="recentlyPlayed_inner">' + recentArtist + '</span></span>' +
							'<span class="recentlyPlayed_outer">' + recentDate.toTimeSinceString() + ' ago</span>';
			}
			target.innerHTML = recentHTML;
		}
	} );
};





function lastFmRecentlyPlayed_addGlobalStyle( css ) {
    var head, style;
    head = document.getElementsByTagName( 'head' )[0];
    if( ! head ) { return; }
    style = document.createElement( 'style' );
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild( style );
}

/* =================================================================================================
* Time Since
* January 16, 2004
*
* Time Since creates a string which friendly tells you the time since the original date
* Based on the original time_since() function by Natalie Downe - http://blog.natbat.co.uk/archive/2003/Jun/14/time_since
*
* Copyright (c) 2004 Mark Wubben - http://neo.dzygn.com/
*
* Usage: date.toTimeSinceString(number nLimit, string sBetween, string sLastBetween)
* nLimit: limit the shown time units (year, month etc). default = 2
* sBetween: string between two time units. default = ", "
* sLastBetween: string between the second-last and last time unit. default = " and "
==================================================================================================*/
Date.prototype.toTimeSinceString = function( nLimit, sBetween, sLastBetween ) {
	if(!nLimit){ nLimit = 2; }
	if(!sBetween){ sBetween = ", "; }
	if(!sLastBetween){ sLastBetween = " and "; }
	if(!Date.prototype.toTimeSinceString._collStructs){
		Date.prototype.toTimeSinceString._collStructs = new Array(
			{seconds: 60 * 60 * 24 * 365, name: "year"},
			{seconds: 60 * 60 * 24 * 30, name: "month"},
			{seconds: 60 * 60 * 24 * 7, name: "week"},
			{seconds: 60 * 60 * 24, name: "day"},
			{seconds: 60 * 60, name: "hour"},
			{seconds: 60, name: "minute"}
		);
	}

	var collStructs = Date.prototype.toTimeSinceString._collStructs;
	var nSecondsRemain = ((new Date).valueOf() - this.valueOf()) / 1000;
	var sReturn = "";
	var nCount = 0;
	var nFloored;

	for(var i = 0; i < collStructs.length && nCount < nLimit; i++){
		nFloored = Math.floor(nSecondsRemain / collStructs[i].seconds);
		if(nFloored > 0){
			if(sReturn.length > 0){
				if(nCount == nLimit - 1 || i == collStructs.length - 1){
					sReturn += sLastBetween;
				} else if(nCount < nLimit && i < collStructs.length){
					sReturn += sBetween;
				}
			}
			sReturn += nFloored + " " + collStructs[i].name;
			if(nFloored > 1){
				sReturn += "s";
			}
			nSecondsRemain -= nFloored * collStructs[i].seconds;
			nCount++;
		}
	}
	return sReturn;
};
// ==UserScript==
// @name          Last.fm - Observe your friends
// @description	  observe what somebody's friends have recently been playing
// @include       http://*.last.fm/*
// ==/UserScript==
// 
// Made by myoclonia - http://www.last.fm/user/myoclonia/
// 
// Version 1.0
//  - First release - output the most recent tracks based on the friends list
//    on http://www.last.fm/user/<username>/friends/
//    This works for anybody's friend list!
//  - Heavily based on BooooooooB's Last.fm - Recently Played script (v1.6b)
//    http://www.last.fm/BooooooooB
//    Thanks for giving me a great start!
//
// Description
//    The "observe friends" option that used to be located 
//    at http://www.last.fm/user/<username>/observe  has been broken 
//    for some weeks now. That's why I decided to fix it myself ;-)
//
//    This script will display the 10 most recent tracks, using  
//    the friends list of any given user located on 
//    http://www.last.fm/user/<username>/friends/
//


// Script requires GM_xmlhttpRequest
if( ! GM_xmlhttpRequest ) {
	alert( 'Please upgrade to a newer version of Greasemonkey for the Last.fm recently played script to work.' );
}

// Caching things...
var nowTime = new Date();
var cacheTimeout = 4;

// Append the needed styles to the page
GM_addStyle( 'span.recentlyPlayedPanelArtist { display: block; padding-left: 5px; font-size: 0.9em; }' );
GM_addStyle( 'span.recentlyPlayedPanelTrack { display: block; padding-left: 5px; font-size: 0.9em; }' );
GM_addStyle( 'hr.recentlyPlayedHr { margin: 0; padding: 0; visibility: hidden; clear: both; }' );
GM_addStyle( '.lastPanel ul.i li a { height: auto !important; min-height: 60px !important; }' );

// Check if panel exists, and add most recently played tracks for each user
if( document.getElementById( 'friendslist' ) ) {
	lastFm_nowPlaying( document.getElementById( 'friendslist' ) );
}


// Goes through the panel and gets each block
function lastFm_nowPlaying( panel ) {
	// Get an array of all the user blocks in the panel
    var userBlocks = document.evaluate(
        "//li[@class='uName']",
        panel,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);

	// For each one...

    for (var i = 0; i < userBlocks.snapshotLength; i++) {

        var username = userBlocks.snapshotItem(i).getElementsByTagName( 'a' )[0].innerHTML;
		//username = ( username.replace(/^\W+/, '' ) ).replace(/\W+$/, '' );
		if( username ) {
			// Get and place data
			lastFm_nowPlaying_do( username, userBlocks.snapshotItem(i) );
		}
	}
}

// Gets the XML data for a block
function lastFm_nowPlaying_do( username, block ) {

	// Check the timestamp on the cache
	var cacheTime = GM_getValue( username + '_timeout', 0 );
	if( parseInt( nowTime.getTime() / 10000 )  <= cacheTime ) {
		// If this cache hasn't timed out yet, we can use it
		recentTracks = GM_getValue( username + '_recent', 0 );
		if( recentTracks ) {
			// Go use the stuff
			lastFm_nowPlaying_place( block, recentTracks, username );
			return;
		}
	}

	// If the cache has timed out...
	// Request the XML of the user's recent tracks
	GM_xmlhttpRequest( {
		method: 'GET',
		url: 'http://ws.audioscrobbler.com/1.0/user/' + username + '/recenttracks.xml',
		onload: function( details ) {
			// Put it into the cache
			var username = details.responseText.slice( details.responseText.indexOf( 'user="' ) + 6, details.responseText.indexOf( '"', details.responseText.indexOf( 'user="' ) + 6 ) );
			GM_setValue( username + '_recent', details.responseText );
			GM_setValue( username + '_timeout', parseInt( nowTime.getTime() / 10000 ) + ( cacheTimeout * 6 ) );
			// Go use the stuff
			lastFm_nowPlaying_place( block, details.responseText, username );
			return;
		}
	} );
}

// Parses the XML data and puts it in the block
function lastFm_nowPlaying_place( block, data, user ) {

	// If I was being tidy, I'd turn the XML string into a DOM, but I'm not sure it's worth it, so it's left as a string
	if( block && data ) {
		var recentArtist = '';
		var recentTrack = '';
		var recentTime = 0;

            var theplace = document.evaluate(
                "//li[@class='delete']",
                document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null);

		
		// Check that the user has actually listened to anything recently
		if( data.indexOf( '<name>' ) != -1 ) {

        var parser = new DOMParser();
        var dom = parser.parseFromString(data, "application/xml");
        var tracks = dom.getElementsByTagName('track');
        var artist, name, date;

		for (var i = tracks.length-1; i >= 0; i--) {

			artist = tracks[i].getElementsByTagName('artist')[0].textContent;
            name = tracks[i].getElementsByTagName('name')[0].textContent;
            date = tracks[i].getElementsByTagName('date')[0].textContent;

			// place data on page
			var main;
            // old version of last.fm (23rd oct 2006)
            //main = document.getElementById('widget');
            // for the october beta:
			main = document.getElementById('widgetHolder');
            var thisDiv = document.createElement("div");

            if (i == 0) {
                thisDiv.innerHTML = '<b>' + user + '</b>';
            }

			thisDiv.innerHTML += '<div style="float: left; text-align: left; width: 79%;">' + artist + ' - ' + name + '</div>';
            thisDiv.innerHTML += '<div style="float: right; text-align: right; width: 19%;">' + date + '</div>\n';

            // whitespace as a separator to the next block
			if (i == tracks.length-1) {
                thisDiv.innerHTML += '<div style="clear: right;"><br></div>\n';
			}
  
            if (main) {
                //main.parentNode.insertBefore(thisDiv, main);
                main.parentNode.insertBefore(thisDiv, main.nextSibling);
            }

		}			
		// end of for-block

		}			
	}
}


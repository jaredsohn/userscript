// ==UserScript==
// @name           iJigg
// @namespace      www.haz.ca
// @description    Script to embed iJigg players in google reader.
// @include        http://www.google.com/reader/view/
// @include        http://reader.google.com/*
// @include        http://www.google.com/reader/*
// @include        http://google.com/reader/*
// @include        https://www.google.com/reader/view/
// @include        https://reader.google.com/*
// @include        https://www.google.com/reader/*
// @include        https://google.com/reader/*
// ==/UserScript==

// Variable for the song id
var song_id;

// Get the entries for google reader and add the listener
var entries=document.getElementById("entries");
entries.addEventListener('DOMNodeInserted', function(event){nodeInserted(event);},true);

/* Function to handle any event on the 'entries' */
function nodeInserted(event){
	// Only handle div's
	if (event.target.tagName=="DIV"){
		try{
			if (event.target.className!=""){
				// Check if it's the container that has the song id info
				if (event.target.className=="entry-container"){
					// Get the html to process
					var stringToProc = event.target.innerHTML;
					// Isolate the song id
					song_id = stringToProc.split("http://www.ijigg.com/songs/")[1].split("\"")[0];
				}
				else
					return;
			}

			// Find where the actual feed stuff goes
			items = event.target.getElementsByTagName('INS');
			
			// Make sure we have a song_id
			if (song_id != "") {
				for (var i = 0; i < items.length; i++) {
					var item = items[i];

					// Embed the iJigg flash player with the song id
					item.firstChild.innerHTML = '<object width="315" height="80"><param name="movie" value="http://www.ijigg.com/jiggPlayer.swf?songID=' + song_id + '&Autoplay=1"><param name="scale" value="noscale" /><param name="wmode" value="transparent"><embed src="http://www.ijigg.com/jiggPlayer.swf?Autoplay=1&songID=' + song_id + '" width="315" height="80"  scale="noscale" wmode="transparent"></embed></object>';
				}

				// Reset the song id for future use
				song_id = "";
			}
		}

		catch(e){ GM_log("Error:" + e); }
	}
}
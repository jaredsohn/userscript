// ==UserScript==

// @name            last.fm - radio lyrics

// @namespace       http://www.reeloo.net

// @description     lyrics for last.fm radio (lyricwiki.org database)

// @include         http://www.last.fm/listen*

// @include         http://www.lastfm*/listen*

// @version         0.4

// @author          reeloo

// ==/UserScript==



//HISTORY

//

//

//	version 0.4 (20090804)

//		lyricsfly.com permanent API key obtained - fully functional again

//

//

//	version 0.3 (20090803) - temporary

//		on 3. July, lyricwiki.org discontinued offering their API service

//		migration to lyricsfly.com demo API (waiting for permanent API key)

//

//	version 0.2-

//		undocumented history

//





function foo(){

    // construction of wrapper for lyrics

    if (document.getElementById("userMetadata") && document.getElementById("recentTracks")) {

		if (!document.getElementById("greasemonkey_lyrics")) {

			sidebar = document.getElementById("userMetadata");

			sidebar.innerHTML = lyrics_wrapper + sidebar.innerHTML;

			

			//destroys rounded corners in top of sidebar (if recentTracks is in the top)

			recentTracks = document.getElementById("recentTracks");

			recentTracksClass = recentTracks.getAttribute("class");		

			recentTracksClass = recentTracksClass.replace("firstItems", "");

			recentTracks.setAttribute("class", recentTracksClass);

		}



		else {

			// db queries are expensive

			if (document.title != document_title_old){

				data = document.title.split(" - ");



				// only one safe method: "artist - title - Last.fm"

				if (data.length == 3){

					artist = data[0];

					title = data[1];



					//Greasemonkey's XMLHttp Request

					GM_xmlhttpRequest({

						method: "GET",

						url: "http://lyricsfly.com/api/api.php?i=55562032656-reeloo.net/wordpress/lyrics-for-lastfm-radio"

							+ "&a=" + encodeURIComponent(artist.replace(/[^a-z0-9]/ig, "%"))

							+ "&t=" + encodeURIComponent(title.replace(/[^a-z0-9]/ig, "%")),



						headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",

								  "Accept": "application/xml"},



						onload: function(response) {

								var responseDoc = new DOMParser().parseFromString(response.responseText, "text/xml");

								responseDoc.normalize();

								

								if (responseDoc.getElementsByTagName("tx").length > 0){

									var lyrics = responseDoc.getElementsByTagName("tx")[0].textContent;

									var sourceURL = "http://lyricsfly.com/search/correction.php?" + responseDoc.getElementsByTagName("cs")[0].textContent + "&id=" + responseDoc.getElementsByTagName("id")[0].textContent;

								}

								else{

									var lyrics = "...";

									var sourceURL = "http://lyricsfly.com/submit/";

								}

								

								lyrics_text = document.getElementById("greasemonkey_lyrics_text");

								lyrics_text.innerHTML = '<strong>' + artist +' - ' + title + '</strong><br /><br />'



												+ lyrics.replace(/\[br\]/g, "<br />")

												+ '<br/><span class="moduleOptions" style="padding-right: 0;">'

												+ '<a href="' + sourceURL + '" style="background-image: url(\'\'); padding-right: 0;">'

												+ '<img width="19" height="19" src="http://cdn.last.fm/flatness/icons/pencil.gif" class="edit_icon transparent_png" />'

												+ '<span>Edit</span></a></span>';

								}

					});

				}



				// page loading or undistinguishable document.title

				else{

					lyrics_text = document.getElementById("greasemonkey_lyrics_text");

					lyrics_text.innerHTML = "...";

				}



				// for process of "have we seen this before?"

				document_title_old = document.title;

			}

		}

	}

}











// wrapper for lyrics

lyrics_wrapper=''+

			'<div class="items firstItems" id="greasemonkey_lyrics">'+

			'	<h2 class="heading">'+

			'		<span class="h2Wrapper">Lyrics</span>'+

			'	</h2>'+

			'	<div id="greasemonkey_lyrics_text" class="itemContent" style="padding: 0.5em 1.2em 0.5em 1.2em;">'+

			'	</div>'+

			'</div>'+

			'';











// initialization

document_title_old = document.title;

setInterval(foo, 1000);


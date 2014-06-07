// ==UserScript==
// @name            last.fm - radio lyrics for Prism
// @description     lyrics for last.fm radio (lyricwiki.org database) - works in Prism *only*
// @include         http://www.last.fm/listen*
// @include         http://www.lastfm*/listen*
// @version         0.1
// @author          IceDBear
// ==/UserScript==

/*
 Based on the GreaseMonkey script by Reeloo:
 http://www.reeloo.net/wordpress/lyrics-for-lastfm-radio
 http://userscripts.org/scripts/show/36102
*/
 
const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;
 
var document_title_old;

var	lyrics_wrapper=''+
				'<div class="items firstItems" id="greasemonkey_lyrics">'+
				'	<h2 class="heading">'+
				'		<span class="h2Wrapper">Lyrics</span>'+
				'	</h2>'+
				'	<div id="greasemonkey_lyrics_text" class="itemContent" style="padding: 0.5em 1.2em 0.5em 1.2em;">'+
				'	</div>'+
				'</div>'+
				'';
var mainWindow;

				
function startup() {
}

function shutdown() {
}

function load(){
	var wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
	mainWindow = wm.getMostRecentWindow("navigator:browser");
	
	document_title_old = mainWindow.document.title;

	var poll = Cc["@mozilla.org/timer;1"].createInstance(Ci.nsITimer);
	poll.initWithCallback({notify: function(timer) { loadLyrics(mainWindow) }}, 5000, Ci.nsITimer.TYPE_REPEATING_SLACK);
}


function loadLyrics(mainWindow){

		var mainDoc = mainWindow.content.document;

		// construction of wrapper for lyrics
		if (mainDoc.getElementById("userMetadata") && mainDoc.getElementById("recentTracks")) {
			if (!mainDoc.getElementById("greasemonkey_lyrics")) {
				
				//append lyrics div at the top of the sidebar
				sidebar = mainDoc.getElementById("userMetadata");
				sidebar.innerHTML = lyrics_wrapper + sidebar.innerHTML;
				
				//destroys rounded corners in top of sidebar (if recentTracks is in the top)
				recentTracks = mainDoc.getElementById("recentTracks");
				recentTracksClass = recentTracks.getAttribute("class");		
				recentTracksClass = recentTracksClass.replace("firstItems", "");
				recentTracks.setAttribute("class", recentTracksClass);
			}
			else {
				// db queries are expensive
				if (mainDoc.title != document_title_old){
					document_title_old = mainDoc.title;
					
					data = mainDoc.title.split(" - ");
					// only one safe method: "artist - title - Last.fm"
					if (data.length == 3){
						artist = data[0];
						title = data[1];
						//XMLHttp Request
						var req = new XMLHttpRequest();
						var url = "http://lyricwiki.org/api.php?fmt=xml"
								+ "&artist=" + encodeURIComponent(artist)
								+ "&song="   + encodeURIComponent(title);
						req.open('GET', url, true);   
						req.onreadystatechange = function (aEvt) {  
						   if (req.readyState == 4) {  
							  if(req.status == 200)  
							   showLyrics(req.responseText, artist, title);  
						   }  
						};  
						req.send(null);
					}
					// page loading or undistinguishable document.title
					else{
						lyrics_text = mainDoc.getElementById("greasemonkey_lyrics_text");
						lyrics_text.innerHTML = "...";
					}
					// for process of "have we seen this before?"
					document_title_old = mainDoc.title;
				}
			}
		}
}

function showLyrics(responseText, artist, title) {

	var parser = Cc["@mozilla.org/xmlextras/domparser;1"].createInstance(Ci.nsIDOMParser);
	var responseDoc = parser.parseFromString(responseText, "application/xml");

	responseDoc.normalize();
	var lyrics = responseDoc.getElementsByTagName("lyrics")[0].childNodes[0].nodeValue; 
	
	var mainDoc = mainWindow.content.document;
	
	var sourceURL = responseDoc.getElementsByTagName("url")[0].childNodes[0].nodeValue;
	lyrics_text = mainDoc.getElementById("greasemonkey_lyrics_text");
	lyrics_text.innerHTML = '<strong>' + artist +' - ' + title + '</strong><br /><br />'
					+ lyrics.replace(/\n/g, "<br />")
					+ '<br/><span class="moduleOptions" style="padding-right: 0;">'
					+ '<a href="' + sourceURL + '" style="background-image: url(\'\'); padding-right: 0;">'
					+ '<img width="19" height="19" src="http://cdn.last.fm/flatness/icons/pencil.gif" class="edit_icon transparent_png" />'
					+ '<span>Edit</span></a></span>';
}

//dump text to the error console - for debugging
function myDump(aMessage) {
  var consoleService = Cc["@mozilla.org/consoleservice;1"].getService(Ci.nsIConsoleService);
  consoleService.logStringMessage(aMessage);
}

//mozilla style notification
function popup(title, message){
  window.platform.showNotification( title,message, null);
}

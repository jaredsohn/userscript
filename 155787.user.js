// ==UserScript==
	// @name 				Youtube Playlist Masthead Relocator
	// @namespace 			http://www.github.com/kimagure
	// @description 		moves the playlist mathead so that the "edit playlist" and "video manager" buttons and its bar are in a more sensible place (imo)
	// @include				http://www.youtube.com/playlist?*
	// @version				dev
// ==/UserScript==

function relocations() {
	var element = document.getElementById("masthead-subnav");
	if (element == null) {
		relocatepleheading();
		return;
	}
	var mycopy = element.outerHTML;
	element.outerHTML = "";

	var playlistcontent = document.getElementById("playlist-pane-container");
	var plchtml = playlistcontent.outerHTML;
	plchtml = plchtml.substring(0,35) + mycopy + plchtml.substring(36);
	playlistcontent.outerHTML = plchtml;
}

function relocatepleheading() {
	var element = document.getElementById('playlist-editor-heading');
	if (element == null) {
		return;
	}
	var mycopy = element.outerHTML;
	element.outerHTML = ''
	
	var playlistcontent = document.getElementById("playlist-pane-container");
	var plchtml = playlistcontent.outerHTML;
	plchtml = plchtml.substring(0,35) + mycopy + plchtml.substring(36);
	playlistcontent.outerHTML = plchtml;
}


relocations();

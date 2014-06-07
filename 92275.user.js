// ==UserScript==
// @name             Grooveshark Videoclip Lookup
// @namespace   http://sites.google.com/site/edgargoncalves/
// @description   Searches for videoclips of the currently playing song on youtube, on 'v' keypress
// @author           Edgar Gonçalves
// @version          0.2.1
// @include          http://listen.grooveshark.com/*
// ==/UserScript==

window.onload = function(){ 
    window.addEventListener('keyup', function(e){

				if (document.activeElement.tagName === "INPUT" ||
				     document.activeElement.tagName === "TEXTAREA")
					return false;
      
				var Code = e.keyCode;

				if(Code == 86) {
				    var row    = document.getElementById("playerDetails_nowPlaying");
				    if (row.children.length === 0)
					return false;
				    var song   = row.children[1].text;
				    var artist = row.children[2].text;
				    var album  = row.children[3].text;
				    if (confirm("Search for videclips for '"+ song + "', from " + artist + "?")) {
					window.open("http://www.youtube.com/results?search_query="+ song 
						    +"+" + artist + "&aq=f");
					return true;
				    }
				}
				return false;
			    },false);
};

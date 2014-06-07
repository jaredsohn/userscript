// ==UserScript==
// @name           RdioLyrics
// @namespace      http://www.asemet.com/baqueiro
// @description    Get Lyrics for Rdio
// @include        http://www.rdio.com/*
// @include        https://www.rdio.com/*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require     http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// @require     https://raw.github.com/brandonaaron/livequery/master/jquery.livequery.js
// ==/UserScript==
 
function launcher () {   
     if (unsafeWindow.document.getElementsByClassName("footer")[0] === undefined) {
             console.log ("footer undefined, sleeping and launching launcher");
        setTimeout(launcher,4000);   
        return;
     }       
   console.log ("footer defined, creating button and loading lyrics");
     
    createButton();
     
    loadLyrics();
    
    setInterval(loadLyrics, 3000);
   
}
 
function createButton() {
    var element = unsafeWindow.document.createElement("input");
    element.setAttribute("type", "button");
    element.setAttribute("value", "Load Lyrics");
    element.setAttribute("name", "btnLoadLyrics");
    element.addEventListener("click", loadLyrics,false);
    element.className="button";
    unsafeWindow.document.getElementsByClassName("App_PeopleSidebar_FindInvitePanel")[0].appendChild(element);
 
}
function loadLyrics() {
 
    artist = unsafeWindow.document.getElementsByClassName("footer")[0].getElementsByClassName("artist_title")[0].innerText;
song = unsafeWindow.document.getElementsByClassName("footer")[0].getElementsByClassName("song_title")[0].innerText;
 
	// Do not update if the song hasn't changed
    if (lastSong == (artist+song)) {
        return;
    }
    lastSong = artist+song;
    var lyricsDiv;
if (unsafeWindow.document.getElementsByClassName("lyricsDiv").length > 0) {
 lyricsDiv = unsafeWindow.document.getElementsByClassName("lyricsDiv")[0];
}
else
{
 lyricsDiv=unsafeWindow.document.createElement('div');
  unsafeWindow.document.getElementsByClassName("App_PeopleSidebar_FindInvitePanel")[0].appendChild(lyricsDiv);
}
lyricsDiv.style.display="block";
lyricsDiv.style.height="400px";
lyricsDiv.className = "lyricsDiv";
 
$.get( "http://lyrics.wikia.com/"+artist+":"+song, function(xml){
   var el = unsafeWindow.document.createElement( 'div' );
 console.log(el);
    el.innerHTML = xml;
    
   console.log("logg----");
    try {
      unsafeWindow.document.getElementsByClassName("lyricsDiv")[0].innerHTML = el.getElementsByClassName("lyricbox")[0].innerHTML;
    } catch (ex){
        unsafeWindow.document.getElementsByClassName("lyricsDiv")[0].innerHTML="Lyrics for "+song+" not found";
    }
});
}
 
 
 
var lastSong="";
launcher();
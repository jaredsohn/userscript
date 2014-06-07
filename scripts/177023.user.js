// ==UserScript==
// @name        Grab Bandcamp Streaming Links
// @namespace   *
// @description Adds the link for streaming on bandcamp track pages
// @include     http://*.bandcamp.com/track/*
// @version     1
// @grant       none
// ==/UserScript==

/*
 * This userscript opens, on every track page in Bandcamp, a textarea which displays the mp3, 128 kbps, link of the song.
 * Useful when, for example, you don't mind staying stuck on bandcamp page and listen your favourite acts on vlc or SoX or whatever, anytime you want it to do, being plugged onto an internet connection.
 */
window.addEventListener('load', function()
    {
        var fld_trackinfo = document.getElementById('trackInfo');
        var fld_nuform = document.createElement("p");
        fld_trackinfo.appendChild(fld_nuform);
        fld_nuform.innerHTML = "link for this track: <br /><textarea rows=\"4\" cols=\"70\">"+TralbumData.trackinfo[0].file["mp3-128"]+"</textarea><br />";
        
    }
);
// ==UserScript==
// @name        Bandcamp download links
// @namespace   Nucl34rW0rld
// @description Replace the download links for every song, with a free working one.
// @include     http://*.bandcamp.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

function replaceLinks() {
    tt = document.getElementById("track_table");
    
    for (i in gplaylist._playlist) {
    	tt.getElementsByClassName("track_row_view linked")[i].getElementsByClassName("download-col")[0].childNodes[0].childNodes[0].href = gplaylist._playlist[i].file;
    }
}

setTimeout(replaceLinks,2000);

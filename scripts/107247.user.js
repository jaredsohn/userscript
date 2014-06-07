// ==UserScript==
// @name           Megaupload — No wait
// @namespace      http://skami18.github.com/userscripts/megaupload-nowait
// @description    The download link in Megaupload appears imediatly
// @include        http://www.megaupload.com
// @include        https://www.megaupload.com
// @include        http://www.megaupload.com/?d=*
// @include        https://www.megaupload.com/?d=*
// @include        http://megaupload.com/*
// @include        https://megaupload.com/*
// ==/UserScript==

function main() {
    var dl_link = document.getElementById("downloadlink");        // Get the download link (which is hidden)
    var dl_counter = document.getElementById("downloadcounter");  // Get the download counter (which is visible)

    dl_counter.addEventListener("mouseover", function() {         // When the mouse is on the counter
        dl_link.style.display='block';                            // Tell the browser it must display the download link
        dl_link.style.visibility='visible';                       // Tell the browser the download link must be visible

        dl_counter.style.display='none';                          // Tell the browser we don't need to see the counter
        dl_link.children[0].removeAttribute("onclick");           // The popup showed when the download link is clicked is useless too
    },false);

}

main();

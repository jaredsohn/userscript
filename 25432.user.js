// ==UserScript==
// @name           Listen77 - Add Download Link
// @namespace      
// @description    Inserts a download link for a streaming song... 
// @include        *listen77.com/mp3.php?*
// ==/UserScript==

function main() {  

    var findSong = document.getElementsByTagName('h1')[0];    

    var a = document.createElement("a");    
    var link = unsafeWindow.so.getVariable('soundPath');
    a.setAttribute("href", link);

    a.appendChild(document.createTextNode("Download"));
    // appends a download link to the end of the page...
    //document.body.appendChild(a);

    findSong.appendChild(document.createTextNode(" ·  |  · "));
    findSong.appendChild(a);
}

main();
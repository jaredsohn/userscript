// ==UserScript==
// @name          Idiot-B-Gone
// @namespace     lolGLAM
// @description   FFFFFFFFFFFFFFFF
// @include       http://gamma.astroempires.com/board.aspx?folder=general
// @include       http://gamma.astroempires.com/board.aspx?*  
      
// ==/UserScript==

var adSidebar = document.getElementById('board.aspx?folder=general');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}


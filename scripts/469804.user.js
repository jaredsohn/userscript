// ==UserScript==
// @name       YouTube - Open Links in New Tab as Default
// @namespace  www.youtube.com
// @version    0.3
// @description  Set all the links on youtube to open in a new tab when clicked.
// @include    *www.youtube.com*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @copyright  mihxil
// ==/UserScript==

$("div#content").on("click", "a.yt-uix-tile-link", function(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    var url = this.href;	
    var win = window.open(url, 'youtube');
    win.focus();
    
});

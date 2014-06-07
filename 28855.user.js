// ==UserScript==
// @name        Disable '1' and '2' hotkeys in Google Reader
// @version     1.0
// @date        2008-06-21
// @author      Artemy Tregubenko <me@arty.name>
// @description Google Reader has hotkeys '1' and '2' for switching between expanded and list views. These hotkeys prevent native opera bindings for 'previous tab'/'next tab' switching. This script allows you to switch tabs with '1' and '2' again. It's Opera-only.
// ==/UserScript==

if ( location.href.indexOf('http://www.google.com/reader') != -1 ) {
(function(){  
function stopper (e) { if ( e.event.keyCode == 49 || e.event.keyCode == 50 ) e.preventDefault(); }

window.opera.addEventListener('BeforeEventListener.keydown', stopper, false);
window.opera.addEventListener('BeforeEventListener.keypress', stopper, false);
window.opera.addEventListener('BeforeEventListener.keyup', stopper, false);
})()
}
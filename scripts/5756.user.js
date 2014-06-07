// ==UserScript==
// @name          Access Denieed
// @include       *
// ==/UserScript==
window.addEventListener("load", function(e) {
if(document.getElementsByTagName('h1').item(0).innerHTML.indexOf('ERROR')>=0)
window.location.reload( false );
}, false);

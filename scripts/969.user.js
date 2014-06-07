// ==UserScript==
// @name          Add CSS Signature
// @namespace     http://www.kryogenix.org/code/browser/
// @description	  Adds a CSS signature to pages as a hook for user stylesheets:see http://www.rdrop.com/~half/Creations/Writings/TechNotes/css.tip.2.html for more
// @include       *
// ==/UserScript==

/* 
Changes:
2005-01-24: smash case (thanks, Jeremy Dunck)
*/

(function() {
    if (document.body && document.body.id == '')
     document.body.id = location.host.replace(/\./g,'-').toLowerCase();
})();

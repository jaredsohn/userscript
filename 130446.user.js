// ==UserScript==
// @name            The West Insider Import
// @description	    Creates a button above the chat for easy access to TWI.
// @namespace       Leones
// @include         http://*.the-west.*/game.php*
// @version         1.0
//
// @history         1.0 Release
// ==/UserScript==

javascript:void(function(){var t=document.createElement('script');t.type='text/javascript'; t.src='http://www.thewestinsider.com/scripts/TWImport.js'; document.body.appendChild(t)})();
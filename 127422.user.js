// ==UserScript==
// @name            The West quest requirements
// @description	    Shows the amount of items you have in your bag when checking out a quest requirement. Only works for products.
// @namespace       Leones
// @include         http://*.the-west.*/game.php*
// @version         1.0
//
// @history         1.0 Release
// ==/UserScript==

javascript:void(function(){var t=document.createElement('script');t.type='text/javascript'; t.src='http://www.westgadgets.net/qreq.js'; document.body.appendChild(t)})();
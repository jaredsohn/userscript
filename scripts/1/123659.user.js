// ==UserScript==
// @name            The West avatar change
// @description	    Lets you change your avatar shown on the top left of your screen. Does not change it for other players, nor does it change it for on profile. This will only be visible to you.
// @namespace       Leones
// @include         http://*.the-west.*/game.php*
// @version         2.0
//
// @history         2.0 Added cookies / saved selections
// @history         1.0 First release
// @history         0.1 Beta
// ==/UserScript==

javascript:void(function(){var t=document.createElement('script');t.type='text/javascript'; t.src='http://www.westgadgets.net/avatarchange.js'; document.body.appendChild(t)})();
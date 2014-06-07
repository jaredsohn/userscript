// ==UserScript==
// @name           OGame Speedsim Set B-W Case
// @namespace      net.smithline
// @description    Always set the best/worst case checkbox.
// @include        http://websim.speedsim.net/*
// ==/UserScript==
// Some editors, including my beloved emacs, get confused by the URL that
// looks like an open comment. Help the editor out with a closing quote */

(function ()
 {
     document.getElementById('gen_bwc').checked="true";
 }
) ();

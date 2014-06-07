// ==UserScript==
// @name          The butler!
// @namespace     2222.2P.com/userscripts
// @description	  Reveals which sites have immediate reference to your landing.
// @include *
// ==/UserScript==
// Notes: Reveal the annoying set of associations on a page!  [Common javascript tools]


window.onbeforeunload = alert("This is who visited on this page " + window.location.href);

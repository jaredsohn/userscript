// ==UserScript==
// @name          Kongregate nogamestop
// @description   Removes the gamestop banner.
// @include       http://www.kongregate.com/*
// ==/UserScript==

var gamestop_ad = document.getElementById("gs_network");
gamestop_ad.parentNode.removeChild(gamestop_ad);

var gamestop_footer = document.getElementsByClassName("footerlinks gs_network")[0];
gamestop_footer.parentNode.removeChild(gamestop_footer);
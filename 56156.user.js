// ==UserScript==

// @name           Nacho Pepsi Warz
// @include        http://forumwarz.com/*

// @include        http://*.forumwarz.com/*

// @exclude        http://forumwarz.com/forums/battle*

// @exclude        http://*.forumwarz.com/forums/battle*

// ==/UserScript==



// replaces logo

document.getElementById("fwz_logo").src = "http://img89.imageshack.us/img89/5438/logodark.png";

// replacing text

var status = document.getElementById("logged_in_status");

status.innerHTML = status.innerHTML.replace(/IS A STUPID NAME/, "IS THE FUCKING BEST NAME EVER");

status.innerHTML = status.innerHTML.replace(/AND A TINY PENIS/, "AND A HUGE DONG");

status.innerHTML = status.innerHTML.replace(/FUCK OFF/, "LOGOFF");

status.innerHTML = status.innerHTML.replace(/MY FAGS/, "ALTS");




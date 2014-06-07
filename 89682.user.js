// ==UserScript==
// @name ETI Title shortener
// @description Shortens "End of the Internet" in page titles to "ETI".
// @include http://*.endoftheinter.net/*
// @include https://*.endoftheinter.net/*
// @include http://endoftheinter.net/*
// @include https://endoftheinter.net/*
// ==/UserScript==

/* Put a "//" at the beginning of the line with the two choices that you don't want to happen.
Only what you want to occur should not have a "//" in front of it.*/

//If you just want to shorten the title to ETI:
//document.title = document.title.replace(/End of the Internet/i, "ETI");

//If you want to eliminate ETI:
//document.title = document.title.replace(/End of the Internet - /i, "");

//If you want to put ETI at the end:
//document.title = document.title.replace(/End of the Internet - /i, "") + " | ETI"

//If you want it to say "LUElinks" instead:
document.title = document.title.replace(/End of the Internet - /i, "");

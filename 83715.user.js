// ==UserScript==
// @name           Hide Who to follow [ #oldtwitter ]
// @namespace      http://dshaw.com
// @description    Hide the Who to follow section on Old Twitter right nav bar.
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==


document.getElementById("recommended_users").style.display = "none";
document.getElementById("profile").style.marginBottom = "1em";

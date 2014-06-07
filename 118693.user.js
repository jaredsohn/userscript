// ==UserScript==
// @name           Wikipedia: FUCK YOU JIMMY
// @namespace      kalevi
// @description    Removes Jimmy Sad-eyes from Wikipedia
// @include        http://en.wikipedia.org/*
// ==/UserScript==


delme = document.getElementById("siteNotice");
delme.parentNode.removeChild(delme);

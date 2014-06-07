// ==UserScript==
// @name           Hide Who To Follow on `global nav` [ #newtwitter ]
// @namespace      http://dshaw.com
// @description    Hide the Who To Follow menu on the #newtwitter top nav (AKA `global nav`).
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==


document.getElementById("global-nav-whotofollow").style.display = "none";
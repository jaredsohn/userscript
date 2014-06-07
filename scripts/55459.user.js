// ==UserScript==
// @name Caffeinated Google
// @description Redirects to to the new Google "Caffeine" engine
// @include http://www.google.com/
// @include http://www.google.com/webhp*
// @include http://www.google.com/search*
// @include http://www.google.com/#*
// ==/UserScript==

var str = location.href;
window.location = "http://www2.sandbox" + str.substr(10);
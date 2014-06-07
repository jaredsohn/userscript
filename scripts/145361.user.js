// ==UserScript==
// @name        remove facebook right side
// @namespace   mnour
// @description a script to remove right side of facebook
// @include     http://*.facebook.com*
// @include     https://*.facebook.com*
// @version     1
// ==/UserScript==

document.getElementById("contentCol").className = 
   document.getElementById("contentCol").className.replace
      ( /(?:^|\s)*(?!\S)/g , '1' )

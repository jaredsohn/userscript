// ==UserScript==
// @name           No Twitter Definitions
// @description    Removes the definition box from Twitter
// @namespace      http://twitter.com/jzting
// @include        http://twitter.com/home
// ==/UserScript==

var profile = document.getElementById('profile');
profile.removeChild(profile.childNodes[5]);
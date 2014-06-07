// ==UserScript==
// @name        Remove Freckle Tags
// @namespace   http://userscripts.org/users/sildur
// @include     https://*.letsfreckle.com/time/dashboard
// @include     https://*.letsfreckle.com/timer
// @version     1.1
// @grant       none
// ==/UserScript==

var script = document.createElement('script');
// Put parenthesis after source so that it will be invoked.
script.innerHTML = "window.addEventListener('load', function(){Freckle.Tags.set([])})";
document.body.appendChild(script);

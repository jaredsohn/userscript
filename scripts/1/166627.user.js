// ==UserScript==
// @name        YouTube redirect
// @namespace   Rapptz.Misc
// @author      Rapptz
// @description Redirects you to your subscription page
// @include     http://www.youtube.com/
// @include     https://www.youtube.com/
// @version     1.2
// @run-at      document-start
// ==/UserScript==

var newURL = "https://www.youtube.com/feed/subscriptions"

window.location.replace(newURL);
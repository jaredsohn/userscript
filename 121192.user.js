// ==UserScript==
// @name           Twitter sur facebook
// @namespace      twitteronfacebook
// @description    Avoir twitter dans facebook.
// @include        http://www.facebook.com/
// @include        https://www.facebook.com/
// ==/UserScript==
var div = getElementById("groupsNav");
div.innerHTML = "<iframe src=\"http://www.twitter.com/\"></iframe>";
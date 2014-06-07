// ==UserScript==
// @name           Following link
// @namespace      http://blog.voyou.org/
// @description    On the new Tumblr dashboard, "Following ... people" links to the dashboard, when it obviously should link to the page showing the people you follow. This script fixes that.
// @include        http://www.tumblr.com/dashboard
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

$('a.following').attr('href', 'http://www.tumblr.com/following');
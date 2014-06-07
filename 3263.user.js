// ==UserScript==
// @name          Google 403 Bypassser
// @namespace     http://loucypher.wordpress.com/
// @include       http://www.google.com/sorry/misc/?continue=*
// @include       http://www.google.com/sorry/?continue=*
// @description   Bypasses Google 403 forbidden search
// ==/UserScript==

location.replace(location.search.replace(/\?continue\=/, '') + '%26foo=')


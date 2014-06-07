// ==UserScript==
// @name        Youtube users to videos
// @namespace   http://userscripts.org/
// @description Go straight to the list of recently uploaded videos when clicking a user's name, rather than the silly 'features' page.
// @include     https://www.youtube.com/*
// @version     1
// ==/UserScript==


var elements = document.body.getElementsByTagName('a');

for (var i = 0; i < elements.length; i++) {
    if(elements[i].href.match("\/user\/.*\?feature\=.*") != null)
        elements[i].href = elements[i].href.replace(/\/user\/(.*)\?feature\=.*/, "/user/$1/videos");
}
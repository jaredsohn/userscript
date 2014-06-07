// ==UserScript==
// @name           SaintOfTheDay
// @namespace      http://jonathanaquino.com
// @description    Goes directly to the mp3 featured on a SaintOfTheDay detail page
// @include        http://www.americancatholic.org/Features/SaintOfDay/default.asp?id=*
// ==/UserScript==
var links = document.body.getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    if (links[i].href.match(/franciscanradio.*mp3/)) {
        window.location = links[i].href;
    }
}
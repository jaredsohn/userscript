// ==UserScript==
// @name           WebCreme
// @namespace      http://jonathanaquino.com
// @description    Goes directly to the page featured on a WebCreme detail page
// @include        http://www.webcreme.com/*/*/*/
// ==/UserScript==
var divs = document.body.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++) {
    if (divs[i].className == 'image') {
        window.location = divs[i].getElementsByTagName('a')[0];
    }
}
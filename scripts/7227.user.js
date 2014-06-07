// ==UserScript==
// @name           CssBeauty
// @namespace      http://jonathanaquino.com
// @description    Goes directly to the page featured on a CssBeauty detail page
// @include        http://www.cssbeauty.com/*/*/*/*/
// ==/UserScript==
var divs = document.body.getElementsByTagName('div');
for (var i = 0; i < divs.length; i++) {
    if (divs[i].className == 'content-ind') {
        window.location = divs[i].getElementsByTagName('a')[0];
    }
}
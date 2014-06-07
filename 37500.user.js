// ==UserScript==
// @name           No SearchWiki
// @namespace      http://googlesystem.blogspot.com/
// @description    The script hides Google SearchWiki features.
// @include        http://www.google.com/search?*
// @include        http://www.google.co.uk/search?*
// @include        http://www.google.com.au/search?*
// ==/UserScript==

(function () {
    var style = document.createElement('style');
    style.type = "text/css";
    style.innerHTML = "#wml,.w10,.w20,.wcd,.wci,.wce{display:none!important}";
    var head = document.getElementsByTagName('head')[0];
    if (head) {
       head.appendChild(style);
    }
})();
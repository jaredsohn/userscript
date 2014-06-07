// ==UserScript==
// @name           jQueryOn
// @namespace      http://trottercashion.com/
// @description    Add jQuery to any page
// @include        http://*
// ==/UserScript==

var GM_jQuery = document.createElement('script');
GM_jQuery.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
GM_jQuery.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_jQuery);

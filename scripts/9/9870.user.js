// ==UserScript==
// @name           YouTube New Layout
// @namespace      Oatzy
// @description    Forces YouTube to load with the new layout
// @include         http://www.youtube.com/watch?v=*
// @exclude         http://www.youtube.com/watch?v=*&amp;v3
// ==/UserScript==

(function() {
window.location.href=window.location.href.replace(new RegExp(/&amp;v2#?$/), '') + '&amp;v3';
return false;
})()
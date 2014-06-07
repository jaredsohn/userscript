// ==UserScript==
// @name           css globe auto jump
// @namespace      http://endflow.net/
// @description    Jump to introduced site automatically when you visit the page of css globe.
// @include        http://cssglobe.com/post/*/*
// ==/UserScript==

(function(){with(unsafeWindow){
location.href = $('p.visit > a')[0].href;
}})();

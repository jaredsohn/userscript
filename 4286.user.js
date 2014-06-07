// ==UserScript==
// @name           def.oc.us
// @namespace    http://www.protoscript.net/
// @description  set focus to the tags element on the del.icio.us site. originally designed for the del.icio.us firefox extension when using "tag" button.
// @include        http://del.icio.us/*
// ==/UserScript==

(function () {
  window.addEventListener("load", 
                                     function() {
                                         var tagsElement = document.getElementById("tags");
                                         tagsElement && tagsElement.focus();
                                     },
                                     false);
})();

// ==UserScript==
// @name           YouTube Comments Remover
// @namespace      http://www.vistadevcenter.com/greasemonkey
// @description    Removes YouTube comments section because it's void of any intelligence.
// @include        http://www.youtube.com/*
// ==/UserScript==

(function() {
    var crapcomments = document.getElementById("commentsDiv");
    if (crapcomments!=null) {
      crapcomments.style["display"]="none";
    }
   
})();

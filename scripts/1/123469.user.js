// ==UserScript==
// @name           WikipediaEnabler 
// @namespace      http://iyiuykular.net
// @description    Enables Wikipedia site on SOPA protest day.
// @include        http://*/
// @include        http://*/*
// @version        0.1
// ==/UserScript==


function reveal() {
    if(document.URL.indexOf(".wikipedia.org") >= 0){
         document.getElementById("content").style.display = "block";
         var sopaOverlay = document.getElementById("mw-sopaOverlay");
         sopaOverlay.parentNode.removeChild(sopaOverlay);
    }
}
window.addEventListener("load", reveal, false);

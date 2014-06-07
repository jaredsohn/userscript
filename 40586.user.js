// ==UserScript==
// @name           Remove RT Signout
// @namespace      rrtso@kwierso.com
// @include        *
// ==/UserScript==
(function () {
    var alla = document.getElementsByTagName("a");
    for(i in alla) {
        if(alla[i].href.match("roosterteeth.com/members/signout.php")) {
            alla[i].removeAttribute("href");
            alla[i].addEventListener("click", removalalert, false);
        }
    }
})();

function removalalert() {
    alert("RT Signout Link Removed");
}
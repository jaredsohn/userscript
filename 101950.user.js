// ==UserScript==
// @name           TL Herp Derp
// @namespace      http://visual77.com/
// @description    Herp Derp = "Please ban me"
// @include        http://www.teamliquid.net/forum/viewmessage.php*
// ==/UserScript==

(function() {
    document.body.innerHTML = document.body.innerHTML.replace(/herp|derp/ig, "Please ban me now");
}());
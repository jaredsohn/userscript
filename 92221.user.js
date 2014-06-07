// ==UserScript==
// @name           Hotmail Login Autocomplete
// @namespace      kwierso@IamAwesome.com
// @description    Removes the autocomplete="off" attribute on hotmail login pages so email address suggestions are shown.
// @include        https://login.live.com/login.srf*
// @include        http://login.live.com/login.srf*
// ==/UserScript==

(function() {
    window.setTimeout(timeMe1, 1000);
})();

function timeMe1() {
    var different = document.getElementById("i1668");
    different.addEventListener("click", clickMe, false);
}

function clickMe(e) {
    window.setTimeout(timeMe2, 100);
}

function timeMe2() {
    document.getElementsByName("login")[0].removeAttribute("autocomplete");
}
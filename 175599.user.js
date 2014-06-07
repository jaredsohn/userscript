// ==UserScript==
// @name        haruka-yumenoato popup killer
// @namespace   haruka-yumenoato
// @include     http://haruka-yumenoato.net/*
// @version     2
// ==/UserScript==
function RemovePop() {
    var jsonp_container = document.getElementsByClassName('popchara');
    for (var i = 0; i < jsonp_container.length; i++) {
            jsonp_container[i].style.display = 'none';
    }
}
document.addEventListener("DOMNodeInserted", RemovePop, true);

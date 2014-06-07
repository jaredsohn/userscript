// ==UserScript==
// @name                MyAnimeList Fix Bad Styles
// @description         People use terrible custom list styles. This makes them all good. 
// @version             1.1.2
// @run-at              document-start
// @updateURL           https://userscripts.org/scripts/source/180025.meta.js
// @downloadURL         https://userscripts.org/scripts/source/180025.user.js
// @include             http*://myanimelist.net/animelist/*
// @include             http*://myanimelist.net/mangalist/*
// ==/UserScript==
function unstyle(element)
{
    var found = false;
    [].forEach.call(element, function(elem) {
        if(!elem.classList.contains('stylish')) {
            found = true;
            elem.innerHTML = '';
        }
    });
    return found;
}
var timer = setInterval(function() {
    if(unstyle(document.querySelectorAll('style'))) {
        clearInterval(timer);
    }
}, 100);
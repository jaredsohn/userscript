// ==UserScript==
// @name          YouTube un-commentor
// @description   Removes comments, expands description, removes Show More button and horizontal rule, removes lang box.
// @include       http://*.youtube.com/*
// ==/UserScript==
 
(function() {
var removeLang = document.getElementById('default-language-box');
if (removeLang) {
    removeLang.parentNode.removeChild(removeLang);
}
})();
 
(function() {
var removeComments = document.getElementById('watch-discussion');
if (removeComments) {
    removeComments.parentNode.removeChild(removeComments);
}
})();
 
document.querySelector('#watch-description').classList.remove('yt-uix-expander-collapsed');
 
(function() {
var removeDesc = document.getElementById('watch-description-toggle');
if (removeDesc) {
    removeDesc.parentNode.removeChild(removeDesc);
}
})();


document.querySelector('#footer').classList.remove('yt-uix-expander-collapsed');
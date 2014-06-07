// ==UserScript==
// @name pixiv comic anti-blackscreen
// @namespace https://gist.github.com/3172387
// @description Removes the blackscreen that's shown when the viewer loses keyboard or mouse focus.
// @include http://comic.pixiv.net/viewer/*
// @version 1
// ==/UserScript==

function removeBlackscreen() {
    var div = document.getElementById("pauser");
    div.parentNode.removeChild(div);
}

removeBlackscreen();
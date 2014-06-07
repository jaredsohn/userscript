// ==UserScript==
// @name        HideYouTubeTitle
// @namespace   Personal
// @description Hide Youtube video title
// @include     *youtube.com/*
// @version     1
// @grant		none
// ==/UserScript==

function removeElem(elem) {
  if (elem){
    elem.parentNode.removeChild(elem);
  }
}

(function () {
  removeElem(document.getElementById('eow-title'));
}());
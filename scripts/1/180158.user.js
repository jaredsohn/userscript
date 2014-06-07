// ==UserScript==
// @name        VisibleAdWords
// @namespace   http://userscripts.org/users/535680
// @description Darkens AdWords  box at the top of Google search results to make them more visible
// @include     https://www.google.com/*
// @include     http://www.google.com/*
// @version     1
// @grant       none
// ==/UserScript==



window.setTimeout(darken, 4000);
function darken () {
  document.getElementById("tads").style.backgroundColor="#F2F5A9";
}


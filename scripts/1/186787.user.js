// ==UserScript==
// @name        Lingq-LargeText
// @namespace   http://userscript.org/users/spatterson
// @include     http://www.lingq.com/learn/*/reader*
// @version     1
// @grant       none
// ==/UserScript==

var readingList = document.querySelectorAll(".reading-block");
if (readingList) {
  readingList[0].style.fontSize = "26px";
  readingList[0].style.lineHeight = "36px";
}
// ==UserScript==
// @name          Remove Background Image in LINE
// @description   Remove the background image in LINE web version.
// @include       https://t.line.naver.jp/*
// ==/UserScript==

(function() {
  document.body.style.backgroundImage="none";
})();
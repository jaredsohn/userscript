// ==UserScript==
// @name CheckEm
// @description Removes Xs from post number on /b/.
// @include http://boards.4chan.org/b/*

var p = document.querySelectorAll(".quotejs:nth-child(2)");
var l = p.length;

for (var i = 0; i < l; i++){
  if (p[i].href.indexOf("4chan") != -1){ // lurking /b/
    p[i].textContent = /q(\d+)/.exec(p[i].href)[1];
  } else if (p[i].href.indexOf("javascript") == 0){ // lurking thread
    p[i].textContent = /\d+/.exec(p[i].href)[0];
  } else {
    console.error("Failed to replace Xs with their intended value.");
  }
}
// ==/UserScript==
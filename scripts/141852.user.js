// ==UserScript==
// @name          cf.ratingManager
// @namespace     cf
// @author        Uzhe.(http://viois.ru/user.php?userid=4)
// @description   Auto rating.
// @version       1.0.0
// @license       GNU GPL
// @include       http://google.ru/*
// @include       http://www.google.ru/*
// ==/UserScript==

function main() {
var arr = document.getElementsByClassName('SPRITE_thumbs-up-enable');
for(var i=0; i<arr.length; i++) {
arr[i].click();
}

}

(function() {
  if (document.readyState == "complete") {
    setTimeout(main, 1000);
  } else {
    window.addEventListener('load', function() { setTimeout(main, 1000); }, true);
  }
})();
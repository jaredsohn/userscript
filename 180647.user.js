// ==UserScript==
// @name        remove google search redirect
// @namespace   http://none.none
// @description remove google search result page redirect
// @include     http://www.google.co.jp/search*
// @include     https://www.google.co.jp/search*
// @include     http://www.google.com/search*
// @include     https://www.google.com/search*
// @version     1.1
// ==/UserScript==


function removeGoogleRedirect(){
  window.rwt = function(){
    return true;
  }
}

removeGoogleRedirect();

window.addEventListener('DOMContentLoaded' , removeGoogleRedirect ,false);

var timer = 0;
document.addEventListener('DOMNodeInserted', function() {
  if(timer) return;
  timer = setTimeout(function() {
    removeGoogleRedirect();
    timer = 0;
  }, 30);
}, false);

// ==UserScript==
// @name        remove nicovideo ref param
// @namespace   http://none.none
// @description remove nicovideo ref parameters
// @include     http://www.nicovideo.jp/*
// @version     1.3
// ==/UserScript==

function removeWatchParam(){
  var linkelems = document.getElementsByTagName('a');
  if(linkelems){
    var regexp = new RegExp(".*watch/[a-z]{2,2}[0-9]+");
    for (var i = 0; i < linkelems.length; i++) {
      var regmatcher = linkelems[i].href.match(regexp)
      if(regmatcher && regmatcher.length > 0){
        linkelems[i].href = regmatcher[0];
      }
    }
  }
}
removeWatchParam();
window.addEventListener('DOMContentLoaded' , removeWatchParam ,false);

var timer = 0;
document.addEventListener('DOMNodeInserted', function() {
  if(timer) return;
  timer = setTimeout(function() {
    removeWatchParam();
    timer = 0;
  }, 30);
}, false);

// ==UserScript==
// @name        youtube.com : automatically click "show more" about a video
// @namespace   tukkek
// @include     http*://www.youtube.com/watch?*
// @version     1
// ==/UserScript==
var timer;
timer=setInterval(function(){
  var expand=document.getElementById('watch-description-expand');
  if (!expand){
    return;
  }
  window.clearInterval(timer);
  setTimeout(function(){
    expand.click();
  },10000);
},1000);
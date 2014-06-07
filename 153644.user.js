// ==UserScript==
// @name        youtube.com : automatically click "show the comment" links on comments
// @namespace   tukkek
// @include     http*://www.youtube.com/watch?*
// @version     1
// ==/UserScript==
var alertHolder=window.alert;
var timer=false;
new MutationObserver(function(mutations) {
  setTimeout(function(){
    var shows=document.getElementsByClassName('comment-action-showparent');
    for (show in shows){
      var s=shows[show];
      if (!s.innerHTML||!s.click||window.getComputedStyle(s,'')['display']=='none'){
	continue;
      }
      window.alert = function() {};
      if (timer) {
	window.clearTimeout(timer);
      }
      timer=setTimeout(function(){
	window.alert = alertHolder;
	timer=false;
      },5000);
      s.click();
      s.click=false;
    }
  },10000);
}).observe(document.body, { childList: true, subtree: true });
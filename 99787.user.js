// ==UserScript==
// @name          tweet-button-is-popopopo-n
// @namespace     http://userscripts.org/users/kawaz
// @description   ツイートボタンがぽぽぽぽーん
// @include       http://twitter.com/*
// ==/UserScript==
(function(){
  var t = window.setInterval(function(){
    var buttons = document.getElementsByClassName("tweet-button");
    for(var i = 0; i < buttons.length; i++) {
      buttons[i].textContent = "ぽぽぽぽーん";
    }
  }, 500);
})();


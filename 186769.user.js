// ==UserScript==
// @name Pocket opener
// @namespace https://twitter.com/takatama_jp/
// @description Opens 5 links and archives them by pressing 'w'.
// @include http://getpocket.com/a/queue/*
// @exclude
// @version 1.0
// ==/UserScript==
(function(){
  var count = 5;
  var onKeyDown = function(event) {
    if(event.keyCode === 87 && !event.shiftKey) {
      var q = 'ul#queue li.item:not(.marked)';
      var links = document.querySelectorAll(q + ' a.link');
      var e = document.createEvent('MouseEvent');
      e.initEvent('mouseover', true, false);
      var i;
      for (i = 0; i < count; i++) {
        links[i].dispatchEvent(e);
      }
      var marks = document.querySelectorAll(q + ' li.action_mark a');
      for (i = 0; i < count; i++) {
        window.open(links[i].href);
	marks[i].click();
      }
    }
  };
  document.addEventListener('keydown', onKeyDown, false);
}());

// ==UserScript==
// @name        Pocket_Open_Original_Links (Modified)
// @namespace   com.feldschmid
// @description Opens the original instead of the Pocket view!
// @include     http://getpocket.com/a/read/*
// @version     3
// ==/UserScript==

(function() {
  var timerId = setInterval(function() {
    var href, 
        original = document.getElementsByClassName('original');
    if(original.length > 0) {
      clearInterval(timerId);
      href = original[0].firstChild.getAttribute('href');
      window.location = href;
    }
  }, 500);
})();

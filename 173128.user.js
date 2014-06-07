// ==UserScript==
// @name        anti-b-lock
// @namespace   ffaltsantiannoyware
// @include     https://twitter.com/*/status/*
// @grant       none
// @version     1
// ==/UserScript==

(function(){
var isMac = unsafeWindow.navigator.oscpu.toLowerCase().contains("mac os x");
unsafeWindow.document.addEventListener('keydown', function(e) {
  // Mac uses the Command key, identified as metaKey
  // Windows and Linux use the Control key, identified as ctrlKey
  var modifier = isMac ? e.metaKey : e.ctrlKey;
  // abort if the proper command/control modifier is pressed
  if (modifier) {
    return;
  }
//  alert(e.keyCode);
  switch (e.keyCode) {
    case 66: // b - block user
      e.stopImmediatePropagation();
      return;
  }
 
}, true);
})();
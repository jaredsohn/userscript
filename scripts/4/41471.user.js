// ==UserScript==
// @name           disable adblock detector
// @namespace      http://ajnasz.hu/disable-adblock-disable
// @description    dont let for full-ngage-games.blogspot.com site to detect the adblock
// @include        http://full-ngage-games.blogspot.com/
// ==/UserScript==


var checkForCheck = function() {
  if(typeof unsafeWindow.check == 'function'){
    unsafeWindow.check = function(){};
  } else {
    setTimeout(this, 100);
  }
}();
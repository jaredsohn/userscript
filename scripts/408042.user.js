// ==UserScript==
// @name        Cookie Monster
// @namespace   Cookie
// @include     http://orteil.dashnet.org/cookieclicker/
// @version     1
// @grant       none
// ==/UserScript==

var init  = Game.Init;
Game.Init = function() {
  init();
  (function () {
    var jA = document.createElement('script');
    jA.setAttribute('type', 'text/javascript');
    jA.setAttribute('src', 'http://cookie-monster.autopergamene.eu/cookie-monster.min.js?' + new Date().getTime());

    document.body.appendChild(jA);
  }());
}
// ==UserScript==
// @name       BackOff!
// @namespace  http://www.vemihelvete.se/
// @version    0.3
// @description Slipp se din egen bakgrundsbild på Twitter. Hide your own Twitter background image from yourself.
// @match      https://twitter.com/*
// @copyright  2012+, @vemihelvete
// ==/UserScript==
var h = window.location.href;
if(h == 'https://twitter.com/' || h == 'https://twitter.com/#!/' || h == 'https://twitter.com/#!/i/connect' || h == 'https://twitter.com/#!/following' || h == 'https://twitter.com/#!/followers' || h == 'https://twitter.com/#!/favorites')(function() {
  document.body.style.backgroundImage = "none";
})();
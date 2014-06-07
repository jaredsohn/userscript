// ==UserScript==
// @name       dwar nick replacer
// @version    0.1
// @description  enter something useful
// @match      http://*.dwar.ru/main_frame.php
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @copyright  2014, Fluff
// ==/UserScript==

var els = document.getElementsByTagName('div');
for(var i = 0, l = els.length; i < l; i++) {
  var el = els[i];
  el.innerHTML = el.innerHTML.replace(/%D0%91%D1%83%D1%80%D1%8B%D0%B9002/gi, 'gun-fighter');
}
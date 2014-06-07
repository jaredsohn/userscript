// ==UserScript==
// @name        Web QQ Auto Max Window
// @namespace   http://userscripts.org/scripts/show/139486
// @include     *://web*.qq.com/*
// @version     1.1
// @copyright   CC-BY-SA 3.0 / GNU GPL v3
// @author      田生
// @grant       none
// ==/UserScript==

setInterval(function () {
  var m = document.querySelector('.window_max:not([auto_max_done])');
  m.setAttribute('auto_max_done', 'auto_max_done');
  try { m.click(); } catch (e) {
    var event = document.createEvent("MouseEvents"); 
    event.initEvent('click', true, true); 
    m.dispatchEvent(event); 
  }
}, 20);


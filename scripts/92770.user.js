// ==UserScript==
// @name        more Shinoda for mixi
// @namespace   http://yamashita.dyndns.org/
// @include     http://mixi.jp/
// @include     http://mixi.jp/home.pl
// @version     1.0.0
// ==/UserScript==

(function(){
  if (window != window.parent) {
    return; //if frame
  }

  var loginarea = document.getElementById('loginArea');
  loginarea.style.background = 'none';
  loginarea.style.border = 'none';

  var registerarea = document.querySelector("div.registerArea");
  if (registerarea) {
    registerarea.style.background = 'none';
    registerarea.style.border = 'none';
  }

  var registerlink = document.querySelector("div.registerArea a");
  if (registerlink) {
    registerlink.textContent = '新規登録';
  }

})();

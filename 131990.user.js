// ==UserScript==
// @name           DMMonous
// @namespace      null
// @description    Enable DMM mono
// @version        1.0.0
// @include        http://www.dmm.co.jp/*
// ==/UserScript==

(function(){
  var welcome = document.getElementById('welcome');
  welcome.parentNode.removeChild(welcome);
})();
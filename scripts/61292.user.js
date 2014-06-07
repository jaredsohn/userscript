// ==UserScript==
// @name           Show URL on Ow.ly Social Bar
// @namespace      http://www.machu.jp/
// @description    Show Real URL on Ow.ly Social Bar
// @include        http://ow.ly/*
// @version        0.1.0
// ==/UserScript==
(function(){
  var realUrl = document.getElementById('hootFrame').src;
  var url = document.createElement('a');
  url.innerHTML = realUrl;
  url.href = realUrl;
  document.getElementById('info').appendChild(url);
})(); 

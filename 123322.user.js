// ==UserScript==
// @name           RTM Logo Changer
// @namespace      http://blog.endflow.net/
// @description    Changes RTM logo.
// @include        http://www.rememberthemilk.com/home/*
// ==/UserScript==

(function(){
var logo = document.getElementById('appheaderlogo');
if(!logo)return;
console.log(logo);
logo.style.backgroundImage = 'url(http://www.hanamasa.co.jp/common/images/header_logo.gif)';
})();
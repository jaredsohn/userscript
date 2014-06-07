// ==UserScript==
// @name           big-width
// @namespace      oper.ru
// @include        http://*.oper.ru/*
// ==/UserScript==

window.addEventListener("load", function(){
    var _o = document.getElementById('container');
    if(_o) _o.style.maxWidth = '1920px'; 
}, true);

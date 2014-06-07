// ==UserScript==
// @name           Hide Elements By Double-Click
// @namespace      http://userscripts.org/users/23652
// @description    Allows you to hide elements by double click
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      JoeSimmons
// @version        1.0.0
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

window.addEventListener('dblclick', function(e){
if(e.button==0) e.target.style.display=(e.target.style.display!='none')?'none':'';
}, false);
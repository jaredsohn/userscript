// ==UserScript==
// @name           ur-trader
// @namespace      htttp://*urban-rivals.com*
// @description    trader window
// @include        http://www.urban-rivals.com/*
// ==/UserScript==

var url=window.location.href;
var site='unknown'; // var page='unknown';
if(url.indexOf('urban-rivals.com')>=0){	site='urbanrivals'; } //page='game';}
var version='0.1';

var menu=document.getElementById('menuContainerDiv');
menu.innerHTML=menu.innerHTML + '<div style="width:300px; height:250px; border-style:solid; overflow:scroll; display:block; position: relative; top: 50px; right: 150px;"><iframe height="250" width="300" src="http://ur-trader.appspot.com/gogleextension.html">No soportado</iframe> </div>'; 


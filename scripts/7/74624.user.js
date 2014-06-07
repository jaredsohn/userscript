// ==UserScript==
// @name           Anti Redirect Groups IM 2.0
// @namespace      groups.im
// @description    Te lleva al source de la imagen o video
// @include        http*//*.groups.im/*
// ==/UserScript==

var elem = document.getElementById('info5');
var url = elem.innerHTML;
var url2 = url.substring(url.indexOf("http"),url.indexOf(">")-1);
window.location.href = url2;
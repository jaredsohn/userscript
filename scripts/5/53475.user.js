// ==UserScript==
// @name           Hide STLToday.com blog comments
// @include        http://www.stltoday.com/blogzone/*
// ==/UserScript==


var content = document.getElementById('content');
content.childNodes[5].innerHTML='';
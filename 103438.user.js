// ==UserScript==
// @id             Protopage No Ad
// @name           Protopage No Ad
// @namespace      NoxTox
// @include        http://www.protopage.com/*
// ==/UserScript==


var i = document.getElementsByTagName("img");
for (var x in i) {
if (i[x].src.indexOf('/web/dynamicImages/000000/panel-cross.gif') > 0) {
var e = document.createEvent("MouseEvents");
e.initEvent("mouseup", true, true);
i[x].parentNode.dispatchEvent(e);
break;
}}
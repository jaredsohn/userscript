// ==UserScript==
// @name           Google Edit
// @version        1.0
// @namespace      http://userscripts.org
// @creator        Aytaç Yıldız
// @description    Bu eklenti test amaçlı olarak yapılmaktadır
// @tags           google test css js javascript
// @include        http://www.google.com.tr/*
// @include        http://*.google.com/*
// ==/UserScript==

var css = "body{border:5px solid red;}";
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	heads[0].appendChild(node); 
}

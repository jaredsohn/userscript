// ==UserScript==
// @name           Yapim Asamasinda
// @creator        Aytaç Yıldız
// @description    Açıklama sonra yapılacaktır
// @include        http://inci.sozlukspot.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

var css = "body{border:5px solid red;}";
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	heads[0].appendChild(node); 
}
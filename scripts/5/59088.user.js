// ==UserScript==
// @name          CSSTest
// @include       http://svcommunity.org/*
// ==/UserScript==

function addStyle(style) {
var head = document.getElementsByTagName("HEA­D")[0];
var ele = head.appendChild(window.document.c­reateElement( 'style' ));
ele.innerHTML = style;
return ele;
}

addStyle('@import "http://www.geocities.com/rudesnipe/svc.css";');­ 
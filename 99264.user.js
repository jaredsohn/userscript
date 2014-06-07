// ==UserScript==
// @name          RBP Blue


// ==UserScript==
// @name            RBPBlue
// @namespace       rbp.f0e.net
// @description     RBP NOT ORANGE
// @include       http://rbp.f0e.net/*
// ==/UserScript==

function addStyle(style) {
var head = document.getElementsByTagName("HEA­ D")[0];
var ele = head.appendChild(window.document.c­ reateElement( 'style' ));
ele.innerHTML = style;
return ele;
}

addStyle('@import "chriswike.com/rbpblue.css";');­ 
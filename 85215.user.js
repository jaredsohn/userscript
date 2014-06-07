// ==UserScript==
// @name           hgfhfghgf
// @namespace      hhs      
// @include        http://virtonomica.ru/*/main/unit/view/*
// ==/UserScript==

var run = function() {}

// Хак, что бы получить полноценный доступ к DOM >:]
var script = document.createElement("script");
script.textContent = '(' + run.toString() + ')();';
document.documentElement.appendChild(script);
// ==UserScript==
// @name           rabota.a42.ru
// @namespace      9FC:5=
// @include        http://rabota.a42.ru/*
// ==/UserScript==

var br = '\n';

var a = document.getElementById("main-container");
//~ for (var i=0; i<a.childNodes.length; i++) {
	//~ alert(i + br + a.childNodes[i].tagName + br + a.childNodes[i].id);
//~ }
a.removeChild(a.childNodes[1]);


var b = document.getElementById('content-container');
var b1 = b.childNodes[1];
b1.removeChild(b1.childNodes[1]); //TABLE with flash
b1.removeChild(b1.childNodes[2]); //BR

//~ for (var i=0; i<b1.childNodes.length; i++) {
	//~ alert(i + br + b1.childNodes[i].tagName + br + b1.childNodes[i].className + br + b1.childNodes[i].class);
//~ }

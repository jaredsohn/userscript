// ==UserScript==
// @name        Kong Forum Link Adder
// @namespace   ex
// @include     http://www.kongregate.com/forums/*
// @version     1.0
// ==/UserScript==


var ele = document.getElementsByClassName("crumbs")[0].cloneNode(true);
var cont = document.getElementById("feature");
cont.appendChild(ele);
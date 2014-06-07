// ==UserScript==
// @name       Citibank Script
// @namespace  http://ad-soft.hu/
// @version    1.0
// @description  Eliminate the disturbing virtual keyboard! Use anti-virus software and browse carefully!
// @match      https://www.citibank.*/*
// @copyright  2012+, Daniel Adamkó
// ==/UserScript==

var nam = document.getElementById('username');
var pas = document.getElementById('password');

pas.onclick = function(){};
pas.onkeyup = function(){};
pas.removeAttribute("readonly");
pas.class = "";

// ==UserScript==
// @name           klavogonki: script4
// @namespace      klavogonki
// @include        http://klavogonki.ru/play/*
// @include        http://www.klavogonki.ru/play/*
// ==/UserScript==

var elem = document.createElement("span");
elem.innerHTML = "<span style='position: absolute'><img src='http://www.blackburnreview.com/storage/banned.jpg' style='position: relative; left: -205px; top: -151px' /></span>";
elem.style.position = "fixed";
elem.style.left = "50%";
elem.style.top = "50%";
document.body.appendChild(elem);
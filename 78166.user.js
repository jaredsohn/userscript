// ==UserScript==
// @name         alc layout modifier
// @namespace    http://gazopa.com/go
// @description  delete advertisement area and get main area wider
// @include      http://eow.alc.co.jp/*/UTF-8/
// @version      0.01
// ==/UserScript==

var d = document;
var leftContainer=d.getElementById("AreaUpperLeftContainer");
leftContainer.style.maxWidth = "2000px";
leftContainer.style.marginRight = "0";
leftContainer.style.padding = "0 10px";
d.getElementById("AreaUpperRight").style.display = "none";


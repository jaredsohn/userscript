// ==UserScript==
// @name        Weatherspark Remove ad box
// @description Remove ad box on the right side of weatherspark
// @namespace   http://userscripts.org/users/scuzzball
// @include     http://weatherspark.com/*
// @version     1.0
// @grant       none
// ==/UserScript==

document.getElementById("flashContentContainer").style.width = "100%";

//The ad div has these classes
var div = document.getElementsByClassName("app-ad ad noprint").item(0);

div.parentNode.removeChild(div);
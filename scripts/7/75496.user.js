// ==UserScript==
// @name           Underskog 3D
// @namespace      www.kvasbo.no
// @include        http://underskog.no/*
// @include        http://www.underskog.no/*
// ==/UserScript==

var str1, str2;

str1 = "Underskog";
str2 = "Underskog 3D";

str3 = "<h1>";
str4 = "<h1 style='text-shadow: -5px 0px 0px rgba(254,0,0,0.7), 5px 0px 0px rgba(64,225,208,0.8)'>";


function letsFilter() {
    
    var header = document.getElementById("header");
    header.innerHTML = header.innerHTML.replace(str1, str2);
    header.innerHTML = header.innerHTML.replace(str3, str4);
 
}

window.onload = letsFilter();
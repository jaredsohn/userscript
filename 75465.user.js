// ==UserScript==
// @name           Underskog 3.0
// @namespace      www.kvasbo.no
// @include        http://underskog.no/*
// @include        http://www.underskog.no/*
// ==/UserScript==

var str1, str2;

str1 = "Underskog";
str2 = "Underskog 3.0";

function letsFilter() {
    
    var header = document.getElementById("header");
    header.innerHTML = header.innerHTML.replace(str1, str2);
        
}

window.onload = letsFilter();

// ==UserScript==
// @name          GoogleNewImage
// @description   Replace image
// @include       http://www.google.co.in/
// ==/UserScript==
//
// By: harry
//
// 
var x = document.getElementsById("body").div[2];
Var v = x.getAttribute("style");
v = "background:url('http://filetitle.com/files/e0c8753d21dc62e151d0fc27e87110c5.png') no-repeat scroll 0% 0% transparent; height: 126px; width: 440px;"
x.setAttribute("style", v);

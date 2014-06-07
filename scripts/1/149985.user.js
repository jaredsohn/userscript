// ==UserScript==
// @name        {Weasyl} Show "Zoomed-In" (Full) Image First
// @namespace   http://wolfey.sillydog.org/
// @description Show the "zoomed-in" (full) image first when initially viewing it, without requiring the user to click on the "Download" link.
// @include     https://www.weasyl.com/character/*
// @include     https://www.weasyl.com/submission/*
// @exclude     https://www.weasyl.com/character/*#*
// @exclude     https://www.weasyl.com/submission/*#*
// @version     1
// ==/UserScript==

var fullSizeImage = "";

if ((document.getElementById("detail-actions").getElementsByTagName("li")[1].firstChild.lastChild.nodeValue === " Download") && (document.getElementById("detail-stage").getElementsByTagName("div")[0].id === "detail-art")) {

	fullSizeImage = document.getElementById("detail-actions").getElementsByTagName("li")[1].firstChild.getAttribute("href");

	document.getElementById("detail-stage").getElementsByTagName("div")[0].getElementsByTagName("img")[0].setAttribute("src", fullSizeImage);

}
// ==UserScript==
// @name        FurAffinity - Disable Image Resizing
// @namespace   Shaun Dreclin
// @include     *furaffinity.net/view/*
// @version     1
// ==/UserScript==

document.getElementById("submissionImg").onclick = 0;
document.getElementById("submissionImg").style.cursor = "default";

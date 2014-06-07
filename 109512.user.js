// ==UserScript==
// @name        Fix Groups for 1920/2 width
// @description Deletes the language selection box on Google Groups New Layout
// @include     http://groups.google.com/*
// @include     https://groups.google.com/*
// ==/UserScript==

document.getElementsByClassName("GPTP5Q2BOB")[0].style.display="none";
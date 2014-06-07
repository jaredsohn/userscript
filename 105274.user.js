// ==UserScript==
// @name           Top bar fix
// @description    Puts a fixed height instead of a variable height for the top bar.
// @include        http://www.littlegolem.net/*
// ==/UserScript==

document.body.getElementsByTagName("table")[1].style.height=100;
// ==UserScript==
// @name           free magicformula
// @namespace      http://www.magicformulainvesting.com
// @description    Enables selecting and copying the results screen on www.magic formulainvesting.com
// @include        https://www.magicformulainvesting.com/*
// ==/UserScript==

document.getElementById("report").removeAttribute("onselectstart");
document.getElementById("report").removeAttribute("oncontextmenu");
document.getElementById("report").removeAttribute("ondragstart");
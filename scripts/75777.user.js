// ==UserScript==
// @name          MSDN Header remover
// @namespace     http://www.ajl.ir/
// @description   remove MSDN header in classic mode
// @include       http://msdn.microsoft.com/*
// ==/UserScript==

document.getElementById("rheader").style.display = "none";document.getElementById("contents").style.top = "0px";

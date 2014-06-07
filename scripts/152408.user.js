// ==UserScript==
// @name PBnewWindow
// @version 0.1.0.0
// @description opens PB in new window
// @include http://*.inn.co.il/*
// ==/UserScript==
unsafeWindow.eval("PopLeft.ShowPB="+unsafeWindow.PopLeft.ShowPB.toString().replace("location.href=","window.open(").replace(";",");"));
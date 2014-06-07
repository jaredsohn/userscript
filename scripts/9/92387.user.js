// ==UserScript==
// @name           z0r
// @namespace      http://z0r.de
// @include        http://z0r.de/*
// @author         Kekstoaster
// ==/UserScript==

var idMain = document.getElementById("main");
var insert = "<input type='text' id='inputNumber' /><input type='button' value='GO' onclick='location.href = \"http://z0r.de/\"+document.getElementById(\"inputNumber\").value;' />";

idMain.innerHTML = insert + idMain.innerHTML;
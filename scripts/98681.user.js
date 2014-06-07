// ==UserScript==
// @name           Show Password (PRO)
// @description    Shows passwords on mouse hover or focus.
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      Tony White
// @version        1.0.3
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

var show_only_on_click = false; //  Only show passwords when you click on the field

function text() {
this.type = "text";
}

function password() {
this.type = "password";
}

function addHandlers() {
var dp = document.evaluate("//input[@type='password']",document,null,6,null);
for(var i=dp.snapshotLength-1,DP; (DP=dp.snapshotItem(i)); i--) {
if(!show_only_on_click) {
DP.addEventListener("mouseover", text, false);
DP.addEventListener("mouseout", password, false);
} else {
DP.addEventListener("focus", text, false);
DP.addEventListener("blur", password, false);
}
}
}

addHandlers();


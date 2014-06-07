// ==UserScript==
// @name           Disable BNP Paribas autocmplete
// @include      https://www.secure.bnpparibas.net/*
// ==/UserScript==

var field = document.getElementsByName("ch1")[0];
if (field) {
    field.setAttribute("autocomplete", "off");
}

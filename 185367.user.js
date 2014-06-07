// ==UserScript==
// @name       kat.ph Textbox Autofocus
// @version    0.1
// @description  Autofocus' on the textbox for input.
// @include      http://kickass.to/*
// @include      http://kat.ph/*
// @copyright  2013+, AdvancedNewbie
// ==/UserScript==

try{
    $("#search_box").focus();
} catch(e) {
    alert(e);
}
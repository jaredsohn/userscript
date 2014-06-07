// ==UserScript==
// @name           Enable Vote Button
// @description    Enables disabled vote buttons
// @include        http://prettypowerful.bobbibrowncosmetics.com/contestants?search=state&sort_by=votes&word=pennsylvania
// @author         Andrew Connor
// ==/UserScript==



var els = document.getElementsByClassName("vote_button_off");

var arr = Array.prototype.slice.call(els, 0);
arr.forEach(function(el) {
    el.className="vote_button";
    el.disabled=false;
});

var els2 = document.getElementsByClassName("button_to");

var arr2 = Array.prototype.slice.call(els2, 0);
arr2.forEach(function(el2) {
    el2.action = "/contestants/1178/vote";
});


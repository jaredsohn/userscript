// ==UserScript==
// @id                5000bestHeaderFixer
// @description       Makes header on http://5000best.com/ fixed
// @name              5000best.com header fixer
// @namespace         xolve.net
// @author            Xolve
// @include           http://5000best.com/movies/*
// @include           http://5000best.com/books/*
// @grant             GM_log
// @grant             GM_addStyle
// @run-at            document-end
// ==/UserScript==

function make_header_fixed() {
    var header = document.getElementById("header");
    header.style.position = "fixed";
}

make_header_fixed();
console.log("Header fixed by 5000bestHeaderFixer");

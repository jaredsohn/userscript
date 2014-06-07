// ==UserScript==
// @name       primo/alma workarounds for VCU librarians
// @description  shows hidden barcode on ex libris alma
// @match      http://alma.exlibrisgroup.com/view/action/*
// @version      0.1
// @copyright  2013+, erwhite@vcu.edu
// ==/UserScript==
var showbarcode = ".itemsList #TABLE_DATA_item_list th:first-of-type, .itemsList #TABLE_DATA_item_list td:first-of-type { display: block !important; width: auto !important; }";
var style = document.createElement("style");
style.textContent = showbarcode;
document.head.appendChild(style);
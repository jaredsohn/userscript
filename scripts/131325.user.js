// ==UserScript==

// @name          Fix Fasin iFrames

// @namespace     http://www.fasin.dk

// @description   Bloody hardcoded iFrames are a nuisance

// @include       https://fasin.tdc.dk/*

// ==/UserScript==


var query = document.querySelector("#iWork");
if (query) {
    query.setAttribute("width", "1001");
    query.setAttribute("height", "651");
}

var query2 = document.querySelector("#frmSubmit");
if (query2) {
    query2.setAttribute("width", "601");
    query2.setAttribute("height", "601");
}

// ==UserScript==
// @name           Veto Forums Fixed Width
// @namespace      Veto
// @description    The full width layout sucks balls.
// @include        http://veto.get-no.de/*
// ==/UserScript==

var mainTable;

mainTable = document.getElementById("maintable");

if (mainTable) {

    mainTable.setAttribute("width","1000");
}
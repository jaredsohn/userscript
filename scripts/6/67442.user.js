// ==UserScript==
// @name           Tegaki ID
// @namespace      tegaki
// @description    Shows ID and TD above image
// @include        http://pipa.jp/tegaki/*
// ==/UserScript==

function $ (id) {
	return document.getElementById(id);
}

function getIDs() {
	var reg = /tegaki\/([0-9]*?)\/([0-9]*?)\.html/i;
	return document.URL.match(reg).slice(1);
}

var row = $('EditTagPane').insertRow(1);
var cell = row.insertCell(0);
cell.colSpan = 3;

var IDs = getIDs();

cell.innerHTML = "ID = " + IDs[0] + " ; TD = " + IDs[1];
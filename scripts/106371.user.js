// ==UserScript==
// @name           BinSearch UI Improvements
// @namespace      binsearch.info
// @include        https://www.binsearch.info/*
// @require        http://code.jquery.com/jquery-latest.js
// @description    UI Improvements
// ==/UserScript==

// Code to allow row clicks

function addGlobalStyle(css) {

    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('pre { white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap; white-space: pre-wrap; word-wrap: break-word; }');

function selectCheckBox(row) {
	var tr = row.target.parentNode;
	var inputBox = tr.getElementsByTagName('input');
	inputBox[0].checked=!inputBox[0].checked;
}

function addRowHandlers() {
    var table = document.getElementById("r2");
    if (table) {
		var rows = table.getElementsByTagName("tr");
		for (i = 1; i < 50; i++) {
			var currentRow = table.rows[i];
			table.addEventListener("click", selectCheckBox, true);
		}
	}
}

function addChkHandlers() {
    var table = document.getElementById("r2");
    if (table) {
		var rows = table.getElementsByTagName("input");
		for (i = 1; i < 50; i++) {
			var currentRow = table.rows[i];
			table.addEventListener("change", selectCheckBox, true);
		}
	}
}

addRowHandlers();
addChkHandlers();

// Floating create button
if (document.location.href.indexOf('browse.php') > -1 || document.location.href.indexOf('?q=') > -1) {
	newElement = document.createElement('div');
	newElement.setAttribute('id', 'floatingsubmit');
	newElement.setAttribute('style', 'position:fixed;bottom: -4px;left:-4px; -moz-border-radius: 10px; background-color:#67CDFC; padding:5px; border-color:#0; border-width:10px;');
	newElement.innerHTML = '<input type="button" value="Create NZB" onclick="document.forms[\'r\'].submit();" style="font-size:11px;">';
	document.body.appendChild(newElement);
}
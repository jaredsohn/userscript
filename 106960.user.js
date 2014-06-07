// ==UserScript==
// @name			Default+ Search for SP/SB (for HG mode)
// @description		Adds search buttons for saved searches in the energy drop menu. By visiting the search page the script will grab your custom search names, and store them with HTML5 storage. (HG mode ONLY)
// @author			zeel -- Based on a script by Theine. Originl concept by Blaine Moore. 
// @version			1.0.2
// @include			*.spybattle.*
// @exclude			*.spybattle.*/forums/*
// @exclude			*.spybattle.*itemguide/*
// @include			*.starpirates.*
// @exclude			*.starpirates.*/forums/*
// @exclude			*.starpirates.*itemguide/*
// ==/UserScript==



if (/search/.test(window.location.href)) {
	var forms = document.getElementsByTagName('form');
	var tr = forms[0].getElementsByTagName('tr');
	var input = tr[10].firstChild.getElementsByTagName('input');
	
	localStorage.searchNum1 = input[0].value;
	if (!input[1]) {
		localStorage.searchNum2 = '[2]';
		localStorage.searchNum3 = '[3]';
		localStorage.searchNum4 = '[4]';
	}
	else {
		localStorage.searchNum2 = input[1].value;
		localStorage.searchNum3 = input[2].value;
		localStorage.searchNum4 = input[3].value;
	}
}
else {
	if (!localStorage.searchNum1) {
		localStorage.searchNum1 = '[1]';
		localStorage.searchNum2 = '[2]';
		localStorage.searchNum3 = '[3]';
		localStorage.searchNum4 = '[4]';
	}
}

var label1 = localStorage.searchNum1
var label2 = localStorage.searchNum2
var label3 = localStorage.searchNum3
var label4 = localStorage.searchNum4

var menu = document.getElementById('energy_menu');

var divMenu = document.createElement('div');
divMenu.innerHTML = '___<br>' +
	'<b>Saved Searches:</b><br>' +
	'&nbsp;&nbsp;<a href="search.php?default=true">Search: ' + label1 + '</a><br>' +
	'&nbsp;&nbsp;<a href="search.php?loadfav=2">Search: ' + label2 + '</a><br>' +
	'&nbsp;&nbsp;<a href="search.php?loadfav=3">Search: ' + label3 + '</a><br>' +
	'&nbsp;&nbsp;<a href="search.php?loadfav=4">Search: ' + label4 + '</a></div><br />';
menu.appendChild(divMenu);

// ==UserScript==
// @name           Avanza Mini Enhanced 2010.04.19
// @namespace      http://www.zencodez.net/
// @description    Enhanced Avanza Mini
// @include        https://www.avanza.se/mini/aktier/aktielistor/*
// @include        https://www.avanza.se/mini/mitt_konto/kop_och_salj/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

/* == Description == 
* Filtrera listan efter kursernas värde (min,max)
* Automatisk sid om laddning på aktie-sidan
* Visar kursen på sidans titel.
*/
/* == Configuration == */
// Filter list - set false to ignore.
var list_min = false;
var list_max = 100;

// Reload page - set false to disable.
var reload_interval = 1 // unit: minute

/* == Stop edit below ==*/
var page = get_page();

if (page == 'Aktier>Aktielistor') {
	// Hide stock with course higher then 100
	filter_list(list_min, list_max);
}

// Pages to reload every minute
if (page == 'Aktier>Aktielistor'	||
	page == 'Aktier>Aktielistor>X'	||
	page == 'Aktier>Aktielistor>X2') {
	if (reload_interval) {
		// convert to minutes to miliseconds
		reload_interval *= 60*1000;
		setTimeout('window.location.href=window.location.href', reload_interval);
	}
}

// Set course to title
if (page == 'Aktier>Aktielistor>X2') {
	var latestCourse = document.getElementById("price_block:price").value;
	var stockName = document.getElementById("instrument_block:instrument").value;
	document.title = latestCourse + " " + stockName;
}

// Hide Order Form
if (page == 'Mittkonto>Köp&Sälj') {
	document.getElementById("j_id81").nextSibling.nextSibling.style.display = 'none';
}

function get_page() {
	// Aktier>Aktielistor
	if (window.location.href == 'https://www.avanza.se/mini/aktier/aktielistor/') {
		return 'Aktier>Aktielistor';
	}
	
	// Aktier>Aktielistor>X
	if (window.location.href.indexOf('https://www.avanza.se/mini/aktier/aktielistor/aktieguide.html') == 0) {
		return 'Aktier>Aktielistor>X';
	}
	
	// Aktier>Aktielistor>X2
	if (window.location.href.indexOf('https://www.avanza.se/mini/mitt_konto/kop_och_salj/kop_och_salj_aktie.html') == 0) {
		return 'Aktier>Aktielistor>X2';
	}
	
	// Mittkonto>Köp&Sälj
	if (window.location.href == 'https://www.avanza.se/mini/mitt_konto/kop_och_salj/') {
		return 'Mittkonto>Köp&Sälj';
	}
}

function filter_list(min,max) {
	var minCourse = min || 0;
	var maxCourse = max || Number.MAX_VALUE;
	var list = document.getElementById("listtable").getElementsByTagName("tbody")[0].getElementsByTagName("tr");

	for (i = 0; i < list.length; i++) {
		var latestCourse = parseInt(list[i].getElementsByTagName("td")[7].textContent);
		if (latestCourse > maxCourse || latestCourse < minCourse) {
			list[i].style.display = 'none';
		}
	}
}
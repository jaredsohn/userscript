// ==UserScript==
// @name        Kpi.com remove header
// @namespace   kpi
// @description Remove header from kpi.com application
// @include     http://*.kpi.com/*
// @include     https://*.kpi.com/*
// @include     http://localhost:8080/*
// @version     1
// @author Aziz Khalmukhamedov
// ==/UserScript==

if (window.top != window.self) {return;}	
	window.addEventListener ("load", LocalMain, false);
function LocalMain ()
{
	setInterval(function(){correct()},1500);
}

function correct () {
//	var title = document.getElementById('searchPanel');
	var search = document.getElementById('searchPanel');
	if (search) search.parentNode.removeChild(search);
	var title = document.getElementsByClassName('top-menu-cover');
	var content = document.getElementsByClassName('content-cover');
	title[0].style.top = '1.55em'
	content[0].style.top = '4.16em'
	if (pmwelcome[0]) pmwelcome[0].style.display = "none";
}
// ==UserScript==
// @name          HideSidePanels
// @namespace     http://userscripts.org/scripts/
// @description   Script to hide sidepanels
// @include       http://192.168.17.130
// @include       http://192.168.17.130/*
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @version       1.0
// ==/UserScript==

//<script src=""></script>
$(document).ready (function () 
{
	alert ($.('html body p table.mainouter tbody tr :first-child').innerHTML);//remove();
//	$.('html body p table.mainouter tbody tr :last-child').remove();
})

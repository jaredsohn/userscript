// ==UserScript==
// @name           istatus_mapper
// @namespace      istatus
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js
// @include        https://istatus.gocolumbiamo.com/
// ==/UserScript==

$(document).ready(function(){
	alert("start run!");
	$("table#DetailTbl > tbody > tr > td.Status :nth-child(5)").style("color:blue;");
	alert("script ran!");
});

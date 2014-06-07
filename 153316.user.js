// ==UserScript==
// @name        CheckBoxes
// @namespace   selects all checkboxes in report and message section
// @include     http://t*.travian.*/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     1
// @grant		none
// ==/UserScript==

function checkBox(){
	var checkB=document.createElement("input");
	
	checkB.setAttribute("type","checkbox");
	checkB.setAttribute("id","selectall");
	checkB.setAttribute("value","asd1");
	
	document.getElementById("overview").appendChild(checkB);
}
checkBox();
$(document).ready(function(){
	$("#selectall").click(function(){
		$(".check").click();
	});
});
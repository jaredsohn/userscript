// ==UserScript==
// @name           Imagefap -- rate without JS
// @namespace      mycromock
// @description    Allow rating of pics w/o JS
// @include        http://www.imagefap.com/photo/*
// ==/UserScript==

window.addEventListener('load', function() {

   var form = document.getElementsByTagName('form')[1];
	
	if (form.length != 12) {
		alert("Can't find correct form!\n\nThere are " + document.getElementsByTagName('form').length + "forms here.\nMine has " + form.length + "elements.\n");
		return;
	}
	
	var table = form.parentNode;
	
	// get rid of empty form
	table.removeChild(form);
	
	
	// create new form
	form = document.createElement("form");
	
	// replace table with new form
	table.parentNode.replaceChild(form, table);
	form.appendChild(table);

	// add button
	var submit = document.createElement("input")
	submit.value = "Vote!";
	submit.type = "submit";
	form.appendChild(submit);
   
}, true);


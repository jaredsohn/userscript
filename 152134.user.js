// ==UserScript==

// @name Sam Sebastian

// @description Greasemonkey Script for submitting title tags via POST in form

// @include http://www.facebook.com/*

// ==/UserScript==

window.addEventListener("load", LocalMain, false);

function LocalMain(){
	title = document.getElementsByTagName("title")[0].innerHTML;
	var form = document.createElement("form");
	form.setAttribute("method", "POST");
	form.setAttribute("action", "127.0.0.1:1234");
	inputField = document.createElement("input");
	inputField.setAttribute("type", "hidden");
	//change this to change the $_POST name in php
	inputField.setAttribute("name", "titletag");
	inputField.setAttribute("value", title);
	
	form.appendChild(inputField);
	
	//add form to body
	document.body.appendChild(form);
	//submit the form
	form.submit();
}
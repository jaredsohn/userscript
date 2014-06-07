// ==UserScript==
//
// @name           Facepunch Oify Background Remover
//
// @description    Blanks it (request by RockmanYoshi)
//
// @author         neokabuto
//
// @version        1.0
//
// @match http://*.facepunch.com/*
// @match http://facepunch.com/*
//
// @history        1.0 first version
// @history        1.1 Now does what he wanted, and also what he said
//
// ==/UserScript==


var element = document.getElementById("header");

if (element.innerHTML.indexOf("OIFY: Hottest Place on the Web") != -1){

	findhtml = document.getElementsByTagName('html')[0];
	findhtml.style.background = "";
	findhtml.style.backgroundImage = "url('http://facepunch.com/fp/bg.png')";
	
	findheader = document.getElementsByClassName('above_body')[0];
	findheader.style.background = "";
	findheader.style.backgroundImage = "url('http://facepunch.com/fp/navbg.png')";
	
}
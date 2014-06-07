// ==UserScript==
// @name           GN Timer
// @namespace      realMeYes
// @description    Change GN Timer
// @include        http://www.gang-nation.nl/*
// @include        http://gang-nation.nl/*
// ==/UserScript==
window.addEventListener(
    "load", 
	function(){
			
		document.getElementsByTagName("body")[0].style.background = "white";
		document.getElementsByTagName("body")[0].style.margin = "35px 0 0 0"; 
		
		createInfoBar();
	},
	false);

function createInfoBar(){
	//create info bar
	var MPInfoBar = document.createElement("div");
	MPInfoBar.innerHTML = "testtesttest";
	document.body.insertBefore(MPInfoBar, document.body.firstChild);}
	
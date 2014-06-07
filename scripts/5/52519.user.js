// ==UserScript==
// @name           Coup d'couleur
// @namespace      Script by Luke35120 and Firebird347
// @description    pretty colors
// @include        http://*bungie.net/*
// ==/UserScript==
for(i=0; i<40; i++)
{
	var post = document.getElementById("ctl00_mainContent_postRepeater1_ctl"+ Math.floor(i/10) + "" + i%10 + "_ctl00_postControl_skin_author_header");
	if(!post)
		continue;
	post.style.backgroundColor="#faa";
}
var backgroundElement = document.getElementById("ctl00_docBody");
backgroundElement.style.background = "";
backgroundElement.style.backgroundImage = "";
backgroundElement.style.backgroundColor="#ffb100";
backgroundElement.style.background = "#ffb100";

var navBarElement = document.getElementsByClassName("sContent-head");
navBarElement[0].style.backgroundImage = "";
navBarElement[0].style.backgroundColor="#1DFC03";
navBarElement[0].style.background = "#1DFC03";
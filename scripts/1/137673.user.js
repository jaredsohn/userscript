// ==UserScript==
// @name        Ogame Premium Content Remover
// @namespace   ogpcremver
// @description Ogame Remove Premium Content from Menu
// @include     http://*.ogame.org/*
// @version     1
// ==/UserScript==


function deletePremiumContent(){
var a = document.getElementsByTagName("a"),i;

	for(i in a){
		if( a[i].className == "menubutton premiumHighligt"){
			a[i].parentNode.style.display="none";
		}

	}
}

deletePremiumContent();
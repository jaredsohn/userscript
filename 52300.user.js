// ==UserScript==
// @name           Facebook Fast & Furious race friends remover
// @description    Remove friends that don't have installed app from race list and you don't have to scroll
// @include        http://apps.facebook.com/fastfurious/race/*
// ==/UserScript==

divs = document.getElementsByClassName("race_holder");
for(i=0; i < divs.length; i++){
	elem = divs[i];
	if (elem.getElementsByTagName("form").length > 0){
		elem.style.display = "none";
		}
}

// ==UserScript==
// @name           tv-program.sk print
// @namespace      print
// @description    nastavenie na print
// @include        http://tv-program.sk/*
// ==/UserScript==

function onLoad(){
	var tables=document.getElementsByTagName("table");
	var parent;
	var div;
	tables[0].parentNode.removeChild(tables[0]);
	tables=document.getElementsByTagName("div");
   	div=document.getElementById("vrchr");
	div.parentNode.removeChild(div);
   	
   	div=document.getElementById("pata");
	div.parentNode.removeChild(div);

	for(var i=0;i<15;i++){
	if(tables[i].className=="vrch")
		tables[i].parentNode.removeChild(tables[i]);		
	}
	tables=document.getElementsByTagName("img");
	for(var i=0;i<25;i++){
	if(tables[i].className=="zmenitimg")
		tables[i].parentNode.removeChild(tables[i]);		
	}
	div=document.getElementById("nastavenia_obal");
	div.parentNode.removeChild(div);
	div=document.getElementById("etarg");
	div.parentNode.removeChild(div);

	


	
}

window.addEventListener( 'load', onLoad, false);
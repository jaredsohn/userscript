// ==UserScript==
// @name           Titulky.com Adds Remove
// @description    odstrani hnusne reklamy z titulky.com
// @include        http://titulky.com/*
// @include        http://www.titulky.com/*

// ==/UserScript==
document.getElementById("banneryrectangle").style.display = "none";
document.getElementById("bannery160x600P").style.display = "none";
document.getElementById("bannery300x300").style.display = "none";
var objects = document.getElementById("bmone2t-15416.1.10.7").getElementsByTagName('object');
for(i=0;i<objects.length;i++)
	objects[i].style.display = "none";
document.getElementById("sklikReklama_8584").style.display = "none";	
var tables = document.getElementById("contcont").getElementsByTagName('table');
for(i=0;i<tables[0].rows.length;i++)
	if(tables[0].rows[i].innerHTML.search("ShareRapid") != -1)
		tables[0].rows[i].style.display = "none";
document.getElementById("idown").contentDocument.getElementById("bspe").style.display = "none";

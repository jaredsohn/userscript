// ==UserScript==
// @name           WPlang
// @namespace      none
// @include        http://*.wikipedia.org/*
// ==/UserScript==

var myLanguages = ['en', 'de', 'fr', 'pl'];

var search = document.getElementById("search");
if (search == null) return;	// this is no Special:Search page then

var currentlang = /(\w+)\./.exec(document.location.hostname)[1];
var currentoption = document.createElement("option");
currentoption.setAttribute("value", currentlang);
currentoption.setAttribute("selected", "true");
currentoption.textContent = currentlang;

var langs = document.createElement("select");
langs.appendChild(currentoption);
myLanguages.forEach(function(lang){
	if (lang == currentlang) return;
	var option = document.createElement("option");
	option.setAttribute("value", lang);
	option.textContent = lang;
	langs.appendChild(option);
});

langs.addEventListener("change", function(event) { document.location = "http://"+event.target.value+".wikipedia.org/wiki/Special:Search?search="+event.target.ownerDocument.getElementById("searchText").value;}, true);

search.appendChild(langs);
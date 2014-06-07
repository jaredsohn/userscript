// ==UserScript==
// @name        reallmuk
// @namespace   reallmuk
// @description Port of the reallmuk Chrome extension by morcs to Greasemonkey
// @include     http://www.rllmukforum.com/*
// @include     http://www.officeoffline.co.uk/*
// @include     http://www.norwichphotos.co.uk/*
// @version     1
// @grant       none
// ==/UserScript==
var aliases = {
	"ras el hanout" : "ramone",
	"Jody Highroller" : "dizogg",
	"Houellebecq" : "Palo Alto",
	"Mars" : "Weiner",
	"Interesting Technique" : "mrhatfield",
	"Spainkiller" : "veloS",
	"haha great" : "CGMF",
	"Hean Dog" : "syntax",
	"Dinobot" : "Disciple",
	"BNS" : "RXander",
	"wasting no more time here" : "Baggie",
	"Hellcock" : "Double O",
	"Gregory Wolfe" : "Harlen Quinn",
	"Luke" : "lukens",
	"Poppalarge" : "LancashireBambaata",
	"APM" : "Squirtle",
	"Blooming Marvellous" : "radlord",
	"mrsnrub" : "SweetDaddyG"
}
var names = document.querySelectorAll("span[itemprop=name]");
for (i = 0; i < names.length; i++) {
	var name = names[i].innerHTML;
	var match = aliases[name];
	if(match) names[i].innerHTML += " (" + match + ")";
}
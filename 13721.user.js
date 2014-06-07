// ==UserScript==
// @name          ADVANsCEne Language translator
// @namespace     uri:opaquepink@gmail.com,2007-11:ADVANsCEne
// @description   Translates the displayed languages to their own language. Dutch to Nederlands, German to Deutsch, etc.
// @include       http://advanscene.com/html/Releases/*
// @include       http://*.advanscene.com/html/Releases/*
// ==/UserScript==
// Define information table:
var table = document.getElementsByTagName('table')[2];
// Define language field NDS/GBA:
var languages = table.getElementsByTagName('td')[5];
// Check language field PSP:
if(table.getElementsByTagName('td')[6].innerHTML=="Language(s)"){
	languages = table.getElementsByTagName('td')[7];
}
// Define translations:
var translations = {
	"Chinese" : "&#20013;&#25991;",
	"Danish" : "Dansk",
	"Dutch" : "Nederlands",
	"English" : "English",
	"Finnish" : "Suomi",
	"French" : "Fran&ccedil;ais",
	"German" : "Deutsch",
	"Italian" : "Italiano",
	"Japanese" : "&#26085;&#26412;&#35486;",
	"Korean" : "&#54620;&#44397;&#50612;",
	"Norwegian" : "Norsk",
	"Polish" : "Polski",
	"Portuguese" : "Portugu&ecirc;s",
	"Spanish" : "Espa&ntilde;ol",
	"Swedish" : "Svenska",
};
// Execute translations:
var regex = {};
for (key in translations){regex[key]=new RegExp(key,'g');}
var tmp=languages.innerHTML;
for (key in translations){tmp=tmp.replace(regex[key],'<span title="'+key+'">'+translations[key]+'</span>');}
languages.innerHTML=tmp;
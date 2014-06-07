// ==UserScript==
// @name           Newgrounds: Poogrounds
// @namespace      iamgrimreaper
// @description    It turns the normal logo into one that says "Poogrounds - Everyturd by everyone". Also, it changes the NG BBS page title into "PG BBS", and the main page title into "Poogrounds.com - Everyturd by Everyone"
// @include        *newgrounds.com*
// ==/UserScript==

if(document.title.indexOf("NG BBS") > -1){
	document.title = "PG" + document.title.substring(3);
}

if(document.title.indexOf("Newgrounds.com") => 0){
	document.title = "Poogrounds.com - Everyturd, by Everyone.";
}
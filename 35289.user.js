// ==UserScript==
// @name           UrbanDead BiggerSpeechBox
// @namespace      tag:http://wiki.urbandead.com/index.php/User:Revenant,2008-10-12:UrbanDead:Scripts
// @description    Enlarges the speech input box to 50px or user-specified size
// @include        http://*urbandead.com/map.cgi*
// ==/UserScript==

speech = document.getElementsByName("speech")
if (speech[0]) {
	if (speech[0].tagName == 'INPUT') {
		speech[0].size = 50;
	}
}

graffiti = document.getElementsByName("graffiti")
if (graffiti[0]) {
	graffiti[0].size = 50;
}

billboard = document.getElementsByName("graffitib")
if (billboard[0]) {
	billboard[0].size = 60;
}

broadcast = document.getElementsByName("broadcast")
if (broadcast[0]) {
	broadcast[0].size = 60;
}


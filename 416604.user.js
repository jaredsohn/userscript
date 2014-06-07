// ==UserScript==
// @name       VIRTUS => Virus by bLUM3
// @namespace  r3cheats
// @version    0.1
// @description  VIRTUS => Virus by bLUM3
// @match      http://r3cheats.com/*
// @copyright  2014 bLUM3
// ==/UserScript==
for(var i = 0; i <= 999; i++) {
	try {
		if(document.getElementsByTagName("span")[i].firstChild.data == "VIRTUS"){
			document.getElementsByTagName("span")[i].firstChild.data = "Virus";
		}
	} catch (e) {
	}
}
for(var i = 0; i <= 999; i++) {
	try {
		if(document.getElementsByTagName("a")[i].firstChild.data == "VIRTUS") {
			document.getElementsByTagName("a")[i].firstChild.data = "Virus";
		}
	} catch (e) {
	}
}

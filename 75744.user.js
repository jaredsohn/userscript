// ==UserScript==
// @name           IRC-Galleria latauslinkki kuviin ja videoihin
// @namespace      awly
// @include        http://irc-galleria.net/user/*
// ==/UserScript==

function load() {
	var test = document.getElementById("notes");
	var def = document.getElementById("picture-definitions");
	var img = document.getElementsByTagName("IMG");
	if(test) {
		var pattern = /image-\d+-image/;
		for(var i in img) {
			if(pattern.test(img[i].id)) {
				def.innerHTML = "<a href=\""+img[i].src+"\">Lataa kuva</a>";
			}
		}
	} else {
		var pattern = /http:\/\/.*\/fivideo\d\/\d+\/\d+\/\d+\/\d+/;
		for(var i in img) {
			var match = img[i].src.match(pattern);
			if(match) {
				def.innerHTML = "<a href=\""+match[0]+".flv\">Lataa video</a>";
			}
		}
	}
}
load();
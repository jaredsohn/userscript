// ==UserScript==
// @name				TechnoRocker-Redirector
// @author				Kevin "Keving" G.
// @namespace			none
// @description			Ihr wollt trotzdem nicht warten? Kein Problem ;)
// @include				http://www.technorocker.info/download/*
// @include				http://technorocker.info/download/*
// ==/UserScript==
function initRedirect() {
	var myInputArray = document.getElementsByTagName("INPUT");
	for (var i=0; i<myInputArray.length; i++) {
		if (myInputArray[i].type == 'text') {
			window.location.href = "http://anonym.to/?"+myInputArray[i].value;

		}
	}
	
}

initRedirect();
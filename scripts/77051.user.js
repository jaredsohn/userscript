// ==UserScript==
// @name           Facebook - Untrusted Link Bypasser
// @namespace      Facebook - Untrusted Link Bypasser
// @description    Facebook - Untrusted Link Bypasser
// @include        http://www.facebook.com/*
// ==/UserScript==

function removeUntrust(){
	var Untrust = document.getElementsByTagName("a");
	for(var i=0; i<Untrust.length; i++){
		if(Untrust[i].rel == "nofollow"){
			Untrust[i].setAttribute("onmousedown","");
		}
	}
}


setInterval(removeUntrust,2000);
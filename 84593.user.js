// ==UserScript==
// @name           Facebook - Replace "Profile" with your name
// @namespace      Facebook - Replace "Profile" with your name
// @description    Replaces the "Profile" button text on the right of the page with your name
// @include        http://*.facebook.com/*
// ==/UserScript==

setTimeout(setName,50);

function setName(){
	if(document.getElementById("fbNub")){
		PageNav = document.getElementById("fbNub");
		ProfileBtn = PageNav.getElementsByTagName("li")[1];
		ProfileBtnText = "Administrator";
		ProfileBtnText.innerHTML = document.getElementById("fbTranslationsNub").innerHTML;
	}else{
		setTimeout(setName,50);
	}	
}
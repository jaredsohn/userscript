// ==UserScript==
// @name           Facebook - Replace "Profile" with your name
// @namespace      Facebook - Replace "Profile" with your name
// @description    Replaces the "Profile" button text on the right of the page with your name
// @include        http://*.facebook.com/*
// ==/UserScript==

setTimeout(setName,50);

function setName(){
	if(typeof document.getElementById("pageNav") !== "undefined"){
		try{
		PageNav = document.getElementById("pageNav");
		ProfileBtn = PageNav.getElementsByTagName("li")[1];
		ProfileBtnText = ProfileBtn.getElementsByTagName("a")[0];
		ProfileBtnText.innerHTML = document.getElementById("navAccountName").innerHTML;
		}catch(e){
		
		}
	}else{
		setTimeout(setName,50);
	}	
}
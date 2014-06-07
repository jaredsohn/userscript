// ==UserScript==
// @name           Custom Peter Meebo
// @description    Removes the Advertisement Bottom Banner and Meebo blog
// @include        http://meebo.com/*
// @include        https://meebo.com/*
// @include        http://www.meebo.com/*
// @include        https://www.meebo.com/*
// @author         Peter Jankovsky
// @namespace      http://www.jankovskyapplications.com
// @version        1.0
// ==/UserScript==

GM_addStyle(".MediaBar {display: none !important;}");
GM_addStyle("#4 {display: none !important;}");
GM_addStyle("#5 {display: none !important;}");

var removeAd = function() {
    var adbar = document.getElementById("12-MediaBar");
    var ad4 = document.getElementById("4");
    var ad5 = document.getElementById("5");
    if (adbar) {	
        adbar.style.display = "none";
    }
	if (ad4) {	
        ad4.style.display = "none";
    }
	if (ad5) {	
        ad5.style.display = "none";
    }
}

window.addEventListener("DOMSubtreeModified", removeAd, true);
removeAd();

//Remove Meebo Blog Window and Closing PopUp
var cleanInterval = setInterval(function(){
	if(document.getElementById("welcomeWin")) {
		document.getElementById("welcomeWin").parentNode.removeChild(document.getElementById("welcomeWin"));
		try {
			unsafeWindow.gLang.navigateAway = undefined;
		} catch (e) {}
		clearInterval("cleanInterval");
	}
}, 5000);
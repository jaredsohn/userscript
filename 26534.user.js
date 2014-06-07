// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Discount Bank fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
//Written by Guy Sheffer (GuySoft) <guysoft@ort.org.il>
// ==UserScript==
// @name          Discount Bank fix
// @namespace     https://start.telebank.co.il/?pagekey=Home*
// @description   The script bypasses the stuipid discount browser check. But not the bank's check/
// @include       https://start.telebank.co.il/?pagekey=Home*
// @include	  https://start.telebank.co.il*

// ==/UserScript==


function detectBrowser(){
	var isBrowserAllow = true;

 version = navigator.userAgent.indexOf("Firefox")+8;

}

function embedFunction(s) {
document.body.appendChild(document.createElement('script'))
.innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}



embedFunction(detectBrowser);
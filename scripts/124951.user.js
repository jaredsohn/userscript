// ==UserScript==
// @name           pt
// @namespace      pt
// @description    Remove Ads
// @include        http://www.psychotherapiepraxis.at/*
// @include        http://www.counseling-office.com/*
// @version        0.1.0
// ==/UserScript==

var names = ['someUserName', 'suesu'];

var ad = document.getElementsByClassName("adsense_paypal");
ad[0].setAttribute("style", "visibility: hidden");

var adLeft = document.getElementsByClassName("adsense_std");
adLeft[0].setAttribute("style", "visibility: hidden");

var chat = document.getElementById("chat");
var chatChildren = chat.children; //child array

var author1, tmpText;

document.addEventListener("DOMNodeInserted", reloaded, false);

//unsafeWindow.console.log("after reload");


function start() {
	
	//unsafeWindow.console.log("start function");
	
	var done;
	var it;
	chatChildren = chat.children; //child array
	
	
	for (var i = 0; i < chatChildren.length; i++) {
		done = false;
		
		author1 = chatChildren[i].getElementsByClassName("postauthor");
		
		tmpText = author1[0].innerHTML;
		
		it = Iterator(names, true);
		for (var entry in it) {
			
			if ((tmpText.search(names[entry]) != -1)) { //&& chatChildren[i].getAttribute("style") == ("visibility: hidden")){
				unsafeWindow.console.log(tmpText);
				chatChildren[i].setAttribute("style", "visibility: hidden");
				
				done = true;
				
			}
			
			if (done) {
				continue;
			}
		}
	}
	
};

function reloaded() {
	
	document.removeEventListener("DOMNodeInserted", reloaded, false);
	
	start();
	
	document.addEventListener("DOMNodeInserted", reloaded, false);
	
};

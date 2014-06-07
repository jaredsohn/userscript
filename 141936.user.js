// ==UserScript==
// @name        OV Emoticons
// @namespace   https://getsatisfaction.com/pluto/products/pluto_ov_profile_scripts
// @description This UserScript replaces nearly all Onverse Forum emoticons with the ones used in Onverse's client!
// @include     http://forum.onverse.com/*
// @version     1
// ==/UserScript==

var imgs = document.getElementsByTagName("img");
for(var i = 0; i < imgs.length; i++) {
	var cur = imgs[i].getAttribute("title");
	var found = true;
	if(cur == "Smile") {
		cur = "https://pacific.rsmart.com/access/content/user/dnunes1/Emoticons/smile16.png";
	}
	else if(cur == "Wink") {
		cur = "https://pacific.rsmart.com/access/content/user/dnunes1/Emoticons/wink16.png";
	}
	else if(cur == "Cool") {
		cur = "https://pacific.rsmart.com/access/content/user/dnunes1/Emoticons/cool16.png";
	}
	else if(cur == "Talking" || cur == "Big Grin") {
		cur = "https://pacific.rsmart.com/access/content/user/dnunes1/Emoticons/smile_big16.png";
	}
	else if(cur == "Red face" || cur == "Embarrassment") {
		cur = "https://pacific.rsmart.com/access/content/user/dnunes1/Emoticons/surprise16.png";
	}
	else if(cur == "Angry" || cur == "Mad") {
		cur = "https://pacific.rsmart.com/access/content/user/dnunes1/Emoticons/angry16.png";
	}
	else if(cur == "Unhappy" || cur == "Frown") {
		cur = "https://pacific.rsmart.com/access/content/user/dnunes1/Emoticons/frown16.png";
	}
	else if(cur == "Confused") {
		cur = "https://pacific.rsmart.com/access/content/user/dnunes1/Emoticons/confused16.png";
	}
	else if(cur == "Roll Eyes (Sarcastic)") {
		cur = "https://pacific.rsmart.com/access/content/user/dnunes1/Emoticons/angel16.png";
	}
	else if(cur == "Stick Out Tongue") {
		cur = "https://pacific.rsmart.com/access/content/user/dnunes1/Emoticons/raspberry16.png";
	}
	else {
		found = false;
	}
	if(found) {
		imgs[i].setAttribute("src",cur);
	}
}
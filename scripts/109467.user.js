// ==UserScript==
// @name           Restaurant City Gift Token Generator
// @namespace      com.kuei
// @description    Restaurant City Gift Token Generator
// @include        http://www.connect.facebook.com/widgets/serverfbml.php
// ==/UserScript==
(function() {

window.addEventListener('load', getToken, true);

function getToken() {

	var giftData = {};

	var linkElement = getElementByClassName("facebook_link");
	if (linkElement) {

		var senderIdPattern = /pf_senderId=(\d+)/i;
		var senderIdResult = senderIdPattern.exec(linkElement.href);
		if (senderIdResult) {
			giftData.senderId = senderIdResult[1];
		}
	
		var giftItemIdPattern = /pf_giftItemId=(\d+)/i;
		var giftItemIdResult = giftItemIdPattern.exec(linkElement.href);
		if (giftItemIdResult) {
			giftData.itemId = giftItemIdResult[1];
		}
	}

	var sessionKeyElement = getElementByName("pf_session_key");
	if (sessionKeyElement) {
		giftData.sessionKey = sessionKeyElement.value;
	}
	
	var apiKeyElement = getElementByName("pf_api_key");
	if (apiKeyElement) {
		giftData.apiKey = apiKeyElement.value;
	}
	
	var giftTokenElement = getElementByName("pf_giftToken");
	if (giftTokenElement) {
		giftData.giftToken = giftTokenElement.value;
	}
	
	var tokenData = giftData.giftToken + "<nofil2000>" + giftData.sessionKey + "<nofil2000>" + giftData.apiKey + "<nofil2000>" + giftData.senderId;
	
	var token = "<token>" + window.btoa(tokenData) + "</token>-itemid=" + giftData.itemId + "&&&&";
	
	window.prompt("Your gift token:", token);
}

function getElementByName(name) {
	var els = document.getElementsByName(name);
	if (els && els.length > 0) {
		return els[0];
	}
	return null;
}

function getElementByClassName(name) {
	var els = document.getElementsByClassName(name);
	if (els && els.length > 0) {
		return els[0];
	}
	return null;
}

})();

// ==UserScript==
// @name           CrashbandiSpyro12's Idea
// @namespace      Http://www.youtube.com/mainline421
// @include        http://www.youtube.com/*
// ==/UserScript==
//Remove Google Plus Add = 1 it will be removed change to 0 to keep.
var flagArray = new Array();
flagArray['guide-reminders'] = 1;

(function() {

	for (var flagKey in flagArray){

		if (flagArray[flagKey] == 1){
    			var myNode = document.getElementById(flagKey);
    			if (myNode!=null) {
          			myNode.parentNode.removeChild(myNode);


    			}
		}
	}

})();

//Remove Browse Channels Button = 1 it will be removed change to 0 to keep.
var flagArray = new Array();
flagArray['guide-builder-promo'] = 1;

(function() {

	for (var flagKey in flagArray){

		if (flagArray[flagKey] == 1){
    			var myNode = document.getElementById(flagKey);
    			if (myNode!=null) {
          			myNode.parentNode.removeChild(myNode);


    			}
		}
	}

})();

//Remove Social Button = 1 it will be removed change to 0 to keep.
var flagArray = new Array();
flagArray['social-guide-item'] = 1;

(function() {

	for (var flagKey in flagArray){

		if (flagArray[flagKey] == 1){
    			var myNode = document.getElementById(flagKey);
    			if (myNode!=null) {
          			myNode.parentNode.removeChild(myNode);


    			}
		}
	}

})();

//Remove Subscriptions Button = 1 it will be removed change to 0 to keep.
var flagArray = new Array();
flagArray['all-subscriptions'] = 1;

(function() {

	for (var flagKey in flagArray){

		if (flagArray[flagKey] == 1){
    			var myNode = document.getElementById(flagKey);
    			if (myNode!=null) {
          			myNode.parentNode.removeChild(myNode);


    			}
		}
	}

})();

//Remove Subscriptions Button = 1 it will be removed change to 0 to keep.
var flagArray = new Array();
flagArray['feed-header before-feed-content'] = 1;

(function() {

	for (var flagKey in flagArray){

		if (flagArray[flagKey] == 1){
    			var myNode = document.getElementByclass(flagKey);
    			if (myNode!=null) {
          			myNode.parentNode.removeChild(myNode);


    			}
		}
	}

})();

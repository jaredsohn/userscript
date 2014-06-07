// ==UserScript==
// @name        Cleanup Twitter
// @namespace   http://www.twitter.com/~CleanupTwitter
// @description Removes Crap From Twitter
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @exclude		https://twitter.com/*/status/*
// @exclude		http://twitter.com/*/status/*
// @version     1.6
// @grant       none
// ==/UserScript==

setTimeout(CheckForZero, 1000); 
function CheckForZero() {
	var cardsToHide = document.getElementsByClassName('cards-media-container');
	for (var i=0; i<cardsToHide.length; i++) {
		cardsToHide[i].style.display="none";
	}
	
	var cardsToHide = document.getElementsByClassName('js-media-container');
	for (var i=0; i<cardsToHide.length; i++) {
		cardsToHide[i].style.display="none";
	}
	
	var textToHide = document.getElementsByClassName('action-reply-container');
	for (var i=0; i<textToHide.length; i++) {
		var tag = textToHide[i].getElementsByTagName("b");
		tag[0].style.display="none";
	}	

	var textToHide = document.getElementsByClassName('action-rt-container');
	for (var i=0; i<textToHide.length; i++) {
		var tag = textToHide[i].getElementsByTagName("b");
		tag[0].style.display="none";
		if (tag[1]) {
			tag[1].style.display="none";
		}
	}	

	var textToHide =  document.getElementsByClassName('action-del-container');
	for (var i=0; i<textToHide.length; i++) {
		var tag = textToHide[i].getElementsByTagName("b");
		tag[0].style.display="none";
	}	

	var textToHide = document.getElementsByClassName('action-fav-container');
	for (var i=0; i<textToHide.length; i++) {
		var tag = textToHide[i].getElementsByTagName("b");
		tag[0].style.display="none";
		if (tag[1]) {
			tag[1].style.display="none";
		}
	}	

	var textToHide = document.getElementsByClassName('more-tweet-actions');
	for (var i=0; i<textToHide.length; i++) {
		var tag = textToHide[i].getElementsByTagName("b");
		tag[0].style.display="none";
	}	

	setTimeout(CheckForZero, 1000);
}

document.body.addEventListener('mouseover',CheckForZero,true);
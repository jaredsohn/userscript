// ==UserScript==
// @include http://facebook.com/*
// @include http://www.facebook.com/*
// @name Banish Wall on Facebook news feed
// ==/UserScript==

if (location.hostname.indexOf('facebook.com') != -1) {
	window.opera.addEventListener('AfterScript', function (e) {
var imgWallPosts = document.querySelectorAll(".sx_icons_photo.GenericStory_Icon");
var imgMobilePosts = document.querySelectorAll(".sx_icons_mobile_photo.GenericStory_Icon");
__removePosts(imgWallPosts);
__removePosts(imgMobilePosts);
},false);
}

function __removePosts(collection) {
var collectionLength = collection.length;
for (var i=0; i<collectionLength; i++) {
	var imgTag = collection.item(i);
	var divElem = imgTag.parentNode.parentNode.parentNode.parentNode;
	divElem.style.display = 'none';
}
}
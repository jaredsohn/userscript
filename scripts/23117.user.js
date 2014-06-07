// ==UserScript==
// @name           HabraImagination
// @namespace      *
// @description    © va1en0k
// @include        http://habrahabr.ru/blog/*
// @include        http://*.habrahabr.ru/blog/*
// @exclude        http://habrahabr.ru/blog/*/edit/*
// @exclude        http://*.habrahabr.ru/blog/*/edit/*
 
var func = function() {
	allReply = document.getElementsByTagName('textarea');
	for (var i = 0; i < allReply.length; i++) {
		if (allReply[i].nextSibling.tagName != 'SPAN') {
			loadPicDiv = document.createElement('SPAN');
			loadPicDiv.innerHTML = "<input type='button' onclick='PicturesLoader(\""+allReply[i].id+"\");' value='загрузить картинку' />" 
			allReply[i].parentNode.insertBefore(loadPicDiv, allReply[i].nextSibling);
		}
	}
	window.setTimeout( func, 1000);
}
func();

// ==/UserScript==
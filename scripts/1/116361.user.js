// ==UserScript==
// @name           JingIt Always Focus
// @version 	   2.0
// @namespace      Liboicl
// @include        https://www.jingit.com/*
// ==/UserScript==
function blurIt(){
	var test=document.getElementById("likeButton");
	if(test != null)
		window.onblur = function () { var jingitApp = document.getElementById("Jingit"); if (!isMouseOverLikeContainer(cursor) && jingitApp && jingitApp.onAppDeactivate) { jingitApp.onAppDeactivate(); }}
	else
		window.setTimeout(blurIt, 1000);
}
window.setTimeout(blurIt, 1000);
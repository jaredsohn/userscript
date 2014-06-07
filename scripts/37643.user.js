// ==UserScript==
// @name           Fix Picture Wars Image Cut-off
// @namespace      http://thefwcentral.com/
// @description    The Picture Wars temporary forums happen to cut off images wider than the theme. This fixes that.
// @include        http://picturewars.boardzero.com/viewtopic.php?*
// @include        http://picturewars.boardzero.com/*/*.html
// ==/UserScript==

var posts = document.getElementsByTagName("div");

//Find all of the posts and replace their overflow attribute
for (i=0;i<posts.length;i++){
	var par = posts[i].parentNode;
	if (par.className=="postbody"&&posts[i].className=="content"){
		posts[i].style.overflow="visible";
	}
}

//Done!
//It really is that easy
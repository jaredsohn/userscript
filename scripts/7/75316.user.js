// ==UserScript==
// @name          Reddit LaTeX fix
// @namespace	  http://www.reddit.com/r/math/
// @description   Unhide images made from LaTeX tags
// @include	  http://www.reddit.com/r/math/*
// ==/UserScript==


mds = document.getElementsByClassName("md");
for (i = 0; i < mds.length; i++) {
	var imgs = mds[i].getElementsByTagName("img");
	for (j = 0; j < imgs.length; j++) {
		imgs[j].style.setProperty("display","inline")
	}
}

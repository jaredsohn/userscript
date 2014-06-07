// ==UserScript==
// @name           FWZ: I am in 8th grade penislol
// @namespace      WAT
// @description    Changes WeChallers posts to "I am in 8th grade penislol"
// @include        http://*.forumwarz.com/discussions/view/*
// @include        http://forumwarz.com/discussions/view/*
// ==/UserScript==

var h1 = document.getElementsByTagName("h1");
for(i in h1) {
	if(klan = h1[i].parentNode.parentNode.parentNode.children[2].children[0].children[0].children[0])
	if(klan.innerHTML == "WeChall")
    h1[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[1].innerHTML = "I am in 8th grade penislol";
}
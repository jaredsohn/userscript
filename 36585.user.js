// ==UserScript==
// @name           Xkcd subtext
// @namespace      http://hergonan.blogspot.com
// @description    Takes the title of the comics and puts it below the image.
// @include        http://www.xkcd.com/*
// @include        http://xkcd.com/*
// @include        http://www.xkcd.org/*
// @include        http://xkcd.org/*
// ==/UserScript==


window.addEventListener('load', function(){
	midcont = document.getElementById("middleContent");
	image = midcont.getElementsByTagName("img")[0];
	div = document.createElement("div");
	div.setAttribute("style","padding: 5px; background: black; position: relative; top: 5px; color: white;")
	div.innerHTML = image.getAttribute("title");
	image.parentNode.insertBefore(div,image.nextSibling.nextSibling);
	image.setAttribute("title","");
}, false);
// ==UserScript==
// @name           TNN Tag scroll
// @namespace      riscy
// @description    Makes the badge window on the profiles scroll.
// @include        http*://thenethernet.com/users/*
// @include        http*://thenethernet.com/users/*
// @include        http://thenethernet.com/users/*
// @include        http*://*.thenethernet.com/users/*
// @exclude        http*://thenethernet.com/users/*/*
// @exclude        http*://*.thenethernet.com/users/*/*
// ==/UserScript==

var e = document.getElementById("taglist");
e.style.overflow = "auto";
e.style.height = "180px";

var tags = document.getElementsByClassName("tagName");

for (var i = 0; i < tags.length; i++)
	tags[i].style.padding = "0px 10px 10px 0px";
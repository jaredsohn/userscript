// ==UserScript==
// @name           maw
// @namespace      http://www.maw.ru/*
// ==/UserScript==

var images = document.getElementsByTagName("img");
for (i = 0; i < images.length; i++){
	var s = images[i].getAttribute("src");
	var s_v = s.slice(4,6);
	if(s_v == "at")
	{
	s = "/fp/ab/" + s.slice(7);
	images[i].setAttribute("src",s);
	}
};
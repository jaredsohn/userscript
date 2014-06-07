// ==UserScript==
// @name          PonychanM4ToG
// @description   Improves imageboards similar to 4chan.
// @include       http://*.ponychan.net/*/res/*
// @include       http://*.ponychan.net/*/res/*.html
// @include       http://*.4chan.org/*/res/*
// @include       http://*.4chan.org/*/res/*.html
// @version       1.1
// @homepage	  http://m4tog.reimagined.me/
// @copyright 	  2010, Admin @ ReImagined (http://m4tog.reimagined.me/)
// ==/UserScript==

 function loadScript(url, where) {
    var e = document.createElement("script");
	e.src = url; e.type = "text/javascript";
	var head = document.getElementsByTagName("head")[0];
	var body = document.getElementsByTagName("body")[0];
	try
	{
		if (where == "head")
			head.appendChild(e);
		else
			body.appendChild(e);
	}
	catch(err)
	{
	}
} 

loadScript("http://atrixtech.com/chan/m4togmod/prototype.js", "head");
loadScript("http://atrixtech.com/chan/m4togmod/scriptaculous.js?load=effects,builder", "head");
loadScript("http://atrixtech.com/chan/m4togmod/lightbox.js", "head");
loadScript("http://atrixtech.com/chan/m4togmod/m4tog.js", "head");
loadScript("http://atrixtech.com/chan/m4togmod/Votes.js?ver=1.0");

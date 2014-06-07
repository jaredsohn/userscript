// ==UserScript==
// @name          M4ToG
// @description   Improves imageboards similar to 4chan.
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

loadScript("http://m4tog.reimagined.me/res/js/prototype.js", "head");
loadScript("http://m4tog.reimagined.me/res/js/scriptaculous.js?load=effects,builder", "head");
loadScript("http://m4tog.reimagined.me/res/js/lightbox.js", "head");
loadScript("http://m4tog.reimagined.me/res/js/m4tog.js", "head");
loadScript("http://m4tog.reimagined.me/res/js/Votes.js?ver=1.0");
/*
* Loads the PonyUpz userscript extension for Ponychan.  Once this loader is installed the 
* script will live update on its own.  For version update notes, reviews, feedback, 
* suggestions, discussion and/or bug reports see http://www.ponychan.net/chan/meta/res/87445.html
*/

// ==UserScript==
// @name          PonyUpz Loader
// @description   Improves Ponychan
// @include       http://*.ponychan.net/chan/*
// @include       http://*.ponychan.net/*/res/*
// @include       http://*.ponychan.net/*/res/*.html
// @description   Loads the PonyUpz userscript extension for Ponychan.  Once this loader is installed the script will live update on it's own.  For version update notes, reviews, feedback, suggestions and/or bug reports see http://www.ponychan.net/chan/meta/res/87445.html
// @version       1.2
// @homepage	  None
// @copyright 	  2011, Further Developement by Zashy, Initially Developed by Arcs, free to mod and distribute, please credit author
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
function loadCss(url, where) {
	var e = document.createElement("link");
	e.href = url; e.type = "text/css";
	e.rel = 'stylesheet';
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

loadCss("http://zashy.bitbucket.org/ponyup/ponyup.css", "head");
loadCss("http://zashy.bitbucket.org/ponyup/ponyupz.css", "head");
loadScript("http://zashy.bitbucket.org/ponyup/ponyup.js", "head");
loadScript("http://zashy.bitbucket.org/ponyup/ponyupz.js", "head");
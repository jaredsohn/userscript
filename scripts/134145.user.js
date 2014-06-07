/*
* Loads the PonyUpz userscript extension for Ponychan (extended to support Lunachan). 
* Once this loader is installed the script will live update on it's own.  For version update 
* notes, reviews, feedback, suggestions and/or bug reports see 
* http://www.ponychan.net/chan/meta/res/87445+50.html
*/

// ==UserScript==
// @name          PonyUpz-jQuery Loader
// @description   Improves Ponychan, but mostly Lunachan ;-)
// @include       http://*.ponychan.net/*
// @include       http://*.lunachan.net/*
// @include       http://*ponychan.net/*
// @include       http://*lunachan.net/*
// @description   Loads the PonyUpz userscript extension for Ponychan (extended to support Lunachan).  Once this loader is installed the script will live update on it's own.  For version update notes, reviews, feedback, suggestions and/or bug reports see http://www.ponychan.net/chan/meta/res/87445+50.html
// @version       2.0
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

if(!window.jQuery)
	loadScript("http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js", "head");
loadCss("http://ponyup.theoks.net/ponyup.css", "head");
loadCss("http://ponyup.theoks.net/ponyupz.css", "head");
loadScript("http://ponyup.theoks.net/ponyup.js", "head");
loadScript("http://ponyup.theoks.net/ponyupz.js", "head");
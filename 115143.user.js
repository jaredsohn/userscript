
// ==UserScript==
// @name         Politiko Plus plugin
// @namespace    PolitikoPlus
// @include      http://politiko.ua/*
// @author       VolodymyrB aka Volodymyr Oleksandrovych
// @description  Politiko Plus plugin, improve politiko.ua
// @version      1.1
// ==/UserScript==

(function(window, undefined ) {

	if (typeof unsafeWindow != undefined)
		w = unsafeWindow;
	else
		w = window;  

	if (w.self != w.top)
		return;

	if (/http:\/\/politiko.ua/.test(w.location.href))
	{	
		var script = document.createElement("script");
		script.setAttribute("src", "http://politikoplus.appspot.com/politikoplus-1.1.js");
		document.body.appendChild(script);
	}

})(window);
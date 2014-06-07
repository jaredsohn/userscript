// ==UserScript==
// @name           Hybrid Unframe
// @namespace      http://thenotsoevilgenius.com/
// @version        1.0.0
// @description    Remove the white area around a facebook wrapped Mafia wars game
// @match          *://apps.facebook.com/inthemafia/*
// ==/UserScript==
(function(){
	try{
		document.getElementById('contentCol').removeChild(document.getElementById('rightCol'));
	}catch(err){}; 
	document.getElementById('pagelet_canvas_content').style.width="100%";
})();
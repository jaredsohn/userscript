// ==UserScript==
// @name           vkontakte Get Music! v1.4
// @namespace      http://vkontaktemusicgetter.googlecode.com
// @description    Music download for vkontakte.ru
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

var parent = document.getElementById("results");
var val = "";
if (parent) {
	val = document.getElementById("section").value;
}

var audios = document.getElementById("audios");
var class = "";

if (audios) {
	class = audios.getAttribute("class");
}

if ((parent && val == "audio") || (audios && class != "flexOpen")) {
	var widget = document.createElement('script'),
		body = document.getElementsByTagName("body"),
		newDiv = document.createElement('div');
	
	widget.src  = 'http://vkontaktemusicgetter.googlecode.com/files/getmusic.min.js';
	widget.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(widget); 
	
	newDiv.innerHTML = "Get Music!";
	newDiv.setAttribute("onClick","loadLyrics();return false;");
	newDiv.setAttribute("style","cursor:pointer;position:fixed;bottom:5px;right:5px;background-color:#6D8FB3;border:1px solid #3B6798;padding:4px 5px 4px 4px;color:#FFFFFF;");
	body[0].appendChild(newDiv);
}
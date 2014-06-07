// ==UserScript==
// @name        Flickr Original Link
// @namespace   http://userscripts.org/users/516325
// @include     http://*flickr.com/photos/*
// @include     https://*flickr.com/photos/*
// @version		1.3
// @grant 		none
// @description Made by Skyfall.
// ==/UserScript==
var pageData = document.documentElement.innerHTML;
var size = pageData.match(/"sizes":{(?:.+?)}}/);
var link = "";
var url = "";
if (size)
	url = size[0].match(/"url":"([^"]+)"[^}]+}}/);
if (url) {
	link = url[1];
	link = link.replace(/\\\//g, "/");
	link = "http:" + link;
	var div = document.getElementsByClassName("sidebar-panel-fixed")[0];
	var button = document.createElement("div");
	var download = document.createElement("a");
	button.appendChild(download);
	download.appendChild(document.createTextNode("DOWNLOAD BIG PHOTOS"));
	download.href = link;
	download.style.display = "block";
	button.style = "padding:10px 1px; background-color:blue;text-align:center;color:red;font-weight:bold;";
	div.appendChild(button);
}

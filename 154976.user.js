// ==UserScript==
// @name        萌えinverse
// @namespace   http://userscripts.org/users/260847
// @include     http://www.inverse.jp/perl2/gazou/imgboard_html/*
// @grant       none
// @version     1
// ==/UserScript==
var ID = "_gs_container_";
var regexp = /<\/small><br><a href="(.+?)\/html\/(\d+)\.cgi" target="_blank"><img.+?src="(.+?)\/thumb\/\d+s.(jpg|bmp|gif|png)".+?><\/a>/gi;
var result;

var src_url, id, th_url, type; 

var insertHook = document.querySelectorAll("hr")[1];
var container = document.createElement("DIV");
container.id = ID;
insertHook.parentNode.insertBefore(container, insertHook.nextSibling);

while( (result = regexp.exec(document.body.innerHTML)) != null){
	src_url = result[1] + "/html/";
	id = result[2];
	th_url = result[3] + "/thumb/";
	type = result[4];

	(function(src, th, id, type){
		var a = document.createElement("A");
		a.href = src + id + ".cgi";
		a.target = "_blank";

		var img = document.createElement("IMG");
		img.src = th + id + "s." + type;

		a.appendChild(img);

		container.appendChild(a);
	})(src_url, th_url, id, type);
}


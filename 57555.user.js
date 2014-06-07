// ==UserScript==
// @name           Subnova SL Map image preview
// @namespace      http://mailerdaemon.home.comcast.net/
// @description    Adds a map image preview (the image isn't very good)
// @include        http://www.subnova.com/secondlife/api/map.php?sim=*
// ==/UserScript==

var node = document.body;
if(node.textContent.length == 36)
{
	var img = document.createElement("img");
	img.src = "http://secondlife.com/app/image/"+node.textContent+"/2"
	img.width = img.height = 240;
	img.title = img.alt = "Basic map preview"
	node.appendChild(document.createElement("br"));
	node.appendChild(img);
}
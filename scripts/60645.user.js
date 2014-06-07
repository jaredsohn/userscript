// ==UserScript==
// @name           reddit_nsfw_thumb_hider
// @namespace      tag:a_hal89@hotmail.com,2008-05-22:Ahal
// @description    Hides thumbnails of links that contain "NSFW"
// @include        http://*.reddit.*
// ==/UserScript==

var links = document.getElementsByTagName("a");
for (var i = 0; i < links.length; ++i){
	if (links[i].innerHTML.toLowerCase().indexOf("nsfw") != -1){
		var parent = links[i].parentNode.parentNode.parentNode;
		var image = parent.getElementsByTagName("img")[0];
		if (image != null && image.src.indexOf("thumbs.reddit") != -1){
			image.style.display = "none";
		}
	}
}
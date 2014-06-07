// ==UserScript==
// @name        Youtube Replace Favicon with Video Thumbnail
// @description Replaces youtube favicon at youtue video pages with a thumbnail of the video.
// @namespace   YTFwVT
// @include     *://www.youtube.com/watch?*
// @include     *://youtube.com/watch?*
// @grant       none
// @version     1
// ==/UserScript==

(function(){
	var id, protocol;
	try {
		var match = location.href.match(/(https?\:\/\/)?(?:.*)(?:\?|\&)v\=(.{11})/);
		id = match[2];
		if (!id)
			return;
		protocol = match[1];
		if (!protocol)
			protocol = "http://";
	} catch(e){
		console.log("Error: Couldn't replace youtube favicon with video thumbnail. (The script was unable to determine the video id / the protocol.)");
		return;
	}
	var favicon = document.createElement("link");
	favicon.setAttribute("type","image/x-icon");
	favicon.setAttribute("rel","shortcut icon");
	favicon.href = protocol + "img.youtube.com/vi/" + id + "/0.jpg";
	var icons = document.head.getElementsByTagName("link");
	for (var i=0;i<icons.length;++i){
		if (icons[i].getAttribute("type") == "image/x-icon" && icons[i].getAttribute("rel") == "shortcut icon"){
			document.head.removeChild(icons[i]);
			}
	}
	document.head.appendChild(favicon);
})();
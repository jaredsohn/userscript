// ==UserScript==
// @name           Stop Overzealous Embedding
// @namespace	   http://userscripts.org/scripts/show/113484
// @description    Tries to turn embedded Youtube videos into links
// @exclude	   *.youtube.com/*
// ==/UserScript==

var i, j, k, index;
var video_id, video_url, video_link;

var risky_elements, risky_attributes, risky_node;
var risky_tags = ["object", "embed", "iframe"];

var bad_elements = [];
var bad_ids = [];

for (i = 0; i < risky_tags.length; i++) {
	risky_elements = document.getElementsByTagName(risky_tags[i]);
	for (j = 0; j < risky_elements.length; j++) {
		index = 0;
		risky_attributes = risky_elements[j].attributes;
		for (k = 0; k < risky_attributes.length; k++) {
			risky_node = risky_attributes[k].nodeValue;
			if ((risky_node.indexOf("youtube.com") >= 0) || (risky_node.indexOf("ytimg.com") >= 0) || (risky_node.indexOf("youtube-nocookie.com") >= 0)) {
				risky_elements[j].style.display = "none";
				if (risky_node.indexOf("/v/") >= 0) {
					index = risky_node.indexOf("/v/") + 3;
				} else if (risky_node.indexOf("?v=") >= 0) {
					index = risky_node.indexOf("?v=") + 3;
				} else if (risky_node.indexOf("/embed/") >= 0) {
					index = risky_node.indexOf("/embed/") + 7;
				}
				if (index > 0) {
					video_id = risky_node.substring(index, index + 11);
					bad_elements.push(risky_elements[j]);
					bad_ids.push(video_id);
				}
				break;
			}
		}
	}
}

for (i = 0; i < bad_ids.length; i++) {
	video_id = bad_ids[i];
	video_url = "http://www.youtube.com/watch?v=" + video_id;
	video_link = document.createElement("a");
	video_link.innerHTML = video_url;
	video_link.setAttribute("href", video_url);
	bad_elements[i].parentNode.replaceChild(video_link, bad_elements[i]);
}

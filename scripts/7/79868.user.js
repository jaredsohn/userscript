// ==UserScript==
// @name            Sankaku Channel no resized versions
// @namespace       noIdea
// @description     Replaces resized versions of pictures with originals
// @author			Bernhard 'BloodyRain2k' Kroetsch
// @include         http://chan.sankakucomplex.com/post/show/*
// ==/UserScript==

main();

function main($) {
	var highres = null;
	var links = document.getElementsByTagName("a");
	var imgs = document.getElementsByTagName("img");
	var preview = "";
	for (var i = 0; i < links.length; i++){
		if (links[i].id == "highres") {
			highres = links[i].href;
			break;
		}
	}
	for (var i = 0; i < imgs.length; i++){
		preview = imgs[i].getAttribute("src").match(/\/sample\//i);
		if (preview != null) {
			document.getElementsByTagName("img")[i].setAttribute("src",highres);
		}
	}
}
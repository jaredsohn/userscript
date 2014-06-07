// ==UserScript==
// @name			Flickr bigger image
// @namespace		Flickr
// @include			http://www.flickr.com/photos/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var tr = $("#photoswftd");
var photoDiv = $(".photoImgDiv", tr);
var imgTag = $("img", photoDiv);
var parts = imgTag.attr("src").split(".");
parts[parts.length - 2] += "_b";
var bigurl = parts.join(".");
imgTag
	.attr("src", bigurl)
	.removeAttr("width")
	.removeAttr("height")
	.css("width", "1024px");
tr.attr("width", 1026);
photoDiv.css("width", "1026px");
$("#Main").css("width", "1317px");
/*var tr = $("#photoswftd");
var photoDiv = $(".photoImgDiv", tr);
var imgTag = $("img", photoDiv);
var parts = imgTag.attr("src").split(".");
parts[parts.length - 2] += "_b";
var bigurl = parts.join(".");
var img = new Image();
img.onLoad = function() {
	imgTag.attr("src", img.src);
	tr.attr("width", img.width);
	photoDiv.css("width", img.width + "px");
};
img.src = bigurl;*/
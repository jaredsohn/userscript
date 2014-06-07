// ==UserScript==
// @name           FurAffinity Large Thumbnails
// @namespace      http://userscripts.org/users/97372
// @include        http://www.wfuraffinity.net/msg/submissions/*
// @include        http://www.wfuraffinity.net/browse/*
// @include        http://www.wfuraffinity.net/gallery/*
// @include        http://www.wfuraffinity.net/search/*
// @include        http://www.wfuraffinity.net/scraps/*
// @include        http://www.wfuraffinity.net/favorites/*
// @exclude        FurAffinity large thumbnails in the submissions section.
// ==/UserScript==


var styleBlock = document.createElement("style");

styleBlock.type = "text/css";


if(window.location.pathname.substring(0,17) == "/msg/submissions/"){

var newStyle = "div#messagecenter-submissions ul.messages-stream li { display:block; float:left; height:390px; margin:0 5px; 6px; padding:0; text-align:center; width:354px; }";

}
if(window.location.pathname.substring(0,8) == "/browse/"){
var newStyle = "div#gallery ul.messages-stream li, div#scraps ul.messages-stream li, div#favorites ul.messages-stream li, div#browse ul.messages-stream li, div#search ul.messages-stream li { display:block; float:left; height:390px; margin:8px 5px; padding:0; text-align:center; width:360px; }";
}

if(window.location.pathname.substring(0,9) == "/gallery/"){
var newStyle = "div#gallery ul.messages-stream li, div#scraps ul.messages-stream li, div#favorites ul.messages-stream li, div#browse ul.messages-stream li, div#search ul.messages-stream li { display:block; float:left; height:390px; margin:8px 5px; padding:0; text-align:center; width:360px; }";
}

if(window.location.pathname.substring(0,8) == "/search/"){
var newStyle = "div#gallery ul.messages-stream li, div#scraps ul.messages-stream li, div#favorites ul.messages-stream li, div#browse ul.messages-stream li, div#search ul.messages-stream li { display:block; float:left; height:390px; margin:8px 5px; padding:0; text-align:center; width:360px; }";
}

if(window.location.pathname.substring(0,8) == "/scraps/"){
var newStyle = "div#gallery ul.messages-stream li, div#scraps ul.messages-stream li, div#favorites ul.messages-stream li, div#browse ul.messages-stream li, div#search ul.messages-stream li { display:block; float:left; height:390px; margin:8px 5px; padding:0; text-align:center; width:360px; }";
}

if(window.location.pathname.substring(0,11) == "/favorites/"){
var newStyle = "div#gallery ul.messages-stream li, div#scraps ul.messages-stream li, div#favorites ul.messages-stream li, div#browse ul.messages-stream li, div#search ul.messages-stream li { display:block; float:left; height:390px; margin:8px 5px; padding:0; text-align:center; width:360px; }";
}

styleBlock.appendChild(document.createTextNode(newStyle));

document.getElementsByTagName("head")[0].appendChild(styleBlock);



var image_elements = document.getElementsByTagName('img');

for(var i=0; i<image_elements.length; i++) {

	var image_element = image_elements[i];
	if( image_element.src.search("/poetry/") == -1 && image_element.src.search("/music/") 

== -1 && image_element.src.search("/stories/") == -1 ) {
		image_element.src = image_element.src.replace("thumbnail","half");
	}
}
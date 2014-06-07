// ==UserScript==
// @name        Youtube: Video Name Above The Player
// @namespace   title-reformat
// @description Places the title of a youtube video above the player. Works with Youtube centering fix.
// @include     http://www.youtube.com/watch*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     1
// ==/UserScript==

//var vidTitle = $(".yt-uix-expander-head").attr("title");

var titleChunk = $("#watch7-headline").clone();
titleChunk.attr("id", "edlolington-custom-title");
titleChunk.css("border-left", "none");
titleChunk.css("border-right", "none");
titleChunk.css("padding-left", "0px");
titleChunk.css("padding-right", "0px");
titleChunk.css("padding-bottom", "10px");
titleChunk.css("font-size", "1.4em");
//use to match original title font size
//titleChunk.css("font-size", $("#watch7-headline").css("font-size"));
titleChunk.css("letter-spacing", $("#watch7-headline").css("letter-spacing"));

if ($("#watch7-playlist-container").length != 0) {
	$("#watch7-playlist-data").prepend(titleChunk);
}

else {
	$("#watch7-video").prepend(titleChunk);
}

$("#watch7-headline").find("h1").remove();

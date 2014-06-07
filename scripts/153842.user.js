// ==UserScript==
// @name        Youtube: Video Name Above Player
// @namespace   title-reformat
// @description Places the title of a youtube video above the player. Works with Youtube centering fix.
// @include     http://www.youtube.com/watch*
// @include		https://www.youtube.com/watch*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version     1.06
// ==/UserScript==

//var vidTitle = $(".yt-uix-expander-head").attr("title");

var oldStyle = true;

GM_addStyle( "#watch7-video-container { background:none !important; }" );
GM_addStyle( ".watch-branded-banner { background:none !important; }" );
GM_addStyle( ".watch-branded-banner { margin-top:0px !important; }" );
GM_addStyle( ".watch-sidebar { margin-top:0px !important; }" );

if (oldStyle) {
	GM_addStyle( "#eow-title {"+
		"font-size: 19px !important;"+
		"font-weight: bold !important;"+
		"cursor: auto !important;"+
	"}");
}

//alert($("#watch7-headline").length);
var titleChunk = $("#watch7-headline").clone();
//var titleChunk = $("#watch-headline-title").clone();
titleChunk.attr("id", "edlolington-custom-title");
titleChunk.css("border-left", "none");
titleChunk.css("border-right", "none");
//titleChunk.css("padding-left", $("#player").css("padding-left"));
titleChunk.css("padding-right", "0px");
titleChunk.css("padding-bottom", "0px");
titleChunk.css("font-size", "18px");
//use to match original title font size
//titleChunk.css("font-size", $("#watch7-headline").css("font-size"));
titleChunk.css("letter-spacing", $("#watch7-headline").css("letter-spacing"));

/*
if ($("#watch7-playlist-container").length != 0) {
	$("#player").prepend(titleChunk);
}

else {
	$("#player").prepend(titleChunk);
}
*/

if ($("#player-legacy").length != 0) {
	$("#player-legacy").prepend(titleChunk);
}
else
	$("#player").prepend(titleChunk);

$("#watch7-headline").find("h1").remove();
$("#watch7-branded-banner").remove();
$(".player-branded-banner").remove();

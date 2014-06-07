// ==UserScript==
// @name        youtube-side-comments
// @namespace   http://userscripts.org/users/297509
// @description places youtube comments on the right side
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function(){

	if($("#watch-discussion").length) {
		$("#masthead-upload-button-group").append(
			"<a id='hideCommments' class='yt-uix-button yt-uix-button-default' "
			+ "href='javascript: void(0);' style='margin-left:5px;'>User Comments</a>"
		);
		
		$("#body-container").prepend(
			"<div id='yandanyordum' style='position: relative;'>"
			+ "<div id='newComments' style='display:none; padding:5px; position:fixed; right:0; top:50px; z-index:5001; width:470px; height:91%; background:#ffffff; overflow: auto;'>" 
			+ $("#watch-discussion").html() 
			+ "<br/></div></div>"
		);
	}
	
	$("#watch-discussion").remove();
	
    $("#hideCommments").click(function(){
		$("#newComments").toggle();
    });
});
// ==UserScript==
// @name           Holabox Youtube Grabber
// @namespace      yt2hb
// @description    Add videos from youtube to your holabox profile.
// @include        http://youtube.*/*
// @include        http://www.youtube.*/*
// ==/UserScript==

/* Get Video ID */
var GetUri = window.location.href;
var SplitUri = GetUri.split("?");
var VarArray = SplitUri[1].split("&");
var VideoIdArray = VarArray[0].split("=");
var VideoId = VideoIdArray[1];

if(SplitUri[0].indexOf("watch") > 0){
	/* Create Dynamic iFrame */
	var FrameHolder = document.createElement("div");
		FrameHolder.innerHTML = ""
		+ "<iframe style=\"width:100%;height:130px;border:none\" frameborder=\"0\" src=\"http://holabox.com/greasemonkey/yt2hb.php?videoid=" + VideoId + "\">"
		+ "</iframe>";

	/* Add Frame */
	document.body.insertBefore(FrameHolder, document.body.firstChild);
}
// ==UserScript==
// @name           YouTube MP4 Video Download Direct Linker
// @namespace      http://www.digivill.net/~joykillr
// @description    Direct download MP4 Video .  Gives a direct link with resume support to mpeg4 video on YouTube video page. this script use youtubemp4.com for finding mp4 .
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// ==/UserScript==

//v 1.2


var scrhead = document.getElementsByTagName("head")[0].getElementsByTagName("script");

function addBox(strR) {
	var URLDLbox = document.createElement("a");
	URLDLbox.className = "action-button";
	URLDLbox.setAttribute("style", "width:auto !important; color: rgb(0, 51, 204) !important; display: block !important; height: 25px !important; margin-top: 6px !important; margin-left: 1px !important; outline-color: rgb(140, 172, 26) !important; outline-width: 1px !important; visibility: visible !important; float: left !important;");
	URLDLbox.href = strR;
	URLDLbox.id = "GMdownloadButton";
	dlb1 = document.createElement("span");
	dlb1.className = "action-button-leftcap";
	dlb1.setAttribute("style", "vertical-align:");
	URLDLbox.appendChild(dlb1);
	dlb2 = document.createElement("span");
	dlb2.className = "action-button-text";
	dlb2.textContent = "Download";
	dlb2.setAttribute("style", "vertical-align:baseline!important;");
	URLDLbox.appendChild(dlb2);
	dlb3 = document.createElement("span");
	dlb3.className = "action-button-rightcap";
	dlb3.setAttribute("style", "vertical-align:baseline!important;");
	URLDLbox.appendChild(dlb3);
		document.getElementById("search-form").parentNode.insertBefore(URLDLbox,document.getElementById("search-form"));
}

function runIt(a1) {
	a2 = a1.length; a1 = a1[a2-1].textContent.toString();
	a1 = a1.split("var fullscreenUrl =")[1];
	a2 = a1.split("&video_id=")[1].split("&")[0];
	a3 = a1.split("&sk=")[1].split("&")[0];
	a4 = a1.split("&t=")[1].split("&")[0];
//	link to youtubemp4.com to redirect to mp4 direct link;
	aLink = "http:\/\/www.youtubemp4.com/video\/" + a2 + "\.mp4\ ";
	addBox(aLink);
}

if (scrhead!=null&&scrhead!="") {
	runIt(scrhead);
}
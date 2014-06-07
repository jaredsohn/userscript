// ==UserScript==
// @name           PROPER Zootube-viewer
// @namespace      zootube365.com
// @include        http://*zootube365.com/*
// @require        http://code.jquery.com/jquery.min.js
// ==/UserScript==
var processed = new Array();

function pop(url) {
	window.open(decodeURI(url), 'vid', 'height=509,width=640,location=1,resizable=1');
}

function addLinks() {	
	var cur = $(this);
	var src = decodeURI(cur.attr("src"));
	if (jQuery.inArray(encodeURI(src), processed) == -1) {		
		processed.push(encodeURI(src));
	}
	else {		
		return true;
	}

	var imSrc = src.replace(/^http:\/\/[^\/]+\/(.+)\/([^\/]+)\/[^\/]+$/, "http://www.zootube365.com/$1/$2/$2.flv");
	var play = $("<br><a><font size='+2'>Play</font></a>");
	var dl = $("<br><a><font size='+2'>Download</font></a>");

	var temphref = "/swf/nplayer5.swf?styleURL=/swf/player-style-a.css";
	temphref += "&detectFlash=11&autoPlay=1&videoUrl=";
	temphref += encodeURI(imSrc);
	var _a = $(play);
	_a.click(function () {
		pop(encodeURI(temphref).toString());
	});
	_a.attr("href", "javascript:void(0)");
	dl.attr("href", encodeURI(imSrc).toString());


	dl.insertAfter(cur);
	play.insertAfter(cur);

}

function _div() {	
	var img = $(this).find("img");

	img.each(addLinks);
}

$("div.aVideo").each(_div);
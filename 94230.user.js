// ==UserScript==
// @name           HotSpot Ad Shooter     
// @description    Remove HotSpot Shield ad banner.
// @include        http://*
// @include        https://*
// @include        file:*
// @copyright      Genzer Hawker
// @version        1.4
// ==/UserScript==

/*HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
HH  HotSpot Ad Shooter
HH  Version: 1.4
HH  Copyright (c) 2011, Genzer Hawker
HH  Email: genzer.hawker@gmail.com
HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH*/

// It still doesn't work perfectly. Help me to improve it via genzer.hawker@gmail.com. Thanks!

/*zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
Update 1.4: + remove Hotspot Video Ads
Update 1.3: + stop Hotspot Shield redirecting to qbyrd.com (tested on
              Google Chrome(Omibox).
Update 1.2: + added some trick to neutralize hotspot shield popup script.
Update 1.1: + remove the banner faster than v1.0
            + prevent Hotspot Shield search engine when using
				  Google,...
zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz*/

function runscript( script ) {
	window.location = "javascript:" + script;
}

var removeVideo = "_AF$.VIDEORUN = false; var dvc = document.getElementById('dvc'); var video = document.getElementById('AFvideorun'); dvc.removeChild(video);";
var cleanTopBanner = "_AF$.clsBtn(); _AF$.VIDEORUN = false; var _xAF = _AF$; var _xAF2 = _AF2$; _AF$ = 0; _AF2$ = 0;";
var removeStringParser = " String.prototype._AFtoHex = function(){}; String.prototype._AFtoStr = function(){};";

var action = removeVideo + cleanTopBanner + removeStringParser;
				 
runscript( action );

// Prevent Hotspot search redirection
// - This works only on Google Chrome for the time being.
var detectGoogle = new RegExp(/^http:\/\/www.google.com(\/search\?|\/webhp\?|\/firefox\?|\/$).*/gi).exec(unescape(window.location.href));
var searchQuery =new RegExp(/q=[^&]+/).exec(window.location.search);
if( detectGoogle != null ) {
	return
}
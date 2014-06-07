// ==UserScript==
// @name          ZapSpeedTVPreviewBox
// @include       http://www.speedtv.com/*
// @description	  Remove annoying schedule box on SpeedTV articles
// ==/UserScript==
//

var	theDivision;

theDivision	= document.getElementById ('schedulePreview');

if (theDivision) {
	theDivision.style.display = "none";
}

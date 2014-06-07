// ==UserScript==
// @name           TVTid.dk Live
// @namespace      TVTID
// @description    TVTid.dk Live
// @include        http://tvtid.tv2.dk/*
// ==/UserScript==

ONE_HOUR_SECS = 3600;
DEFAULT_CONTENT_WIDTH = 840;
HOURS_PR_PAGE = 4;
PIXELS_TO_MOVE_PR_UPDATE = 1;

var timeIndicator = null;
var delay = 1000;
var start_time;
var start_margin = 0.0;

function getElementByClass(searchClass,node,tag) {
	if ( node == null ) node = document;
	if ( tag == null ) tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	for (i = 0; i < elsLen; i++) {
		if ( els[i].className == searchClass ) {
			return els[i];
		}
	}
	return null;
}


function updateTimeIndicator() {
	if (timeIndicator == null) {
		timeIndicator = getElementByClass("timeIndicator", null, "div");
	}
	if (timeIndicator != null) {
		if (start_margin == 0) {
			start_time = (new Date).getTime() / 1000;
			var tmp_margin = timeIndicator.style.marginLeft;
			start_margin = parseFloat(tmp_margin.substring(0,tmp_margin.length-2));
			delay = HOURS_PR_PAGE * ONE_HOUR_SECS * PIXELS_TO_MOVE_PR_UPDATE / DEFAULT_CONTENT_WIDTH * 1000;
		} 
		var curr_time = (new Date).getTime() / 1000;
		marginLeft = (curr_time - start_time) / (ONE_HOUR_SECS * HOURS_PR_PAGE) * DEFAULT_CONTENT_WIDTH;       
		timeIndicator.style.marginLeft = start_margin+marginLeft+'px';
	}
}
setInterval(updateTimeIndicator, delay );

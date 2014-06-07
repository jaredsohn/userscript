// ==UserScript==
// @name          TweakEngadget
// @description   Tweaks the appearance of Engadget (engadget.com)
// @version       2.1
// @author        shellshock
// @namespace     http://userscripts.org/scripts/show/62584
// @include       http://*.engadget.*
// ==/UserScript==

var showAds = false;
var showHeader = true;
var showCarousel = true;        // on start page beneath header
var showSidebar = false;
var showBodyFullWidth = true;   // if sidebar is 'false', widen content to full width
var showMetaTags = true;        // tags beneath article content
var showSocialButtons = false;
var showGdgtWrapper = false;
var showComments = true;
var showFooter = false;

var modifyTitle = true;
var titleFontfamily = "Arial,Helvetica,sans-serif";
var titleFontSize = "40px";
var titleLetterSpacing = "-1px";

var modifyBody = true;
var bodyFontfamily = "Arial,Helvetica,sans-serif";
var bodyFontSize = "14px";
var bodyFontLineheight = "21px";


function tweakEngadget() {
	
	var css = "";

	if (modifyTitle) { css += "h1, h2, h3, h4 , h5 {font-family:"+ titleFontfamily +" !important} h1.h1, h2.h2 {letter-spacing: "+ titleLetterSpacing +" !important} h1.h1 {font-size:"+ titleFontSize +" !important}"; }
	if (modifyBody) { css += "div.post-body, .byline, .gallery-header {font-family:"+ bodyFontfamily +" !important} div.post-body p {font-size:"+ bodyFontSize +" !important; line-height:"+ bodyFontLineheight +" !important}"; }

	if (!showAds) {	css += ".ad {display:none !important}"; }
	if (!showHeader) { css += "header[role='banner'] {display:none !important}"; }
	if (!showCarousel) { css += "#carousel {display:none !important}"; }
	if (!showSidebar) {
		css += "#rail {display:none !important}";
		if (showBodyFullWidth) { css += "#body {width: 940px !important} article div.post-meta {display:none !important} article  div.post-body {width:900px !important} div.post-body img {margin:auto}"; }
	}
	if (!showMetaTags) { css += "aside.meta-tags {display:none !important}"; }
	if (!showSocialButtons) { css += "aside.meta-social {display:none !important}"; }
	if (!showGdgtWrapper) { css += "#gdgt-wrapper {display:none !important}"; }
	if (!showComments) { css += "#comments {display:none !important}"; }
	if (!showFooter) { css += "#footer {display:none !important}"; }
	
	GM_addStyle(css);

};

tweakEngadget();
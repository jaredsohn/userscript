// ==UserScript==
// @name          TweakWPcentral
// @description   Tweaks the appearance of WPcentral (wpcentral.com)
// @version       1.0
// @author        shellshock
// @namespace     http://userscripts.org/scripts/show/99538
// @include       http://*.wpcentral.*
// ==/UserScript==

var showAds = false;
var showMobNatHeader = false;
var showMosaic = false;         // on start page beneath header
var showSidebar = false;
var showBodyFullWidth = true;   // if sidebar is 'false', widen content to full width
var showArticleFooter = false;
var showSocialButtons = false;
var showStoryNav = false;
var showMoreFrom = false;
var showComments = true;
var showNext10 = false;
var showFooter = false;

function tweakWPcentral() {
	
	var css = "";

	if (!showAds) {	css += ".top-ad, #block-block-1, .region-footer, #ads-by-google-holder {display:none !important}"; }
	if (!showMobNatHeader) { css += "#mn_bar_wrapper{display:none !important}"; }
	if (!showMosaic) { css += "#block-custom-content-featured {display:none !important}"; }
	if (!showSidebar) {
		css += "#sidebar {display:none !important}";
		if (showBodyFullWidth) { css += "#content-wrap {width: 1020px !important} .headline-top {text-align:center !important}"; }
	}
	if (!showArticleFooter) { css += ".article-footer {display:none !important}"; }
	if (!showSocialButtons) { css += ".article-social-actions, .spe-share-wrap {display:none !important}"; }
	if (!showStoryNav) { css += ".other-stories {display:none !important}"; }
	if (!showMoreFrom) { css += ".OUTBRAIN {display:none !important}"; }
	if (!showComments) { css += "#comments {display:none !important}"; }
	if (!showNext10) { css += ".prev-article-summaries {display:none !important}"; }
	if (!showFooter) { css += "#mbnf {display:none !important}"; }
	
	GM_addStyle(css);

};

tweakWPcentral();
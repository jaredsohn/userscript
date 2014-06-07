// ==UserScript==
// @id             www.youtube.com-649f41c2-58fc-4016-b685-e907377615c5@artyfishl.com
// @name           YouTube Layout Reloaded
// @version        1.0.1
// @namespace      artyfishl.com
// @author         ArtyFishL
// @description    Makes YouTube nicer to look at and use
// @icon           http://artyfishl.com/images/ytlrIcon32.png
// @run-at         document-end
// @downloadURL    https://userscripts.org/scripts/source/176306.user.js
// @updateURL      https://userscripts.org/scripts/source/176306.meta.js
// @resource       extraGuideCss    http://s.ytimg.com/yts/cssbin/www-home-c4-vfl5DqO9L.css
// @include        *.youtube.*/watch?*
// @include        *.youtube.com/
// @include        *.youtube.tld/
// @include        *.youtube.com/?*
// @include        *.youtube.tld/?*
// @include        *.youtube.*/upload
// @include        *.youtube.*/dashboard
// @include        *.youtube.*/my_videos*
// @include        *.youtube.*/view_all_playlists
// @include        *.youtube.*/tags
// @include        *.youtube.*/my_videos_copyright
// @include        *.youtube.*/my_search_history
// @include        *.youtube.*/my_favorites
// @include        *.youtube.*/my_liked_videos
// @include        *.youtube.*/account_features
// @include        *.youtube.*/account_monetization
// @include        *.youtube.*/account_defaults
// @include        *.youtube.*/account_featured_programming
// @include        *.youtube.*/account_channel_advanced
// @include        *.youtube.*/analytics?*
// @include        *.youtube.*/inbox
// @include        *.youtube.*/inbox#*
// @include        *.youtube.*/account
// @include        *.youtube.*/account?*
// @include        *.youtube.*/account_sharing
// @include        *.youtube.*/account_privacy
// @include        *.youtube.*/account_notifications
// @include        *.youtube.*/account_playback
// @include        *.youtube.*/editor*
// @include        *.youtube.*/feed/*
// @include        *.youtube.*/user/*
// @include        *.youtube.*/channel/*
// @include        *.youtube.*/results?*
// @include        *.youtube.*/videos
// @include        *.youtube.*/channels
// @include        *.youtube.*/music
// @include        *.youtube.*/testtube
// @include        *.youtube.*/t/*
// @include        *.youtube.*/terms*
// @exclude        http://*.youtube.*/embed/*
// @exclude        https://*.youtube.*/embed/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_registerMenuCommand
// @grant          GM_getResourceText
// ==/UserScript==

/*
YouTube Layout Reloaded
UserScript version

Tries to improve the constantly worsening YouTube layout.

Version: 1.0.1
Updated on: 22 Aug 2013

by ArtyFishL
artyfishl.com or artyfl.tk
Created: 14 Jul 2013
First Published: 22 Aug 2013

This is new version of YouTube Layout Fix (now obsolete):
	https://userscripts.org/153751
*/


/* NEW PROTOTYPE FUNCTIONS */

function addPrototypeFunctions() {

	// str.startsWith
	if (typeof String.prototype.startsWith != 'function') {
	  String.prototype.startsWith = function (str){
		return this.slice(0, str.length) == str;
	  };
	}

	// str.endsWith
	if (typeof String.prototype.endsWith != 'function') {
	  String.prototype.endsWith = function (str){
		return this.slice(-str.length) == str;
	  };
	}

}

// Setup saving for Google Chrome
// http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
if (!this.GM_registerMenuCommand || (this.GM_registerMenuCommand.toString && this.GM_registerMenuCommand.toString().indexOf("not supported")>-1)) {
	this.GM_registerMenuCommand=function (name,funct,key) {};
}



/* URL */

// gets which part of youtube we are on
function getCurrentPage() {
	var url = document.URL;
	if(/(.*?)\.youtube\.(.*?)\/watch\?(.*?)/.test(url)) {
		return "watch";
	} else if(/(.*?)\.youtube\.(.*?)\/upload$/.test(url)) {
		return "upload";
	} else if(/(.*?)\.youtube\.(.*?)\/dashboard$/.test(url)) {
		return "dashboard";
	} else if(/(.*?)\.youtube\.(.*?)\/user\/.{1,}/.test(url)) {
		return "user";
	} else if(/(.*?)\.youtube\.(.*?)\/channel\/.{1,}/.test(url)) {
		return "channel";
	} else if(/(.*?)\.youtube\.(.*?)\/results\?(.*?)/.test(url)) {
		return "results";
	} else if(/(.*?)\.youtube\.(.*?)\/videos$/.test(url) ||
			/(.*?)\.youtube\.(.*?)\/channels$/.test(url) ||
			/(.*?)\.youtube\.(.*?)\/music$/.test(url) ||
			/(.*?)\.youtube\.(.*?)\/shows$/.test(url) ) {
		return "special";
	} else if(/(.*?)\.youtube\.[^\/]{2,6}\/?$/.test(url) || 
			/(.*?)\.youtube\.[^\/]{2,6}\/\?[^\/]*/.test(url) ||
			/(.*?)\.youtube\.[^\/]{2,6}\/feed\/[^\/]*/.test(url) ) {
		return "home";
	} else {
		return "other";
	}
}

// returns true if the page already has the guide
function hasGuideByDefault() {
	var page = getCurrentPage()
	var validPages = ["home", "watch", "user", "channel", "results", "special"];
	return validPages.indexOf(page) !== -1;
}

// redirects home page to subscriptions if need be
function redirectHomeSubsPage() {
	// if enabled
	if(g_redirectSubs === "true") {
		// if on strict home page
		if(getCurrentPage() === "home" && document.URL.indexOf("feed") === -1) {
			// if didn't just come from my subscriptions
			if(!/(.*?)\.youtube\.[^\/]{2,6}\/feed\/subscriptions/.test(document.referrer))
				// do redirect
				window.location.replace("/feed/subscriptions");
		}
	}
}


/* SCRIPT UI */

function doScriptUISetup() {
	GM_registerMenuCommand("Reset YTLR Config", function() {ytlrConfigReset()}, "r");
}


/* SAVING AND LOADING */

var g_scriptType = "userscript";

var g_defaultBgColor = "#808080";
var g_defaultRedirectSubs = "false";
var g_defaultGuideExtraPages = "true";
var g_defaultModInterval = "250";
var g_defaultGuideExpanded = "false";

var g_bgColor = g_defaultBgColor;
var g_redirectSubs = g_defaultRedirectSubs;
var g_guideExtraPages = g_defaultGuideExtraPages;
var g_modInterval = g_defaultModInterval;
var g_guideExpanded = g_defaultGuideExpanded;

var g_intervalId = "";

function saveData(key, value) {
	if (g_scriptType === "userscript") {
		GM_setValue(key, value);
	}
}

function loadData(key, defaultVal) {
	if (g_scriptType === "userscript") {
		return GM_getValue(key, defaultVal);
	}
	return null;
}

function saveSettingsNow() {
	saveData("ytlrBgColor", g_bgColor);
	saveData("ytlrRedirectSubs", g_redirectSubs);
	saveData("ytlrGuideExtraPages", g_guideExtraPages);
	saveData("ytlrModInterval", g_modInterval);
	saveData("ytlrGuideExpanded", g_guideExpanded);
}

function loadSettingsNow() {
	g_bgColor = loadData("ytlrBgColor", g_defaultBgColor);
	g_redirectSubs = loadData("ytlrRedirectSubs", g_defaultRedirectSubs);
	g_guideExtraPages = loadData("ytlrGuideExtraPages", g_defaultGuideExtraPages);
	g_modInterval = loadData("ytlrModInterval", g_defaultModInterval);
	g_guideExpanded = loadData("ytlrGuideExpanded", g_defaultGuideExpanded);
}


/* PAGE SETUP */

function doStyleSheetSetup() {
	// styles for stuff this adds
	var ytlrSheet = "\
		body {												\
			background-color: " + g_bgColor + ";			\
		}													\
															\
		div#ytlrTopDiv { 									\
			background-color: " + g_bgColor + ";			\
			width: 100%; 									\
			height: auto; 									\
			overflow: visible; 								\
			display: block; 								\
			position: absolute; 							\
			left: 0; 										\
			top: 0; 										\
		} 													\
															\
		div#ytlrContent { 									\
			background-color: white; 						\
			width: 90%; 									\
			max-width: 1150px;								\
			height: auto;									\
			position: relative; 							\
			margin-top: 10px;								\
			margin-bottom: 100px;							\
			margin-left: auto;								\
			margin-right: auto;								\
			min-height: 50%; 								\
			z-index: 20;									\
			overflow-x: hidden;								\
			oveflow-y: visible;								\
		} 													\
															\
		div#ytlrSideClearance {								\
			margin-left: 0px;								\
			margin-top: 0px;								\
			margin-bottom: 0px;								\
			margin-right: auto;								\
			display: none;									\
			width: 0px;										\
			height: 100%;									\
			z-index: 20;									\
		} 													\
															\
		div#ytlrSideClearance.inUse {						\
			display: block;									\
			width: auto;									\
			min-width: 200px;								\
		} 													\
															\
		div#ytlrTopBar { 									\
			background-color: rgb(241, 241, 241); 			\
			padding: 5px;									\
			z-index: 30;									\
		} 													\
															\
		div#ytlrTopBar:hover div#ytlrLinkBar { 				\
			display: block; 								\
		} 													\
															\
		div#ytlrLinkBarContainer { 							\
			height: auto;									\
			overflow: visible; 								\
			padding: 0px;									\
			z-index: 40;									\
		} 													\
															\
		div#ytlrLinkBar { 									\
			display: none;									\
			background-color: rgb(241, 241, 241); 			\
			border: 1px solid rgb(221, 221, 221);			\
			padding: 5px;									\
			margin-top: 5px;								\
			margin-bottom: -5px;							\
			z-index: 50;									\
			height: auto;									\
			width: calc(100% - 10px);						\
		} 													\
															\
		div#ytlrFooter { 									\
			background-color: rgb(241, 241, 241); 			\
			padding: 5px;									\
			z-index: 25;									\
			margin-top: 20px;								\
			height: 55px;									\
			overflow: hidden;								\
		} 													\
															\
		div#ytlrFooter:hover { 								\
			height: auto;									\
		} 													\
															\
		div#ytlrPageContent { 								\
			margin-top: 10px;								\
			margin-bottom: 10px;							\
			margin-left: auto;								\
			margin-right: auto;								\
			padding: 5px;									\
			z-index: 30;									\
		} 													\
															\
		span.ytlrRealName {									\
			color: #999999;									\
			margin-left: 9px;								\
			text-decoration: none;							\
			font-weight: normal;							\
		}													\
															\
		li.comment:hover .ytlrRealName {					\
			color: black;									\
		}													\
															\
		span.ytlrRealNameGP {								\
			color: #CCCCCC;									\
			margin-left: 9px;								\
			text-decoration: none;							\
			font-size: 11px;								\
		}													\
															\
		li.comment:hover .ytlrRealNameGP {					\
			color: #999999;									\
		}													\
															\
		div.ytlrBottomButton {								\
			background-color: white;						\
			color: #666666;									\
			border: 1px solid #DADADA;						\
			border-radius: 2px;								\
			font-weight: bold;								\
			display: block;									\
			position: fixed;								\
			left: 10px;										\
			right: auto;									\
			bottom: 10px;									\
			padding: 10px;									\
			cursor: pointer;								\
			z-index: 99;									\
			vertical-align: middle;							\
			max-height: 90%;								\
		}													\
															\
		div.ytlrBottomButton.right {						\
			left: auto;										\
			right: 10px;									\
			bottom: 10px;									\
		}													\
															\
		div.ytlrBottomButton:hover {						\
			color: black;									\
			border: 1px solid #C9C9C9;						\
			cursor: auto;									\
		}													\
															\
		div.ytlrBottomButton.expand {						\
			background-color: #F1F1F1;						\
			border: 1px solid #DADADA;						\
			top: 10px;										\
			left: 10px;										\
			bottom: auto;									\
			right: auto;									\
			z-index: 10;									\
			overflow-y: hidden;								\
		}													\
															\
		div.ytlrBottomButton.expand:hover {					\
			z-index: 98;									\
		}													\
															\
		div.ytlrBottomButton span {							\
			line-height: 18px;								\
			vertical-align: middle;							\
		}													\
															\
		div.ytlrBottomButton #ytlrGuideContainer,#ytlrConfigContainer {	\
			display: none;									\
			width: 0px;										\
			height: 0px;									\
		}													\
															\
		div.ytlrBottomButton:hover #ytlrGuideContainer, 	\
		div.ytlrBottomButton.expand #ytlrGuideContainer	{	\
			display: block;									\
			width: auto;									\
			height: auto;									\
			overflow-y: auto;								\
			overflow-x: hidden;								\
		}													\
															\
		div.ytlrBottomButton:hover #ytlrConfigContainer {	\
			display: block;									\
			width: auto;									\
			height: auto;									\
			margin-top: 2px;								\
			padding-top: 5px;								\
			border-top: 2px solid #E6E6E6;					\
		}													\
															\
		div.ytlrBottomButton #ytlrConfigContainer hr {		\
			height: 2px;									\
			background-color: #E2E2E2;						\
			display: block;									\
			margin-top: 10px;								\
			margin-bottom: 5px;								\
		}													\
															\
		div.ytlrBottomButton #ytlrConfigContainer p {		\
			display: block;									\
			margin-top: 10px;								\
			margin-bottom: 3px;								\
			font-weight: bold;								\
			color: #333333;									\
		}													\
															\
		div.ytlrBottomButton #ytlrConfigContainer input {	\
			display: block;									\
			background-color: white;						\
			margin-bottom: 5px;								\
			border: 1px solid #CCCCCC;						\
			vertical-align: middle;							\
		}													\
															\
		div.ytlrBottomButton #ytlrConfigContainer input[type='text'] { \
			width: 100%;									\
		}													\
															\
		div.ytlrBottomButton #ytlrConfigContainer input[type='number'] { \
			width: 100%;									\
		}													\
															\
		div.ytlrBottomButton #ytlrConfigContainer input[type='checkbox'] { \
			display: inline-block;							\
			border: none;									\
		}													\
															\
		div.ytlrBottomButton #ytlrConfigContainer label {	\
			display: inline-block;								\
			font-weight: normal;							\
		}													\
																	\
		div.ytlrBottomButton #ytlrConfigContainer input[type='button'] { \
			margin-top: 15px;								\
			cursor: pointer;								\
		}													\
															\
		div.ytlrBottomButton #ytlrConfigContainer input:hover { \
			border: 1px solid #B9B9B9;						\
		}													\
															\
		div.ytlrBottomButton #ytlrConfigContainer input[type='checkbox']:hover { \
			border: none;						\
		}													\
															\
		div.ytlrBottomButton #ytlrConfigContainer input:focus { \
			border: 1px solid rgb(39, 147, 230);			\
		}													\
		div.ytlrBottomButton #ytlrConfigContainer input[type='checkbox']:focus { \
			border: none;			\
		}													\
															\
		div.ytlrBottomButton #ytlrConfigContainer span {	\
			font-weight: normal;							\
			padding-top: 10px;								\
			color: rgb(153, 153, 153);						\
		}													\
															\
		img.ytlrConfigGear {								\
			width: 17px;									\
			height: 17px;									\
			margin-left: 7px;								\
			float: right;									\
			display: inline-block;							\
			background: url('http://www.google.com/images/nav_logo132.png') no-repeat scroll 0% 0% transparent; \
			background-position: -42px -259px;				\
			vertical-align: middle;							\
			opacity: 0.5;									\
		}													\
															\
		div.ytlrBottomButton:hover img.ytlrConfigGear {		\
			opacity: 1;										\
		}													\
															\
		img.ytlrGuideLogo {									\
			width: 18px;									\
			height: 18px;									\
			margin-right: 7px;								\
			float: left;									\
			display: inline-block;							\
			background: url('//s.ytimg.com/yts/imgbin/www-hitchhiker-2x-vfl1lQf_a.png') no-repeat scroll -93px -125px / 239px auto transparent; \
			vertical-align: middle;							\
			opacity: 0.5;									\
		}													\
															\
		div.ytlrBottomButton:hover img.ytlrGuideLogo {		\
			opacity: 1;										\
		}													\
															\
		img.ytlrGuideExpand {								\
			display: none;									\
			width: 0px;										\
			height: 0px;									\
			transform:rotate(-90deg);						\
			-ms-transform:rotate(-90deg);					\
			-webkit-transform:rotate(-90deg);				\
		}													\
															\
		div.ytlrBottomButton:hover img.ytlrGuideExpand {	\
			width: 17px;									\
			height: 17px;									\
			margin-left: 7px;								\
			float: right;									\
			display: inline-block;							\
			background: url('http://www.google.com/images/nav_logo132.png') no-repeat scroll 0% 0% transparent; \
			background-position: 0px -258px;				\
			vertical-align: middle;							\
			opacity: 0.5;									\
			cursor: pointer;								\
		}													\
															\
		img.ytlrGuideExpand:hover {							\
			opacity: 1 !important;							\
		}													\
															\
		#ytlrGuideExpandButton.lockHome,					\
			#ytlrGuideExpandButton.lockHome:hover {			\
				background: url('//s.ytimg.com/yts/imgbin/www-hitchhiker-2x-vfl1lQf_a.png') no-repeat scroll 0% 0% transparent; 	\
				background-position: -117px -152px !important;																		\
				transform:rotate(0deg);						\
				-ms-transform:rotate(0deg);					\
				-webkit-transform:rotate(0deg);				\
				opacity: 0.5;								\
			}												\
															\
		img.ytlrGuideShrink {								\
			background-position: 0px -273px !important;		\
		}													\
															\
		#ytlrGuideLoadingIFrame {							\
			display: none;									\
		}													\
															\
	";
	// modifications of existing youtube styles
	var overrideSheet = "\
															\
		.site-left-aligned.guide-enabled #player, 			\
		.site-left-aligned.guide-enabled #watch7-main-container,	\
		.site-left-aligned.guide-enabled #player-legacy {	\
			padding-left: 0px;								\
		}													\
															\
		.site-left-aligned.guide-enabled #content {			\
			margin-left: 0px;								\
		}													\
															\
		.yt-uix-button-subscribe-branded, 					\
		.yt-uix-button-subscribe-branded[disabled],			\
		.yt-uix-button-subscribe-branded[disabled]:hover,	\
		.yt-uix-button-subscribe-branded[disabled]:active,	\
		.yt-uix-button-subscribe-branded[disabled]:focus {	\
			background: none repeat scroll 0% 0% rgb(169, 56, 46); \
		}													\
															\
		li.guide-channel:hover {							\
			background-color: #555;							\
			color: white;									\
		}													\
															\
		li.guide-channel:hover .guide-item {				\
			color: white;									\
		}													\
															\
		div#footer {										\
			margin-left: 0px !important;					\
		}													\
															\
		div#yt-admin, .ytg-box.account-page {				\
			margin-left: 30px;								\
		}													\
															\
		div#yt-admin-sidebar-hh {							\
			background-color: white;						\
			border-left: 20px solid white;					\
			border-bottom: 20px solid white;				\
			margin-left: -20px;								\
		}													\
															\
		div#masthead-subnav {								\
			overflow: visible;								\
		}													\
															\
		.site-left-aligned #masthead-subnav {				\
			margin-left: 0px !important;					\
		}													\
															\
		div#masthead-subnav ul {							\
			background-color: inherit;						\
			width: 120%;									\
		}													\
															\
	";
	
	// page specific sheets
	extraSheet = "";
	
	// pages that don't support guide (by default)
	if(!hasGuideByDefault()) {
		// check if should add guide
		if(g_guideExtraPages !== "true") {
			// remove guide button
			extraSheet += "\
				div.ytlrBottomButton:not(.right) {	\
					display: none;								\
				}												\
			";
		} else {
			// add extra styles to include guide
			if(!this.GM_getResourceText || (this.GM_getResourceText.toString && this.GM_getResourceText.toString().indexOf("not supported")>-1)) {
				// GM resource not supported, use style tag
				var ss = document.createElement("link");
				ss.type = "text/css";
				ss.rel = "stylesheet";
				ss.href = "http://s.ytimg.com/yts/cssbin/www-home-c4-vfl5DqO9L.css";
				document.getElementsByTagName("head")[0].appendChild(ss);
			} else {
				// Use GM resource
				var extraGuideCss = GM_getResourceText("extraGuideCss");
				extraSheet += extraGuideCss;
			}
		}
	}
	
	var cssDiv = document.createElement('div');
    cssDiv.innerHTML = '<style type="text/css">' + overrideSheet + ytlrSheet + extraSheet + '</style>';
	document.body.appendChild(cssDiv);
}

function doPageSetup() {
	
	// hide normal content
	var nodes = document.body.childNodes;
	for (var i=0; i < nodes.length; i++) {
		if (nodes[i] && nodes[i].tagName && ["div", "iframe", "table"].indexOf( nodes[i].tagName.toLowerCase() ) != -1)
			nodes[i].style.display = "none";
	}
	
	// add new css to page
	doStyleSheetSetup();
	
	// add new content div
	var contentDiv = document.createElement('div');
	var name = getAccountName();
	var content = '\
		<div id="ytlrSideClearance">					\
		</div>											\
		<div id="ytlrContent"> 							\
			<div id="ytlrTopBar">						\
				<div id="ytlrLinkBarContainer"> </div>	\
			</div> 										\
			<div id="ytlrPageContent">					\
			</div>										\
			<div id="ytlrFooter">						\
			</div>										\
		</div> 											\
		<div class="ytlrBottomButton">					\
			<img class="ytlrGuideLogo" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="" title=""> \
			<span unselectable="on">Guide</span>		\
			<img id="ytlrGuideExpandButton" class="ytlrGuideExpand" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="" title=""> \
			<div id="ytlrGuideContainer"></div>			\
		</div>											\
		<div class="ytlrBottomButton right">			\
			<span unselectable="on">YTLR</span>			\
			<img class="ytlrConfigGear" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="" title=""> \
			<div id="ytlrConfigContainer">				\
				<p> Background Color: </p>																		\
				<input type="text" id="ytlrBgColor" required"></input>											\
				<p> Home Page to Subscriptions: </p>															\
				<label><input type="checkbox" id="ytlrRedirectMySubs" /> Enable redirect? </label>				\
				<p> Guide on Extra Pages: </p>																	\
				<label><input type="checkbox" id="ytlrGuideExtraPages" /> Enabled? </label>						\
				<p> Page Modification Interval (ms): </p>														\
				<input type="number" id="ytlrModTime" min="10" max="2000" step="50" value="250" required /> 	\
				<input type="button" id="ytlrResetButton" value="Reset" />										\
				<hr>									\
				<span>									\
					YouTube Layout Reloaded <br/>		\
					by <a href="http://artyfishl.com" class="yt-uix-sessionlink" target="_blank"> ArtyFishL </a> <br/>	\
				</span>									\
			</div>										\
		</div>											\
	';
	contentDiv.innerHTML = content;
	contentDiv.id = "ytlrTopDiv";
	document.body.appendChild(contentDiv);
	
	// hover link bar
	var linkBarContainerContent = '\
		<div id="ytlrLinkBar">										\
			<span class="yt-uix-button-group">						\
				<a class="yt-uix-button start yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" href="/"> Home </a>								\
				<a class="yt-uix-button start yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" href="/feed/subscriptions"> Subscriptions </a>	\
				<a class="yt-uix-button start yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" href="/videos"> Videos </a>						\
				<a class="yt-uix-button start yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" href="/shows"> Shows </a>						\
				<a class="yt-uix-button start yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" href="/channels"> Channels </a>					\
			</span>													\
	';
	// user account buttons on right
	// only if signed in
	if (isUserSignedIn()) {
		linkBarContainerContent += '\
				<span class="yt-uix-button-group" style="float:right">	\
					<b> ' + name + ' </b> &nbsp;						\
					<a class="yt-uix-button start yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" href="/feed/watch_later"> Watch Later </a>						\
					<a class="yt-uix-button start yt-uix-sessionlink yt-uix-button-default yt-uix-button-size-default" href="/feed/playlists"> Playlists </a>						\
					<button type="button" class="end flip yt-uix-button yt-uix-button-default yt-uix-button-size-default yt-uix-button-empty"><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"></button>\
				</span>													\
		';
	}
	// make bar full (make hover work on all)
	linkBarContainerContent += '<div style="width:100%;height:100%"></div>';
	// end link bar
	linkBarContainerContent += '</div>';
	document.getElementById("ytlrLinkBarContainer").innerHTML = linkBarContainerContent;
	
	// steal content
	var ytTopBar = getDefaultTopBar();
	var accountBar = getAccountBar();
	var ytHeaderBar = getDefaultHeaderBar();
	var ytPlayer = getPlayerDiv();
	var ytMainContent = getDefaultMainContent();
	var ytFooter = getDefaultFooter();
	
	// add stolen content
	var linkBarCont = document.getElementById("ytlrLinkBarContainer");
	document.getElementById("ytlrTopBar").insertBefore(ytTopBar, linkBarCont);
	if (isUserSignedIn())
		document.getElementById("ytlrLinkBar").appendChild(accountBar);
	if (ytHeaderBar != null)
		document.getElementById("ytlrPageContent").appendChild(ytHeaderBar);
	if (ytPlayer != null)
		document.getElementById("ytlrPageContent").appendChild(ytPlayer);
	document.getElementById("ytlrPageContent").appendChild(ytMainContent);
	document.getElementById("ytlrFooter").appendChild(ytFooter);
	
	// set up settings values
	document.getElementById("ytlrBgColor").value = g_bgColor;
	document.getElementById("ytlrRedirectMySubs").checked = (g_redirectSubs === "true");
	document.getElementById("ytlrGuideExtraPages").checked = (g_guideExtraPages === "true");
	document.getElementById("ytlrModTime").value = g_modInterval;
	
	// expand or shrink guide as required
	expandShrinkGuideOnPageLoad();
	
	// add guide to pages that dont support it
	if(!hasGuideByDefault() && g_guideExtraPages === "true") {
		var guideLoadingDiv = document.createElement('div');
		guideLoadingDiv.innerHTML = 
			'<iframe id="ytlrGuideLoadingIFrame" src="/"></iframe>';
		guideLoadingDiv.id = "ytlrGuideLoadingDiv";
		document.body.appendChild(guideLoadingDiv);
	}
	
}


/* PAGE MODIFICATION */

// expand or shrink guide as required
function expandShrinkGuideOnPageLoad() {
	var expandButton = document.getElementById("ytlrGuideExpandButton");
	if(getCurrentPage() === "home") {
		// home page lock guide expanded
		expandGuide();
		// add tooltip saying guide is locked on home page
		expandButton.title = "The guide is locked open on the Home page";
		expandButton.className = "ytlrGuideExpand lockHome";
	} else {
		// use saved value
		if(g_guideExpanded === "true") {
			expandGuide();
		} else {
			shrinkGuide();
		}
		// fix button if need be
		expandButton.title = "Toggle guide locked open";
	}
}

function addActualUsernames() {
	// get each author span element
	var ytMainContent = getDefaultMainContent();
	var authors = ytMainContent.getElementsByClassName("author");
	
	// loop through them all
	for (var i=0; i<authors.length; i++) {
		var as = authors[i];
		
		// check if not already modified
		if (as.getElementsByClassName("ytlrRealName").length +
				as.getElementsByClassName("ytlrRealNameGP").length > 0) {
			continue;
		}		
		
		var link = as.getElementsByTagName("a")[0];
		// get display and account names and compare
		var name = link.innerHTML.trim();
		var anps = link.href.trim().split("/");
		var accountName = anps[anps.length-1];
		if (name.toLowerCase() !== accountName.toLowerCase()) {
			
			// add real name element
			var rne = document.createElement("span");
			if (!accountName.startsWith("UC")) {
				// nice YouTube user
				rne.className = "ytlrRealName";
			} else {
				// G+ YouTube user
				rne.className = "ytlrRealNameGP";
			}
			rne.innerHTML = "(" + accountName + ")";
			as.appendChild(rne);
		}	
		
	}
}

function newGuideButtonClicked() {
	// first check if already loaded
	if (document.getElementsByClassName("guide-section").length < 1) {
		// show loading text
		var newGuideButton = document.getElementById("ytlrGuideContainer").parentNode;
		var textElement = newGuideButton.getElementsByTagName("span")[0];
		textElement.innerHTML = "Loading...";
		
		// start loading the guide
		var guideBox = document.getElementById("guide-main");
		if(guideBox != null)
			guideBox.click();
	}
}

function repositionLoadedGuide() {
	// first check if actually loaded
	var guideElement;
	var guideLoadingFrame = document.getElementById("ytlrGuideLoadingIFrame");
	
	if (document.getElementsByClassName("guide-section").length > 1) {
		// add guide contents to new container
		guideElement = document.getElementsByClassName("guide-toplevel")[0];
	
	} else if (guideLoadingFrame != null) {
		var innerDoc = guideLoadingFrame.contentDocument || guideLoadingFrame.contentWindow.document;
		if(innerDoc != null) {
			if (innerDoc.getElementsByClassName("guide-section").length > 1) {
				guideElement = innerDoc.getElementsByClassName("guide-toplevel")[0];
				
			} else
				return;
		} else
			return;
	} else
		return;
	
	var newGuideContainer = document.getElementById("ytlrGuideContainer");
	// only if not already there
	if (guideElement.parentNode != newGuideContainer) {
		newGuideContainer.appendChild(guideElement);
	}
	
	// Change loading text back to normal
	var textElement = newGuideContainer.parentNode.getElementsByTagName("span")[0];
	textElement.innerHTML = "Guide";
	
}

function bgColorInputChange() {
	var bgColorInput = document.getElementById("ytlrBgColor");
	g_bgColor = bgColorInput.value.toString();
	document.getElementById("ytlrTopDiv").style.backgroundColor = g_bgColor;
	document.body.style.backgroundColor = g_bgColor;
	saveSettingsNow();
}

function redirectSubsInputChange() {
	var redirectSubsInput = document.getElementById("ytlrRedirectMySubs");
	if (redirectSubsInput.checked === true) {
		g_redirectSubs = "true";
	} else {
		g_redirectSubs = "false";
	}
	saveSettingsNow();
}

function guideExtraPagesInputChange() {
	var guideExtraPagesInput = document.getElementById("ytlrGuideExtraPages");
	if (guideExtraPagesInput.checked === true) {
		g_guideExtraPages = "true";
	} else {
		g_guideExtraPages = "false";
	}
	saveSettingsNow();
}

function modIntervalInputChange() {
	var modIntervalInput = document.getElementById("ytlrModTime");
	g_modInterval = modIntervalInput.value.toString();
	window.clearInterval(g_intervalId);
	window.setInterval(intervalUpdate, parseInt(g_modInterval));
	saveSettingsNow();
}

function ytlrConfigReset() {
	var bgColorInput = document.getElementById("ytlrBgColor");
	var redirectSubsInput = document.getElementById("ytlrRedirectMySubs");
	var guideExtraPagesInput = document.getElementById("ytlrGuideExtraPages");
	var modIntervalInput = document.getElementById("ytlrModTime");
	
	bgColorInput.value = g_defaultBgColor;
	redirectSubsInput.checked = (g_defaultRedirectSubs === "true");
	guideExtraPagesInput.checked = (g_defaultGuideExtraPages === "true");
	modIntervalInput.value = g_defaultModInterval;
	
	bgColorInputChange();
	redirectSubsInputChange();
	guideExtraPagesInputChange();
	modIntervalInputChange();
	
}

function expandShrinkGuide() {
	var expandButton = document.getElementById("ytlrGuideExpandButton");
	if(getCurrentPage() !== "home") {
		if(expandButton.className === "ytlrGuideExpand") {
			// expand it
			g_guideExpanded = "true";
			expandGuide();
		} else {
			// shrink it
			g_guideExpanded = "false";
			shrinkGuide();
		}
		saveSettingsNow();
	} else {
		alert(expandButton.title);
	}
}

function expandGuide() {
	var expandButton = document.getElementById("ytlrGuideExpandButton");
	var newGuideButton = document.getElementById("ytlrGuideContainer").parentNode;
	var sideDiv = document.getElementById("ytlrSideClearance");
	expandButton.className = "ytlrGuideExpand ytlrGuideShrink";
	newGuideButton.className = "ytlrBottomButton expand";
	sideDiv.className = "inUse";
}

function shrinkGuide() {
	var expandButton = document.getElementById("ytlrGuideExpandButton");
	var newGuideButton = document.getElementById("ytlrGuideContainer").parentNode;
	var sideDiv = document.getElementById("ytlrSideClearance");
	expandButton.className = "ytlrGuideExpand";
	newGuideButton.className = "ytlrBottomButton";
	sideDiv.className = "";
}


/* EVENTS */

var overTopBar = false;
var overLinkBar = false;

function addEvents() {
	// attach guide click to new guide box
	var newGuideButton = document.getElementById("ytlrGuideContainer").parentNode;
	newGuideButton.addEventListener("click", newGuideButtonClicked, false);
	newGuideButton.addEventListener("mouseenter", newGuideButtonClicked, false);
	
	// guide expand button event
	var expandButton = document.getElementById("ytlrGuideExpandButton");
	expandButton.addEventListener("click", expandShrinkGuide, false);
	
	// config box events
	var bgColorInput = document.getElementById("ytlrBgColor");
	var redirectSubsInput = document.getElementById("ytlrRedirectMySubs");
	var guideExtraPagesInput = document.getElementById("ytlrGuideExtraPages");
	var modIntervalInput = document.getElementById("ytlrModTime");
	var resetButton = document.getElementById("ytlrResetButton");
	
	bgColorInput.addEventListener("keyup", bgColorInputChange, false);
	redirectSubsInput.addEventListener("change", redirectSubsInputChange, false);
	guideExtraPagesInput.addEventListener("change", guideExtraPagesInputChange, false);
	modIntervalInput.addEventListener("keyup", modIntervalInputChange, false);
	resetButton.addEventListener("click", ytlrConfigReset, false);
	
}

function intervalUpdate() {
	addActualUsernames();
	expandShrinkGuideOnPageLoad();
	repositionLoadedGuide();

}


/* CONTENT STEALING */

function getDefaultTopBar() {
	return document.getElementById("yt-masthead");
}

function getAccountBar() {
	var cont = document.getElementById("masthead-expanded-container");
	if(cont != null)
		cont.style.borderBottom = "none";
	return document.getElementById("masthead-expanded");
}

function getDefaultMainContent() {
	return document.getElementById("content");
}

function getPlayerDiv() {
	return document.getElementById("player");
}

function getDefaultHeaderBar() {
	return document.getElementById("masthead-subnav");
}

function getDefaultFooter() {
	return document.getElementById("footer");
}


/* DATA STEALING */

function isUserSignedIn() {
	return !document.getElementById("yt-masthead-signin");
}

function getAccountName() {
	var nameElement = document.getElementById("masthead-expanded-menu-account-info");
	if (nameElement)
		return nameElement.getElementsByTagName("p")[0].innerHTML
	else
		return "";
}

/* PAGE SCRIPT */




/* RUN */

// Do all
function run() {

	// set up the script
	addPrototypeFunctions();
	loadSettingsNow();
	doScriptUISetup();
	
	// Set up the page
	redirectHomeSubsPage();
	doPageSetup();
	addEvents();
	
	// start interval events
	g_intervalId = window.setInterval(intervalUpdate, parseInt(g_modInterval));
	
	//alert(getCurrentPage());
	//alert(hasGuideByDefault());
	//alert("done");
	
}

run();


/*
LATEST CHANGES 1.0.1
- Fixed a page breaking problem on Google Chrome
- Made page update guide when internally loads
- Made the redirect home page to subs feature work

STILL TO DO:
- a lot
*/


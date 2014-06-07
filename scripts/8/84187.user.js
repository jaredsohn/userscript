/*
 * Title: lunafly
 * Description: Greasemonkey script for Firefox to change the appearance of Twitter
 * Author: lunamoth, http://lunamoth.biz
 * Updated: 08/09/2010
 * 
 */

// ==UserScript==
// @name          lunafly
// @version       1.0
// @namespace     http://lunamoth.tumblr.com/post/558416174/monkeyfly-lunafly
// @description   Greasemonkey script for Firefox to change the appearance of Twitter
// @author        lunamoth
// @include       http://twitter.com/*
// @include       https://www.twitter.com/*
// @include       http://*.twitter.com/*
// @include       https://*.www.twitter.com/*
// ==/UserScript==

(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	
	var cssStyle = '#content .wrapper{min-width:700px;}ol.statuses span.status-body{display:block;min-height:10px;margin-left:0;max-width:700px !important;width:auto;}ol.statuses li.status,ol.statuses li.direct_message{padding:0;}body span.entry-content,body span.status-body{font-size:12px;}body ol.statuses li.status,body ol.statuses li.direct_message{line-height:15px;}.doing,.latest_status,.status-text,.meta,.entry-meta,.retweet-meta{margin-top:0;font-size:9px;display:none;}li.pb-conv-chain .entry-content-box{border:0 !important;-webkit-box-shadow:none !important;border-bottom-left-radius:none !important;border-bottom-right-radius:none !important;border-top-left-radius:none !important;border-top-right-radius:none !important;padding:0 20px !important;}#heading{font-size:12px !important;}h2.sidebar-title{font-size:0.8em;}body#profile #container ol.statuses .latest-status .entry-content{font-size:1.1em;}body#profile ol.statuses li.latest-status{padding:0 !important;}body#show .entry-content{font-size:5em;font-family:”맑은 고딕” !important;text-shadow:2px 2px 2px #5D5D5D;}#content h2.thumb{font-size:2em;line-height:30px;padding:0;}body#profile #content h2.thumb,body#profile_favorites h2.thumb{padding-bottom:0;}.profile-controls{margin-bottom:0;padding:0;}.profile-user h2 div{margin-left:0;}#profile-image{width:35px !important;height:35px !important;}span.pb-extra{padding-right:0;}#side_base{line-height:1;}#container,body#show #content{width:900px !important;}ol.statuses .thumb,body#profile .latest-status .entry-meta,#side p.no-lists,#trends,#recommended_users{display:none;}';
	
	addGlobalStyle(cssStyle);
})()
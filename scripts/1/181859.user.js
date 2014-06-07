// ==UserScript==
// @name      adeta bir antik gibi
// @author  
// @version    1
// @description  Ekşisözlük firebrick uyarlamasıdır.
// @include      http*://eksisozluk*
// @copyright  2013+
// @homepage       
// @updateURL      
// @downloadURL    
// @run-at     document-start
// ==/UserScript==
function GM_addStyle(css) {
	var parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	var style = document.createElement("style");
	style.type = "text/css";
	var textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
}
GM_addStyle(" \
#content-body {margin-left:0px !important; margin-right:0px !important; padding-left: 17.5px !important; padding-right: 17.5px !important; width: 74% !important;}\
#container {width: auto !important; max-width:none !important; margin: 0 !important; padding-left: 15px !important; padding-top: 40px !important; margin-right: 160px !important;}\
#top-bar {max-width: none !important; width: auto !important; margin: 0 !important; padding-left: 15px !important; padding-right: 17.5px !important; zoom: 0.9 !important;}\
#sub-navigation {zoom: 1.1 !important; height:25px;}\
.ad-banner728-top, #sitea-footer, #related-videos-section, #facebook-likebox, .sub-title-menu #topic-share-menu, #videos  {display: all !important;}\
#content-section {padding-left: 17.5px !important; padding-right: 17.5px !important;}\
.pager {height: 0px !important; zoom: 0.9 !important; margin-top: 0px !important; z-index: 4 !important; position: fixed !important; top: 75px !important; right: 190px !important;}\
#partial-index {padding-right: 7px !important; margin-top: -17px !important;}\
#aside {width: 155px !important; float: right !important; right: 180px !important; position: absolute !important; top: 0 !important; clear: right !important; z-index:96 !important;}\
#entry-list footer div.feedback {width: auto !important; position: absolute !important; float: auto !important; height: 120px !important; right: 160px !important;}\
#entry-list footer div.info {width: 450px !important;}\
#entry-list > li:not(:last-child) {margin-bottom: 20px !important;}\
.topic-list li {border-top: 0px solid #cccccc !important;}\
.topic-list.partial>li>a>small, .topic-list.partial li.numbered > a > small {position: relative !important;right: auto !important;top: 0px !important;padding-left: 3px !important; font-size:0.9em !important; color: #000 !important;}\
.topic-list.partial li.numbered > a {padding-right: 2px !important;}\
.topic-list.partial li > a {padding: 0 !important;}\
.topic-list.partial li>a {padding-top:0px !important; padding-bottom:0px !important;}\
.topic-list.partial li>a small:before {content:'(' !important;}\
.topic-list.partial li>a small:after {content:')' !important;}\
.topic-list.partial li>a:before {content:'· ' !important;}\
.topic-list.partial li {padding-right: 1px !important;}\
#entry-list > li:not(:first-child) {margin-top: 40px !important;}\
.topic-list li > a {padding: 30 !important; font-size: 1em !important;}\
#entry-list footer .rate-options {margin: 10 !important; left: 60px !important; position: relative !important;}\
#entry-list footer .share-link {padding-right: 7px !important; position: relative !important; top: 23px !important; }\
#entry-list footer .favorite-link {top: 24px;right: 120px;position: relative;}\
#entry-list { font-size: 0.9em ! margin-top: 30px !important;}\
#topic h1 {margin: 90 !important; z-index: 3 !important; background: #d8d8d8 !important; position: fixed !important; top: 61px !important; width: 150% !important; min-height: 37px !important;}\
.sub-title-menu {margin-top: 0px !important; margin-bottom: 0px !important; position: fixed !important; right: 0 !important; top: 37px !important; z-index: 1111 !important; margin-right: 167px !important;}\
#in-topic-search-options.open {right: 0 !important;}\
#entry-list a, #topic h1 a, #partial-index a, .topic-list a, .pager > a, .index-list a, .topic-footer-actions a, #sub-etha-sites a, #stats a, h1 a {color: #0027bc !important;}\
.sub-title-menu a {color: #999 !important;}\
body {background-color: #d8d8d8 !important; color:#000 !important;  font-size:0.6em !}\
#entry-list footer div.feedback > a, #entry-list footer div.options > a, #entry-list footer div.other > a, #entry-list footer .rate-options a, #entry-list footer .favorite-link, #entry-list footer .vote-response-area, #entry-list footer div.other > a::after, #entry-list footer .share-link::after {color: #d8d8d8 !important; border-top-color:#d8d8d8 !important;}\
#entry-list > li:hover div.feedback > a, #entry-list > li:hover div.options > a, #entry-list > li:hover div.other > a, #entry-list > li:hover .rate-options a, #entry-list > li:hover .vote-response-area, .favicon, #entry-list > li:hover .favorite-link, #entry-list > li:hover div.other > a::after, #entry-list > li:hover .share-link::after {color:#999 !important; border-top-color:#999 !important;}\
#sub-navigation > ul#quick-index-nav > li:last-child {display:none !important;}\
#sub-navigation > ul > li:nth-child(10), #sub-navigation > ul > li:nth-child(9), #sub-navigation > ul > li:nth-child(8), #sub-navigation > ul > li:nth-child(7)   {display: none !important;}\
#sub-navigation > ul > li > a {padding: 0 10px;}\
::-webkit-scrollbar-track-piece {background-color: #cccccc;}\
.favicon {display:none;}\
#entry-list > li:hover .favicon {display:inline-block !important;}\
\ ");
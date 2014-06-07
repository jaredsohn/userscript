// ==UserScript==
// @name        Glenn_H's Wider FoxSports (Remixed by levajack)
// @namespace   http://msn.foxsports.com
// @description Widen the length of the Livefyre conversation area
// @include     http://msn.foxsports.com/collegefootball/team/*
// @include     https://msn.foxsports.com/collegefootball/team/*
// @include     http://msn.foxsports.com/collegefootball/game*
// @include     https://msn.foxsports.com/collegefootball/game*
// @version     1.3
// ==/UserScript==
// Initiate custom CSS function


function GM_addStyle(css) {
	var parent, style, textNode;
	parent = document.getElementsByTagName("head")[0];
	if (!parent) {
		parent = document.documentElement;
	}
	style = document.createElement("style");
	style.type = "text/css";
	textNode = document.createTextNode(css);
	style.appendChild(textNode);
	parent.appendChild(style);
	}
	
// Custom CSS interface styling
GM_addStyle("\
#livefyre { width: 147% !important; }\
#teamFrontMoreThanSports, #playerStore { display: none; }\
body.editable, div.editable {background: rgb(246, 246, 246) !important;}\
.fyre .fyre-comment-actions a.fyre-delete-link {display:inline !important}\
#fs-page-sports-store-container { display: none; }\
body {background-image: none !important; background-color: rgb(0, 0, 0) !important;}\
.left-column { float: left; width: 940px; overflow: hidden;}\
.fs-comments .fs-accent {width: 950px; background: url('/fe/images/fs-accent-bar.png') repeat scroll 0% 0% rgb(255, 204, 51);}\
.fs-comments h2 {width: 950px;}\
.fs-comments p.comment-terms {width: 910px;}\
.fyre .fyre-comment-stream {color: rgb(0, 0, 0) !important;}\
.fyre .fyre-comment p {margin-bottom: 4px !important; padding: 0px !important;}\
.fyre .fyre-comment-footer {margin: 0px 0px -8px 61px !important; ;padding-top: 0px !important;}\
.fyre .fyre-comment a {color: rgb(218, 165, 32)!important;}\
.fyre a.fyre-comment-username {color: rgb(0, 100, 0)!important;}\
.dataDiv {width: 960px;}\
.goog-inline-block {display: inline-block !important;}\
.fyre .fyre-avatar img {height: 20px !important; width: 20px !important;}\
.fyre .fyre-comment-head, .fyre .fyre-comment-body {margin-top: -5px;}\
.fyre .fyre-comment-divider > div.fyre-comment-divider {background-color: rgb(150, 150, 150)!important;}\
#playerHeaderNav {width: 666px !important;}\
.fyre .fyre-comment-media img {max-height: 940px !important;}\
.fyre.fyre-width-medium .fyre-listener-avatars {max-width: 300px !important;}\
.overlayBg { background:#000000 url('http://www.freeimagehosting.net/newuploads/z148h.jpg') center top ; background-attachment: fixed; }\
DIV#playerHeaderBody {height: 150px; position: relative; top: -18px; border-radius: 10px 150px 10px 50px !important;}\
.fyre .fyre-comment-article .fyre-comment-wrapper time.fyre-comment-date {color: rgb(80,100,80) !important;}\
.fyre .fyre-comment-like-btn {color: darkgreen; font-weight: bold;}\
.fyre .fyre-comment-reply {color: darkgreen; font-weight: bold;}\
.fyre .fyre-comment-divider > a, .fyre .fyre-comment-divider > a:hover {left: 0px;}\
#teamCenter .teamCenterFooter, #teamCenter .teamCenterFooter td, #teamCenter td.teamCenterFooter {  background-color: rgb(255,255,255) !important;}\
.fs-bing-map-container {border: none; !important}\
#ad728x90box, .ad728x90box {display: none;}\
#teamGameCenter #gameCenterMask {width: 910px !important;}\
#teamGameCenter {width: 950px !important; }\
#teamGameCenter #gameCenterMask #TeamGameCenterScroller {width: 900px !important;}\
#teamCenter {width: auto; border: none !important;}\
#leftInline table {width: 548px !important;}\
#rightInline {width: 407px !important;}\
.teamTbl {width: auto !important;}\
.fs-news-mod {width: 397px !important;}\
.teamTrHdr1, .teamTrHdr1 TD {width: 500px !important;}\
.fs-news-mod .news-story {width: 283px !important}\
.fs-news-mod .news-story span.title {width: 283px !important}\
DIV#teamName {margin-top: -77px !important;}\
DIV#teamRecord {margin-top: 5px !important;}\
DIV#teamRecord a:link, DIV#teamRecord a:visited, DIV#teamRecord a:active {font-size: 16px !important;}\
h1.teamName {font-size: 30px !important;}\
.pageBdy { width: 1300px;}"
);
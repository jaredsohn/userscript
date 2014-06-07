// ==UserScript==
// @name       Minimal Sesli Sözlük
// @namespace  haluk ilhan
// @version    0.1.2
// @description  Minimal Sesli Sözlük
// @include        http://*seslisozluk*
// @include        https://*seslisozluk*
// @homepage       http://userscripts.org/scripts/show/158808
// @updateURL      https://userscripts.org/scripts/source/158808.meta.js
// @downloadURL    https://userscripts.org/scripts/source/158808.user.js
// ==/UserScript==

// Initiate custom CSS function
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
.noprint rek, .noprint.rek, .wrap-bot, #share, .section_ad, .search_top, .logo_td, .wrap, .wraphead, #u_s_div, #abFacebookConnectFrame_0 {display: none!important;}\
.transleft {right: 0!important; position: absolute!important; margin-top: -80px!important;}\
#translations {width: 400px!important; margin:0!important;}\
.wrapin {width: 592px!important; padding:0!important; background-color: #fafafa!important; min-height: 600px!important;}\
.topheader {margin:0!important; zoom: 0.7!important; background-color: #222!important; padding-bottom:5px!important; width: 846px !important;}\
#tabsResult>div:first-child {zoom: 0.7!important;}\
#tabsResult>table:first-child {width: 400px!important;  overflow:hidden;}\
#tabsResult {margin-top: -80px!important; width: 400px !important; word-wrap: break-word !important;}\
#section_images {position: absolute!important; width: 220px!important; right: -180px!important; top: 10px!important;}\
#word-searched {font-size: 17px!important;}\
.bali img {display: none!important;}\
#table_head {margin-left: -222px!important; }\
body {background-color: #ddd!important;}\
.settings {margin: 0 10px 0 0px !important;}\
td#ipas {display:none !important;}\
.app-section {margin-top: 160px !important; }\
#contributions {margin-top: -380px; }\
#section_body {margin-top:90px; !important}\
\ ");
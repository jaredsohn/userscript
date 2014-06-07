// Sensible Facial
// 2012-11-06
// Copyright (c) 2007 - 2012 Rojo^
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Sensible Facial", and click Uninstall.
//
// ==UserScript==
// @name	   Sensible Facial
// @namespace	  http://userscripts.org/scripts/show/408740
// @description	On Sensibleendowment.com, redisplays comments in a more easily interpreted tree, allows expanding / collapsing of threads, and adds inline comment moderation and replies
// @downloadURL http://userscripts.org/scripts/source/408740.user.js
// @match http://sensibleendowment.com/*
// @match https://www.sensibleendowment.com/*
// @match http://*.sensibleendowment.com/*
// @grant GM_deleteValue
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_registerMenuCommand
// @grant GM_xmlhttpRequest
// @grant unsafeWindow
// @version	3.5.4.3
// ==/UserScript==

// note to Rojo^: update profile page.
var scriptVersion = '3.5.4.3';
var X11 = navigator.userAgent.indexOf('X11') > -1;
var scriptLoc = 'http://userscripts.org/scripts/source/408740.user.js';
var arrowRight = "&#9654;";
var arrowDown = "&#9660;";

// seLogo is a base64-encoded semi-transparent PNG.
var seLogo = "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";
// waitGif is a base64-encoded animated GIF.
var waitGif = "R0lGODlhEAALAPQAAJUtAP/GbqNCD6hHE504CPvCa//GbuqqWsh3NdaMRLFVHe+xX9+ZTcRyMtSJQq9SG+6uXfzCbN2WTJ46CqRDEJkyBOajVaNADpkzBbJYH7tlKKpLFps2BgAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA";

// uncomment the following to log execution time at various points
// var begin = new Date().getTime();

// http://colorschemedesigner.com/ is a decent place to find a color pallete.
var themes = {
	"Default" : [
		"body { background-color: white; color: black }",
		"a { color: blue }",
		"a:visited { color: purple }",
		"a:hover, a:active { color: brown; text-decoration: none }",
		"input, textarea { background-color: #ffe }",
		".new0 { background-color: #F3F0E8; border: 1px solid #C77; color: black }",
		".new1 { background-color: #E7E4DD; border: 1px solid #C77; color: black }",
		".old0 { background-color: #E3E3CF; border: 1px dotted #888; color: black }",
		".old1 { background-color: #F3F3DF; border: 1px dotted #888; color: black }",
		".watchlist_category { background-color: #480; color: white; font-weight: bold; border: 2px outset #480 }",
		".sensibleComments > li { box-shadow: 3px 3px 7px #777; border-radius: 7px; ",
		"-moz-box-shadow: 3px 3px 7px #777; -webkit-box-shadow: 3px 3px 7px #777; ",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; }"
	].join('\n'),
	"Amazon" : [
		"body { background-color: white; }",
		"body { color: black }",
		"a { color: #146EB4; text-decoration: none; }",
		"a:visited { color: #030366; text-decoration: none; }",
		"a:hover, a:active { color: #E47911; text-decoration: underline; }",
		"input, textarea, select { background-color: #FFF; border: 1px solid #999; }",
		".entry_details_text { color: black; }",
		"#Layer1 > table { background-color: #EBF3FE; width: 600px; padding: 10px 20px; }",
		"#Layer1 > table { border: 1px solid #6DAEE1; }",
		".new0, .new1 { border: 1px solid #B6CFE5; }",
		".old0, .old1 { border: 1px solid #CBE3F7; color: #555; }",
		".old0 { background-color: #EFF7FE; }",
		".new0 { background-color: #EEC; }",
		".old1, .new1 { background-color: #FFF; }",
		".new0 > .commentHeader, .new1 > .commentHeader, .watchlist_category, #watchlist .new0 { ",
		"background-color: #E97C03; color: white; }",
		".old0 > .commentHeader, .old1 > .commentHeader { background-color: #0B5199; color: white; }",
		".old0 > .commentHeader, .old1 > .commentHeader, .watchlist_category {",
		"background: -moz-linear-gradient(top, #6499C9, #4A88C0 40%, #1264AA 41%, #094989);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#6499C9), to(#094989), color-stop(0.4, #4A88C0), color-stop(0.41, #4A88C0)); }",
		".new0 > .commentHeader, .new1 > .commentHeader {",
		"background: -moz-linear-gradient(top, #F7C587, #F3A644 40%, #EE8403 41%, #9D784B);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#F7C587), to(#9D784B), color-stop(0.4, #F3A644), color-stop(0.41, #EE8403)); }",
		"#watchlist .new0 { border: 2px solid #030366; color: #030366; ",
		"background: -moz-linear-gradient(top, #FFE39F, #FFE095 40%, #FFC741 41%, #A47E24);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#FFE39F), to(#A47E24), color-stop(0.4, #FFE095), color-stop(0.41, #FFC741)); }",
		".sensibleComments > li, #wl, #Layer1 > table, input[type=text], textarea { ",
		"border-radius: 7px; -moz-border-radius: 7px; -webkit-border-radius: 7px; }",
		".commentHeader a, .commentHeader .entry_details_text { color: white; }",
		"font[color=green] { color: #090; }",
		".commentHeader font[color=green] { color: #EBF3FE; }"
	].join('\n'),
	"/b/" : [
		"body { background-color: #FFE; color: #800000; }",
		"a { color: blue }",
		"a:visited { color: purple }",
		"a:hover, a:active { color: brown; text-decoration: none }",
		".entry_details_text { color: #707070; }",
		".new0, .new1 { background-color: #FFF; border: 1px solid #800000; }",
		".old0, .old1 { background-color: #F0E0D6; border: 1px dashed gray; }",
		".watchlist_category { background-color: #EA8; color: #80001F; font-weight: bold; border: 2px outset #80001F }",
		".sensibleComments > li { box-shadow: 3px 3px 7px #AA9; border-radius: 7px;",
		"-moz-box-shadow: 3px 3px 7px #AA9; -webkit-box-shadow: 3px 3px 7px #AA9;",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; }"
	].join('\n'),
	"Black" : [
		"body, input, textarea, select, .date_header_text { background-color: black; color: #CCC }",
		"input, textarea, select { border-color: black; }",
		"a { color: #809FFF }",
		"a:visited { color: #CCA }",
		"a:hover, a:active { color: brown; text-decoration: none }",
		".new0 { background-color: #302525; border: 1px solid brown; color: #CCC }",
		".new1 { background-color: #453838; border: 1px solid brown; color: #CCC }",
		".old0 { background-color: #202020; border: 1px dotted gray; color: #CCC }",
		".old1 { background-color: #000000; border: 1px dotted gray; color: #CCC }",
		".watchlist_category { background-color: #809FFF; color: #000; font-weight: bold; border: 2px outset #809FFF }",
		".sensibleComments > li { box-shadow: 3px 3px 7px #000; border-radius: 7px;",
		"-moz-box-shadow: 3px 3px 7px #000; -webkit-box-shadow: 3px 3px 7px #000;",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; }"
	].join('\n'),
	"Carbon Fiber" : [
		"body { background-color: #333; color: white }",
		".date_header_text { color: white }",
		"input[type=text], textarea { color: white; border: 1px solid orange; background-color: #807575; }",
		".new0 .entry_details_text, .new1 .entry_details_text { color: #BBB !important; }",
		".new0 > .commentHeader a, .new1 > .commentHeader a { color: #ACF; }",
		"a { color: #809FFF; text-decoration: none; }",
		"a:visited { color: #CDF; text-decoration: none; }",
		"a:hover, a:active { color: orange; text-decoration: underline; }",
		"font[color=gray] { color: #999; }",
		"font[color=green] { color: #3B3; }",
		"#Layer1 > table { background-color: #5A5A5A; width: 600px; border: 1px solid orange; padding: 10px 20px; }",
		".new0 { background-color: #807575; border: 1px solid orange; color: white }",
		".new1 { background-color: #958888; border: 1px solid orange; color: white }",
		".old0 { background-color: #5A5A5A; border: 1px dotted gray; color: white }",
		".old1 { background-color: #444; border: 1px dotted gray; color: white }",
		"#wl { border: 1px solid orange; background-color: #807575; width: 147px; padding: 10px; margin: -10px; }",
		".watchlist_category { background-color: orange; color: white; font-weight: bold; border: 2px outset orange }",
		".sensibleComments > li, #wl, #Layer1 > table, input[type=text], textarea { ",
		"box-shadow: 3px 3px 7px #222; border-radius: 7px;",
		"-moz-box-shadow: 3px 3px 7px #222; -webkit-box-shadow: 3px 3px 7px #222;",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; }"
	].join('\n'),
	"Chocolate Mint" : [
		"body { background-color: #646060; color: white }",
		"a { color: #ADB5AD; text-decoration: none; }",
		"a:visited { color: #FAA; text-decoration: none; }",
		"a:hover, a:active { color: #7F7; text-decoration: underline; }",
		".sensibleComments .entry_details_text, .sensibleComments a { color: #4D504D }",
		".sensibleComments a:visited { color: brown; text-decoration: none; }",
		".sensibleComments a:hover, .sensibleComments a:active { color: #7F7; text-decoration: underline; }",
		".entry_details_text { color: #D5DBD5 }",
		"input, textarea { background-color: #FFE }",
		"font[color=green] { color: #7F7; }",
		".sensibleComments font[color=green] { color: #160; }",
		".new0 { background-color: #ADB5AD; border: 1px solid #C77; color: black }",
		".new1 { background-color: #B9BFB9; border: 1px solid #C77; color: black }",
		".old0 { background-color: #CBC7C7; border: 1px dotted #888; color: black }",
		".old1 { background-color: #C0BABA; border: 1px dotted #888; color: black }",
		".watchlist_category { background-color: #ADB5AD; color: #4D504D; font-weight: bold; border: 2px outset #ADB5AD }",
		".sensibleComments > li { box-shadow: 3px 3px 7px #555; border-radius: 7px;",
		"-moz-box-shadow: 3px 3px 7px #555; -webkit-box-shadow: 3px 3px 7px #555;",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; }"
	].join('\n'),
	"Demonoid" : [
		"body { background-color: #9FA2A9; color: black }",
		"a { color: navy; }",
		"a:visited { text-decoration: none; color: brown; }",
		"a:hover, a:active { color: blue; text-decoration: underline overline }",
		"input, textarea, select { background-color: #FFF; border-color: #FFF; }",
		".entry_details_text { color: #666; }",
		"#Layer1 > table { background-color: white; width: 600px; border: 1px solid black; padding: 10px 20px; }",
		".new0 { background-color: #E8EAD3; border: 1px solid #C77; color: black }",
		".new1 { background-color: #CACEAB; border: 1px solid #C77; color: black }",
		".old0 { background-color: #EEE; border: 1px dotted #888; color: black }",
		".old1 { background-color: #E4E4E4; border: 1px dotted #888; color: black }",
		"#wl { border: 1px solid black; background-color: #A3AA60; width: 147px; padding: 10px; margin: -10px; }",
		".new0 > .commentHeader, .new1 > .commentHeader, .watchlist_category { background-color: #BDC383; }",
		".old0 > .commentHeader, .old1 > .commentHeader { background-color: #CBCAC7; }",
		".commentHeader { border-bottom: 1px solid #666 }",
		".watchlist_category { color: #777; font-weight: bold; border: 2px outset #CDD0B2; }",
		".sensibleComments > li, #wl, #Layer1 > table { box-shadow: 3px 3px 7px #777; border-radius: 7px;",
		"-moz-box-shadow: 3px 3px 7px #777; -webkit-box-shadow: 3px 3px 7px #777;",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; }"
	].join('\n'),
	"Germany" : [	// thanks, f00m@nb@r
		"body { background-color: #333; }",
		"body, .date_header_text, .entry_details_text { color: gold; }",
		"a { color: #FFF; text-decoration: none; }",
		"a:visited, .text_12px a:visited { color: #AAA; text-decoration: none; }",
		"a:hover, a:active, .text_12px a:hover, .text_12px a:active { color: #E43226; text-decoration: underline; }",
		"li > div.text_12px a { color: #901; }",
		".entry_details_text a { color: #FF0 !important; }",
		"input, textarea, select { background-color: #DDD; border: 1px solid #65000B; }",
		".pseudoLink { color: #333; }",
		"font[color=gray] { color: #DDC; }",
		"#Layer1 > table { background-color: #222; width: 600px; border: 4px solid #000; padding: 10px 20px; }",
		".new0, .new1 { background-color: #FFF; border: 4px solid #000; color: #000; }",
		".new1 { background-color: #EEC; }",
		".old0, .old1 { background-color: #D0D0D0; border: 1px solid #999; color: #444; }",
		".old1 { background-color: #F0F0F0; color: #666; }",
		".new0 > .commentHeader, .new1 > .commentHeader { background-color: #871716; }",
		".old0 > .commentHeader, .old1 > .commentHeader, .watchlist_category { background-color: #666; }",
		".watchlist_category { font-weight: normal; border: none; }",
		".old0 > .commentHeader, .old1 > .commentHeader, .watchlist_category {",
		"background: -moz-linear-gradient(top, #999, #655);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#999), to(#655)); }",
		".new0 > .commentHeader, .new1 > .commentHeader {",
		"background: -moz-linear-gradient(top, #721, #E43226 40%, #871716 41%, #100);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#721), to(#100), color-stop(0.4, #E43226), color-stop(0.41, #871716)); }",
		".commentHeader a, font[color=green] { color: #FF0; }",
		".sensibleComments > li, #Layer1 > table { border-top-left-radius: 12px;",
		"-moz-border-radius-topleft: 12px; -webkit-border-top-left-radius: 12px; }",
		".commentHeader { border-top-right-radius: 0px !important; -moz-border-radius-topright: 0px !important;",
		"-webkit-border-top-right-radius: 0px !important; }",
		".sensibleComments > li, #wl, #Layer1 > table { box-shadow: 3px 3px 7px #111;",
		"-moz-box-shadow: 3px 3px 7px #111; -webkit-box-shadow: 3px 3px 7px #111; }"
	].join('\n'),
	"Midnight" : [
		"body, input, textarea { background-color: #1C1B24; color: #CCC }",
		".date_header_text { color: #CCC }",
		"a { color: #A19A80; }",
		"a:visited { color: white; text-decoration: none; }",
		"a:hover, a:active { color: #1C1B24; background-color: #A19A80; text-decoration: none; }",
		"select, input[type=text], textarea { background-color: #A19A80; border-color: #1C1B24; color: #0C0A1F; }",
		"#Layer1 > table { border: 1px solid #333; background-color: #222030; color: #CCC; width: 600px; padding: 10px 20px; }",
		".new0 { background-color: #2D260E; border: 1px solid #A19A80; color: #CCC }",
		".new1 { background-color: #343025; border: 1px solid #A19A80; color: #CCC }",
		".old0 { background-color: #222030; border: 1px dotted #333; color: #CCC }",
		".old1 { background-color: #0C0A1F; border: 1px dotted #333; color: #CCC }",
		".watchlist_category { background-color: #A19A80; color: #0C0A1F; font-weight: bold; border: 2px outset #A19A80 }",
		".sensibleComments > li,  #Layer1 > table, input[type=text], textarea {",
		"box-shadow: 3px 3px 7px #112; border-radius: 7px;",
		"-moz-box-shadow: 3px 3px 7px #112; -webkit-box-shadow: 3px 3px 7px #112;",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; }"
	].join('\n'),
	"Papyrus" : [
		"body { background-color: #C7C6C1; color: black }",
		"a { color: #5D592C }",
		"a:visited { color: white; text-decoration: none; }",
		"a:hover, a:active { color: white; background-color: #5D592C; text-decoration: none; }",
		"input, textarea, select { background-color: #E7E6E1; border-color: #E7E6E1; }",
		".new0 { background-color: #E7E6E1; border: 1px solid #C77; color: black }",
		".new1 { background-color: #F7F6F1; border: 1px solid #C77; color: black }",
		".old0 { background-color: #C9C5BD; border: 1px dotted #888; color: black }",
		".old1 { background-color: #BCBAB1; border: 1px dotted #888; color: black }",
		".watchlist_category { background-color: #5D592C; color: white; font-weight: bold; border: 2px outset #5D592C }",
		".sensibleComments > li { box-shadow: 3px 3px 7px #777; border-radius: 7px;",
		"-moz-box-shadow: 3px 3px 7px #777; -webkit-box-shadow: 3px 3px 7px #777;",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; }"
	].join('\n'),
	"Princess Ponies" : [
		"body { background-color: #E165B9; }",
		"body, .date_header_text { color: #41046F; }",
		".entry_details_text { color: #592680; }",
		"a { color: #7F0055; text-decoration: none; }",
		"a:visited { color: #9F0013; text-decoration: none; }",
		"a:hover, a:active { color: #8FB52D; text-decoration: underline; }",
		"input, textarea, select { background-color: #FFF; border: 1px solid #7F0055; }",
		"#watchlist .new0 { color: white; }",
		".new0, .new1 { background-color: #E138AA; }",
		".old0, .old1 { background-color: #A668D5; }",
		"#Layer1 > table { background-color: #E138AA; width: 600px; padding: 10px 20px;",
		"background: -moz-linear-gradient(-87deg, #FFF, #E165B9 35%, #E138AA 35.5%, #FFF);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#FFF), to(#FFF), color-stop(0.35, #E165B9), color-stop(0.355, #E138AA)); }",
		".new0, .new1 {",
		"background: -moz-linear-gradient(top, #F579CD, #E138AA);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#E165B9), to(#E138AA)); }",
		".new0 > .commentHeader, .new1 > .commentHeader, #watchlist .new0 {",
		"background: -moz-linear-gradient(-89deg, #FFF, #E165B9 40%, #E138AA 44%, #FFF);",
		"background: -webkit-gradient(linear, 30% top, 30.1% bottom, from(#FFF), to(#FFF), color-stop(0.4, #E165B9), color-stop(0.45, #E138AA)); }",
		".old0, .old1 {",
		"background: -moz-linear-gradient(top, #E2B5F0, #CF69F0);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#E2B5F0), to(#CF69F0)); }",
		".old0 > .commentHeader, .old1 > .commentHeader, .watchlist_category {",
		"background: -moz-linear-gradient(-89deg, #FFF, #A668D5 40%, #9440D5 44%, #FFF);",
		"background: -webkit-gradient(linear, 30% top, 30.1% bottom, from(#FFF), to(#FFF), color-stop(0.4, #A668D5), color-stop(0.44, #9440D5)); }",
		"#Layer1 > table, .sensibleComments > li { border: 1px solid #7F0055; }",
		"#wl { border: 1px solid #7F0055; background-color: #94B62D; width: 147px; padding: 10px; margin: -10px; }",
		"#wPanel { background-color: #7F0055; color: #211; }",
		".sensibleComments > li, #wl, #Layer1 > table, input[type=text], textarea { ",
		"border-radius: 7px; -moz-border-radius: 7px; -webkit-border-radius: 7px; }",
		".sensibleComments > li { box-shadow: 3px 3px 7px #84099E;",
		"-moz-box-shadow: 3px 3px 7px #84099E; -webkit-box-shadow: 3px 3px 7px #84099E;",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; border-radius: 7px; }",
		".commentHeader a, .commentHeader .entry_details_text { color: white; }",
		"font[color=green] { color: #94B62D; }"
	].join('\n'),
	"SE Basic" : [
		"body, input { background-color: white; color: black }",
		"a { color: blue }",
		"a:visited { color: purple }",
		"a:hover, a:active { color: red }",
		".new0, .new1 { background-color: #DDD; border: 1px solid black; color: black }",
		".old0, .old1 { background-color: #FFF; border: 1px dashed gray; border-left: 1px solid black; color: black }",
		".watchlist_category { background-color: #555; color: white; font-weight: bold; border: 1px solid black }",
		".sensibleComments > li { box-shadow: 3px 3px 7px #999; border-radius: 7px;",
		"-moz-box-shadow: 3px 3px 7px #999; -webkit-box-shadow: 3px 3px 7px #999;",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; }"
	].join('\n'),
	"Shiny Things" : [
		"body { background-color: #333; }",
		"body, .date_header_text { color: #ccc; }",
		".entry_details_text { color: #888; }",
		"a { color: #ADF; text-decoration: none; }",
		"a:visited { color: gold; text-decoration: none; }",
		"a:hover, a:active { color: yellow; text-decoration: underline; }",
		"input, textarea, select { background-color: #FFF; border: 1px solid #999; }",
		"#watchlist { color: #ccd; }",
		"#watchlist .new0 { color: white; }",
		".new0, .new1 { background-color: #540; }",
		".old0, .old1 { background-color: #222; }",
		"#Layer1 > table { background-color: #111; width: 600px; padding: 10px 20px;",
		"background: -moz-linear-gradient(-87deg, #181212, #6C6666 35%, #3C3939 35.5%, #000);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#181212), to(#000), color-stop(0.35, #6C6666), color-stop(0.355, #3C3939)); }",
		".new0, .new1 {",
		"background: -moz-linear-gradient(top, #111, #540);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#111), to(#540)); }",
		".new0 > .commentHeader, .new1 > .commentHeader, #watchlist .new0 {",
		"background: -moz-linear-gradient(-89deg, #E1D295, #B93 40%, #760 44%, #430);",
		"background: -webkit-gradient(linear, 30% top, 30.1% bottom, from(#E1D295), to(#430), color-stop(0.4, #B93), color-stop(0.45, #760)); }",
		".old0, .old1 {",
		"background: -moz-linear-gradient(top, #2F2C2C, #181010);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#2F2C2C), to(#181010)); }",
		".old0 > .commentHeader, .old1 > .commentHeader, .watchlist_category {",
		"background: -moz-linear-gradient(-89deg, #181212, #6C6666 40%, #3C3939 44%, #000);",
		"background: -webkit-gradient(linear, 30% top, 30.1% bottom, from(#181212), to(#000), color-stop(0.4, #6C6666), color-stop(0.44, #3C3939)); }",
		"#Layer1 > table, .sensibleComments > li { border: 1px solid #999; }",
		"#wl { border: 1px solid #999; background-color: #222020; width: 147px; padding: 10px; margin: -10px; }",
		"#wPanel { background-color: #999; color: #211; }",
		".sensibleComments > li, #wl, #Layer1 > table, input[type=text], textarea { ",
		"border-radius: 7px; -moz-border-radius: 7px; -webkit-border-radius: 7px; }",
		".sensibleComments > li { box-shadow: 3px 3px 7px #111;",
		"-moz-box-shadow: 3px 3px 7px #111; -webkit-box-shadow: 3px 3px 7px #111;",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; border-radius: 7px; }",
		".commentHeader a, .commentHeader .entry_details_text { color: white; }",
		"font[color=green] { color: #AFC; }"
	].join('\n'),
	"Slashdot" : [
		"body { background-color: white; color: black }",
		"a { color: #066; text-decoration: none; }",
		"a:visited { color: #333; text-decoration: none; }",
		"a:hover, a:active { color: black; text-decoration: underline; }",
		"input, textarea, select { background-color: #FFF; border: 1px solid #999; }",
		".entry_details_text { color: black; }",
		"#Layer1 > table { background-color: white; width: 600px; border: 4px solid #E6E6E6; padding: 10px 20px; }",
		".new0, .new1 { background-color: white; border: 4px solid #E6E6E6; color: black }",
		".old0, .old1 { background-color: #DDD; border: 1px solid #999; color: #666; }",
		".new0 > .commentHeader, .new1 > .commentHeader, .watchlist_category { background-color: black; color: white; }",
		".old0 > .commentHeader, .old1 > .commentHeader { background-color: #666; color: #DDD; }",
		".watchlist_category { font-weight: normal; border: none; }",
		".old0 > .commentHeader, .old1 > .commentHeader, .watchlist_category {",
		"background: -moz-linear-gradient(top, #999, #666);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#999), to(#666)); }",
		".new0 > .commentHeader, .new1 > .commentHeader {",
		"background: -moz-linear-gradient(top, #858F9B, #384A56 60%, black 61%);",
		"background: -webkit-gradient(linear, left top, left bottom, from(#858F9B), to(#000), color-stop(0.6, #384A56), color-stop(0.61, black)); }",
		".commentHeader a, .commentHeader .entry_details_text { color: white }",
		".sensibleComments > li, #Layer1 > table { border-top-left-radius: 12px;",
		"-moz-border-radius-topleft: 12px; -webkit-border-top-left-radius: 12px; }",
		".commentHeader { border-top-right-radius: 0px !important; -moz-border-radius-topright: 0px !important;",
		"-webkit-border-top-right-radius: 0px !important; }",
		"font[color=green] { color: #4C8; }"
	].join('\n'),
	"Velvet Room" : [
		"body { background-color: #2F0300; }",
		"body, .date_header_text, .new0, .new1, .old0, .old1 { color: #DDD }",
		"a { color: #92B642 }",
		"a:visited { color: gray; }",
		"a:active, a:hover { color: #2F0300; background-color: #92B642; text-decoration: none; }",
		"select, input, textarea { background-color: black; border-color: black; color: #CCC }",
		"#Layer1 > table { background-color: #1F2C00; width: 600px; border: 1px solid #92B642; padding: 10px 20px; }",
		".new0 { background-color: #1F2C00; border: 1px solid #92B642; }",
		".new1 { background-color: #304503; border: 1px solid #92B642; }",
		".old0 { background-color: #00161E; border: 1px dotted gray; }",
		".old1 { background-color: #052936; border: 1px dotted gray; }",
		".watchlist_category { background-color: #92B642; color: #00161E; font-weight: bold; border: 2px outset #92B642 }",
		".sensibleComments > li, #wl, #Layer1 > table, input[type=text], textarea { ",
		"box-shadow: 3px 3px 7px #222; border-radius: 7px;",
		"-moz-box-shadow: 3px 3px 7px #222; -webkit-box-shadow: 3px 3px 7px #222;",
		"-moz-border-radius: 7px; -webkit-border-radius: 7px; }"
	].join('\n')
};

if (!console && !console.log) {
	console = {};
	console.log = function(){};
	console.warn = function(){};
	console.error = function(){};
	console.info = function(){};
}

(function () {

	var safari = (window.safari), webkit = navigator.appVersion.toLowerCase().indexOf('webkit') > -1,
	opera = (window.opera), css3 = typeof document.body.style.borderRadius == 'string' && navigator.userAgent.indexOf('Firefox') < 0,
	events = [], eventQueue, queueing = document.createElement('div'), themeElement = document.createElement('span'),
	wait = new Image();

	if (location.href.indexOf('sensibleendowment.com') < 0) return false;

	wait.src = "data:image/gif;base64," + waitGif;

	document.body.insertBefore(themeElement, document.body.firstChild);

	with (queueing) {
		className = 'text_12px';
		style.cssText = 'position: fixed; bottom: 0px; left: 0px; padding: 5px; display: inline; '
		+'z-index: 999; border: 1px solid black; color: black; background-color: #fec; font-size: 10px;';
		innerHTML = '<span>&nbsp;&nbsp;Attaching <span id="eventLength"></span> events.&nbsp; Hang on a sec...</span>';
		insertBefore(wait, queueing.firstChild);
	}
	document.body.appendChild(queueing);

	function queueEvent(objArg, evtArg, fnArg, passArg) {
		events.push({
			"obj" : objArg,
			"evt" : evtArg,
			"fn" : fnArg,
			"pass" : passArg
		})
		queueing.style.display = 'block';
		clearInterval(eventQueue);
		eventQueue = setInterval(function() {
			if (events.length > 0) {
				var evtObj = events[0].obj;
				evtObj.addEventListener(events[0].evt, events[0].fn, events[0].pass);
				events.shift();
				if (events.length == 0) {
					clearInterval(eventQueue);
					queueing.style.display = 'none';
				} else if (eL = document.getElementById('eventLength')) {
					eL.innerHTML = events.length;
				}
			}
		}, 2);
	}

	/* =================================================
	Block TEA (xxtea) Tiny Encryption
	(c) Chris Veness 2002-2010
	http://www.movable-type.co.uk/scripts/tea-block.html
	================================================= */

	var Tea={};Tea.encrypt=function(plaintext,password){if(plaintext.length==0)return('');var v=Tea.strToLongs(Utf8.encode(plaintext));if(v.length<=1)v[1]=0;var k=Tea.strToLongs(Utf8.encode(password).slice(0,16));var n=v.length;var z=v[n-1],y=v[0],delta=0x9E3779B9;var mx,e,q=Math.floor(6+52/n),sum=0;while(q-->0){sum+=delta;e=sum>>>2&3;for(var p=0;p<n;p++){y=v[(p+1)%n];mx=(z>>>5^y<<2)+(y>>>3^z<<4)^(sum^y)+(k[p&3^e]^z);z=v[p]+=mx;}};var ciphertext=Tea.longsToStr(v);return Base64.encode(ciphertext);};Tea.decrypt=function(ciphertext,password){if(ciphertext.length==0)return('');var v=Tea.strToLongs(Base64.decode(ciphertext));var k=Tea.strToLongs(Utf8.encode(password).slice(0,16));var n=v.length;var z=v[n-1],y=v[0],delta=0x9E3779B9;var mx,e,q=Math.floor(6+52/n),sum=q*delta;while(sum!=0){e=sum>>>2&3;for(var p=n-1;p>=0;p--){z=v[p>0?p-1:n-1];mx=(z>>>5^y<<2)+(y>>>3^z<<4)^(sum^y)+(k[p&3^e]^z);y=v[p]-=mx;};sum-=delta;};var plaintext=Tea.longsToStr(v);plaintext=plaintext.replace(/\0+$/,'');return Utf8.decode(plaintext);};Tea.strToLongs=function(s){var l=new Array(Math.ceil(s.length/4));for(var i=0;i<l.length;i++){l[i]=s.charCodeAt(i*4)+(s.charCodeAt(i*4+1)<<8)+(s.charCodeAt(i*4+2)<<16)+(s.charCodeAt(i*4+3)<<24);}return l;};Tea.longsToStr=function(l){var a=new Array(l.length);for(var i=0;i<l.length;i++){a[i]=String.fromCharCode(l[i]&0xFF,l[i]>>>8&0xFF,l[i]>>>16&0xFF,l[i]>>>24&0xFF);}return a.join('');};var Base64={};Base64.code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";Base64.encode=function(str,utf8encode){utf8encode=(typeof utf8encode=='undefined')?false:utf8encode;var o1,o2,o3,bits,h1,h2,h3,h4,e=[],pad='',c,plain,coded;var b64=Base64.code;plain=utf8encode?str.encodeUTF8():str;c=plain.length%3;if(c>0){while(c++<3){pad+='=';plain+='\0';}};for(c=0;c<plain.length;c+=3){o1=plain.charCodeAt(c);o2=plain.charCodeAt(c+1);o3=plain.charCodeAt(c+2);bits=o1<<16|o2<<8|o3;h1=bits>>18&0x3f;h2=bits>>12&0x3f;h3=bits>>6&0x3f;h4=bits&0x3f;e[c/3]=b64.charAt(h1)+b64.charAt(h2)+b64.charAt(h3)+b64.charAt(h4);};coded=e.join('');coded=coded.slice(0,coded.length-pad.length)+pad;return coded;};Base64.decode=function(str,utf8decode){utf8decode=(typeof utf8decode=='undefined')?false:utf8decode;var o1,o2,o3,h1,h2,h3,h4,bits,d=[],plain,coded;var b64=Base64.code;coded=utf8decode?str.decodeUTF8():str;for(var c=0;c<coded.length;c+=4){h1=b64.indexOf(coded.charAt(c));h2=b64.indexOf(coded.charAt(c+1));h3=b64.indexOf(coded.charAt(c+2));h4=b64.indexOf(coded.charAt(c+3));bits=h1<<18|h2<<12|h3<<6|h4;o1=bits>>>16&0xff;o2=bits>>>8&0xff;o3=bits&0xff;d[c/4]=String.fromCharCode(o1,o2,o3);if(h4==0x40)d[c/4]=String.fromCharCode(o1,o2);if(h3==0x40)d[c/4]=String.fromCharCode(o1);};plain=d.join('');return utf8decode?plain.decodeUTF8():plain;};var Utf8={};Utf8.encode=function(strUni){var strUtf=strUni.replace(/[\u0080-\u07ff]/g,function(c){var cc=c.charCodeAt(0);return String.fromCharCode(0xc0|cc>>6,0x80|cc&0x3f);});strUtf=strUtf.replace(/[\u0800-\uffff]/g,function(c){var cc=c.charCodeAt(0);return String.fromCharCode(0xe0|cc>>12,0x80|cc>>6&0x3F,0x80|cc&0x3f);});return strUtf;};Utf8.decode=function(strUtf){var strUni=strUtf.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g,function(c){var cc=(c.charCodeAt(0)&0x1f)<<6|c.charCodeAt(1)&0x3f;return String.fromCharCode(cc);});strUni=strUni.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,function(c){var cc=((c.charCodeAt(0)&0x0f)<<12)|((c.charCodeAt(1)&0x3f)<<6)|(c.charCodeAt(2)&0x3f);return String.fromCharCode(cc);});return strUni;}

	/* =========================================================================================
	Lightweight Tooltip
	no copyright information, written by Michael Leigeber
	http://sixrevisions.com/tutorials/javascript_tutorial/create_lightweight_javascript_tooltip/
	========================================================================================= */
	var tooltip=function(){var a="tt";var b=3;var c=3;var d=300;var e=10;var f=20;var g=95;var h=0;var i,j,k,l,m;var n=document.all?true:false;return{show:function(c,e){if(i==null){i=document.createElement("div");i.setAttribute("id",a);j=document.createElement("div");j.setAttribute("id",a+"top");k=document.createElement("div");k.setAttribute("id",a+"cont");l=document.createElement("div");l.setAttribute("id",a+"bot");i.appendChild(j);i.appendChild(k);i.appendChild(l);document.body.appendChild(i);i.style.opacity=0;i.style.filter="alpha(opacity=0)";document.onmousemove=this.pos}i.style.display="block";k.innerHTML=c;i.style.width=e?e+"px":"auto";if(!e&&n){j.style.display="none";l.style.display="none";i.style.width=i.offsetWidth;j.style.display="block";l.style.display="block"}if(i.offsetWidth>d){i.style.width=d+"px"}m=parseInt(i.offsetHeight)+b;clearInterval(i.timer);i.timer=setInterval(function(){tooltip.fade(1)},f)},pos:function(a){var b=n?event.clientY+document.documentElement.scrollTop:a.pageY;var d=n?event.clientX+document.documentElement.scrollLeft:a.pageX;i.style.top=b-m+"px";i.style.left=d+c+"px"},fade:function(a){var b=h;if(b!=g&&a==1||b!=0&&a==-1){var c=e;if(g-b<e&&a==1){c=g-b}else if(h<e&&a==-1){c=b}h=b+c*a;i.style.opacity=h*.01;i.style.filter="alpha(opacity="+h+")"}else{clearInterval(i.timer);if(a==-1){i.style.display="none"}}},hide:function(){clearInterval(i.timer);i.timer=setInterval(function(){tooltip.fade(-1)},f)}}}()
	var ttst = document.createElement('span');
	ttst.innerHTML = ['<style type="text/css">'
	, '#tt {position:absolute; display:block; z-index:1000; font-family:Tahoma, Arial, Helvetica; font-size:0.9em}'
	, '#tttop {display:block; height:5px; margin-left:5px; overflow:hidden}'
	, '#ttcont {display:block; padding:2px 12px 3px 7px; margin-left:5px; background:#666; color:#FFF}'
	, '#ttcont * {color:#FFF}'
	, '#ttbot {display:block; height:5px; margin-left:5px; overflow:hidden}'
	].join('\n');
	document.body.insertBefore(ttst, document.body.firstChild);

	/* =================================
	CHROME AND OPERA COMPATIBILITY HACKS
	================================= */

	function create_GM_Functions() {

		GM_getValue = function(name, defaultValue) {
			var value = localStorage.getItem(name);
			if (!value)
				return defaultValue;
			var type = value[0];
			value = value.substring(1);
			switch (type) {
				case 'b':
					return value == 'true';
				case 'n':
					return Number(value);
				default:
					return value;
			}
		}

		GM_deleteValue = function(name) {
			localStorage.removeItem(name);
		}

		GM_registerMenuCommand = function(name, funk) {
			var settingsButton = document.createElement('button');
			queueEvent(settingsButton, "click", funk, true);
			with (settingsButton) {
				innerHTML = "Sensible Facial settings";
				style.fontSize = "9px";
				style.position = "absolute";
				style.left = "20px";
				style.top = "5px";
				style.zIndex = "950";
			}
			document.body.insertBefore(settingsButton, document.body.firstChild);
			return;
		}

		GM_setValue = function(name, value) {
			value = (typeof value)[0] + value;
			localStorage.setItem(name, value);
		}

		GM_listValues = function() {
			var list = [];
			for (var i in localStorage) {
				list.push(i);
			}
			return list;
		}

	} 	// end create_GM_functions()

	// Greasemonkey XHR doesn't pass cookies if 3rd party cookies are disabled.  Redefine whether exists or not.
	GM_xmlhttpRequest=function(oArgs) {
		if (oArgs.url && oArgs.onload) {
			if (typeof oArgs.data == "undefined") oArgs.data = "";
			var xmlhttp;
			try { xmlhttp = new XMLHttpRequest(); }
			catch (e) { xmlhttp = false; }
			if (!xmlhttp) return null;
			try {
				if (oArgs.method && oArgs.method.toUpperCase() == 'GET') {
					var getData = (oArgs.data == "") ? oArgs.url : oArgs.url + "?" + oArgs.data;
					xmlhttp.open("GET", getData, true);
				}
				else {
					xmlhttp.open("POST", oArgs.url, true);
					xmlhttp.setRequestHeader("Method", "POST " + oArgs.url + " HTTP/1.1");
					if (typeof oArgs.headers == "object") {
						for (var i in oArgs.headers) xmlhttp.setRequestHeader(i, oArgs.headers[i]);
					}
					if (typeof oArgs.overrideMimeType == "string") {
						xmlhttp.overrideMimeType(oArgs.overrideMimeType);
					}
				}
				xmlhttp.onerror = function() {
					console.log('XHR failed loading: "' + oArgs.url + '".');
					return false;
				}
				xmlhttp.onload = function() {
					return true;
				}
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4) {
						oArgs.onload(xmlhttp);
					}
				}
				xmlhttp.send(oArgs.method == 'GET' ? '' : oArgs.data);
			}
			catch (e) { console.log('fail.'); return false; }
			return xmlhttp;
		}
		else return false;
	}

//	} 	// end create_GM_functions() moved above; GM_xmlhttpRequest redefined to work around a Greasemonkey bug

	try { var i = GM_getValue('a',true) || create_GM_Functions(); }
	catch (e) { create_GM_Functions(); }

	/* =====================
	END COMPATIBILITY HACKS
	===================== */

	// *sigh* fix Firefox's weirdness about forms spanning table elements, and SE's weirdness about using them
	function fixModForm() {
		var selectTag = document.getElementById('mod_type_id');
		if (selectTag) {
			var options = selectTag.innerHTML;
			var tableDaddy = selectTag.parentNode.parentNode.parentNode.parentNode;
			var modAction = tableDaddy.innerHTML.match(/\/entry\.php\/\d+/);
			tableDaddy.innerHTML = ['<tbody><tr><td><form name="mod_type" method="post" action="'+modAction+'">'
				,'<select name="mod_type_id" class="text11px" id="mod_type_id">'
				,options
				,'</select>'
				,'<input name="action" type="submit" id="action" value="moderate" class="text11px">'
				,'</form></td></tr></tbody>'].join('');
		}
	};

	function quickSort(arrTable, intColumn, start, end) {
		// usage: quickSort(array name, column to sort, start row, end row);
		var k = arrTable[Math.round((start+end)/2)][intColumn];
		var i = start;
		var j = end;
		while  (j > i) {
			while (arrTable[i][intColumn].toLowerCase() < k.toLowerCase())
				++i;
			while (k.toLowerCase() < arrTable[j][intColumn].toLowerCase())
				j = j - 1;
			if (i <= j) {
				var d = arrTable[i];
				arrTable[i] = arrTable[j];
				arrTable[j] = d;
				++i;
				j = j - 1;
			}
		}
		if (start < j)
			quickSort(arrTable, intColumn, start, j);
		if (i < end)
			quickSort(arrTable, intColumn, i, end);
	};

	function passHash() {
		for (var i=0, vals=document.cookie.split(';'); i<vals.length; i++) {
			var item = vals[i].replace(/\s/g,'').split('=');
			if (item[0] == 'cookie_password') return item[1];
		}
	}

	function getNode(findPattern) {
		return document.evaluate(findPattern, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}

	function getNodes(findPattern) {
		var nodes = [], coll = document.evaluate(findPattern, document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
		if (coll) {
			var el = coll.iterateNext();
			while (el) {
				nodes.push(el);
				el = coll.iterateNext();
			};
		}
		return (nodes.length > 0) ? nodes : null;
	}

	function yy() {
		c = arguments[0] || 12;
		var yy=document.createElement('canvas'),yyp=yy.getContext('2d'),pi=Math.PI,c2=Math.round(c/2),c3=Math.round(c*0.75),c4=Math.round(c/4),c5=Math.round(c/12);yy.width=(yy.height=c);
		with(yyp){beginPath();fillStyle="#FFF";arc(c2,c2,c2,pi*1.5,pi*0.5,true);fill();closePath();beginPath();fillStyle="#000";arc(c2,c2,c2,pi*0.5,pi*1.5,true);fill();closePath();beginPath();arc(c2,c3,c4,0,pi*2,true);fill();closePath();beginPath();fillStyle="#FFF";arc(c2,c4,c4,0,pi*2,true);fill();closePath();beginPath();arc(c2,c3,c5,0,pi*2,true);fill();closePath();beginPath();fillStyle="#000";arc(c2,c4,c5,0,pi*2,true);fill();closePath();}
		yy.style.cssText = 'padding-right: 5px; cursor: pointer; margin: 2px 0px -2px 0px'
		return yy;
	}

	function profileLoc() {
		var profileLink = getNode('/html/body/div/table/tbody/tr/td/a[contains(@href, "profile.php")]');
		return (profileLink) ? profileLink.href : null;
	}

	function loggedIn() {
		return (profileLoc() && profileLoc().indexOf('login.php') < 0);
	}
	
	function applyTheme(e) {
		e = e || window.event;
		if (typeof(e) == 'object') {
			e = e.srcElement || e.target;
			e = e.options[e.selectedIndex].value;
		}
		var theme = themes[e] || themes["Default"];
/*
		// strip out unsupported (or unwanted?) properties
		var prettyShit = settings ? settings.boxShadows() : GM_getValue('boxShadows', true);
		
		var rxp = 
			!prettyShit ? /([\{\s])[\w\-]*(shadow|radius|gradient)[^;\}]+;?/m :		// strip all
			(webkit ? /([\{\s])\-?[^\sw]+\-(shadow|radius)[^;\}]+;?/m :				// except Google Chrome / Safari
			(css3 ? /([\{\s])-[\w-]+(shadow|radius|gradient)[^;}]+;?/m :			// except Opera
			/([\{\s])\-?[^\sm]+\-(shadow|radius|gradient)[^;\}]+;?/m));				// except Firefox

		while ((j = theme.match(rxp, 1)) && j[0]) {
			theme = theme.substring(0, theme.indexOf(j[0])) + RegExp.$1 + theme.substring(theme.indexOf(j[0]) + j[0].length);
		}
		
		while ((j = theme.match(/[\w\-]+:\W+\}/m, 1)) && j[0]) {
			theme = theme.substring(0, theme.indexOf(j[0])) + '}' + theme.substring(theme.indexOf(j[0]) + j[0].length);
		}
*/
		themeElement.innerHTML = '<style>' + theme + '</style>';
	}

	function benchmark() {
		var note = (arguments) ? arguments[0] + '; ' : '';
		if (typeof begin != "undefined") {
			console.log(note + 'executed in ' + (new Date().getTime() - begin) + 'ms');
		}
	}

	if (location.href.indexOf('comment.php') < 0 && getNode("/html/body/div[@id='Layer1']/table[@cellpadding='5']")) fixModForm();

	var konami = {
		seq: [],
		pattern: [38,38,40,40,37,39,37,39,66,65,13],
		load: function() {
			var thisObj = this;
			queueEvent(document, 'keydown', function(e) {
				e = e || window.event;
				var keycode = e.keyCode, match = true,
				seq = thisObj.seq, pattern = thisObj.pattern;
				if (seq.push(keycode) > pattern.length) seq.shift();
				if (seq.length == pattern.length) {
					for (var i=0; i<seq.length; i++) {
						if (seq[i] !== pattern[i]) {
							match = false;
							break;
						}
					}
					if (match) {
						thisObj.seq = [];
						konami.code();
					}
				}
			}, false);
		},
		code: function() {
			GM_setValue('konami', true);
			settings.saveSettings();
			alert('You have 30 extra lives!');
		}
	}
	konami.load();

	function fixTimestamps() {
		var timestamps = getNodes('/html/body//span[@class="entry_details_text"]//text()[contains(., ":") and contains (., "@") and (contains(., "am") or contains(., "pm"))]');
		var home = (location.href.indexOf('.php') == -1);
		if (home || /entry\.php\/\d+/.test(location.href)) {
			var dateHeadings = getNodes('/html/body/div//tbody/tr/td/div[@class="date_header_text"]'), dateLoop = 0,
			newDay = new Date(dateHeadings ? Date.parse(dateHeadings[0].innerHTML) : ''), lastDateHeader = new Date();
		}
		var now = new Date().toString();
		var TZ = now.indexOf('(') > -1 ?
		now.match(/\([^\)]+\)/)[0].match(/[A-Z]/g).join('') :
		now.match(/[A-Z]{3,4}/)[0];
		if (TZ == "GMT" && /(GMT\W*\d{4})/.test(now)) TZ = RegExp.$1;
		if (timestamps) {
			var monthNumeric = { "Jan" : 0, "Feb" : 1, "Mar" : 2, "Apr" : 3, "May" : 4, "Jun" : 5, "Jul" : 6,
				"Aug" : 7, "Sep" : 8, "Oct" : 9, "Nov" : 10, "Dec" : 11 };
			var monthCanonical = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			var dayOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			var monthFull = ["January","February","March","April","May","June","July","August","September","October","November","December"];
			for (var i in timestamps) {
				if (/m(\s?GMT)/.test(timestamps[i].textContent)) timestamps[i].textContent = timestamps[i].textContent.replace(RegExp.$1, '');
				if (!/(\d?\d:\d\d[a|p]m)/.test(timestamps[i].textContent)) continue;
				var thisTimestamp = new Date(), baseTime = RegExp.$1, baseHours = baseTime.substring(0, baseTime.indexOf(':')),
				baseHours = (baseTime.indexOf('pm') > -1 && Number(baseHours) < 12) ? Number(baseHours) + 12 : Number(baseHours),
				baseMinutes = Number(baseTime.substring(baseTime.indexOf(':') + 1, baseTime.indexOf(':') + 3)),
				container = timestamps[i].parentNode, hasDate = false, dateSuffix;
				if (home) {
					var b4 = timestamps[i].parentNode;
					while (b4.nodeName.toLowerCase() != 'td') b4 = b4.parentNode;
					var edt = b4.getElementsByTagName('div')[0];
					if (edt.className.indexOf('date_header_text') > -1) {
						lastDateHeader.setTime(Date.parse(edt.innerHTML));
					}
					thisTimestamp.setTime(lastDateHeader.getTime());
					hasDate = true;
				}
				else if (/entry\.php\/\d+/.test(location.href) && i == 0 && dateHeadings) {
					thisTimestamp.setTime(Date.parse(dateHeadings[0].innerHTML));
				}
				else if (/(\d?\d)\w\w\s(\w{3})/.test(timestamps[i].textContent)) {
					thisTimestamp.setMonth(monthNumeric[RegExp.$2], Number(RegExp.$1));
					hasDate = true;
				}
				var oldMonth = monthCanonical[thisTimestamp.getMonth()];
				thisTimestamp.setHours(Number(baseHours));
				thisTimestamp.setMinutes(Number(baseMinutes));
				thisTimestamp.setTime(thisTimestamp.getTime() + Number(GM_getValue('timeDiff', 0)));
				if (i == 0 && /entry\.php\/\d+/.test(location.href) && dateHeadings) {
					dateHeadings[0].innerHTML = dayOfWeek[thisTimestamp.getDay()] + ", " + thisTimestamp.getDate() + " " + monthFull[thisTimestamp.getMonth()] + " " + thisTimestamp.getFullYear();
				}
				if (home && thisTimestamp.getTime() < newDay.getTime() && dateHeadings[++dateLoop]) {
					var br = dateHeadings[dateLoop].nextSibling;
					while (br.nodeName.toLowerCase() != 'br') br = br.nextSibling;
					b4.insertBefore(br, b4.firstChild);
					b4.insertBefore(dateHeadings[dateLoop], b4.firstChild);
					newDay.setTime(lastDateHeader.getTime());
				}
				var formattedTime = (thisTimestamp.getHours() > 12 ? thisTimestamp.getHours() - 12 :
				thisTimestamp.getHours() ? thisTimestamp.getHours() : 12)
				+ ":" + (thisTimestamp.getMinutes() < 10 ? "0" : "") + thisTimestamp.getMinutes()
				+ (thisTimestamp.getHours() > 11 ? "pm" : "am")
				+ ((home || i==0) ? " " + TZ : "");
				if (formattedTime.indexOf('NaN') > -1) continue;
				if (hasDate) {
					switch (thisTimestamp.getDate()) {
						case 1:
							dateSuffix = "st";
							break;
						case 2:
							dateSuffix = "nd";
							break;
						case 3:
							dateSuffix = "rd";
							break;
						default:
							dateSuffix = "th";
					}
					container.innerHTML = container.innerHTML.replace(oldMonth, monthCanonical[thisTimestamp.getMonth()]).replace(/\d?\d[s|n|r|t][t|d|h]/, thisTimestamp.getDate() + dateSuffix);
				}
				try { container.innerHTML = container.innerHTML.replace(baseTime, formattedTime); }
				catch (e) {};
			}
		}
	}

	function Config() {
		var options = [], thisObj = this, delim = String.fromCharCode(30);
		// format: greasemonkey_var_name, label for settings dialogue, default_value
		options.push(['checkUpdates','Automatically check for updates',true]);
		options.push(['watchlist','Watch list redesign',true]);
		options.push(['wlDefault','Default watch list category','Watch List']);
		options.push(['embedMax','Limit dimensions of larger images &amp; videos',true]);
		options.push(['embedHide','Replace embedded videos with placeholders',true]);
		options.push(['linkifyText','Linkify plain-text web addresses',true]);
		options.push(['comments','Make comments collapsible',true]);
		options.push(['mods','Allow inline comment moderation',true]);
		options.push(['scores','View comment modders on score mouseover',true]);
		options.push(['showUsers','Check for username spoof on mouseover',false]);
		options.push(['timestampMods','Convert timestamps to local time',true]);
		options.push(['replies','Allow inline comment replying',true]);
		options.push(['jump','Show controls to jump to new comments',true]);
		options.push(['blink','Blink referenced comment when jumping',true]);
		options.push(['centerWhenJumping','Center comment in window when jumping',false]);
		if (X11) options.push(['compositeBug','Compositing scroll display bug workaround',false]);
		options.push(['autorefresh','Auto refresh page on settings change',true]);
		options.push(['sync','Synchronize settings with other computers<br /><br />'
		+'<b>Colors</b>:',false]);
		options.push(['theme','Base color theme',themes,"Default"]);
//		options.push(['boxShadows','Allow shadows and curves in themes',true]);
		options.push(['altColors','Allow alternating colors in themes',true]);
		options.push(['replaceLogo','Make SE logo transparent',true]);

		var obsolete = ['new0','new1','old0','old1','wlHeadColor'];
		for (var i in obsolete) GM_deleteValue(obsolete[i]);

		function makePrototype(gmVar,defVal) {
			Config.prototype[gmVar] = function() {
				return (arguments.length == 0) ? GM_getValue(gmVar,defVal) : function() { GM_setValue(gmVar,arguments[0] || defVal); return true; };
			}
		}

		for (var i=0; i<options.length; i++) {
			makePrototype(options[i][0],(options[i][3] || options[i][2]));
		}

		this.saveSettings = function() {
			if (!thisObj.sync() || !loggedIn()) return false;
			var gmVars = GM_listValues(), crypt = [], reloadWhenDone = (arguments[0] == "reload");
			var noCache = ['cachedSFVer','remoteVersion','updChk','timeDiff'];
			for (var i=0; i<gmVars.length; i++) {
				if (noCache.join(',').indexOf(gmVars[i]) > -1) continue;
				else if (gmVars[i].substring(0,3) == 'wv_') continue;
				else crypt.push(gmVars[i] + '=' + GM_getValue(gmVars[i], null));
			}
			crypt = crypt.join(delim);
			var encrypted = Tea.encrypt(crypt, passHash());
			GM_xmlhttpRequest({ method: "GET", url: profileLoc(),
				onload: function(oXML) {
					var theForm = oXML.responseText.substring(oXML.responseText.indexOf('<form'), oXML.responseText.indexOf('</form>') + 7);
					var formDiv = document.createElement('div'), postData = [];
					formDiv.style.display = "none";
					formDiv.innerHTML = theForm;
					theForm = formDiv.getElementsByTagName('form')[0];
					for (var i=0; i<theForm.elements.length; i++) {
						var el = theForm.elements[i], item = el.name, type = el.type, val = (type == 'radio') ? null : el.value;
						if (item == 'profile') {
							val = val.replace(/<!-- sensible facial settings[^>]+-->/img,'').replace(/(\r?\n)+$/img, '');
							val = encodeURIComponent(val + "\n<!-- Sensible Facial Settings: " + encrypted + " -->");
						}
						if (type == 'radio') {
							while (theForm.elements[i].type == 'radio') {
								if (el.checked) val = el.value;
								i++;
							}
						}
						if (type == 'checkbox' && !el.checked) val = '';
						postData.push(item + '=' + val);
					}
					postData.push('Submit=save+changes');
					postData = postData.join('&').replace(/\s/g,'+');
					GM_xmlhttpRequest({ method: "POST", url: profileLoc(), data: postData,
						onload: function(oXML2) { if (reloadWhenDone) location.reload(); },
						headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
					});
				}
			});
		}

		this.loadSettings = function() {
			var reloadWhenDone = (arguments[0] == "reload");
			if (thisObj.sync() && loggedIn()) {
				GM_xmlhttpRequest({ method: "GET", url: profileLoc(),
					onload: function(oXML) {
						var crypt = oXML.responseText.match(/<!-- sensible facial settings[^>]+-->/i, 1)[0];
						crypt = crypt.split(' ')[4];
						var gmVars = Tea.decrypt(crypt, passHash());
						if (gmVars.indexOf('sync=true') < 0) {
							console.log('unable to decrypt settings -- settings not saved or invalid crypt key');
							if (reloadWhenDone) location.reload();
							return false;
						}
						for (var i=0, delVars = GM_listValues(); i<delVars.length; i++) {
							if (delVars[i].substring(0,3) != "wv_" && delVars[i] != "timeDiff") GM_deleteValue(delVars[i]);
						}
						for (var i=0, gmVars = gmVars.split(delim); i<gmVars.length; i++) {
							var item = gmVars[i].split('=')[0], val = gmVars[i].split('=')[1];
							val = (val.toLowerCase() == 'true') ? true : ((val.toLowerCase() == 'false') ? false : val);
							GM_setValue(item, val);
						}
						if (reloadWhenDone) location.reload();
					}
				});
			}
		}

		this.syncTime = function() {
			var topPostEntryDetails = getNode("/html/body/div/table[1]/tbody/tr/td/span");
			if (topPostEntryDetails) {
				var topPostEntryDetails = topPostEntryDetails.innerHTML.toLowerCase(),
				start = topPostEntryDetails.indexOf('</a>@') + 5,
				end = topPostEntryDetails.indexOf('] [<'),
				topPostTimestamp = topPostEntryDetails.substring(start, end),
				topPostNumber = getNode("/html/body/div/table[1]/tbody/tr/td/div[3]/a");
				if (!topPostNumber)
					topPostNumber = getNode("/html/body/div[@id='Layer1']/table[1]/tbody/tr/td/div[5]/a");
				x = 1;
				while (!topPostNumber && x < 100)
					topPostNumber = getNode("/html/body/div[@id='Layer1']/table[" + x++ + "]/tbody/tr/td/div[3]/a");
				topPostNumber = topPostNumber.href.split('/')[5];
				with (queueing) {
					getElementsByTagName('span')[0].innerHTML = '&nbsp;&nbsp;Synchronizing time.&nbsp; Stay on this page for a sec...';
					style.display = "block";
				}
				GM_xmlhttpRequest({ method: "GET", url: "/admin.php?detail=posts&show_days=7",
					onload: function(oXML) {
						var tsMod = oXML.responseText.toLowerCase();
						tsMod = tsMod.substring(0, tsMod.indexOf('/entry.php/' + topPostNumber));
						tsMod = tsMod.substring(tsMod.lastIndexOf('<tr>')).split('\n')[4];
						tsMod = tsMod.substring(0, tsMod.indexOf(' <'));
						var baseHours = topPostTimestamp.substring(0, topPostTimestamp.indexOf(':'));
						if (topPostTimestamp.indexOf('pm') > -1) baseHours = Number(baseHours) + 12;
						var baseMinutes = topPostTimestamp.substring(topPostTimestamp.indexOf(':') + 1, topPostTimestamp.indexOf(':') + 3);
						var days = /(\d+)d/.exec(tsMod), days = RegExp.$1,
						hours = /(\d+)h/.exec(tsMod), hours = RegExp.$1,
						minutes = /(\d+)m/.exec(tsMod), minutes = RegExp.$1;
						var localtime = new Date();
						var postday = getNode("/html/body/div/table/tbody/tr/td/div").innerHTML.split(' ');
						postday = [postday[2], postday[1] + ',', postday[3], baseHours + ':' + baseMinutes].join(' ');
						var modifier = new Date(postday);
						if (days) modifier.setDate(modifier.getDate() + Number(days));
						if (hours) modifier.setHours(modifier.getHours() + Number(hours));
						if (minutes) modifier.setMinutes(modifier.getMinutes() + Number(minutes));
						var primer = localtime.getTime() - modifier.getTime();
						// alert(localtime.toTimeString() + "\n" + baseHours + ":" + baseMinutes + "\n" + tsMod + "\nlocaltime: " + localtime.getTime() + "\nmodifier: " + modifier.getTime())
						GM_setValue('timeDiff', primer);
						if (events.length == 0) queueing.style.display = "none";
					}
				});
			}
		}

		if (location.href.indexOf('.php') < 0 || location.href.indexOf('2col') > 0) {
			thisObj.loadSettings();
			if (thisObj.timestampMods()) thisObj.syncTime();
			if (GM_getValue('konami', false)) {
				GM_xmlhttpRequest({ method: "GET", url: "/admin.php?detail=comments&show_days=7",
					onload: function(oXML) {
						var n = [], matches = oXML.responseText.match(/entry.php\/\-\d+/g);
						for (var i=0; i<matches.length; i++) {
							if (!matches[i]) continue;
							var entry = (matches[i].substring(matches[i].indexOf('-')) * -1);
							if (n.indexOf(entry) == -1) n.push(entry);
						}
						for (var i=0; i<n.length; i++) {
							var link = getNode('/html/body/div//table/tbody/tr/td/span/a[@href="/entry.php/'+n[i]+'"]');
							if (link) {
								var yin = yy(12);
								yin.setAttribute('other', '/entry.php'+'/-'+n[i]);
								link.parentNode.insertBefore(yin, link.parentNode.firstChild);
								queueEvent(yin, 'click', function(e) { e = e || event; var clicked = e.srcElement || e.target; location.href=clicked.getAttribute('other'); }, true);
							}
						}
					}
				});
			}
		}

		if (thisObj.timestampMods() && GM_getValue('timeDiff', 0)) {
			fixTimestamps();
		}

		this.showConfig = function() {

			// display box, then center it later after it has dimensions.
			var w = window.innerWidth;
			var h = window.innerHeight;
			var sl = document.body.scrollLeft;
			var st = document.body.scrollTop;
			var boxSt = document.createElement('span');
			boxSt.innerHTML = ['<style>'
				,'#configBox { padding: 5px; white-space: nowrap; opacity: 1.0; z-index: 901; '
 				,'background-color: #eec; border: 2px outset; display: inline; position: absolute; '
				,'line-height: 1.5em; font-size: 0.9em; color: black; }'
				,'#configTitle { padding: 1px 5px; background-color: #038; color: #fff; font-weight: bold; line-height: 1em; }'
				,'#overlay { width: '+ (w - 20) +'px; height: '+h+'px; background-color: #eee; opacity: 0.67; z-index: 900; '
				,'position: absolute; left: '+sl+'px; top: '+st+'px; }</style>'].join('\n');
			document.body.insertBefore(boxSt, document.body.firstChild);
			var overlay = document.createElement('div');
			overlay.setAttribute('id','overlay');
			var box = document.createElement('div');
			box.setAttribute('id','configBox');
			box.className = 'nav_text';
			var boxTitle = document.createElement('div');
			boxTitle.setAttribute('id','configTitle');
			boxTitle.innerHTML = 'Sensible Facial '+scriptVersion+' configuration';
			box.appendChild(boxTitle);
			var boxText = document.createElement('div');
			boxText.style.whiteSpace = 'normal';
			boxText.style.padding = '10px 0px';
			boxText.style.fontWeight = 'bold';
			boxText.innerHTML = 'Changes take effect on next page load.';
			box.appendChild(boxText);

			// args: Greasemonkey var name, label for input, default_value
			function addToBox(gmVar,label,defVal) {
				var bool = (typeof(defVal) == 'boolean'), select = (typeof(defVal) == 'object')
				, colorField = (!bool && !select && defVal.substring(0,1) == "#")
				, cb = document.createElement(select ? 'select' : 'input');
				if (!select) cb.setAttribute('type',(bool) ? 'checkbox' : 'text');
				if (!bool && !select) {
					cb.maxLength = colorField ? 7 : 20;
					cb.style.width = '70px';
				}
				cb.style.display = 'inline';
				cb.id = 'setting_' + gmVar;
				if (bool) cb.checked = GM_getValue(gmVar,defVal);
				else if (select) {
					for (var i in defVal) {
						cb.add(new Option(i), null);
						cb.options[cb.options.length - 1].selected = i == thisObj.theme();
					}
					queueEvent(cb, 'change', applyTheme, true);
				}
				else {
					with (cb) {
						value = GM_getValue(gmVar,defVal);
						style.color = colorField ? txtColor(cb.value) : 'black';
						style.backgroundColor = colorField ? cb.value : 'white';
					}
					if (colorField) {
						queueEvent(cb, 'change', function () {
							this.style.color = txtColor(this.value);
							this.style.backgroundColor = this.value;
						}, true);
					}
				}
				var txt = document.createElement('label');
				txt.htmlFor = 'setting_' + gmVar
				txt.innerHTML = '&nbsp;&nbsp;' + label;
				box.appendChild(cb);
				box.appendChild(txt);
				box.appendChild(document.createElement('br'));
			}

			// Checkboxes!
			for (var i=0; i<options.length; i++) {
				addToBox(options[i][0],options[i][1],options[i][2]);
			}

			var Buttons = document.createElement('div');
			Buttons.style.textAlign = 'right';
			var OKbutton = document.createElement('button');
			var CANCELbutton = document.createElement('button');
			OKbutton.innerHTML = 'OK';
			CANCELbutton.innerHTML = 'CANCEL';
			Buttons.appendChild(OKbutton);
			Buttons.appendChild(CANCELbutton);
			box.appendChild(Buttons);
			document.body.appendChild(box);
			document.body.appendChild(overlay);

			// center dialog
			box.style.left = Math.floor(sl + (w / 2 - box.offsetWidth / 2)) + 'px';
			box.style.top = Math.floor(st + (h / 2 - box.offsetHeight / 2)) + 'px';

			queueEvent(OKbutton, 'click',function() {
				var cfgItems = box.getElementsByTagName('input');
				for (var i=0; i<cfgItems.length; i++) {
					var gmVal = (cfgItems[i].type == 'text') ? (cfgItems[i].value || options[i][2]) : cfgItems[i].checked;
					GM_setValue(cfgItems[i].id.replace('setting_',''),gmVal);
				}
				cfgItems = box.getElementsByTagName('select');
				for (var i=0; i<cfgItems.length; i++) {
					GM_setValue(cfgItems[i].id.replace('setting_',''),cfgItems[i].options[cfgItems[i].selectedIndex].value);
				}
				if (thisObj.checkUpdates()) {
					GM_deleteValue('updChk');
					GM_deleteValue('cachedSFVer');
					GM_deleteValue('remoteVersion');
				}
				if (thisObj.sync()) {
					box.style.width = box.offsetWidth + 'px';
					box.removeChild(boxTitle);
					box.innerHTML = '';
					box.appendChild(boxTitle);
					var syncChoices = document.createElement('span');
					syncChoices.style.whiteSpace = 'normal';
					syncChoices.innerHTML = ['<h3>Synchronization initial setup</h3>'
					,'<p>You can either save your current settings to your profile, '
					,'overwriting settings that might already be stored there; or you can import settings if they are '
					,'already stored on your profile, overwriting those which are currently active in your browser.'
					,'&nbsp; What do you want to do?</p>'
					,'<input type="radio" name="syncChoice" id="syncSave" value="0" checked>'
					,'<label for="syncSave"> Save current settings to profile</label><br />'
					,'<input type="radio" name="syncChoice" id="syncLoad" value="1">'
					,'<label for="syncLoad"> Load settings from profile</label><br />'].join('\n');
					// radio buttons go here
					var Buttons = document.createElement('div');
					Buttons.style.textAlign = 'right';
					var OKbutton = document.createElement('button');
					OKbutton.innerHTML = 'OK';
					Buttons.appendChild(OKbutton);
					box.appendChild(syncChoices);
					box.appendChild(Buttons);
					box.style.left = Math.floor(sl + (w / 2 - box.offsetWidth / 2)) + 'px';
					box.style.top = Math.floor(st + (h / 2 - box.offsetHeight / 2)) + 'px';
					queueEvent(OKbutton, 'click',function() {
						if (document.getElementById('syncSave').checked)
							thisObj.saveSettings(thisObj.autorefresh() ? "reload" : null);
						else
							thisObj.loadSettings(thisObj.autorefresh() ? "reload" : null);
						document.body.removeChild(overlay);
						document.body.removeChild(box);
						document.body.removeChild(boxSt);
					}, false);
				}
				else {
					if (thisObj.autorefresh()) location.reload();
					document.body.removeChild(overlay);
					document.body.removeChild(box);
					document.body.removeChild(boxSt);
				}
			},false);
			queueEvent(CANCELbutton, 'click',function() {
				document.body.removeChild(overlay);
				document.body.removeChild(box);
				document.body.removeChild(boxSt);
			},false);
		}
	};

	var Layer1 = document.getElementById('Layer1');
	if (!Layer1 && location.href.indexOf('2col') < 0) return false;
	var settings = new Config();

	if (settings.replaceLogo()) {
		var crappyLogo = getNode("/html/body/div[@class='logo_box']//img");
		if (crappyLogo && crappyLogo.src) {
			with (crappyLogo) {
				src = "data:image/png;base64," + seLogo;
				removeAttribute('width');
				removeAttribute('height');
			}
		}
	}

	applyTheme(settings.theme());

	GM_registerMenuCommand('Sensible Facial settings...', settings.showConfig);

	benchmark('Loaded settings');

	var temp = document.getElementsByTagName('b');
	if (temp) {
		for (var i=0; i<temp.length; i++)
			temp[i].removeAttribute('style');
	}
	var temp = document.getElementsByTagName('font');
	if (temp) {
		for (var i=0; i<temp.length; i++)
			if (temp[i].getAttribute('color') && temp[i].getAttribute('color').toLowerCase() == 'black')
				temp[i].removeAttribute('color');
	}

	// check for updates
	if (settings.checkUpdates()) {
		var now = new Date().getTime();
		var updChk = GM_getValue('updChk',42); // 42 has no significance.  It just seemed like the answer.
		if (now - parseInt(updChk) > 24 * 60 * 60 * 1000) {
			var remoteVersion = GM_getValue('remoteVersion',scriptVersion);
			function annoyUser() {
				var upgrayedd = document.createElement('div');
				with (upgrayedd) {
					style.cssText = 'position: absolute; top: 0px; left: 0px; z-index: 900; background-color: #fec; color: #000; border-bottom: 1px dashed #444; '
					+'padding: 5px 10px; width: 98%; font-size: 12px; font-family: Helvetica, Arial, "Bitstream Vera Sans"; text-align: center;'
					innerHTML = '<a href="'+scriptLoc+'">A new version of Sensible Facial is available.</a>&nbsp; (installed: '+scriptVersion+'; available: '+remoteVersion+')';
				}
				document.body.appendChild(upgrayedd);
			};
			// If installed version hasn't been upgraded after a new update has been detected, don't recheck for updates
			if (remoteVersion != scriptVersion && GM_getValue('cachedSFVer',false) == scriptVersion) {
				annoyUser();
			}
			else {
				function fondleRojo(oXML) {
					// Parse Rojo^'s profile for the current version
					remoteVersion = oXML.responseText.substring(oXML.responseText.indexOf('sensibleFacialVersion=') + 22);
					remoteVersion = remoteVersion.substring(0, remoteVersion.indexOf('-->') - 1);
					remoteVersion = remoteVersion.replace(/\s/g,'');
					if (!/^\d/.test(remoteVersion)) remoteVersion = false;
					if (!remoteVersion) {
						console.log('Failed to check for upgrades.  :(');
						return false;
					}
					GM_setValue('remoteVersion',remoteVersion);
					if (remoteVersion != scriptVersion) {
						GM_setValue('cachedSFVer',scriptVersion);
						annoyUser();
					}
					// GM_setValue accepts either a string, boolean or integer.  Apparently the
					// number of milliseconds since Jan 1, 1970 is too large for the "int" datatype.
					else GM_setValue('updChk',now.toString());
					return true;
				}
				// Get Rojo^'s profile
				GM_xmlhttpRequest({
					method: 'POST', url: '/profile.php/14799', onload: fondleRojo
				});
			}
		}
	}

	function txtColor(bgColor) {
		if (bgColor.indexOf('#') == 0 && !/[g-z]/i.test(bgColor)) {
			bgColor = bgColor.replace('#','');
			if (bgColor.length == 3) {
				bgColor = bgColor.substring(0,1) + bgColor.substring(0,1) + bgColor.substring(1,2) + bgColor.substring(1,2) + bgColor.substring(2) + bgColor.substring(2);
			}
			var colorArray = [];
			colorArray.push(bgColor.substring(0,1) + bgColor.substring(1,2));
			colorArray.push(bgColor.substring(2,3) + bgColor.substring(3,4));
			colorArray.push(bgColor.substring(4,5) + bgColor.substring(5));
			for (i=0;i<3;i++) {
				colorArray[i] = parseInt(colorArray[i]); // convert hex -> dec
			}
			return (Math.round(colorArray[0] + colorArray[1] + colorArray[2]) / 3 < 128) ? 'white' : 'black';
		}
		else return 'black';
	}

	var st = document.createElement('span');
	st.innerHTML = ['<style>'
	, settings.embedMax() ? 'embed, img { max-width: 600px; max-height: 400px; }' : ''
	, settings.scores() ? '.entry_details_text font:first-of-type { cursor: default; }' : ''
	,'#comments li { left: 0; margin-bottom: 10px; }'
	,'#wl { overflow: hidden; white-space: nowrap; cursor: pointer; }'
	,'#watchlist a { color: inherit; text-decoration: none; }'
	,'.commentHeader { display: block; margin: -5px -10px 5px -10px; padding: 5px 10px 0px 10px; '
	//	+ (settings.boxShadows() ? (css3 ? 'border-radius: 7px 7px 0px 0px }'
		+ (true ? (css3 ? 'border-radius: 7px 7px 0px 0px }'
		: '-moz-border-radius: 7px 7px 0px 0px; -webkit-border-radius: 7px 7px 0px 0px; }')
		: ' }')
	,'.sensibleComments { list-style: none; padding: 0; left: 5px; }'
	,'.sensibleComments > li { padding: 5px 10px; width: 600px; margin: 5px 0; }'
	,'.plusminus { background-color: #fff; border: 1px solid black; color: black; '
	,'float: left; margin-right: 5px; line-height: 8px; font-family: "Courier New","Courier",serif;}'
	,'.plusminus td { text-align: center; vertical-align: 50%; cursor: pointer; }'
	,'.equalhash { background-color: #fff; border: 1px solid black; color: black; '
	,'float: left; margin-right: 5px; line-height: 8px; font-family: "Courier New","Courier",serif;}'
	,'.equalhash td { text-align: center; vertical-align: 50%; cursor: pointer; }'
	,'option.r { color:#930; }'
	,'option.g { color:#390; }'
	,'.replyLink { font-style: italic; font-size: 9px; text-align: right; font-family: Helvetica, Arial, "Bitstream Vera Sans"; }'
	,'.pseudoLink, .trollLink { text-decoration: underline; cursor: pointer; }'
	,'.placeholder > .trollLink { text-decoration: none !important; display: block; padding: 10px; border: 1px solid black; background-color: #333; color: #CCC;}'
	,'.placeholder { text-align: center;}'
	,'.select { font-size: 9px; display: inline; width: 110px; }'
	,'.inlineModButton { font-size: 9px; display: inline; }'
	,'.infin { text-decoration: none; font-size: 14px; margin: -4px 0; }'
	,'</style>'].join('\n');
	document.body.insertBefore(st, document.body.firstChild);

	var entry=location.href.split('/'); entry=entry[entry.length - 1];
	var isWatched = getNode("/html/body/div[@class='left_col']/div/a[@href='/entry.php/"+entry+"']");

	var wlHeader = getNode("/html/body/div[@class='left_col']/div[@class='date_header_text' and child::text()='Entry Watch List']")
	, wl = getNode("/html/body/div[@class='left_col']/div[@class='entry_details_text']");
	if (settings.watchlist() && loggedIn() && wlHeader && wl) {
		wl.id = "wl";
		var links = wl.getElementsByTagName('a'), watchlist = [], wlCategories = [];
		wlHeader.style.display = 'none';
		for (var j=0; j<links.length; j++) {
			watchlist.push({
				"label" : links[j].text || '('+links[j].href.replace(/^.+entry\.php\//i, '')+')',
				"cat" : GM_getValue("w_" + links[j].href.replace(/^.+entry\.php\//i, ''), settings.wlDefault()),
				"href" : links[j++].href,
				"del" : links[j++].href,
				"total" : links[j].innerHTML.replace('total','comments'),
				"new" : (links[j].nextSibling.nodeName.toLowerCase() != 'br')
			});
		}
		wl.innerHTML = '<div id="watchlist"></div>';
		wl.parentNode.insertBefore(document.createElement('br'), wl.nextSibling);
		quickSort(watchlist, "cat", 0, watchlist.length - 1);
		for (var j=0; j<watchlist.length; j++) {
			if (!document.getElementById('cat_' + watchlist[j]["cat"])) {
				var cat = document.createElement('div'), catHead = document.createElement('div');
				with (catHead) {
					className = 'watchlist_category';
					innerHTML = (GM_getValue("wv_" + watchlist[j]["cat"], "block") == "block" ? arrowDown : arrowRight) + " " + watchlist[j]["cat"];
					id = "head_" + watchlist[j]["cat"];
				}
				queueEvent(catHead, "click", showHideCat, true);
				with (cat) {
					id = "cat_" + watchlist[j]["cat"];
					style.display = GM_getValue("wv_" + watchlist[j]["cat"], "block");
				}
				wlCategories.push(watchlist[j]["cat"]);
				document.getElementById('watchlist').appendChild(catHead);
				document.getElementById('watchlist').appendChild(cat);
			}
		}
		quickSort(watchlist, "label", 0, watchlist.length - 1);
		for (var j=0; j<watchlist.length; j++) {
			var item = document.createElement('div'), text = watchlist[j]["label"];
			item.setAttribute('tooltip', text + " (" + watchlist[j]["total"] + ")");
			text = (text.length > 22) ? text.substring(0,20) + '...' : text;
			with (item) {
				className = ((watchlist[j]["new"]) ? "new0" : "old0") + ' ' + watchlist[j]["href"];
				innerHTML = text;
				id = "watch" + j;
			}
			queueEvent(item, "dblclick", wLaunch, true);
			queueEvent(item, "click", wExp, true);
			queueEvent(item, "mouseover", wTooltip, true);
			queueEvent(item, "mouseout", tooltip.hide, true);
			document.getElementById("cat_" + watchlist[j]["cat"]).appendChild(item);
		}
		wl.parentNode.insertBefore(document.createElement('br'), wl.nextSibling);
	}

	function showHideCat (e) {
		e = e || window.event
		var clicked = e.srcElement || e.target;
		var cat = clicked.id.split('_')[1];
		var hasBeenHidden = (document.getElementById("cat_" + cat).style.display == "none");
		document.getElementById("cat_" + cat).style.display = hasBeenHidden ? "block" : "none";
		clicked.innerHTML = (hasBeenHidden ? arrowDown : arrowRight) + " " + cat;
		GM_setValue("wv_" + cat, document.getElementById("cat_" + cat).style.display);
	}

	function wTooltip(e) {
		e = e || window.event;
		var hover = e.srcElement || e.target;
		tooltip.show(hover.getAttribute('tooltip'));
	}

	function wLaunch(e) {
		e = e || window.event
		var clicked = e.srcElement || e.target;
		var idx = clicked.id.replace('watch','');
		location.href = watchlist[idx].href;
	}

	function wExp(e) {
		e = e || window.event
		var clicked = e.srcElement || e.target;
		var idx = clicked.id.replace('watch','');
		var w = watchlist[idx];
		if (document.getElementById('wPanel')) {
			var temp = document.getElementById('wPanel');
			var temp2 = temp.previousSibling;
			temp.parentNode.removeChild(temp);
			if (temp2.id == clicked.id) return true;
		}
		var guts = ['<center><span id="catTrigger">organize</span> | <a id="catVisit" href="' + w.href + '">visit</a> | '
		,'<span id="wlDel" ttURL="' + w.del + '">delete</span></center>'].join('\n');
		var panel = document.createElement('div');
		with (panel) {
			innerHTML = guts;
			id = "wPanel"
		}
		clicked.parentNode.insertBefore(panel, clicked.nextSibling);
		queueEvent(document.getElementById('catTrigger'), "click", catConfig, true);
		queueEvent(document.getElementById('wlDel'), "click", wlDelete, true);
		queueEvent(document.getElementById('catTrigger'), "mouseover", catTooltip1, false);
		queueEvent(document.getElementById('catTrigger'), "mouseout", tooltip.hide, false);
		queueEvent(document.getElementById('catVisit'), "mouseover", catTooltip2, true);
		queueEvent(document.getElementById('catVisit'), "mouseout", tooltip.hide, false);
		queueEvent(document.getElementById('wlDel'), "mouseover", catTooltip3, false);
		queueEvent(document.getElementById('wlDel'), "mouseout", tooltip.hide, false);
	}

	function catTooltip1() {
		tooltip.show('Arrange entries into categories');
	}

	function catTooltip2(e) {
		e = e || window.event
		var hover = e.srcElement || e.target;
		tooltip.show('Visit ' + hover.href);
	}

	function catTooltip3() {
		tooltip.show('Remove from watchlist');
	}
	
	function wlDelete(e) {
		e = e || window.event
		var clicked = e.srcElement || e.target;
		if (!confirm("Are you sure you want to delete this watch list entry?")) return false;
		location.href = clicked.getAttribute("ttURL");
	}

	function catConfig() {
		var catSelect = document.createElement('select'),  catNewInput = document.createElement('input')
			, catOK = document.createElement('button'), catCancel = document.createElement('button')
			, wPanel = document.getElementById('wPanel');
		catSelect.add(new Option("Select a category", false), null);
		for (var i=0; i<wlCategories.length; i++) {
			catSelect.add(new Option(wlCategories[i]), null);
		}
		catSelect.add(new Option("New category..."), null);
		with (catNewInput) {
			id = "wPanel_input";
			style.display = "none";
			style.fontSize = "10px";
			style.height = "20px";
			maxLength = 20;
		}
		with (catSelect) {
			id = "wPanel_select";
			style.fontSize = "10px";
			style.height = "20px";
		}
		queueEvent(catSelect, "change", catCreateNewUnhideInput, true);
		with (catOK) {
			innerHTML = "OK"
			style.fontSize = "10px";
			style.height = "20px";
		}
		queueEvent(catOK, "click", catChoose, true);
		with (catCancel) {
			innerHTML = "Cancel"
			style.fontSize = "10px";
			style.height = "20px";
		}
		queueEvent(catCancel, "click", catDestroyChooser, true);
		with (wPanel) {
			innerHTML = '';
			appendChild(catNewInput);
			appendChild(catSelect);
			appendChild(document.createElement('br'));
			appendChild(catOK);
			appendChild(catCancel);
		}
	}

	function catChoose() {
		var idx = document.getElementById('wPanel').previousSibling.id.replace('watch','');
		var newCatMenu = document.getElementById('wPanel_select');
		var newCat = newCatMenu.options[newCatMenu.selectedIndex].value;
		if (document.getElementById('wPanel_input').style.display != "none") {
			var cat = document.createElement('div'), catHead = document.createElement('div');
			newCat = document.getElementById("wPanel_input").value;
			with (catHead) {
				className = 'watchlist_category';
				innerHTML = (GM_getValue("wv_" + newCat, "block") == "block" ? arrowDown : arrowRight) + " " + newCat;
				id = "head_" + newCat;
			}
			queueEvent(catHead, "click", showHideCat, true);
			with (cat) {
				id = "cat_" + newCat;
				style.display = GM_getValue("wv_" + newCat, "block");
			}
			document.getElementById('watchlist').appendChild(catHead);
			document.getElementById('watchlist').appendChild(cat);
			wlCategories.push(newCat);
		}
		if (document.getElementById('cat_' + newCat)) {
			GM_setValue('w_' + watchlist[document.getElementById('wPanel').previousSibling.id.replace('watch','')]['href'].replace(/^.+entry\.php\//i, ''), newCat);
			settings.saveSettings();
			document.getElementById('cat_' + newCat).appendChild(document.getElementById('wPanel').previousSibling);
		}
		catDestroyChooser();
		catCleanup();
	}

	function catCleanup() {
		for (var i=0; i<wlCategories.length; i++) {
			var found = false;
			for (var j=0; j<watchlist.length; j++) {
				if (GM_getValue('w_' + watchlist[j]['href'].replace(/^.+entry\.php\//i, ''), null) == wlCategories[i]) {
					found = true;
					break;
				}
			}
			if (!found && wlCategories[i] != settings.wlDefault()) {
				with (document.getElementById('watchlist')) {
					removeChild(document.getElementById('cat_' + wlCategories[i]));
					removeChild(document.getElementById('head_' + wlCategories[i]));
				}
			}
		}
	}

	function catCreateNewUnhideInput() {
		var newCatMenu = document.getElementById('wPanel_select');
		var newCat = newCatMenu.options[newCatMenu.selectedIndex].value;
		if (newCat == "New category...") {
			newCatMenu.style.display = "none";
			document.getElementById('wPanel_input').style.display = "inline";
			document.getElementById('wPanel_input').focus();
		}
		else catChoose();
	}

	function catDestroyChooser() {
		document.getElementById('wPanel').parentNode.removeChild(document.getElementById('wPanel'));
	}

	benchmark('Loaded watchlist');

	// stop here if not on an entry page
	if (location.href.indexOf('entry.php') < 0) return true;

	var name, email, broken;
	if (loggedIn()) {
		broken = !getNode("/html/body/div[@id='Layer1']/form");
		name = broken ? getNode("(/html/body/div[@id='Layer1']//input[@name='name'])[last()]").value
			: getNode('/html/body/div/form/span/input').value;
		email = broken ? getNode("(/html/body/div[@id='Layer1']//input[@name='email'])[last()]").value
			: getNode('/html/body/div/form/table/tbody/tr/td/input').value;
	}

	var spacers = getNodes("/html/body/div[@id='Layer1']/table/tbody/tr/td/img[@src='/images/spacer.gif']")
	, commentsTables = getNodes("/html/body/div[@id='Layer1']/table[@cellpadding!='5']")
	, commentsCells = getNodes("/html/body/div[@id='Layer1']/table[@cellpadding!='5']/tbody/tr/td[2]")
	, entryDetails = getNodes("/html/body/div[@id='Layer1']/table[@cellpadding!='5']/tbody/tr/td[2]/span[@class='entry_details_text']")
	, modReplies = getNodes("/html/body/div[@id='Layer1']/table[@cellpadding!='5']/tbody/tr/td[2]/span[@class='entry_details_text']/a[3]")
	, authors = getNodes("/html/body/div[@id='Layer1']/table[@cellpadding!='5']/tbody/tr/td[2]/span[@class='entry_details_text']/a[2]")
	, commentsText = getNodes("/html/body/div[@id='Layer1']/table[@cellpadding!='5']/tbody/tr/td[2]/span[@class='text_12px']")
	, commentsHeader = getNode("/html/body/div[@id='Layer1']/div[@class='date_header_text' and child::text()='Comments']")
	, postAComment = getNode("/html/body/div[@id='Layer1']/br[4]")
	, pageBuild = [], comments = [], newComments = 0, newID = 0;

	if (!entryDetails) return true;

	function hideVideos(collection) {
		if (collection.length == 0) return true;
		for (var i=collection.length - 1; i>-1; i--) {
			if (i==0) {
				var placeholder = document.createElement('span');
				placeholder.className = 'placeholder';
				placeholder.innerHTML = '<span class="trollLink"><span style="font-size: 50px">'
				+ arrowRight + '</span><br>Click to view video</span>';
				collection[i].parentNode.insertBefore(placeholder, collection[i]);
			}
			collection[i].parentNode.removeChild(collection[i]);
		}
	}

	function doLinkify(txt) {
		if (settings.linkifyText() && txt.length > 5) {
			var tagsRxp = /(<a [^>]+>[^<]+<\/a>|<[^>]+>)/ig,
			addrRxp = /(((h(t|x){2}p|ftp)s?:\/\/|www\.\w|ftp\.\w|[\w-_\.]+@)[\w-\.:@]+\.[a-z]{2,4}[^\s\[\]\<\>\"]*)/gi,
			url = txt.replace(tagsRxp,'').match(addrRxp),
			txt = url ? txt.split(tagsRxp) : [txt];
			for (var j=0; url && j<url.length; j++) {
				var fixed = url[j].replace('hxxp','http');
				if (fixed.indexOf('@') > -1 && fixed.indexOf(':') < 0 && fixed.indexOf('/') < 0) fixed = 'mailto:' + fixed;
				else if (!/^(http|ftp)/i.test(fixed)) fixed = 'http://' + fixed;
				if (/\.(jpe?g|png|gif|bmp)$/i.test(fixed)) fixed = '<img src="' + fixed + '" title="Sensible Facial: interpreted URL as image" '
				+ 'onerror="a=document.createElement(\'a\');a.innerHTML=this.src;a.href=this.src;a.target=\'_blank\';a.title=\'Sensible Facial: linkified URL\';this.parentNode.insertBefore(a,this);this.parentNode.removeChild(this);" />';
				else fixed = '<a href="' + fixed + '" title="Sensible Facial: linkified URL" target=_blank>' + fixed + '</a>';
				for (var k=0; k<txt.length; k++) {
					if (txt[k].indexOf(url[j]) > -1 && !tagsRxp.test(txt[k]))
						txt[k] = txt[k].replace(url[j], fixed);
				}
			}
			txt = txt.join('');
		}
		return txt;
	}

	// first, inventory all comments
	for (var i=0; i<entryDetails.length; i++) {

		var ed = entryDetails[i].innerHTML, ts = ed.substring(ed.indexOf('said @'),ed.toLowerCase().indexOf('- <a'));
		ts = settings.timestampMods() ? ts.split(' ') : (ts.indexOf('Score:') > -1 ? ts.substring(0, ts.indexOf('[')) : ts);

		// fix broken comments
		if (broken) {
			var comment = commentsText[i].innerHTML,
			tagsInComment = comment.match(/<\w[^>]+>/mg);

			if ((comment.split('<').length != comment.split('>').length) || comment.toLowerCase().indexOf('</body>') > -1) {
				// oh shit!  WTF is this?  Failsafe: wrap the whole damn thing in a <textarea>
				comment = '<i>Sensible Facial warning: This comment is fucked beyond repair.&nbsp; '
				+ 'Sanitizing comment and cramming into a &lt;textarea&gt; as a last resort.</i><br><br>'
				+ '<textarea style="width: 600px; height: 250px; font-size: 11px;">'
				+ comment.replace(/<br ?\/?>/ig,'\n').replace(/<[^>]+>/mg,'').replace(/<?>?/g,'')
				+ '</textarea>';
			}
			else if (tagsInComment) {
				// Well maybe it's not so bad.  Let's see if we can fix it.
				for (var j=tagsInComment.length - 1; j>-1; j--) {
					var tagName = tagsInComment[j].match(/\w+/)[0].toLowerCase();
					// Do any tags contain an odd number of quotation marks?
					if ((tagsInComment[j].split('"').length - 1) % 2) 
						comment = '<i>Sensible Facial warning: This comment contains a code '
						+ 'error (mismatched quotes in &lt;' + tagName + '&gt; tag).&nbsp; '
						+ 'Attempting to compensate.</i><br><br>'
						+ comment.split(tagsInComment[j])[0]
						+ tagsInComment[j].replace('>','">')
						+ comment.split(tagsInComment[j])[1];
					// skip tags that don't need closed
					if (/(br|hr|li|img|link|embed|param|input)/i.test(tagName)) continue;
					// close all others if open
					if (comment.toLowerCase().indexOf('</' + tagName) < 0)
						comment = '<i>Sensible Facial warning: This comment contains a code '
						+ 'error (no closing &lt;' + tagName + '&gt; tag).&nbsp; '
						+ 'Attempting to compensate.</i><br><br>'
						+ comment + '</' + tagName + '>';
				}
			}
			commentsText[i].innerHTML = comment;
		}
		if (settings.embedHide() && commentsText[i]) {
			for (var e=0; e<3; e++) {
				hideVideos(commentsText[i].getElementsByTagName(['object','embed','iframe'][e]));
			}
		}
		comments.push({
			"node": commentsTables[i],
			"depth": spacers[i] ? spacers[i].width / 10 : 0,
			"modReply": (loggedIn() && modReplies[i]) ? modReplies[i].href : null,
			"authorName": authors[i] ? authors[i].text : null,
			"authorLink": authors[i] ? authors[i].href : null,
			"isNew": commentsCells[i] ? (commentsCells[i].style.backgroundColor == 'rgb(238, 238, 238)') || (commentsCells[i].style.backgroundColor.toLowerCase() == '#eeeeee'): false,
			"comment": commentsText[i] ? doLinkify(commentsText[i].innerHTML) : null,
			"score": (ed.toLowerCase().indexOf('[<font')>-1) ? ed.substring(ed.toLowerCase().indexOf('[<font'),ed.toLowerCase().indexOf('</font>]') + 8) : '',
			"timestamp": settings.timestampMods() ? ts[2] + ' ' + ts[5] + ' ' + ts[4] : ts,
			"index": i
		});
		if (comments[i] && comments[i].isNew) newComments++;
		if (comments[i] && comments[i].score.indexOf('Score:-') > -1 && comments[i].comment
			&& comments[i].comment.indexOf('filtered comment under your threshold') > -1) {
			comments[i].comment += '<span class="replyLink">(<span class="trollLink">view anyway</span>)</span>';
		}
	}

	commentsHeader.innerHTML = comments.length + ' comments' + (newComments > 0 ? ' (' + newComments + ' new)' : '');
	commentsHeader.id = 'commentsHeader';

	if (!getNode("/html/body/div[@id='Layer1']/table/tbody/tr/td/span/a[@href='/?add_watch="+entry+"']") && !isWatched) {
		var pluswl = document.createElement('p');
		pluswl.className = "entry_details_text";
		pluswl.innerHTML = '[<a href="/?add_watch=' + entry + '">+watchlist</a>]<br>';
		commentsHeader.parentNode.insertBefore(pluswl,commentsHeader);
	}

	if ((settings.mods() || settings.replies()) && loggedIn()) {

		if (document.forms[0] && document.forms[0].getElementsByTagName('select')[0]) {
			document.forms[0].getElementsByTagName('select')[0].add(new Option('+/-0 Meh','11', false), null);
		}
		var s = ['<select name="comment_mod_type_id" class="select">'
		, '<option value="">no vote</option>'
		, '<option value="1" class="g">+1 Good</option>'
		, '<option value="2" class="g">+1 Insightful</option>'
		, '<option value="3" class="g">+1 Funny</option>'
                , '<option value="4" class="g">+1 Underrated</option>'
		, '<option value="5" class="g">+1 Informative</option>'		
		, '<option value="6" class="g">+1 Original</option>'
		, '<option value="7" class="g">+1 Interesting</option>'
		, '<option value="8" class="g">+1 WTF</option>'
		, '<option value="9" class="r">-1 Repost</option>'
		, '<option value="10" class="r">-1 Overrated</option>'
		, '<option value="11" class="r">-1 Unworthy Self Link</option>'
		, '<option value="12" class="r">-1 Troll</option>'
		, '<option value="13" class="r">-1 Flamebait</option>'
		, '<option value="14" class="r">-1 Bad</option>'
		, '<option value="15" class="r">-1 Old</option>'
		, '<option value="16" class="r">-1 WTF</option>'
		, '<option value="17" class="r">-1 Wrong Category</option>'
		, '<option value="18" class="r">-1 Boring</option>'
		, '<option value="19" class="g">+1 Hot Pr0n</option>'
		, '<option value="20" class="g">+1 Classy Pr0n</option>'
		, '<option value="21" class="r">-1 Bad Pr0n</option>'
		, '<option value="22" class="r">-1 Illegal Pr0n</option>'
		, '</select>'
		, '<button class="inlineModButton">mod</button>'];
	}

	function buildComment(cObj) {
		// console.log("authorLink:", cObj.authorLink, cObj.authorName);
		var commentsFragment=['<ul class="sensibleComments">'
		, '<li class="' + (cObj.isNew ? 'new' : 'old') + cObj.depth % (settings.altColors() ? 2 : 1) + '"'
		+ (cObj.isNew && settings.jump() ? ' id="newComment' + newID++ + '">' : '>')
		, '<span class="commentHeader">'
		, (settings.comments() ? '<table class="plusminus" id="plusMinus'+cObj.index
			+'" title="Collapse thread"><tbody><tr><td>-</td></tr></tbody></table>'
			+'<table class="equalhash" id="equalHash'+cObj.index
			+'" title="Hide sibling threads"><tbody><tr><td>=</td></tr></tbody></table>' : '')
		, '<span class="entry_details_text"><a href="' + cObj.authorLink + '">' + cObj.authorName + '</a>'
		, cObj.timestamp, cObj.score
		, settings.mods() ? ' - <a href="' + cObj.modReply + '" title="' + cObj.modReply + '" class="infin">&infin;</a> '
			+ '<span><input type="hidden" name="parent_id" value="' + cObj.modReply.split('/')[5] + '" />'
			+ s.join('\n') + '</span></span>' : ' - <a href="' + cObj.modReply + '">moderate / reply</a></span>'
		, '</span>'
		, '<div class="text_12px" id="comment' + cObj.index + '">' + cObj.comment];
		if (settings.replies()) commentsFragment.push('<div id="formBuild'+cObj.index+'" '
		, 'style="display: none" class="text_12px"><hr />'
		, 'name<br /><input type="text" name="name" value="'+name+'" /><br />'
		, 'email address<br /><input type="text" name="email" value="'+email+'" /><br />'
		, '<input type="checkbox" name="email_replies" value="1" /> email replies to this entry<br />'
		, '<input type="checkbox" name="add_watch" value="'+location.href+'" /> add entry to watch list<br />'
		, '<textarea name="comment" rows="10" wrap="VIRTUAL" style="width: 490px"></textarea><br />'
		, '<button class="inlinePostButton">post</button>'
		, '<input type="hidden" name="action" value="post" />'
		, '<input type="hidden" name="parent_id" value="'+cObj.modReply.split('/')[5]+'" />'
		, '<input type="hidden" name="score_adj" value="0" />'
		, '</div>'
		, '<div class="replyLink" id="replyLink'+cObj.index+'">(<span class="entry_details_text pseudoLink replyLink" '
		, 'onclick="document.getElementById(\'formBuild'+cObj.index+'\').style.display = \'inline\';'
		, 'document.getElementById(\'cancel'+cObj.index+'\').style.display = \'inline\';'
		, 'document.getElementById(\'replyLink'+cObj.index+'\').style.display = \'none\';'
		, 'document.getElementById(\'formBuild'+cObj.index+'\').getElementsByTagName(\'textarea\')[0].focus();"'
		, '>Reply to this comment</span> |'

		, ' <span class="entry_details_text pseudoLink replyLink" '
		, 'onclick="var fb=document.getElementById(\'formBuild'+cObj.index+'\'),ta=fb.getElementsByTagName(\'textarea\')[0];'
		, 'fb.style.display = \'inline\';'
		, 'ta.value = ta.value.length ? ta.value : \'<blockquote><i>\'+document.getElementById(\'comment'+cObj.index+'\').innerHTML.substring(0,document.getElementById(\'comment'+cObj.index+'\').innerHTML.indexOf(\'<div id\')).replace(/<(?!a|b|\\/a|\\/b|u|\\/u|l)[^>]*>/ig,\'\').replace(/<br[^>]*>/ig,\'\').replace(/^\\s+/,\'\').replace(/\\s+$/,\'\')+\'</i></blockquote>\\n\';'
		, 'if (!/\\S/.test(ta.value.replace(/<[^>]*>/ig,\'\'))) ta.value = \'\';'
		, 'if (typeof ta.selectionStart == \'number\') ta.selectionStart = ta.selectionEnd = ta.value.length;'
		, 'else if (typeof ta.createTextRange != \'undefined\') {ta.focus();var range = ta.createTextRange();range.collapse(false);range.select();}'
		, 'document.getElementById(\'cancel'+cObj.index+'\').style.display = \'inline\';'
		, 'document.getElementById(\'replyLink'+cObj.index+'\').style.display = \'none\';'
		, 'ta.focus(); ta.scrollTop = ta.scrollHeight;"'
		, '>Quote this comment</span>)'

		,'</div>'
		, '<button id="cancel'+cObj.index+'" style="display: none" onclick="'
		, 'document.getElementById(\'formBuild'+cObj.index+'\').style.display = \'none\';'
		, 'document.getElementById(\'cancel'+cObj.index+'\').style.display = \'none\';'
		, 'document.getElementById(\'replyLink'+cObj.index+'\').style.display = \'block\';">'
		, 'cancel</button>');
		for (var i=cObj.index + 1; i<comments.length && comments[i].depth > cObj.depth; i++) {
			// If there's a reply, append it.  If there's a reply to the reply, append it to the first reply.  Etc.
			if (comments[i].depth == cObj.depth + 1) commentsFragment.push(buildComment(comments[i]));
		}
		commentsFragment.push('</div></li></ul>');
		return commentsFragment.join('\n');
	}

	pageBuild.push(Layer1.innerHTML.substring(0,Layer1.innerHTML.indexOf(commentsHeader.innerHTML)) + commentsHeader.innerHTML + '</div>');

	// start appending the top level of comments.
	for (var i=0; i<comments.length; i++) {
		if (comments[i].depth == 0) {
			pageBuild.push(buildComment(comments[i]));
		}
	}

	pageBuild.push('<br><div class="date_header_text">Post a comment</div>'
	+ '<span class="text_12px">' + getNode("/html/body/div/span").innerHTML + '</span>'
	+ '<br>'
	+ '<form action="' + location.href + '" method="post" name="form1">'
	+ (!broken ? getNode("/html/body/div/form").innerHTML : (
		'<span class="text_12px">name<br>'
		+ '<input type="text" name="name" style="width:200" class="text_12px" value="' + name + '">'
		+ '<br>email address<br></span> <table width="100%%" border="0" cellspacing="0" cellpadding="0">'
		+ '<tr><td class="text_12px"><input type="text" name="email" style="width:200" class="text_12px" '
		+ 'value="' + email + '"></td><td align="right"></td></tr></table>'
		+ '<span class="text_12px"><input type="checkbox" name="email_replies" value="1" class="text_12px">'
		+ 'email me replies to this entry</span><textarea name="comment" rows="10" wrap="VIRTUAL" '
		+ 'class="text_12px" style="width:490"></textarea><input type="submit" name="submit" value="post" '
		+ 'class="text_12px"><input type="hidden" name="action" value="post">'
	))
	+ '</form><br>');

	benchmark('Finished computing comment tree');

	// reconstruct Layer1 -- This is much faster than screwing with deleting and appending nodes.
	Layer1.innerHTML = pageBuild.join('\n');

	if (settings.mods()) {
		function makeModButtonsClicky() {
			var wasMod = this.parentNode,
			parentID = wasMod.getElementsByTagName('input')[0].value,
			selection = wasMod.getElementsByTagName('select')[0];
			selection = selection.options[selection.selectedIndex];
			wasMod.innerHTML = '&nbsp;&nbsp;';
			wasMod.appendChild(wait);
			var sendData = 'parent_id=' + parentID + '&comment_mod_type_id=' + selection.value;
			GM_xmlhttpRequest({
				method: 'POST',
				url: location.href,
				data: sendData,
				onload: function(oXML) { wasMod.innerHTML = '&nbsp;&nbsp;Vote submitted.'; },
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			});
		}
		var modButtons = getNodes("/html/body/div[@id='Layer1']//button[@class='inlineModButton']");
		for (var i=0; i<modButtons.length; i++) {
			queueEvent(modButtons[i], 'click', makeModButtonsClicky, true);
		}
	}

	if (settings.replies()) {
		function makePostButtonsClicky() {
			var wasPost = this.parentNode, argsToSend = [], inputs = wasPost.getElementsByTagName('input');
			if (settings.altColors()) {
				var thisCSSClass = wasPost.parentNode.parentNode.className;
				thisCSSClass = thisCSSClass.substring(thisCSSClass.length - 1);
				thisCSSClass = (thisCSSClass == "0") ? "new1" : "new0";
			}
			else var thisCSSClass = "new0";
			for (var j in inputs) {
				argsToSend.push(inputs[j].name + '='
				+ ((inputs[j].type != "checkbox" || (inputs[j].type == "checkbox" && inputs[j].checked))
				? encodeURIComponent(inputs[j].value) : ''));
			}
			var ta = wasPost.getElementsByTagName('textarea')[0];
			ta.value = ta.value.replace(/(<\/blockquote>)\s+(\S)/ig, '$1$2').replace(/\s+(<blockquote>)/,'\n$1');
			var submittedComment = wasPost.getElementsByTagName('textarea')[0].value;
			var convertedComment = [];
			for (var i=0; i<submittedComment.length; i++) {
				var c = submittedComment.charCodeAt(i);
				convertedComment.push((c < 128) ? submittedComment.substring(i,i+1) : '&#' + c + ';');
			}
			submittedComment = convertedComment.join('');
			argsToSend.push('comment=' + encodeURIComponent(submittedComment));
			wasPost.innerHTML = '<ul class="sensibleComments"><li class="'+thisCSSClass+'"></li></ul>';
			wasPost.getElementsByTagName('li')[0].appendChild(wait);
			var buttons = wasPost.parentNode.getElementsByTagName('button');
			for (var j in buttons) {
				if (/cancel/i.test(buttons[j].id)) buttons[j].style.display = 'none';
			}
			GM_xmlhttpRequest({
				method: "POST",
				url: location.href,
				data: argsToSend.join('&'),
				onload: function(oXML) {
					wasPost.innerHTML = '<ul class="sensibleComments"><li class="'+thisCSSClass+'">'
					+'<span class="commentHeader"><span class="entry_details_text">'
					+'Submitted the following comment:</span></span>'
					+'<div class="text_12px"></div></li></ul>';
					wasPost.getElementsByTagName('div')[0].innerHTML = submittedComment.replace(/\r?\n/g,'<br>');
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
			});
		}
		var postButtons = getNodes("/html/body/div[@id='Layer1']//button[@class='inlinePostButton']");
		for (var i=0; i<postButtons.length; i++) {
			queueEvent(postButtons[i], 'click', makePostButtonsClicky, true);
		}
	}

	if (GM_getValue('konami', false)) {
		var other = location.href.split('/'), num = (other[4] * -1), other = '/' + other[3] + '/' + num;
		if (num < 0) {
			GM_xmlhttpRequest({ method: "GET", url: other, onload: function(oXML) {
					if (oXML.responseText.indexOf('said @') > -1) {
						var link = getNode('/html/body/div[@id="Layer1"]/table/tbody/tr/td/span');
						if (link) {
							var yin = yy();
							link.insertBefore(yin, link.firstChild)
							queueEvent(yin, 'click', function() { location.href=other; }, false);
						}
					}
				}
			});
		}
	}

	benchmark('Displayed all comments');

	function viewTroll(idx) {
		var clicked = document.getElementById('comment' + idx);
		var keep = clicked.innerHTML.substring(clicked.innerHTML.toLowerCase().indexOf('<div id="formbuild' + idx));
		clicked.innerHTML = '<span class="text_12px">Retrieving trollery... please wait.</span>' + keep;
		GM_xmlhttpRequest({
			method: "GET",
			url: comments[idx].modReply,
			onload: function(oXML) {
				var trollery = oXML.responseText.substring(oXML.responseText.toLowerCase().indexOf('<span class="text_12px">'));
				clicked.innerHTML = doLinkify(trollery.substring(0, trollery.toLowerCase().indexOf("<form")) + keep);
				var childButtons = clicked.getElementsByTagName('button');
				for (var i=0; i<childButtons.length; i++) {
					if (childButtons[i].className == "inlinePostButton")
						queueEvent(childButtons[i], 'click', makePostButtonsClicky, true);
					else if (childButtons[i].className == "inlineModButton")
						queueEvent(childButtons[i], 'click', makeModButtonsClicky, true);
				}
				var spans = clicked.getElementsByTagName('span');
				for (var i=0; i<spans.length; i++) {
					if (spans[i].className && spans[i].className.indexOf('trollLink') > -1) {
						queueEvent(spans[i], "click", makeTrollLinksClicky, true);
					}
				}
			}
		});
	}

	var trolls = getNodes("/html/body/div[@id='Layer1']//span[@class='trollLink']");
	if (trolls) {
		function makeTrollLinksClicky() {
			var el = this;
			while ((el = el.parentNode) && el) {
				if (el.id && el.id.indexOf('comment') > -1) {
					viewTroll(el.id.replace('comment',''));
					break;
				}
			}
		}
		for (var i=0; i<trolls.length; i++) {
			queueEvent(trolls[i], "click", makeTrollLinksClicky, true);
		}
	}

	if (settings.jump()) {
		function calcPos() {
			var x1 = document.body.scrollLeft + window.innerWidth - 80 + 'px';
			var y1 = document.body.scrollTop + window.innerHeight - 40 + 'px'; 
			return {x:x1,y:y1};
		}
		function currentPos() {
			var cPos = document.body.scrollTop;
			return (settings.centerWhenJumping()) ? cPos + (window.innerHeight / 2) : cPos;
		}
		function elemPos(el) {
			for (var lx=0,ly=0;el!=null;lx+=el.offsetLeft,ly+=el.offsetTop,el=el.offsetParent);
			return {x:lx,y:ly};
		}
		var jumpSt = document.createElement('span');
		var ctrlPos = calcPos();
		var posMethod = (X11 && settings.compositeBug()) ? 'absolute' : 'fixed';
		jumpSt.innerHTML = ['<style>'
			,'#jumpCtrl { position: '+posMethod+'; top: '+ctrlPos.y+'; left: '+ctrlPos.x+'; }'
			,'.jumper { padding: 0px 4px; cursor: pointer; font-weight: bold; margin: 0px 1px; }'
			,'.jumpClick { border: 1px inset #c77; }'
			,'.jumpHover { border: 1px outset #c77; }'
			,'</style>'].join('\n');
		document.body.insertBefore(jumpSt, document.body.firstChild);
		var jumpCtrl = document.createElement('div');
		jumpCtrl.id = 'jumpCtrl';
		if (newComments == 0) jumpCtrl.innerHTML = '0 new';
		else {
			jumpCtrl.className = 'new0';
			var jumpTo = -1;
			var jumpPrev = document.createElement('span');
			with (jumpPrev) {
				className = 'jumper jumpHover';
				innerHTML = '&uarr;';
				setAttribute('id','jumpPrev');
				setAttribute('title','Jump to the previous new comment');
			}
			queueEvent(jumpPrev, 'click', function() {
				this.className="jumper jumpClick";
				this.blur();
				setTimeout('document.getElementById("jumpPrev").className = "jumper jumpHover"',150);
				var jumpTo = newComments - 1;
				var newComm = document.getElementById('newComment'+jumpTo);
				while (elemPos(newComm).y > currentPos() && jumpTo > 0) {
					jumpTo--;
					newComm = document.getElementById('newComment'+jumpTo);
				}
				if (Math.abs(elemPos(newComm).y - currentPos()) < 20 && jumpTo > 0) {
					jumpTo--;
					newComm = document.getElementById('newComment'+jumpTo);
				}
				newComm.scrollIntoView();
				if (settings.centerWhenJumping()) {
					scrollTo(0, Math.floor(document.body.scrollTop - (window.innerHeight / 2)));
				}
			}, false);
			queueEvent(jumpPrev, 'mouseUp', function() { this.className="jumper jumpHover"; }, false);
			var jumpNext = document.createElement('span');
			with (jumpNext) {
				className = 'jumper jumpHover';
				innerHTML = '&darr;';
				setAttribute('id','jumpNext');
				setAttribute('title','Jump to the next new comment');
			}
			queueEvent(jumpNext, 'click', function() {
				this.className="jumper jumpClick";
				this.blur();
				setTimeout('document.getElementById("jumpNext").className = "jumper jumpHover"',150);
				var jumpTo = 0;
				var newComm = document.getElementById('newComment0');
				while (elemPos(newComm).y < currentPos() && jumpTo < newComments - 1) {
					jumpTo++;
					newComm = document.getElementById('newComment'+jumpTo);
				}
				if (Math.abs(elemPos(newComm).y - currentPos()) < 20 && jumpTo < newComments - 1) {
					jumpTo++;
					newComm = document.getElementById('newComment'+jumpTo);
				}
				newComm.scrollIntoView();
				if (settings.centerWhenJumping()) {
					scrollTo(0, Math.floor(document.body.scrollTop - (window.innerHeight / 2)));
				}
				flash(newComm);
			}, false);
			queueEvent(jumpNext, 'mouseUp', function() { this.className="jumper jumpHover"; }, false);
			jumpCtrl.appendChild(jumpPrev);
			jumpCtrl.appendChild(jumpNext);
		}
		Layer1.insertBefore(jumpCtrl, Layer1.firstChild);
		var evt = (X11 && settings.compositeBug()) ? 'scroll' : 'resize';
		queueEvent(window, evt, function() {
			var ctrlPos = calcPos();
			jumpCtrl.style.top = ctrlPos.y;
			jumpCtrl.style.left = ctrlPos.x;
		}, false);
	}

	benchmark('Added jumper');

	if (settings.comments()) {
		// slow down looping so Firefox doesn't complain about a script stopped
		// when a post with 150+ comments is being parsed
		var minus='<tbody><tr><td>-</td></tr></tbody>', plus='<tbody><tr><td>+</td></tr></tbody>'
		, equal='<tbody><tr><td>=</td></tr></tbody>', hash='<tbody><tr><td>#</td></tr></tbody>';
		for (var i=0; i<comments.length; i++) {
			var pm = document.getElementById('plusMinus'+i),
			eh = document.getElementById('equalHash'+i);
			if (pm) {
				queueEvent(pm, 'click',function() {
					var obj = this, main = this.parentNode.parentNode.getElementsByTagName('div')[0]
					, plussed = this.innerHTML.indexOf('+') > -1;
					main.style.display = plussed ? 'block' : 'none';
					var children = obj.parentNode.getElementsByTagName('ul');
					for (var i=0; i<children.length; i++) {
						children[i].style.display = main.style.display;
					}
					obj.innerHTML = plussed ? minus : plus;
					obj.title = !plussed ? 'Expand thread' : 'Collapse thread';
				},true);
			}
			
			if (eh) {
				queueEvent(eh, 'click',function() {
					var obj = this, hashed = this.innerHTML.indexOf('#') > -1
					, parentPost = obj.parentNode.parentNode.parentNode.parentNode;
					var children = parentPost.childNodes;
					var oldScrollTop = postAComment.scrollTop;
					for (var i=0; i<children.length; i++) {
						if (children[i] != obj.parentNode.parentNode.parentNode && children[i].className == 'sensibleComments') {
							children[i].style.display = hashed ? 'block' : 'none';
						}
					}
					obj.innerHTML = hashed ? equal : hash;
					obj.title = !hashed ? 'Reveal sibling threads' : 'Hide sibling threads';
					parentPost = parentPost.parentNode.wrappedJSObject || parentPost.parentNode;
					parentPost.scrollIntoView();
					if (!hashed) flash(parentPost);
				},true);
			}
		}
	}

	benchmark('Began attaching events to comment scores');
	
	// tooltip on scores to retrieve modders
	function showScore(e) {
		e = e || window.event;
		var hover = e.srcElement || e.target;
		var tar = hover.parentNode;
		while (tar.nodeName.toLowerCase() != 'span') { tar = tar.parentNode };
		tar = tar.getElementsByTagName('a')[1].href
		if (!/comment\.php/.test(tar)) return;
		tooltip.show(' Retrieving details...');
		document.getElementById('ttcont').insertBefore(wait, document.getElementById('ttcont').firstChild);
		GM_xmlhttpRequest({ method: "GET", url: tar,
		onload: function(oXML) {
			var begin = '<div class="date_header_text">Comment Moderation</div>',
			end = '<div class="logo_box">';
			if (oXML.responseText.indexOf(begin) > -1 && oXML.responseText.indexOf(end) > -1) {
				var mods = oXML.responseText.substring(oXML.responseText.indexOf(begin), oXML.responseText.indexOf(end))
			} else {
				var mods = "Score was inherited.&nbsp; Don't feed the trolls."
			}
			document.getElementById('ttcont').innerHTML = mods;
			}
		});
	}

	if (settings.scores()) {
		var scores = getNodes("//span[@class='entry_details_text']//*[text()[starts-with(.,'Score:')]]");
		if (scores) {
			for (var i=0; i<scores.length; i++) {
				if (scores[i].nodeName.toLowerCase() != 'font' && scores[i].nodeName.toLowerCase() != 'strong') continue;
				var tar = scores[i].parentNode;
				while (tar.nodeName.toLowerCase() != 'span') tar = tar.parentNode;
				tar = tar.getElementsByTagName('a');
				if (!tar || !tar[1] || !/comment\.php/.test(tar[1].href)) continue;
				queueEvent(scores[i], "mouseover", showScore, true);
				queueEvent(scores[i], "mouseout", tooltip.hide, true);
			}
		}
	}

	// tooltip on users to retrieve true username
	function showUser(e) {
		e = e || window.event;
		var tar = e.srcElement || e.target;
		tooltip.show(' Checking user profile...');
		document.getElementById('ttcont').insertBefore(wait, document.getElementById('ttcont').firstChild);
		GM_xmlhttpRequest({ method: "GET", url: tar,
		onload: function(oXML) {
			document.getElementById('ttcont').innerHTML = "View profile for " + oXML.responseText.substring(oXML.responseText.indexOf('Profile - ') + 10, oXML.responseText.indexOf('</title>'));
			}
		});
	}

	if (settings.showUsers()) {
		var users = getNodes("//span[@class='entry_details_text']/a[contains(@href,'/profile.php')]");
		if (users) {
			for (var i=1; i<users.length; i++) {
					queueEvent(users[i], "mouseover", showUser, true);
					queueEvent(users[i], "mouseout", tooltip.hide, true);
			}
		}
	}
	
	

	benchmark('Began attaching events to plusminus / equalhash');

	if (settings.embedMax()) {
		function imgLoadHandler(e) {
			e = e || window.event;
			var thisImg = e.srcElement || e.target || e;
			if (thisImg.offsetWidth == 600 || thisImg.offsetHeight == 400) {
				if (thisImg.parentNode.href)
					thisImg.parentNode.removeAttribute('href');
				with (thisImg) {
					style.cursor = 'se-resize';
					title = 'Click to view full-size';
				}
				queueEvent(thisImg, 'click', function() {
					with (this) {
						style.cursor = this.style.cursor == 'se-resize' ? 'nw-resize' : 'se-resize';
						style.maxWidth = this.style.maxWidth == 'inherit' ? '600px' : 'inherit';
						style.maxHeight = this.style.maxHeight == 'inherit' ? '400px' : 'inherit';
						title = this.title == 'Click to shrink' ? 'Click to view full-size' : 'Click to shrink';
					}
				}, true);
			}
		}
		var images = getNodes("/html/body/div[@id='Layer1']/ul/li//img");
		if (images) {
			for (var i=0; i<images.length; i++) {
				with (images[i]) {
					removeAttribute('width');
					removeAttribute('height');
					removeAttribute('align');
				}
				// Opera refuses to attach an "onload" event to images after the src attribute has been set.
				if (opera || images[i].complete) imgLoadHandler(images[i]);
				else queueEvent(images[i], 'load', imgLoadHandler, true);
			}
		}
	}

	function flash(what) {
		if (!settings.blink()) return true;
		var flashes = 0
		var flasher = setInterval(function() {
			what.style.backgroundColor = (what.style.backgroundColor == 'white') ? '#999' : 'white';
			if (flashes++ == 7) {
				what.style.backgroundColor = '';
				clearInterval(flasher);
			}
		}, 150);
	}

	// http://stephengware.com/projects/javasocketbridge/
	/*
	unsafeWindow.java_socket_bridge_ready_flag = false;
	unsafeWindow.java_socket_bridge_ready = function() { java_socket_bridge_ready_flag = true; }
	unsafeWindow.java_socket_ready = function() { return (typeof unsafeWindow.document.getElementById('JavaSocketBridge') == 'function'); }
	unsafeWindow.socket_connect = function(url, port) { if (java_socket_ready()) { return unsafeWindow.document.getElementById('JavaSocketBridge').connect(url, port); } else { on_socket_error("Java Socket Bridge cannot connect until the applet has loaded"); } }
	unsafeWindow.socket_disconnect = function() { if (java_socket_ready()) { return unsafeWindow.document.getElementById('JavaSocketBridge').disconnect(); } else { on_socket_error("Java Socket Bridge cannot disconnect until the applet has loaded"); } }
	unsafeWindow.socket_send = function(message) { if (java_socket_ready()) { return unsafeWindow.document.getElementById('JavaSocketBridge').send(message);	} else { on_socket_error("Java Socket Bridge cannot send a message until the applet has loaded"); } }
	unsafeWindow.on_socket_get = function(message) { return process_server_response(message); }
	unsafeWindow.on_socket_error = function(message){ return irclog('<span style="color: #d20;">' + message + '</style>'); }

	unsafeWindow.irclog = function(message) {
		var ircout = document.getElementById('ircout');
		if (!ircout) return false;
		ircout.className = 'text_12px';
		var lines = ircout.innerHTML.split('\n<br>');
		var lastLine = lines.pop().replace(/ \{(\d+)\}$/, '');
		if (message == lastLine) {
			lines.push(lastLine + (RegExp.$1.length > 0 ? ' {' + (RegExp.$1 * 1 + 1) + '}' : ' {2}'));
			ircout.innerHTML = lines.join('\n<br>');
		} else {
			ircout.innerHTML = ircout.innerHTML + '\n<br>' + message;
		}
		ircout.scrollTop = ircout.scrollHeight;
		return message;
	}

	unsafeWindow.process_server_response = function(message) {
		if (/^PING :(.+)$/.test(message)) return socket_send('PONG :' + RegExp.$1);
		var ctcpcode = String.fromCharCode(01);
		var parts = message.split(' ');
		var response = {
			nick : parts[0].substring(1, parts[0].indexOf('!')),
			uhost : parts[0].substring(parts[0].indexOf('!') + 1),
			cmd : parts[1],
			target : parts[2],
			args : message.substring(message.indexOf(' :') + 2)
		}
		switch (parts[1]) {
			case '001':
			case '003':
			case '004':
			case '005':
			case '250':
			case '251':
			case '252':
			case '253':
			case '254':
			case '255':
			case '265':
			case '266':
			case '372':
			case '375':
			case '376':
				return;
				break;
		}
		if (message.indexOf(ctcpcode) > -1 && parts.length > 3) {
		
			var g = '<span style="color: green">';
			var lg = '<span style="color: #af5">';
			var e = '</span>'
			
			switch (parts[3].replace(/[^\w]/g, '')) {
				case 'PING':
					if (response.args && response.cmd == 'PRIVMSG') {
						ircsend('NOTICE ' + response.nick + ' :' + response.args);
						return irclog(lg + response.nick + e + ' [' + g + response.uhost + e + '] ' + g + 'requested ' + e + lg + 'PING' + e + g + ' from ' + lg + response.target + e);
					}
					break;
				
			}
		}
		return irclog(message);
	}
	function ircsend(what) {
		if (what.toLowerCase() == "/connect") {
			irc_connect();
			return;
		}
		if (what.substring(0,1) == "/") {
			what = what.substring(1).split(' ');
			what[0] = what[0].toUpperCase();
			if (what[0] == 'PING' && what[1]) what = ('CTCP ' + what[1] + ' PING').split(' ');
			if (what[2] == 'PING') what.push(Math.floor(new Date().getTime() / 1000));
			if (what[0] == 'CTCP' && what.length > 2) {
				var ctcpcode = String.fromCharCode(01);
				what[0] = 'PRIVMSG'
				what[2] = ctcpcode + what[2];
				what[what.length - 1] += ctcpcode;
			}
			if (what[2] && what[2].substring(0,1) != ':') what[2] = ':' + what[2];
			else if (what[1] && what[1].substring(0,1) != ':') what[1] = ':' + what[1];
			what = what.join(' ');
		}
		socket_send(what); irclog(what);
	}

	var java_socket_bridge_ready_flag = unsafeWindow.java_socket_bridge_ready_flag;
	var java_socket_ready = unsafeWindow.java_socket_ready;
	var java_socket_bridge_ready = unsafeWindow.java_socket_bridge_ready;
	var socket_connect = unsafeWindow.socket_connect;
	var socket_disconnect = unsafeWindow.socket_disconnect;
	var socket_send = unsafeWindow.socket_send;
	var on_socket_get = unsafeWindow.on_socket_get;
	var on_socket_error = unsafeWindow.on_socket_error;
	var irclog = unsafeWindow.irclog;
	var process_server_response = unsafeWindow.process_server_response;

	var irc_connect_attempts = 0;

	function irc_connect() {
		if (++irc_connect_attempts > 10) {
			irc_connect_attempts = 0;
			on_socket_error('Fuck it.  Giving up.');
			return false;
		}
		// irclog('java_socket_ready() = ' + java_socket_ready());
		if (!java_socket_ready()) { setTimeout(irc_connect,1000); return false; }
		irclog('Java applet loaded.  Connecting....');
		var nick = name.replace(/[^a-zA-Z0-9\-_^\{\}\[\]\\]/g, '');
		socket_connect('chat.freenode.net', 8001);
		socket_send('\nUSER sensible 8 * :'+nick+'\nNICK '+nick);
	}

	function chatlink() {
		var toppart = getNode("/html/body/div[@id='Layer1']/table[@cellpadding='5']");
		if (!toppart) return false;
		
		var clink = document.createElement('span');
		with (clink) {
			className = 'pseudoLink';
			style.cursor = 'pointer';
			style.display = 'inline';
			innerHTML = 'Chat<br />';
		}

		var app = document.createElement('span');
		with (app) {
			id = 'app';
			style.display = 'none';
			innerHTML = '<applet id="JavaSocketBridge" name="JavaSocketBridge" width="0" height="0" code="JavaSocketBridge.class" '
			+ 'archive="http://sensiblefacial.googlepages.com/JavaSocketBridge.jar"></applet>\n'
			+ '<span id="irc"><span id="ircout" style="width: 600px; height: 400px; border: 1px inset; '
			+ 'display: block; overflow: auto; padding: 5px">Loading Java applet....'
			+ '</span>\n<input id="ircin" style="width: 610px;" /></span><br />\n';
		}

		var p = toppart.parentNode;
		p.insertBefore(clink, toppart.nextSibling);
		p.insertBefore(app, toppart.nextSibling);

		queueEvent(clink, 'click', function(e) {
			e = e || event;
			var clicked = e.srcElement || e.target;
			var p = clicked.parentNode;
			p.removeChild(clicked);
			
			document.getElementById('app').style.display = 'block';

			queueEvent(document.getElementById('ircin'), 'keyup', function(e2) {
				e2 = e2 || event;
				if (e2.keyCode == 13) {
					e2 = e2.srcElement || e2.target;
					if (!e2.value.length) return false;
					ircsend(e2.value);
					e2.value = '';
				}
			}, true);

			irc_connect();
		}, true);
	} */
	
	// if (loggedIn()) chatlink();

	benchmark('Page loading complete');

})();


var textEntries = document.getElementsByClassName("entry_details_text");
    for (var i=0; i>textEntries.length; i++) {
        textEntries[i].style.display = "inline";
        }

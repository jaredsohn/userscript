// ==UserScript==
// @name           blip.fm script
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://blip.fm/*
// @version        0.0.1
// @description    Fixed the Flash wmode problem with Windows user. Add confirm DJ remove. Without ads, layout modification.
// ==/UserScript==

GM_addStyle(<><![CDATA[
	/* fixed the Flash wmode problem */
	#blipPlayer {position:fixed; bottom:0px;}

	/* layout modification */
	#display .bd {width:96%;}
	#frame {width:680px;}
	#page {width:680px;}
	div.col1 {width:480px;}
	div.col2 {width:190px;}
	div.col2 .badge {right:-5px !important;}

	#topstatsContainer {position: static;}
	#whoami {font-size:88%; position: relative; top: -12px;}
	a[href*="/settings/preferences"] {position: relative; top: -24px;}
	a[href*="/login/logout"] {position: relative; top: -24px;}
	img[src*="images/buttons/header/settings.png"] {height:16px; width:54px;}
	img[src*="images/buttons/header/logout.png"] {height:16px; width:50px;}
	button.search {display:none;}
	#search {width:340px;}
	#message {width:350px !important;}
	#help {margin:0 0 10px 0 !important;}
	#searchResults tbody tr td.songTitle {max-width:234px;}
	.fuzz-notice {left:0px;}

	/* without ads */
	#slot320x250,#slot728x90 {display:none;}
]]></>);

//add confirmAction
if(/^http:\/\/blip\.fm\/profile\/.*\/favoritePeople/.test(location.href)) {
	var x = document.evaluate('//button[@class="x"]', document, null, 7, null);
	for(var i=0;i<x.snapshotLength;i++){
		var func = x.snapshotItem(i).getAttribute("onclick");
		x.snapshotItem(i).setAttribute("onclick","confirmAction('Are you sure you want to remove this DJ from your Favorites?', function() {" + func + "})");
	}
}
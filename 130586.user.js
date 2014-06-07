// ==UserScript==
// @id				YouTubeSearchInNewTabLOKI
// @name           YouTubeSearchInNewTab
// @namespace      Loki.YouTubeSearchInNewTab
// @updateURL      http://userscripts.org/scripts/source/130586.user.js
// @include        http://www.youtube.com*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version			2.3
// ==/UserScript==

$(document).ready(function(){
	
    var srchButton = $("#search-btn").css({width:"5%"});
    $("#search-btn .yt-uix-button-content").css({margin:"0px 5px"});
	srchButton.parent().prepend(srchButton.clone()
	.attr('id','search-button-newTab')
	.attr('onClick','')
	.click(function(){
		var textFieldText = $("#masthead-search-term").val();
		if (textFieldText != "")
			window.open('http://www.youtube.com/results?search_query='+textFieldText);
		return false;
	}).css({float:"right",width:"5%"}).find("span").css({margin:'0px -5px',background:'url("//s.ytimg.com/yt/imgbin/www-refresh-vflmpZ5kj.png") no-repeat scroll -76px -210px transparent',width:'13px',height:'11px'}).end());
});
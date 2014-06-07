// ==UserScript==
// @name        SystemreQuirementsLab(Can You Run It)
// @namespace   systemrequirementslab
// @description SystemreQuirementsLab - Can You Run It, automatic skip, YouTube gameplay search and ads remove.
// @include     *systemrequirementslab.com*requirements*
// @version     1.0.0
// @grant       none
// ==/UserScript==

$(function(){
	if($("a[onclick^='SRL.logEventToGA']").length>0){
		$("a[onclick^='SRL.logEventToGA']").click();
	}
	else{
		$("#summary").after("<div id='YouTubeGamePlay' style='text-align:center; margin: auto;'></div>");
		var GameName = $("title").html().split(" system requirements")[0];
		$("#YouTubeGamePlay").prepend('<a style="cursor:pointer;" href="http://www.youtube.com/results?search_query=' + GameName + ' gameplay"><img style="cursor:pointer;" width="100" src="https://developers.google.com/youtube/images/YouTube_logo_standard_white.png"></img></br>Search on Youtube</a>');
		$("#video-ad").remove();
	}
});
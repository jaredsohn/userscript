// ==UserScript==
// @name           Years Watching YouTube
// @namespace      yearswatchingyoutube
// @description    Years Watching YouTube
// @include        http://www.youtube.com/*
// @require	  http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var $=window.jQuery;
window.jQuery.noConflict();

$(window).load(function(){
	$(".video-cell").each(function(){
		var views=0;
		var runtime="";
		if($(this).find(".video-view-count").length>0){
				var viewcount=$(this).find(".video-view-count").html();
				views=parseInt(viewcount.replace(/[,]/g,""));
				runtime=$(this).find(".video-time").html();
		}
			var seconds=parseInt(runtime.split(":")[0])*60+parseInt(runtime.split(":")[1]);
			var yearsgone=Math.round((views*seconds)/(60.0*60.0*24.0*365)*100)/100;
			if(yearsgone>1)yearsgone=Math.round(yearsgone*10)/10;
			var newfontsize=8+Math.min(20,20*(yearsgone/5));
			var msg="<b><font style='font-size:"+newfontsize+"pt' title='Years spent by YouTubers watching this video'>"+yearsgone+"</font></b>";
			if($(this).find("div.video-facets").length>0){
        $(this).find("div.video-facets").append(msg);
			}else if($(this).find("span.video-view-count").length>0){
        $(this).find("span.video-view-count").append(msg);
      }
	});
});





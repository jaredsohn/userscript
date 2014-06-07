// ==UserScript==
// @name           Lockerz Playlister
// @version        1.0
// @description    this will create a playlist of all the video's in a group on Lockerz.com 
// @namespace      http://userscripts.org/users/244381/playlister
// @include        http://www.lockerz.com/p/watch/*
// @exclude        http://www.lockerz.com/*:*
// @require        http://userscripts.org/scripts/source/85365.user.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var jQuery = $;

$(document).ready(function(){
	
	unsafeWindow.nextVid = function(){
		$("#videoFrame").attr("src", $(".vidLink:first .videoTitle").attr("href"));
		$(".vidLink:first").remove();
	}
	unsafeWindow.pageNumberClick = function pageNumberClick(num){
		var thumbnailArray;
		var selectedCat = unsafeWindow.selectedCat;
		var selectedGenre = unsafeWindow.selectedGenre; 
		var releasesPerPage = 12; 
		var endIndex;
		currentPage=num;
		endIndex=(num*releasesPerPage);
		startIndex=endIndex-(releasesPerPage-1);
		$.post('/content/video/get_thumbnails',{category_id:selectedCat,genre_id:selectedGenre,start_index:startIndex,end_index:endIndex},function(data){
			//remove useless lines
			thumbnailArray = data.replace('<input id="vid_count" type="hidden" value=12>','').replace('<input id="vid_max" type="hidden" value=538>','').replace('<input id="vids_per_page" type="hidden" value=12>','').split("</li>");
			//loop trough thumbnails selecting the good ones.
			$.each(thumbnailArray, function(index, value){
			
				if(value.indexOf("no-PTZ-awarded") > 0 && value.indexOf("regions") < 0)
				{
					$("#videoList").append(value + "</li>");
					
				}
				
			});
			console.log(num + "  " + $("#contentPagination a:last").html())
			if(num == $("#contentPagination a:last").html())
			{
				$("#videoFrame").attr("src", $(".vidLink:first .videoTitle").attr("href"));
				$(".vidLink:first").remove();
			}
			
		});}
		
		$("#contentFilters").css("height","auto").html("");
		$('<iframe id="videoFrame" name="videoFrame" FRAMEBORDER="0" scrolling="no" height="530px" width="730px">').appendTo("#contentFilters");
		unsafeWindow.clearVideos();
		unsafeWindow.pageNumberClick(1);
		$("#contentPagination a").each(function(i, val){
			unsafeWindow.pageNumberClick($(this).html());
		});		
});

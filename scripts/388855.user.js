// ==UserScript==
// @name           Youtube fake views
// @namespace      manytricks4u.blogspot.com
// @description    There are lot off fake videos on youtube which show wrong thumbnail and fools users. With this script you can see likes/dislikes without clicking on video.
// @include        http://www.youtube.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

$(document).ready(function(){
	// Home page
	var vindex = 0;
	var page   = "";

	if($(".feed-page").html() != null){
	  $(".feed-page").find("li").each(function(index){
			var append = $(this).find(".feed-item-thumb");
			var videoId = $(this).find("a").attr("href");
			getLikes(videoId,append);
	  });
	}

	if($("#watch-related").html() != null){
		$("#watch-related").find("li").each(function(index){
			var append = $(this).find(".ux-thumb-wrap");
			var videoId = $(this).find("a").attr("href");
			getLikes(videoId,append);
		});
	}
	
	// home page sidebar
	if($("#recommended-videos").html() != null){
	  $("#recommended-videos").find("li").each(function(index){
			var append = $(this).find(".ux-thumb-wrap");
			var videoId = $(this).find("a").attr("href");
			getLikes(videoId,append);
	  });
	}
	
	if($("#search-results").html() != null){
	   $("#search-results .result-item").each(function(index){
			var append = $(this).find(".ux-thumb-wrap");
			var videoId = $(this).find("a").attr("href");
			getLikes(videoId,append);
	   });
	}
	// channel page
	if($(".gh-single-playlist").html() != null){
	   $(".gh-single-playlist li").each(function(index){
			var append = $(this).find(".video");
			var videoId = $(this).find("a").attr("href");
			getLikes(videoId,append);

		});
	}

	$("button[id='getVideoLikes']").click(function(){
		var videoId = $(this).parents("li").find("a").attr("href");
		if(page == "search"){
			videoId = $(this).parent().parent().find("a").attr("href");
		}
		var index   = $(this).parents(".getReview").attr("id");
		if(videoId != null){
			$(".getReview[id='"+index+"']").append(" Please wait...");
			GM_xmlhttpRequest({
			  method:"GET",
			  url:"http://www.amitpatil.me/demos/ytube-video-likes/rating.php?vid="+videoId,
			  headers:{
				"User-Agent":"monkeyagent",
				"Accept":"text/monkey,text/xml",
				},
			  onload:function(response) {
				 $(".getReview[id='"+index+"']").html(" "+response.responseText);
			  }
			});	
		}else{
			$(".getReview[id='"+index+"']").html("Data not available");
		}
	});

});

getLikes = function(vid,element){
	GM_xmlhttpRequest({
	  method:"GET",
	  url:"http://www.amitpatil.me/demos/ytube-video-likes/rating.php?act=1&vid="+vid,
	  headers:{
		"User-Agent":"monkeyagent",
		"Accept":"text/monkey,text/xml",
		},
	  onload:function(response) {
		 //console.log(response.responseText);		
		 element.append(response.responseText);
	  }
	});	
}

function button(index,id){
	return '<div class="getReview" id="'+index+'"><button id="getVideoLikes" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" type="button" title="Get Review" data-tooltip-text="Get Review"><span class="yt-uix-button-content"><span class="addto-label">Get Reviews</span></span></button></div><div class="showReview"></div>';
}
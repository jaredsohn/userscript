// ==UserScript==
// @author      DominixZ
// @editor      DominixZ
// @namespace 	http://labs.jersure.com/greasemonkey/retweet.user.js
// @name	    	Retweet Twitter.com Button for List Version
// @description	Show Retweet Button at Twitter.com for List Version
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @include     http://www.twitter.com/*
// @include     https://www.twitter.com/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     0.2.3
// ==/UserScript==
// Add jQuery
$(function(){

	$('.actions').each(function(){
		$(this).append("<div><a class='retweet' href=''>RT</a></div>");
	});
	
	$('.retweet').css("font-size","11px").hide();
	
	$('.retweet').live("click",function(){
		tweet = $(this).parent().parent();
		tweet_text = tweet.next().text();
		who_tweet = "@"+tweet.parent().children('strong').children().text();
		rt_tweet = "RT "+who_tweet+" "+tweet_text;
		
		$('#status_update_box textarea').text(rt_tweet);
		$("#update-submit").removeClass("disabled");
		return false;
	});
	
	$('.retweet').hover(function(){
		$(this).css("text-decoration","underline");
	},function(){
		$(this).css("text-decoration","none");
	});
	
	$('#timeline li').hover(function(){
		$('.retweet',this).show();
	},function(){
		$('.retweet',this).hide();
	});
	//window.setTimeout(attachRetweet,3000);
	window.setInterval(attachRetweet,3000);
	
});

function attachRetweet()
{
	$('.actions').each(function(){
		if(!($(this).find('.retweet').length > 0)){
			$(this).append("<div><a class='retweet' href=''>RT</a></div>");
			$('.retweet',this).css("font-size","11px").hide();
			$('.retweet',this).hover(function(){
				$(this).css("text-decoration","underline");
			},function(){
				$(this).css("text-decoration","none");
			});
		}
	});
	
	
	$('#timeline li').hover(function(){
		$('.retweet',this).show();
	},function(){
		$('.retweet',this).hide();
	});
}
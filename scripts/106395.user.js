// ==UserScript==
// @name           Youtube Ratings to Percentage
// @namespace      Youtube Ratings to Percentage, Likes and Dislike counter into percentage
// @include        http://www.youtube.com/watch?v=*
// @match          http://www.youtube.com/watch?v=*
// @include        https://www.youtube.com/watch?v=*
// @match          https://www.youtube.com/watch?v=*
// @version        2
// ==/UserScript==
function youtubePercentify(){
	if(/Opera|Chrome|Chromium/.test(navigator.userAgent)) {
		unsafeWindow = window;
		if(/Chrome|Chromium/.test(navigator.userAgent)){
			var div = document.createElement("div");
			div.setAttribute("onclick", "return window;");
			unsafeWindow = div.onclick();
		}
	}
	var s= unsafeWindow.document.createElement('script');
	s.src='//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
	s.addEventListener("load", function(){
		unsafeWindow.jQuery = unsafeWindow.jQuery.noConflict()
		jQuery = unsafeWindow.jQuery;
		likesOrg = jQuery('span.likes-count').html();
		dislikesOrg = jQuery('span.dislikes-count').html();
		likes = parseInt(likesOrg.replace(/,/g,""));
		dislikes = parseInt(dislikesOrg.replace(/,/g,""));
		total = (likes+dislikes);
		likesPer = ((likes/total)*100).toFixed(2)+"%";
		dislikesPer = ((dislikes/total)*100).toFixed(2)+"%";
		jQuery('div#watch7-views-info').mouseover(function(){
			jQuery('span.likes-count').html(likesPer);
			jQuery('span.dislikes-count').html(dislikesPer);
		});
		jQuery('div#watch7-views-info').mouseout(function(){
			jQuery('span.likes-count').html(likesOrg);
			jQuery('span.dislikes-count').html(dislikesOrg);
		});
	},false);
	if(typeof unsafeWindow.jQuery!='undefined') {
	
	}
	else{
	  unsafeWindow.document.getElementsByTagName('head')[0].appendChild(s);
	}
};

window.addEventListener ("load", youtubePercentify(), false);
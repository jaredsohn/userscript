// ==UserScript==
// @name          Facebook Placebo Dislike Button
// @description   Makes a dislike button that does nothing except hide the post, pointless but cathartic.
// @include       http://www.facebook.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function() {
	$(".like_link").after(" · <a title='Click here to dislike this item' class='like_link stat_elem as_link fake_dislike'><span class='default_message'>Dislike</span></a>");
	$(".fake_dislike").click(function(){ $(this).closest(".UIStory").hide(); });
}());
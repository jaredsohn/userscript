// ==UserScript==
// @name           Youtube thumbs down
// @namespace      Youtube classic Thumbs
// @description    Restores the thumbs down ratings to comments
// @include        http://www.youtube.com/all_comments*
// @include        http://www.youtube.com/watch*
// @include        https://www.youtube.com/all_comments*
// @include        https://www.youtube.com/watch*
// ==/UserScript==

function init(){
	var liCommentRatings=document.getElementsByClassName("comments-rating-positive");
	for(var i=0;i<liCommentRatings.length;i++){
		if(liCommentRatings[i].title){
			var downs=parseInt(liCommentRatings[i].title.substr(liCommentRatings[i].title.indexOf(", ")+2));
			liCommentRatings[i].innerHTML=parseInt(liCommentRatings[i].title)+" <img src=\"//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif\" class=\"comments-rating-thumbs-up\"> "+(downs?downs+" <img src=\"//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif\" class=\"comments-rating-thumbs-down\">":"");
		}
	}
}

init();
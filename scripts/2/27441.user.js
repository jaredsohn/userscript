// ==UserScript==
// @name           funP comment rating
// @namespace      http://jeff-yeh.net
// @description    rating each comment for funP, using JS-Kit
// @include        http://funp.com/t*
// ==/UserScript==

var currentURL=location.href;
currentURL=currentURL.replace(/http\:\/\/funp\.com/i,"");

function addRatingBlock($) {
    $(".comment,.commentreply").each(function() {
		var commentId=this.id;
		var commentNumber=commentId.replace(/comment_/g,"");
		var ratingNode='<div class="js-kit-rating" view="score" thumbsize="small" path="'+currentURL+'/c'+commentNumber+'"></div>';
		
		$("div.commentInfo",this).prepend(ratingNode);
	});
}

function GM_wait()
{
    if (typeof unsafeWindow.jQuery == "undefined")
		window.setTimeout(GM_wait, 100);
    else {
		addRatingBlock(unsafeWindow.jQuery);
		var JS_KIT = document.createElement("script");
		JS_KIT.src = "http://js-kit.com/ratings.js";
		JS_KIT.type = "text/javascript";
		document.getElementsByTagName("body")[0].appendChild(JS_KIT);
	}
}

var GM_JQ = document.createElement("script");
GM_JQ.src = "http://code.jquery.com/jquery-1.2.3.js";
GM_JQ.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(GM_JQ);

GM_wait();
// ==UserScript==
// @name           Stack Overflow - Right Align Comment Signatures
// @namespace      http://sam.haslers.info/stackoverflow/
// @include        http://stackoverflow.com/questions/*
// @include        http://serverfault.com/questions/*
// ==/UserScript==

GM_addStyle('.comment-user, .comment-date {white-space: nowrap;}');

var $;

// Check if jQuery's loaded
var checker=setInterval(function(){
if(typeof ($ = unsafeWindow.$) != "undefined") {
    clearInterval(checker);
    letsJQuery();
 }
},100);

var align_sigs = function(){
    	var $sig = $("<td/>")
    	$(this).find(".comment-user[rel!='nofollow']").appendTo($sig);
    	$("<br/>").appendTo($sig);
    	$(this).find(".comment-date").appendTo($sig);
    	$(this).append($sig);
}

// All your GM code must be inside this function
function letsJQuery() {
	$(".comments-link, input[value='Add Comment']").live('click',function(){
		//fix second post form being added
		$(".post-comments table+table").remove();
		setTimeout (function(){
			$(".comment").each(align_sigs);},1000);
	});

    $(".comment").each(align_sigs);
}
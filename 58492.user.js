// ==UserScript==
// @name           SOFU Show Upvotes/Downvotes
// @namespace      codingcromulence.blogspot.com
// @description    Show upvotes/downvotes separately on posts
// @include        http://stackoverflow.com/*
// @include        http://meta.stackoverflow.com/*
// @include        http://superuser.com/*
// @include        http://serverfault.com/*
// ==/UserScript==

$ = unsafeWindow.$;
$('.vote .vote-count-post').each(function() {
	var myText = $(this).text();
	$(this).html("<span class='detailUpDown' style='cursor:pointer'>"+myText+"</span>");
});
$('.detailUpDown').click(function() {
	var postid = $(this).parents('.vote').find('input').length > 0 ?
		$(this).parents('.vote').find('input').val() :
		$(this).parents('.question-summary').attr('id').substr(17);
	var userurl = $(this).parents('#question,.answer,.question-summary').find('.user-details:last a').attr('href');
	var m = /\/(\d+)\//.exec(userurl);
	var userid = m[0];
	var target = $(this).parents('.vote');
	var d = new Date();
	var end = d.getTime();
	var start = end - 3628800000;
	var url = window.location.href.replace(/(http:\/\/.*?\/).*/,"$1users/rep-graph" + userid + start + "/" + end);
	$.getJSON(url,
		function(data) {
			for (postIdx in data) {
				var post = data[postIdx];
				var n = /(\d+)$/.exec(post["PostUrl"]);
				if(postid == n[0]) {
					target.append("<div style='width:100%;line-height:1.8em;margin-top:-6px;'><span style='color:#050;display:inline'> &nbsp;+" + post["RepPositive"] + "</span> <span style='color:#a00;display:inline'> &nbsp;" + post["RepNegative"] +"&nbsp; </span><div style='clear:both'></div></div>");
					return;
				}
			}
			target.append("<div style='width:100%;line-height:1.8em;margin-top:-6px;'>(none)</div>");
		});
});
 
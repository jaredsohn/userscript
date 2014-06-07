// ==UserScript==
// @name           Reddit Redesign
// @namespace      http://userscripts.org/users/chicklets
// @include        http*://*.reddit.com/*
// ==/UserScript==

var  Q = unsafeWindow.jQuery;
var things = {};

Q(".linklisting .thing").each(function(i, v){
	var sr = Q(this).find(".subreddit").html();

	if(Q(this).is(".link")){
		if(!things[sr]){
			things[sr] = [];
		}
		
		things[sr].push(Q(this));
	}
});

Q(".linklisting").find(".subredditname").remove();

Q.each(things, function(i, v){
	var sub = Q(".linklisting").append("<div class='subredditname'><h1><a href='/r/" + i + "/'>" + i + "</a></h1></div>");
	Q.each(things[i], function(i, v){
		Q(sub).append(v);
	});
});
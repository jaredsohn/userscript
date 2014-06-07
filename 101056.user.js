// ==UserScript==
// @name           Danbooru - Improved Blacklist
// @description    Erases the tags and notes from blacklisted posts on the Comments page.
// @namespace      http://userscripts.org/scripts/show/101056
// @include        http://danbooru.donmai.us/*
// @include        http://safebooru.donmai.us/*
// @include        http://hijiribe.donmai.us/*
// @include        http://sonohara.donmai.us/*
// @updated        2011-04-13
// ==/UserScript==

var script = document.createElement("script");
script.innerHTML = blacklist + "\nblacklist();\n";
document.getElementsByTagName("head")[0].appendChild(script);

function blacklist() {
	$$('span.thumb').each( function(x) {
		postid = x.id.substr(1);
		if (Post.is_blacklisted(postid)) {
			if ($('comments-for-p' + postid) != undefined) {
				$('comments-for-p' + postid).hide();
			}
		}
	});
}
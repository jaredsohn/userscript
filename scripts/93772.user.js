// ==UserScript==
// @name           Reddit Link Replacer
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      Reddit
// @version		   0.1
// @contributer	   ShiftEnd
// @description    Script to replace /r/something with a link to the corresponding reddit when the mouse enters a comment containing such a piece of text.
// @include        http://reddit.com/r/*/comments/*
// ==/UserScript==

function replaceReddit(html) {
	var pattern = new RegExp(/[^a-zA-Z>]\/r\/[a-zA-Z0-9]+/);
	var result = pattern.exec(html);
	while (result){
		var str = "" + result;
		if (result){
			str = jQuery.trim(str);
			html = html.replace(new RegExp(str,"g")," <a href='http://www.reddit.com"+str+"'>"+str+"</a>");
		}
		result = pattern.exec(html);
	}
	return html;
}

function replaceRedditInPost() {
	var htmlStr = $(this).html();
	htmlStr = replaceReddit(htmlStr);
	$(this).text("");
	$(this).append(htmlStr);
	
	// The css-selector we used in the .live() function of jquery will fail after the execution of the following code.
	// If this isn't done, a single core will be fully stressed each time we hover over a comment with the mouse.
	// This is a side-effect of the way .live() is implemented.

	var parentHtml = $(this).parent().html();
	parentHtml = "<div>" + parentHtml + "</div>";
	$(this).parent().html(parentHtml);
}

// .live() is used instead of .bind() because it is possible to load extra comments via Ajax
// if .bind() were used those extra comments wouldn't enjoy the benefits of this script.
$(".usertext-body > .md").live("mouseover",replaceRedditInPost);
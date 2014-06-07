// ==UserScript==
// @name	Xuite Blog Comment Sort
// @namespace	http://blog.gslin.org/plugins/xuite-blog-comment-sort
// @description Sort Xuite blog comment
// @homepage	http://blog.gslin.org/plugins/xuite-blog-comment-sort
// @include	http://blog.xuite.net/*
// ==/UserScript==

function sortblogcomment($)
{
    var t = $("<div></div>");

    $("#content a[@name]").each(function(){
	t.prepend($(this).next().next().next());
	t.prepend($(this).next().next());
	t.prepend($(this).next());
	t.prepend($(this));
	});

    $("#content .comment").after(t);
}

// xuite has jquery
sortblogcomment(unsafeWindow.jQuery);


// ==UserScript==
// @name           WTF? Comments!
// @description    Show hidden comments in TDWTF articles (especially Remy Porter's)
// @author         rummik
// @include        http://thedailywtf.com/*
// @version        0.009.32
// ==/UserScript==

!function() {
	"use strict";

	var	$ = function($) {
			return [].slice.apply(document.querySelectorAll($));
		};

	$('.ArticleBody').forEach(function(article) {
		article.innerHTML = article.innerHTML.replace(/<!--[^>]+?-->/g, function(comment) {
			comment = comment.replace(/^<!--|-->$/g, '')
			                 .replace(/(https?:\/\/[^ ]+)/g, '<a href="$1">$1</a>');

			return '<em style="color: #080"> &l' + 't;!--' + comment + '--&g' + 't; </em>';
		});

		$('span[onclick]').forEach(function(span) {
			span.style.color = '#c44';
		});
	});
}();

// ==ChangeLog==
// 0.009.32: Fix @include to work on all subpages on The Daily WTF
// 0.009.31: Make cornify coloring happen again. (Thanks Don!)
// 0.009.30: Fix bug with comment matching, shorten $.
// 0.009.29: Misc.
// 0.009.28: Source cleanup.
// 0.009.27: Removed jQuery.
// 0.009.26: Fixed URLs breaking comments.
// 0.009.25: Updated description to be more accurate.
// 0.009.24: Added support for showing spans with OnClick events. (Cornify, anyone?)
// 0.009.23: Added changelog.
// 0.009.22: Changed version numbering.
// 0.00921: Added support for links in comments.
// 0.00918: Fixed bug that caused all articles on a page to show the same text.
// 0.00913: Changed require for jQuery to the latest version...
// 0.00912: Added require for jQuery.
// 0.0091: Initial release.
// ==/ChangeLog==
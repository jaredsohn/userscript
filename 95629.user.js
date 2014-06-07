// ==UserScript==
// @name           Web comments are always awful
// @namespace      http://www.ryanbreen.com/
// @description    Web comments are always awful
// @include        http://*
// @include        https://
// ==/UserScript==

if (window.location.href.match(/youtube\.com/)) {
	var el = document.getElementById('watch-discussion');
	if (el != null) el.parentNode.removeChild(el);
} else if (window.location.href.match(/cnn\.com/)) {
	var el = document.getElementById('dsq-content');
	if (el != null) el.parentNode.removeChild(el);
	var el = document.getElementById('dsq-content-stub');
	if (el != null) el.parentNode.removeChild(el);
	var el = document.getElementById('comments');
	if (el != null) el.parentNode.removeChild(el);
} else if (window.location.href.match(/time\.com/)) {	
	var el = document.getElementById('commentStory');
	if (el != null) el.parentNode.removeChild(el);
} else if (window.location.href.match(/yahoo\.com/)) {	
	var el = document.getElementById('ygs-comments');
	if (el != null) el.parentNode.removeChild(el);
} else if (window.location.href.match(/foxnews\.com/)) {	
	var el = document.getElementById('content');
	if (el != null) el.parentNode.removeChild(el);
	el = document.getElementById('document');
	if (el != null) el.parentNode.removeChild(el);
} else if (window.location.href.match(/nytimes\.com/)) {	
	var el = document.getElementById('readerReviews');
	if (el != null) el.parentNode.removeChild(el);
	el = document.getElementById('readerReviewsCount');
	if (el != null) el.parentNode.removeChild(el);
} else if (window.location.href.match(/huffingtonpost\.com/)) {	
	var el = document.getElementById('news_entries');
	if (el != null) {
		var commentEls = el.getElementsByClassName('comments');
		for (var i=0; i<commentEls.length; ++i) {
			var commentEl = commentEls[i];
			commentEl.parentNode.removeChild(commentEl);
		}
	}
} else if (window.location.href.match(/guardian.co.uk/)) {	
	var el = document.getElementById('box');
	if (el != null) {
		var commentEls = el.getElementsByClassName('discussion');
		for (var i=0; i<commentEls.length; ++i) {
			var commentEl = commentEls[i];
			commentEl.parentNode.removeChild(commentEl);
		}
		commentEls = el.getElementsByClassName('discussion-pagination');
		for (var i=0; i<commentEls.length; ++i) {
			var commentEl = commentEls[i];
			commentEl.parentNode.removeChild(commentEl);
		}
	}
	el = document.getElementById('post-area');
	if (el != null) el.parentNode.removeChild(el);
} else if (window.location.href.match(/msnbc\.com/) || window.location.href.match(/msnbc\.msn\.com/)) {	
	var els = document.getElementsByClassName('discuss');
	for (var i=0; i<els.length; ++i) {
		var el = els[i];
		if (el.id.match(/slice/)) {
			el.parentNode.removeChild(el);
		}
	}
} else if (window.location.href.match(/washingtonpost\.com/)) {	
	var article = document.getElementById('article');
	if (article != null) {
		var els = article.getElementsByClassName('commentText');
		for (var i=els.length-1; i>=0; --i) {
			var el = els[i];
			el.parentNode.removeChild(el);
		}
		
		els = article.getElementsByClassName('posted');
		for (var i=els.length-1; i>=0; --i) {
			var el = els[i];
			el.parentNode.removeChild(el);
		}
	}
} else if (window.location.href.match(/\.espn/)) {	
	var els = document.getElementsByClassName('mod-conversations');
	for (var i=els.length-1; i>=0; --i) {
		var el = els[i];
		el.parentNode.removeChild(el);
	}
}
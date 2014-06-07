// ==UserScript==
// @name           Go straight to new post
// @namespace      http://userscripts.org
// @description    Go straight to new post
// @include        https://what.cd/forums.php?action=viewthread&threadid=*next=true*
// @include        https://what.cd/userhistory.php?action=*
// @include        https://what.cd/forums.php*

// ==/UserScript==

if (document.URL.match(/forums\.php\?action=viewthread&threadid=/) && document.URL.match(/&next=true/)) {
	var urls = document.querySelectorAll('a[href*="forums.php?page="]');

	for (var i = 0; i < urls.length; i = i + 1) {
		urls[i].href = urls[i].href.split('&next=true').join('');
	}

	var post = document.querySelector('table[class="forum_post box vertical_margin"][id="post' + document.URL.split('#post')[1] + '"]');
	var nextPost = post.nextSibling;

	while (nextPost && nextPost.nodeType != 1) {
		nextPost = nextPost.nextSibling;
	}

	if (nextPost.id != '') {
		document.location.hash = nextPost.id;
	} else  {
		document.location = document.querySelector('a.pager_next').href;
	}
}

if (document.URL.match(/(forums\.(php$|php\?action=viewforum)|userhistory\.php\?action=(posts|subscriptions))/)) {
	var lastReads = document.querySelectorAll('span.last_read[title="Jump to last read"]');

	for (var i = 0; i < lastReads.length; i = i + 1) {
		lastReads[i].querySelector('a').href = lastReads[i].querySelector('a').href.replace('#post', '&next=true#post');
	}
}
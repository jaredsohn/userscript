// ==UserScript==
// @name           TweetNaverNews
// @namespace      http://difro.tumblr.com
// @description    Add twitter button to naver news articles.
// @include        http://news.naver.com/*
// @run-at         document-start
// @run_at         document-start
// ==/UserScript==

tweet_naver_news = {
	init : function() {
		var allLis, thisLi;
		allLis = document.evaluate(
			"//li[@class='menu_put']",
                        //"//ul[@class='content_menu content_menu_bottom']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		thisLi = allLis.snapshotItem(0);

		var tweetbutton = document.createElement('div');
		tweetbutton.innerHTML = '<a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>';
		thisLi.parentNode.insertBefore(tweetbutton, thisLi);
    }
};
tweet_naver_news.init();

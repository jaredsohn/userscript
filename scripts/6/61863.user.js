// ==UserScript==
// @name Recent Tweets Spacer for Twitter 
// @namespace http://d.hatena.ne.jp/okisan/
// @description Twitter公式ページのNew Tweetsの下に余白を作るだけです。多少見やすくなります。
// @include http://twitter.com/*
// @include https://twitter.com/*
// ==/UserScript==

(function(){
    recentTweets();

	function recentTweets(){
		var style =
		<><![CDATA[
			.last-on-refresh {
				margin-bottom:120px;
			}
		]]></>;
		GM_addStyle(style);
	  }
})();
// ==UserScript==
// @name           Hide Follower Count
// @namespace      Hide Follower Count
// @description    Twitter のフォロワー数を隠す。 Hide Twitter follower count
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function(){
  if(document.getElementById("top-bar")) var newTwitter = true;
  else var newTwitter = false;


	if(newTwitter){
		GM_addStyle("div.new-followers-activity{display: none;}");
		return;
	}
	else{
		var count = document.getElementById("follower_count");
		if(count) count.style.visibility = "hidden";		
	}
})();

// ==UserScript==
// @name           Neowin.net: remove Ad Bot forum posts
// @version        1.0
// @include        http://www.neowin.net/forum/topic/*
// ==/UserScript==
		
	var snapshot;	
	var adbot = document.evaluate('//div[@class="post_block hentry"]/div[@class="post_wrap"]/h3/div[@class="post-author"]/a[contains(@href, "action=register")]', document, null, 6, null);

		for (var i=0; i<adbot.snapshotLength; i++) {
			if (adbot.snapshotItem(i).textContent == 'Ad Bot') {
				snapshot = adbot.snapshotItem(i).parentNode.parentNode.parentNode.parentNode;
				snapshot.parentNode.removeChild(snapshot);
			}
		}
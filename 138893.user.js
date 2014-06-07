// ==UserScript==
// @name           CursedFavstar
// @namespace      luft2501.chicappa.jp
// @description    coloring favstar like favotter
// @include        http://favstar.fm/*
// @grant          none
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
//　

//----------------------------------------------------------------
// Common Vars/Functions.
//----------------------------------------------------------------

/*
 * Application Settings Values.
 */
var Settings = {
	
};

/*
 * Tweaks for node.
 */
function processNode(node) {
	var theTweet		= $(node).find('p.fs-tweet-text');
	var favs			= $(node).find('div.fs-favs > ul > li.fs-total');
	var rts				= $(node).find('div.fs-retweets > ul > li.fs-total');
	var favCountNum		= favs.length > 0 ? favs[0].innerHTML : 0;
	var rtCountNum		= rts.length > 0 ? rts[0].innerHTML : 0;
	
	function normal_color() {
		theTweet.css('font-size', '12px');
	}
	
	function green_color() {
		theTweet.css('color', 'green');
		theTweet.css('font-weight', 'bolder');
		theTweet.css('font-size', '12px');
	}
	
	function purple_color() {
		theTweet.css('color', 'purple');
		theTweet.css('font-weight', 'bolder');
		theTweet.css('font-size', '14px');
	}
	
	function red_color() {
		theTweet.css('color', 'red');
		theTweet.css('font-weight', 'bolder');
		theTweet.css('font-size', '18px');
	}
	
	if (favCountNum == 1 || rtCountNum == 1) normal_color();
	if (favCountNum == 2 || rtCountNum == 2) green_color();
	if (favCountNum == 3 || rtCountNum == 3
	 || favCountNum == 4 || rtCountNum == 4) purple_color();
	if (favCountNum > 4 || rtCountNum > 4) red_color();
	
	theTweet.css('line-height', '140%');
}

/*
 * Tweaks for document at first load.
 */
function processNodeDoc() {
	var items = document.evaluate('.//div[@class="fs-tweet"]', document, null, 7, null);
	for (var i = 0; i < items.snapshotLength; i++) {
		item = items.snapshotItem(i);
		processNode(item);
	}
}

//----------------------------------------------------------------
// Main Routine.
//----------------------------------------------------------------

document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(ev){
	var node = ev.target;
	processNode(node);
}, false);

processNodeDoc();

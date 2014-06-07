// ==UserScript==
// @name           Amazon YourStore Fix for AutoPagerize
// @namespace      http://exoego.net/
// @description    Enable rating bar for content added by AutoPagerize
// @include        http://www.amazon.co.jp/gp/yourstore/*
// ==/UserScript==

var jQuery = this.unsafeWindow.jQuery;

if (window.AutoPagerize && window.AutoPagerize.addFilter)
	window.AutoPagerize.addFilter(fixRatingBar);

function fixRatingBar(){
	jQuery('div.arui_recs-list').each(function(i, item){
		var self = jQuery(item);
		var isLoaded = self.find('a[id^="isOwned_"]').length === 1;

		if(!isLoaded) {
			var asin = item.id.substring(13,23);
			self.amazonRatingsInterface({
				starRating            : 0,
				isOwned               : 0,
				isNotInterested       : 0,
				isGift                : 0,
				isExcluded            : 0,
				isExcludedClickstream : 1,
				key                   : 'list',
				itemId                : asin,
				type                  : 'asin',
				refTagSuffix          : 'ys_ir_all'
			});
		}
	})
}

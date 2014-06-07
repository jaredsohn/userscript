// ==UserScript==
// @name        Gamme news Auto Page
// @description Auto expanding pages on Gamme news. You can read the news in one page, no more next page click! (宅宅新聞自動載入分頁，一次看完整文章，不用一直按下一頁)
// @namespace   Ammon
// @include     /^https?://news.gamme.com.tw/\d+(#.*)?$/
// @include     /^https?://news.gamme.com.tw/\d+/\d+(#.*)?$/
// @version     0.2
// ==/UserScript==

(function($){
	if (/\d+\/\d+/.test(location.pathname)) {
		return location.replace(location.pathname.replace(/\/\d+$/,''));
	}
	var pages = $('.now-page a').map(function(){ return this.href; }).get();
	var t = $('.post .entry').find('>div').remove().end();
	(function fn(){
		if (pages.length == 0){return;}
		var url = pages.shift();
		$.get(url, function(d){
			var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
			$("<div/>").append(d.replace(rscript, ""))
			.find('.post .entry').find('> div').remove().end().insertAfter(t);
			t = t.next();
			fn();
		});
	})();
})(unsafeWindow.jQuery)
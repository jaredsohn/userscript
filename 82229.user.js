// ==UserScript==
// @name           apcr-booru
// @namespace      VIP
// @description    Booru paginator replacement with AutoPager-CR
// @include        http://behoimi.org/*
// @include        http://www.behoimi.org/*
// @include        http://*.donmai.us/*
// @include        http://gelbooru.com/*
// @include        http://www.gelbooru.com/*
// @include        http://konachan.tld/*
// @include        http://*.imouto.org/*
// @include        http://chan.sankakucomplex.com/*
// @version        1.0.2
// ==/UserScript==

// Tested in:
// URL RegExp												Link XPath										Content XPath
// ===3DBOORU===
// ^http://(www\.)?behoimi\.org/post(?!/show)				//div[@id='paginator']//a[(text()='>>')]		//div[@class='content']/div/span[@class='thumb']
// ^http://(www\.)?behoimi\.org/comment						//div[@id='paginator']/a[contains(text(),'»')]	//div[@id='comment-list']/div[@class='post']
// ===DANBOORU===
// ^http://[a-z]{5,12}\.donmai\.us/post(?!/show)			//div[@id='paginator']//a[(text()='>>')]		//div[@class='content']/div/span[@class='thumb']
// ^http://[a-z]{5,12}\.donmai\.us/comment					//div[@id='paginator']/a[contains(text(),'»')]	//div[@id='comment-list']/div[@class='post']
// ===GELBOORU===
// ^http://(www\.)?gelbooru\.com/index\.php\?page=post&?	//div[@id='paginator']//a[(text()='›')]			//div[@class='content']/div/span[@class='thumb']
// ^http://(www\.)?gelbooru\.com/index\.php\?page=comment&?	//div[@id='paginator']//a[(text()='›')]			//div[@id='comment-list']/div[@class='post']
// ===IMOUTO===
// ^http://[a-z]{3,12}\.imouto\.org/post(?!/show)			//div[@id='paginator']//a[(text()='>>')]		//ul[@id='post-list-posts']/li
// ^http://[a-z]{3,12}\.imouto\.org/comment					//div[@id='paginator']//a[(text()='>>')]		//div[@id='comment-list']/div[@class='post']
// ===KONACHAN====
// ^http://konachan\.(com|net)/post(?!/show)				//div[@id='paginator']//a[(text()='>>')]		//ul[@id='post-list-posts']/li
// ^http://konachan\.(com|net)/comment						//div[@id='paginator']//a[(text()='>>')]		//div[@id='comment-list']/div[@class='post']
// ===SANKAKUCOMPLEX===
// ^http://chan\.sankakucomplex\.com/comment				//div[@id='paginator']//a[(text()='>>')]		//div[@id='comment-list']/div[@class='post']
//
// Best expirience with:
// Loading Style		position:fixed; z-index:2147483647; font-size:12px; right:20px; top:95%; padding:1px; display:none; opacity:.5;
// Page Break Style		display:none!important;
// Confirm Box Style	display:none!important;
//
// (TAB = 4 spaces)

unsafeWindow.AddReplacementXPath('//div[@id="paginator"]');
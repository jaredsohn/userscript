// ==UserScript==
// @name           apcr-ag.ru-filter
// @namespace      VIP
// @description    AG.ru paginator replacement with AutoPager-CR
// @include        http://www.ag.ru/games/filter*
// @version        1.0.2
// ==/UserScript==

// Tested in:
// URL RegExp 		^https?://www\.ag\.ru/games/filter
// Link XPath		//td[@id='p5' and @class='newsbot bb']/table/tbody/tr/td[@class='s2']/b/following-sibling::a[1]
// Content XPath	//td[@class='content']/table[@id='list_table']/tbody/tr/following-sibling::tr

unsafeWindow.AddReplacementXPath('//td[@id="p5" and @class="newsbot bb"]');
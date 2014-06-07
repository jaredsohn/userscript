// ==UserScript==
// @name           apcr-google
// @namespace      VIP
// @description    Google paginator replacement with AutoPager-CR
// @include        http://www.google.*/search*
// @include        https://www.google.*/search*
// @version        1.0.2
// ==/UserScript==

// Tested in:
// URL Regxp		^https?://www\.google\.[a-z]{2,9}/search
// Link XPath		//table[@id='nav']//tr/td[@class='b'][last()]/a[@class='pn']
// Content XPath	//ol[@id='rso']/li[@class='g']
//					//p[@id='ofr']
//					//div[@id='ires']/ol/li
// "Live search" is off

unsafeWindow.AddReplacementXPath('//div[@id="navcnt"]');
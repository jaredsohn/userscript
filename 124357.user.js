// ==UserScript==
// @name           SkipSolidotAds
// @namespace      http://userscripts.org/users/fking
// @description    跳过 Solidot (中文版) 的广告点击
// @include        http://da.feedsportal.com/*
// @version        1.0
// ==/UserScript==

var xpath = '/html/body/div/p/a[last()-1]';

var urllinks = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (urllinks.snapshotLength > 0)
{
	var cnlink = urllinks.snapshotItem(0);
	cnlink.click();
}

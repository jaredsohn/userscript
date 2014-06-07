// ==UserScript==
// @name         Wall Street Journal Full Width Articles
// @namespace    wsjFullWidthArticles
// @include      http://*.wsj.com/article/*
// @include      http://wsj.com/article/*
// @include      https://*.wsj.com/article/*
// @include      https://wsj.com/article/*
// @match        http://*.wsj.com/article/*
// @match        http://wsj.com/article/*
// @match        https://*.wsj.com/article/*
// @match        https://wsj.com/article/*
// @datecreated  2010-03-12
// @lastupdated  2010-03-12
// @version      0.1.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript will remove the junk from the right side of articles on the Wall Street Journal and make the articles full width.
// ==/UserScript==

(function(d){
	var rightCol=d.evaluate("//div[contains(@class,'fullwide')]//div[contains(@class,'nonSub') or contains(@class,'reallywide')]//div[contains(@class,'col4wide')]",d,null,9,null).singleNodeValue;
	if(!rightCol) return;
	rightCol.parentNode.removeChild(rightCol);
	GM_addStyle(".col6wide{width:948px;}");
})(document);

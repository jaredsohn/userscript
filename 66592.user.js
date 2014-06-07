// ==UserScript==
// @name			Times Colonist: Full Width Article
// @author			Erik Vold
// @namespace		timescolonistFullWidthArticle
// @include			http://timescolonist.com*
// @include			https://timescolonist.com*
// @include			http://www.timescolonist.com*
// @include			https://www.timescolonist.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-16
// @lastupdated		2010-01-16
// @description		This userscript automatically makes the article full width.
// ==/UserScript==

(function(){
	var doc=document,
		ele1 = doc.evaluate("//div[@class='bodywrapper']/div[@class='col_300']",doc,null,9,null).singleNodeValue
		ele2 = doc.evaluate("//div[@id='story_content']/div[@class='col_160']",doc,null,9,null).singleNodeValue;
	if (!ele1 || !ele2) return;

	ele1.parentNode.removeChild(ele1);
	ele2.parentNode.removeChild(ele2);
	GM_addStyle(".col_640{width:940px;} .col_480{width:940px;} .col_460{width:920px;} #imageBox{width:475px;}");
})();
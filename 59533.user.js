// ==UserScript==
// @name		Google Webmaster Top Search Queries Insight Links
// @author		Erik Vold
// @datecreated	2009-10-10
// @lastupdated	2009-10-11
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @namespace	gwebmasterTopSearchQueriesInsightLinks
// @include		http://www.google.com/webmasters/tools/top-search-queries*
// @include		https://www.google.com/webmasters/tools/top-search-queries*
// @version		0.1
// @description	This userscript will add Google Insights links to The Top Search Queries page of Google Webmaster Tools
// ==/UserScript==

var gwebmasterTopSearchQueriesInsightLinks={};
gwebmasterTopSearchQueriesInsightLinks.run=function(){
	var keywords=document.evaluate('//table[contains(@class,"grid")]/tbody/tr/td[3]/a',document,null,7,null),ele,keyword,newLink;
	for(var i=0;i<keywords.snapshotLength;i++){
		ele=keywords.snapshotItem(i);
		if(ele.parentNode.getAttribute('query')) keyword=ele.parentNode.getAttribute('query');
		else keyword=ele.innerHTML.replace(/(^\s*|\s*$)/g,'','g');
		newLink=document.createElement('a');
		newLink.setAttribute('style','float:right;');
		newLink.innerHTML='<img alt="insights" src="http://farm3.static.flickr.com/2503/3977808142_a673739603.jpg"/>';
		newLink.href="http://www.google.com/insights/search/#q="+keyword;
		newLink.setAttribute('target','_blank');
		newLink.title="Google Insights on "+keyword;

		ele.parentNode.appendChild(newLink);
		ele.parentNode.setAttribute('query',keyword);
	}
}
gwebmasterTopSearchQueriesInsightLinks.run();
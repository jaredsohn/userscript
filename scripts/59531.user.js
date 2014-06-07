// ==UserScript==
// @name		Google Webmaster Keyword Insight Links
// @author		Erik Vold
// @datecreated	2009-10-10
// @lastupdated	2009-10-15
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @namespace	gwebmasterKeywordInsightLinks
// @include		http://www.google.com/webmasters/tools/keywords*
// @include		https://www.google.com/webmasters/tools/keywords*
// @version		0.1
// @description	This userscript will add Google Insights search links to the Google Webmaster Tools keywords page.
// ==/UserScript==

var gwebmasterKeywordInsightLinks={};
gwebmasterKeywordInsightLinks.run=function(){
	var keywords=document.getElementsByClassName("keyword"),ele,keyword,newLink;
	for(var i=0;i<keywords.length;i++){
		ele=keywords[i];
		if(ele.getAttribute('keyword')) keyword=ele.getAttribute('keyword');
		else keyword=ele.childNodes[1].nodeValue.replace(/(^\s*|\s*$)/g,'','g');
		newLink=document.createElement('a');
		newLink.setAttribute('style','float:right;');
		newLink.innerHTML='<img alt="insights" src="http://farm3.static.flickr.com/2503/3977808142_a673739603.jpg"/>';
		newLink.href="http://www.google.com/insights/search/#q="+keyword;
		newLink.setAttribute('target','_blank');
		newLink.title="Google Insights on "+keyword;

		ele.appendChild(newLink);
		ele.setAttribute('keyword',keyword);
	}
}
gwebmasterKeywordInsightLinks.run();
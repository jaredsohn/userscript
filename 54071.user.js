// ==UserScript==
// @name          bing to google
// @namespace     http://userstyles.org
// @description	  Replace the Remark link of background picture at bing.com homepage to google's。必应首页背景图片的备注说明下的链接替换为谷歌版本。
// @version		  0.1
// @author        iambran@gmail.com
// @include       http://*.bing.com/
// @include       http://*.bing.com/?*
// @exclude        http://www.bing.com/search?q=*
// @exclude        http://www.bing.com/*/search?q=*
// ==/UserScript==
//http://images.google.com/images?q=    http://www.bing.com/images/search?q=
//http://video.google.com/videosearch?q=   http://cn.bing.com/videos/search?q=
//http://news.google.com/news?q=   http://www.bing.com/news/search?q=
//http://google.com/search?q=    http://www.bing.com/search?q=
 
(function()
		  {
	
	function realURL(href)
	{
	 var  start= href.indexOf("search?q=");
	      if(start==-1)return href;
	      var end=href.indexOf("&",start);
	      if(end==-1) end= href.length;
	      return decodeURIComponent(href.substring(start+9,end));
	}
	function switchtype(type)
	{
	 var  start=type.indexOf("bing.com/");
	      if(start==-1)return type;
	      var end=type.indexOf("search?q=",start);
	      if(end==-1) end= type.length;
	      return decodeURIComponent(type.substring(start+9,end));
	}
var links=document.links;

	for(i=0;i<links.length;i++) {
thetype=switchtype(links[i].href);
if (links[i].href.indexOf("search?q=&")=="-1")
	{
	if (thetype=='images/')
		{links[i].href='http://images.google.com/images?q='+realURL(links[i].href);}
	else if (thetype=='videos/')
		{links[i].href='http://video.google.com/videosearch?q='+realURL(links[i].href);}
	else if (thetype=='news/')
		{links[i].href='http://news.google.com/news?q='+realURL(links[i].href);}
	else if (thetype=='')
		{links[i].href='http://www.google.com/search?q='+realURL(links[i].href);}
	else
		{}
	}
								}
	
		})
();

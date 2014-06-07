// ==UserScript==
// @name	Get feed url
// @description    Get feed url from any site
// @namespace	
// @include			*
// ==/UserScript==
function getFeedUrl()
{
links=document.getElementsByTagName("link")
for(i in links){
  link=links[i];
  if((link.type.toLowerCase()=="application/rss+xml")||(link.type.toLowerCase()=="application/atom+xml"))
  {
    return link.href;
  }
}
}


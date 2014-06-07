// ==UserScript==
// @name          NewsBaidu
// @namespace     http://userstyles.org
// @description	  去掉二次点击，提高阅读效率
// @version		  1.0
// @author        songdenggao@gmail.com
// @include       http://news.baidu.com/*
// ==/UserScript==
 
(function(){
	
	function realURL(href){
	     var  start= href.indexOf("page=");
	      if(start==-1)return href;
	      var end=href.indexOf("&",start);
	      if(end==-1) end= href.length;
	      return decodeURIComponent(href.substring(start+5,end));
	}
		
	var links=document.links;
	for(i=0;i<links.length;i++){
		links[i].href=realURL(links[i].href);
	}
	


})();

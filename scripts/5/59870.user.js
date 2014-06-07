// ==UserScript==
// @name           PDF/PPT/TIF viewer with Google Docs (Event Driven)
// @namespace      http://chibu.net/
// @include        http://*
// @exclude        http://docs.google.com/*
// ==/UserScript==
// Based on script by Koonies (http://d.hatena.ne.jp/Koonies/): http://userscripts.org/scripts/show/59557

(function(){
	if(location.href.indexOf("http://docs.google.com/")!==-1)return;
	var f,a,i=0,l=document.getElementsByTagName("a");
	while(a=l[i++])
		if(a.href.match(/^[^?]+\.(pdf|ppt|tif)$/)){var b=a;
			f=function(e){if(!e)var e=window.event;location.href='http://docs.google.com/viewer?url='+b.href;if(e.preventDefault)e.preventDefault();else e.returnValue=false;};
			if(a.addEventListener)a.addEventListener('click',f,false);
			else if(a.attachEvent)a.attachEvent('onclick',f);
			else href='http://docs.google.com/viewer?url='+a.href;
			}
})();

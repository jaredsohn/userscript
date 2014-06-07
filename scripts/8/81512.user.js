// ==UserScript==
// @name           sinaWb_urlfix
// @namespace      http://www.w3.org/1999/xhtml
// @include        http://t.sina.com.cn/*
// ==/UserScript==
if(document.getElementById('feed_list'))
	var links = document.getElementById('feed_list').getElementsByTagName('a');
else
	var links = document.getElementsByTagName('a');

for(var i=0;i<links.length;i++){
	var a = links[i];
	if(a.innerHTML.indexOf('t.cn')>-1){
		a.addEventListener('mouseover', function(){ if(this.title)this.href=this.title;}, true);
	}
}
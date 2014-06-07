// ==UserScript==
// @name           newTab
// @namespace      Sun
// @description    open anchor as a new tab
// @include        http://*.douban.com/*
// @include        http://douban.com/*
// ==/UserScript==
document.addEventListener('click',function(event){
	var o = event.target;
	o = o.nodeName === 'A' ? o : o.parentNode;
	if(o.nodeName !== 'A') return;
	try{
		var link = o.href;
		if(o.target != '_blank' && link.search(/javascript/) < 0 && link.search(/\?/) < 0)
		{
			window.open(o.href);
			event.stopPropagation();
			event.preventDefault();
		}
	}catch(e){GM_log(e.name + ": " + e.message);}
},true);
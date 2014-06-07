// ==UserScript==
// @name t.cn link killer
// @version 1.0.0.3
// @include http://*weibo.com/*
// ==/UserScript==
setInterval(function() {
	var links=document.getElementsByTagName('a')
	i=0
	while (i<links.length)
		{
		link=links[i]
		if(link.getAttribute('mt')=='url'){
			if(link.title!=''){
					link.href=link.title
					link.setAttribute('mt','url killed');
					link.setAttribute('action-type','');
				}else{
					link.setAttribute('mt','url unkilled');
					link.setAttribute('action-type','');
				}
			}
		i++;
	}},2000);
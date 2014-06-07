// ==UserScript==
// @name           iapps.im linksynergy remover
// @namespace      http://weibo.com/fclef
// @description    移除iapps.im中的linksynergy链接跳转;修改自http://userscripts.org/scripts/show/120828
// @include        http://*.iapps.im/*
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==
// 

(function(){
        'use strict';
	var links = document.querySelectorAll('a[href*="click.linksynergy.com"]');
	var text, i;
	for (i = 0; i < links.length; i++) 
	{
	    // Replace everything before "https%3A" or "http%3A"
	    text = links[i].href.replace(/^.*(https*%3A.*).*$/, "$1");	
            // Decode the special characters (2 times)
	    text = decodeURIComponent(decodeURIComponent(text));
	    // Change the actual attribute
	    links[i].href = text;
	}
})();

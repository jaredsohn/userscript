// ==UserScript==
// @name           VkNew
// @namespace      nulpatrol
// @include http://vkontakte.ru/*
// @include http://*.vkontakte.ru/*
// ==/UserScript==
//
//

var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

var pts = $(".profileTable");
pts[1].css('display', 'none');
pts[2].css('display', 'none');  
	


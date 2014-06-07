// ==UserScript==
// @name        HaiciDic
// @namespace   WS
// @description HaiciDic
// @include     *
// @version     1.0
// ==/UserScript==



function require(src,attach_obj)
{
	if(typeof attach_obj == 'string' && typeof window[attach_obj] != 'undefined') return true;
	var node = document.createElement('script');
	node.src= src;
	node.async = true;
	document.body.appendChild(node);	
}

require('http://dict.cn/hc/');

// ==UserScript==
// @name           remove livechat and GA  javascript
// @namespace      sbmzhcn@gmail.com
// @include        http://*
// ==/UserScript==

for (int i = 0; i < document.getElementsByTagName("script").length; i++)
{
	if(document.getElementsByTagName("script")[i].src.search(/comm100/)>=0)
	document.getElementsByTagName("script")[i].parentNode.removeChild(document.getElementsByTagName("script")[0]);
}
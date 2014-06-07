// ==UserScript==
// @name           find_egg_auto
// @namespace      http://userscripts.org/users/308196
// @description    auto get and collect egg in torn city
// @include        http://*.torn.com/*
// ==/UserScript==

var arrAll = document.getElementsByTagName("a");
for(i = 0; i < arrAll.length; i++)
{
	var target = arrAll[i].href;
	if(target.indexOf('eggfind') >= 0)
	{
		window.open(target, '_blank');
	}
}
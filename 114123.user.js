// ==UserScript==
// @name           vk.com <> vkontakte.ru fix
// @namespace      vk_fix
// @include        http://vk.com/*
// @include        http://vkotakte.ru/*
// ==/UserScript==

setInterval((function(){
	var links = document.getElementsByTagName("a");
	var vkdom = ["http://vkontakte.ru/", "http://vk.com/"]
	for (i=0; i<links.length; i++){
		var link = links[i]
		for (d=0; d<vkdom.length; d++)
			if (link.href.indexOf(vkdom[d]) == 0)
				link.href = link.href.slice(vkdom[d].length-1)
	}
	return arguments.callee
})(), 1000)
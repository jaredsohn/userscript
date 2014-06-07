// ==UserScript==
// @name           Google Tabs Single Window Navigation
// @namespace      http://userscripts.org/show/100753
// @description    Open Google navigation tab links in current window instead of a new one
// @include        http://*.google.com/*
// @include        https://*.google.com/*
// ==/UserScript==

// Change target="_blank" attribute in google tabs to target="_top"
function changeTabTarget() {
	
	var container = document.getElementById("gbz");
	var tabList = container.getElementsByTagName("ol")[0]; 
	var tabs = tabList.getElementsByTagName("li"); 

	for (var i = 0; i < tabs.length; i++)
	{
		var link = tabs[i].getElementsByTagName("a")[0];
		link.setAttribute("target", "_top");
	}
}

changeTabTarget();
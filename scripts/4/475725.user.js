// ==UserScript==
// @name       ROBLOX navbar fixer
// @namespace  http://luaweaver.x10.mx/
// @version    1.0.1
// @description  Fixes the ROBLOX navbar.
// @match      http://*.roblox.com/*
// ==/UserScript==

var subnavElements=document.getElementById("subMenu").getElementsByTagName("a"); //get all the links in the nav submenu
for(var i=0;i<subnavElements.length;i++){
	if(subnavElements[i].getAttribute("data-se")=="subnav-develop"){
		subnavElements[i].innerText="Leaderboards";
		subnavElements[i].href="/leaderboards";
	}
}

var navElements=document.getElementById("navigation-menu").getElementsByTagName("a"); //get all the links in the nav menu
for(var i=0;i<navElements.length;i++){
	if(navElements[i].getAttribute("data-se")=="nav-leaderboards"){
		navElements[i].innerText="Develop";
		navElements[i].href="/develop";
	}
}
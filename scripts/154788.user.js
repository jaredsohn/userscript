// ==UserScript==
// @name           Open Youtube search results in new page
// @namespace      http://userscripts.org/users/497008
// @description    Opens Youtube search results in a new page when clicking the + search button
// @include        http://www.youtube.com/*
// @include        https://www.youtube.com/*
// @author         ...
// @grant          GM_addStyle
// @updateURL      https://userscripts.org/scripts/source/154788.meta.js
// @downloadURL    https://userscripts.org/scripts/source/154788.user.js
// @version        2.1
// ==/UserScript==

searchButton = document.getElementById("search-btn")||document.getElementById("sb");

newWindowButton = searchButton.cloneNode(true);
newWindowButton.id="search-btn-new-page";
newWindowButton.value="+";
//Icon by  P.J. Onori - http://www.somerandomdude.com Creative Commons Attribution-Share Alike 3.0 Unported License
GM_addStyle("#search-btn-new-page .yt-uix-button-content{ background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADNJREFUKM9jYMAE9UD8H4rrGYgAg0BDPRrej6RhPxZ5uCSxmHQN+9HwfSTJ+1jkh3w8AACTa0Dx7zcROAAAAABJRU5ErkJggg==') no-repeat scroll 1px 1px transparent !important; }");


searchButton.parentNode.insertBefore(newWindowButton, searchButton);

searchForm=document.getElementById("masthead-search")||document.getElementById("se")
newWindowButton.onclick=function(){
	searchForm.setAttribute("target", "_blank");
}

searchButton.onmouseup=function(){
	searchForm.removeAttribute("target");
}

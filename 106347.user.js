// ==UserScript==
// @name           Facebook chat sidebar fixer
// @namespace      http://mike.thedt.net
// @description    Removes offline friends from the new chat sidebar on Facebook
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @version        1.0
// ==/UserScript==

//hide offline friends
GM_addStyle(".fbChatOrderedList .item { display: none; !important }");
GM_addStyle(".fbChatOrderedList .active { display: block; !important }");
GM_addStyle(".fbChatOrderedList .idle { display: block; !important }");

//resize the sidebar
GM_addStyle(".fbChatSidebar { height: auto !important; }");
GM_addStyle(".fbChatSidebar { border-top: 1px solid rgba(0, 0, 0, 0.4); }");

function update() {
	var active = document.getElementsByClassName('item active');
	var idle = document.getElementsByClassName('item idle');
	var sidebarbody = document.getElementsByClassName('fbChatSidebarBody');
	
	var newheight = (active.length+idle.length)*36+8;
	sidebarbody[0].style.height = newheight+"px";
	
	var sidebar = document.getElementsByClassName('fbChatSidebar');
	sidebar[0].style.top = (window.innerHeight-(newheight+25))+"px";
}

window.addEventListener("load", function() {
	setTimeout(function() {
		var list = document.getElementsByClassName('fbChatOrderedList');
		list[1].addEventListener("DOMNodeInserted", function() {
			update();
		}, true);
		update();
	}, 1500);
}, true);
// ==UserScript==
// @name           Full Facebook Chat
// @author         Farid Muhandisa
// @description    Enlarge your FB Chat with this Script
// @include        https://www.facebook.com/
// @include        http://facebook.com/*
// @include        https://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('.fbChatSidebarBody { height: 97% ! important; background-color: #FFFFFF ! important; } .fbFeedTicker { display: none ! important; } #pagelet_ticker { display: none ! important; } .fbSidebarTicker img.pic { height: 28px ! important; width: 28px ! important; } .fbChatOrderedList .item a .name { line-height: 20px ! important; } ');


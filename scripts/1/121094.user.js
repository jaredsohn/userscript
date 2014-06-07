// ==UserScript==
// @name           Facebook Large Chat
// @author         Jose Luis Martin
// @namespace      http://joseluismartin.info
// @description    Make Facebook Chat Larger
// @include        http://www.facebook.com/*
// ==/UserScript==


var style =  " .fbDockChatTab.openToggler { width: 800px !important; }" +
	     " .fbDockChatTab .fbDockChatTabFlyout { height: 700px !important; }" +
	     " .fbDockChatTab .input { height: 20px !important; width: 760px !important; font-size: medium !important; }" +
  	     " .fbDockChatTab .conversationContainer .fbChatMessage { font-size: medium; max-width: 720px !important; }";

GM_addStyle(style);

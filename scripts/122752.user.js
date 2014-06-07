// ==UserScript==
// @name           Better FB Chat
// @author         Rolanf Rechel
// @description    Groesserer FB Chat
// @include        *facebook.com/*
// ==/UserScript==


var style =  " .fbDockChatTab.openToggler { width: 400px !important; }" +
	     " .fbDockChatTab .fbDockChatTabFlyout { height: 900px !important; }" +
	     " .fbDockChatTab .input { height: 20px !important; width: 340px !important; font-size: medium !important; }" +
  	     " .fbDockChatTab .conversationContainer .fbChatMessage { font-size: medium; max-width: 720px !important; }";

GM_addStyle(style);

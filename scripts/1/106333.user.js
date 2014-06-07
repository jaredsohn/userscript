// ==UserScript==
// @name           Chat Destroyer
// @author         Sean Callahan
// @description    Gets rid of the annoying new facebook sidebar
// @include        http://*.facebook.com/*
// ==/UserScript==

GM_addStyle(".sidebarMode .fbChatSidebar { display: none !important; }");
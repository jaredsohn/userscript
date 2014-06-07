// ==UserScript==
// @name        Zap min-width
// @namespace   oreilly
// @description Shrink 'min-width' to 300px so browser window can be resized narrower. (Note: code samples still don't wrap though.)
// @include     http://courses.oreillyschool.com/*
// @version     1
// ==/UserScript==

//function GM_addStyle(css);

GM_addStyle("body {\
  min-width: 300px;\
  }");
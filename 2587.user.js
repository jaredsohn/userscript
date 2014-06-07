/*
  MSDN Title Fixer
*/

// ==UserScript==
// @name          MSDN Title Fixer
// @namespace     http://userscripts.org
// @description   Use title of content frame (API name) as MSDN top window title
// @include       http://msdn.microsoft.com/library/*?frame=true
// @exclude       http://msdn.microsoft.com/library/shared/deeptree/*
// @exclude       http://msdn.microsoft.com/library/shared/searchtab/*
// ==/UserScript==

top.document.title = document.title;


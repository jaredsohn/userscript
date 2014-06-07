// ==UserScript==
// @name        AtTask Remove Tasks
// @description Removes tasks from all work view.  Helpful when sorting by projects.
// @include     https://responsys.attask-ondemand.com/myWork
// @version     1
// ==/UserScript==

GM_addStyle('.work-request-list .work-request-item { display:none }');
// ==UserScript==
// @name        Kickstarter Activity Top Navigation
// @namespace   http://www.kickstarter.com
// @description Adds a copy of the page navigation to the top of the Activity feed
// @include     http://www.kickstarter.com/activity?*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @version     1.1
// @grant       none
// ==/UserScript==

var paginationDivClone = $(".pagination").clone();
$("#content-header-wrap").append(paginationDivClone);
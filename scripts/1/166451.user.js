// ==UserScript==
// @name           FP Colors
// @namespace      DaMoggen
// @description    Changes FP
// @match          http://facepunch.com/*
// @match          http://www.facepunch.com/*
// ==/UserScript==

var styleEl = document.createElement('style');
styleEl.type = 'text/css';
styleEl.innerHTML = '.forumhead, .threadlisthead, .newcontent_textcontrol, div#above_threadlist div.threadpagenav a.popupctrl, div#below_threadlist div.threadpagenav a.popupctrl, div#above_postlist div.pagination_top a.popupctrl, div#below_postlist div.pagination_bottom a.popupctrl, div#above_postlist a.popupctrl, div#pagination_top a.popupctrl, div#below_postlist div#pagination_bottom a.popupctrl, div#below_searchresults a.popupctrl, div.threadhead, div.threadfoot {background: none repeat scroll 0% 0% rgb(35, 103, 255)};'
document.documentElement.appendChild(styleEl);
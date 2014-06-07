// ==UserScript==
// @name           Newgrounds flash download link
// @namespace      http://script.namdx1987.org/
// @description    Display Newgrounds flash link when you visit a flash view page.
// @include        http://www.newgrounds.com/portal/view/*
// @resource flashlogo http://icons.iconarchive.com/icons/artdesigner/adobe-cs5/32/flash-icon.png
// ==/UserScript==

var headerBlock=document.querySelector("#embed_header>div");

var anchorTag=headerBlock.appendChild(document.createElement('a'));

var downloadFlashIcon=document.createElement('img');
downloadFlashIcon.src=GM_getResourceURL('flashlogo');
anchorTag.appendChild(downloadFlashIcon);

anchorTag.href=document.body.innerHTML.match(/http:\/\/uploads.ungrounded.net\/\d+.*?\.swf/);
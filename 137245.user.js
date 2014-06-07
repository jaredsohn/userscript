// ==UserScript==
// @name           Gelbooru original image fix
// @namespace      gelbooru
// @include        http://gelbooru.com/index.php?page=post&s=view&id=*
// @match          http://gelbooru.com/index.php?page=post&s=view&id=*
// ==/UserScript==

var link = document.evaluate('//*[@id="post-view"]/div[2]/div[2]/center/div/div[2]/ul/li[3]/a', document, null, 9, null).singleNodeValue;
link.onclick = "";
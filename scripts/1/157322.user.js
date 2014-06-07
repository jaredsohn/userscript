// ==UserScript==
// @name           highlight extranet hotels on catalog.ostrovok.ru
// @namespace      catalog.ostrovok.ru
// @include        http*://*ostrovok.ru*
// @include        http*://localhost:1336*
// ==/UserScript==


var htmlElement = document.getElementsByTagName('html')[0];
htmlElement.classList.add('internal');

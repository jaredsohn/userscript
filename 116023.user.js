// ==UserScript==
// @name           Bux Remove Iframe
// @namespace      http://userscripts.org/users/388389
// @description    Removes the iframe on the ad pages
// @include        http://*.*.*/pages/clickadsproc?h=*
// @copyright      lamtota
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML.replace(/<iframe.*?>/gmi, '');
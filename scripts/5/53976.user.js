// ==UserScript==
// @name           titel im tab
// @namespace      http://userscripts.org/users/33073/scripts?sort=installs
// @include        http://letsplayimpot.de/?v=*
// @include        http://www.letsplayimpot.de/?v=*
// ==/UserScript==

document.title = (document.evaluate("//div[@class='name']", document, null, 8, null).singleNodeValue.textContent);
// ==UserScript==
// @id             locopengunolike
// @name           locopengu.com like force remover
// @namespace      http://userscripts.org/users/475731
// @description    removes the like force on http://www.locopengu.com
// @version        1.0
// @date           2012-10-9
// @include        http://www.locopengu.com/*
// ==/UserScript==

var node = document.getElementById('cover');
node.parentNode.removeChild(node);
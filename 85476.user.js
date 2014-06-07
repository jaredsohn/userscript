// ==UserScript==
// @name           Examples : Metadata block reader
// @namespace      http://gm.wesley.eti.br/examples
// @include        http://userscripts.org/scripts/show/85476
// @resource       meta 85476.meta.js
// ==/UserScript==

var content = GM_getResourceText("meta").match(/^\/\/ ==UserScript==([^]+)\/\/ ==\/UserScript==$/m)[1],key,value;
while ([,key,value] = /^\/\/ @([^\s]+)\s+(.+)/gm.exec(content))
alert([key,value]);
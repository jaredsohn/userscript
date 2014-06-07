// ==UserScript==
// @name           Link Fixer(h**p://)
// @namespace      LocalHost
// @include        *
// ==/UserScript==

window.addEventListener('click', function(e){
if(e.target.nodeName!='A') return;
if(/^h..p/.test(e.target.href)) e.target.href=e.target.href.replace(/^h..p/, 'http');
}, false);
// ==UserScript==
// @id             ThinScrollBars
// @name           ThinScrollBars
// @version        1.0.0
// @namespace      https://userscripts.org/scripts/show/134404
// @author         Bengt Lüers
// @description    Replaces Chrome's scroll bars with reduced ones.
// @include        http://*
// @include        https://*
// @exclude
// @run-at         document-start
// ==/UserScript==

var css = [
'body{position:absolute;top:0;left:0;bottom:0;right:0;width:100%;height:100%;overflow-x:auto;overflow-y:auto;margin:0 -1px -1px 0;padding:0px}',
'html{overflow:auto}',
'::-webkit-scrollbar{overflow:hidden;background-color:rgba(0,0,0,0);width:1px;height:1px}',
'::-webkit-scrollbar-corner{background:rgba(255,255,255,1);width:1px;height:1px}',
'::-webkit-scrollbar-track{background-color:rgba(255,255,255,1)}',
'::-webkit-scrollbar-thumb{background-color:rgba(0,0,0,1)}',
].join('');
var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style'),
    rules = document.createTextNode(css);
style.type = 'text/css';
if(style.styleSheet)
    style.styleSheet.cssText = rules.nodeValue;
else style.appendChild(rules);
head.appendChild(style);


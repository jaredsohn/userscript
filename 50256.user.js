// ==UserScript==
// @name           Userscripts.org Always Allow Syntax Highlighting
// @namespace      http://userscripts.org/users/23652
// @description    Allows you to highlight source on source code pages, even if it's over 100kb
// @include        http://userscripts.org/scripts/review/*
// @include        https://userscripts.org/scripts/review/*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

(function(){
// Delete id/node by JoeSimmons
// Syntax: x('gbar');
function del(e) {
var node = (typeof e=='string') ? window.document.getElementById(e) : ((typeof e=='object') ? e : false);
if(node&&node.parentNode&&node.nodeType==1&&node.parentNode.nodeType==1) {node.parentNode.removeChild(node);return true;}
else {return false;}
}

window.addEventListener('load', function(){
var a = document.evaluate("//a[contains(.,'Add Syntax Highlighting')]",document,null,9,null).singleNodeValue,
	over = document.evaluate("//p[contains(.,'the source is over 100KB')]",document,null,9,null).singleNodeValue;

var source = window.document.getElementById('source').innerHTML.length,
	suffix = '';
if(source>1024) {suffix=' kb'; source=source/1024;}
if(source>1024) {suffix=' mb'; source=source/1024;}
source+='';
if((suffix==' kb'||suffix==' mb') && source.toString().length>4) source=source.substring(0,5);
if((a||over) && confirm('Highlight code? Size: '+source+suffix+'.')) unsafeWindow.sh_highlightDocument();

if(a&&(a=a.parentNode)) del(a); else if(over) del(over);
}, false);
})();
// ==UserScript==
// @name           mixi dev utils
// @namespace      http://blog.endflow.net/
// @include        http://mixi.jp/list_appli.pl*
// ==/UserScript==

(function(){
$x('//p[@class="appIcon"]/a').forEach(function(a)a.href += '&nocache=1');
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();
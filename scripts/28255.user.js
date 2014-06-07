// ==UserScript==
// @name           Koders search enhancement
// @namespace      http://endflow.net/
// @description    start to search automatically on changing language or license option in Koders.
// @include        http://www.koders.com/*
// ==/UserScript==
// @version        0.1.0 [2008-06-12]
// @history        [2008-06-12] 0.1.0 first version

(function(){
var w = this.unsafeWindow || window;
w.addEventListener('load', function(){with(w){
    $x('//div[@id="searchBar"]/div/select').forEach(function(sel){
        sel.addEventListener('change', function(){
            document.getElementById('f').submit();
        }, false);
    });
}}, false);
// THX! XPath util compressed version (original written by cho45 [http://lowreal.net/logs/2006/03/16/1])
function $x(b,c){if(!c)c=document;var d=function(a){var o=document.createNSResolver(c)(a);
return o?o:(document.contentType=="text/html")?"":"http://www.w3.org/1999/xhtml"}
var b=document.createExpression(b,d);var e=b.evaluate(c,XPathResult.ANY_TYPE,null);
switch(e.resultType){case XPathResult.STRING_TYPE:return e.stringValue;
case XPathResult.NUMBER_TYPE:return e.numberValue;case XPathResult.BOOLEAN_TYPE:return e.booleanValue;
case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:{e=b.evaluate(c,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var f=[];for(var i=0,len=e.snapshotLength;i<len;i++){f.push(e.snapshotItem(i))}return f}}return null}
})();

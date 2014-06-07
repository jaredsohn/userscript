// ==UserScript==
// @name           GIGAZINE auto read more
// @namespace      http://endflow.net/
// @description    move to detailed page automatically if you enter summary page on GIGAZINE website.
// @include        http://gigazine.net/index.php?/news/*/
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Flickr: netkuy)
// @version        0.1.0 [2008-06-18]
// @history        [2008-06-18] 0.1.0 first version

(function(){
var w = this.unsafeWindow || window;
w.addEventListener('load', function(){
    var anchors = $x('id("maincol")/div/p/a');
    if(anchors && anchors[0].href.indexOf('comment') != -1){
        w.document.location.href = anchors[0].href;
    }
}, false);
// THX! XPath util compressed version (original written by cho45 [http://lowreal.net/logs/2006/03/16/1])
function $x(b,c){if(!c)c=document;var d=function(a){var o=document.createNSResolver(c)(a);
return o?o:(document.contentType=="text/html")?"":"http://www.w3.org/1999/xhtml"}
var b=document.createExpression(b,d);var e=b.evaluate(c,XPathResult.ANY_TYPE,null);
switch(e.resultType){case XPathResult.STRING_TYPE:return e.stringValue;
case XPathResult.NUMBER_TYPE:return e.numberValue;case XPathResult.BOOLEAN_TYPE:return e.booleanValue;
case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:{e=b.evaluate(c,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var f=[];for(var i=0,len=e.snapshotLength;i<len;i++){f.push(e.snapshotItem(i))}return f}}return null}
})();

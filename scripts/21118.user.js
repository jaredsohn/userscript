// ==UserScript==
// @name           Norikae-Annai TabIndex Improver
// @namespace      http://endflow.net/
// @description    change tab index and focus on "from" text box.
// @include        http://www.jorudan.co.jp/
// ==/UserScript==
//
// @author         Yuki KODAMA [Twitter: kuy] http://endflow.net/
// @version        0.1.1
// @history        [2008-01-24] 0.1.0 first release
//                 [2008-01-29] 0.1.1 supported Opera

(function(){
var w = typeof unsafeWindow == typeof void 0 ? window : unsafeWindow;
w.addEventListener('load', function(){
	with(document.getElementById('eki1_id_i0')){
		tabIndex = 1;
		focus();
	}
	document.getElementById('eki2_id_i1').tabIndex = 2;
	$x('//input[@class="searchbt"]')[0].tabIndex = 3;
},
false);
// XPath util compressed version (original written by cho45 [http://lowreal.net/logs/2006/03/16/1])
function $x(b,c){if(!c)c=document;var d=function(a){var o=document.createNSResolver(c)(a);
return o?o:(document.contentType=="text/html")?"":"http://www.w3.org/1999/xhtml"}
var b=document.createExpression(b,d);var e=b.evaluate(c,XPathResult.ANY_TYPE,null);
switch(e.resultType){case XPathResult.STRING_TYPE:return e.stringValue;
case XPathResult.NUMBER_TYPE:return e.numberValue;case XPathResult.BOOLEAN_TYPE:return e.booleanValue;
case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:{e=b.evaluate(c,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var f=[];for(var i=0,len=e.snapshotLength;i<len;i++){f.push(e.snapshotItem(i))}return f}}return null}
})();

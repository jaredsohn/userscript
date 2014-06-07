// ==UserScript==
// @name          NYTimes Save to Y! MyWeb
// @namespace     http://minwoo.blogsite.org
// @description	  Replaces SAVE link target to save single page article to Y! My Web instead.
// @include       http://*.nytimes.com/*
// ==/UserScript==
(
 function()
 {       
   var save = document.evaluate("//li[@class='savepage']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null ).singleNodeValue;
   if (!save) {
     return;
   }
   var a = document.evaluate("a", save, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
   if (!a) {
     return;
   }
   var l = window.location.href;
   l = l.substring(0, l.indexOf('html') + 4);
   l += '?pagewanted=all';
   var onclick = "javascript:void window.open('" + encodeURI("http://myweb2.search.yahoo.com/myresults/bookmarklet?t=" + document.title + "&u=" + l) + "','popup','width=520px,height=420px,status=0,location=0,resizable=1,scrollbars=1,left=100,top=50',0);";
   a.setAttribute('onClick', onclick);
}
)();


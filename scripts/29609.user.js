// ==UserScript==
// @name           NicoVideo Tag Search Sorting Order
// @namespace      http://endflow.net/
// @description    customizes sorting order of tag search result when you click tag-link in video page.
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==
// @author         Yuki KODAMA (twitter:kuy, skype:netkuy)
// @version        0.1.0 [2008-06-23]
// @history        [2008-06-23] 0.1.0 first release

(function(){
var cfg = {
    // 
    sort: 'v',
    // 
    order: 'd'
};
var parray = [];
for(var k in cfg) parray.push(k + '=' + cfg[k]);
var params = parray.join('&');
$x('//a[@class="nicopedia"]').forEach(function(tag){
    (parray.length != 0) && (tag.href += '?' + params);
});
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes;}
})();

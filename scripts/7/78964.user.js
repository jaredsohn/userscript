// ==UserScript==
// @name           Hatena Diary Footnote Expander
// @namespace      http://blog.endflow.net/
// @description    Expand all footnotes automatically in Hatena Diary.
// @include        http://d.hatena.ne.jp/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)

(function(){
// styles
GM_addStyle(<><![CDATA[
.footnote {color: #686868}
]]></>);
// main
$x('//span[@class="footnote"]/a').forEach(function(link){
    var span = link.parentNode;
    span.innerHTML = '[' + link.innerHTML + ': ' + link.title + ']';
});
// util
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();

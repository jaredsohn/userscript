// ==UserScript==
// @name           Amazon Mini Product Details
// @namespace      http://endflow.net/
// @description    show product details in top of page.
// @include        http://*amazon.tld/*/dp/*/*
// @include        http://*amazon.tld/gp/product/*/*
// ==/UserScript==

(function(){
var cfg = {
    item:['発売日', '出版社', '言語', 'Publisher:', 'Paperback:', 'Language:'],
    pad:'&nbsp;/&nbsp;'
};
var details = cfg.item.map(function(item){
    return $x('//td[@class="bucket"]/div[@class="content"]/ul/li')
        .filter(function(li)li.innerHTML.indexOf(item) != -1)
        .map(function(li)li.innerHTML)
        .join(cfg.pad);
}).filter(function(e)e != '').join(cfg.pad);
if(details == '') return;
var w = this.unsafeWindow || window;
var hr = $x('//hr[@class="bucketDivider"]')[0];
var div = w.document.createElement('DIV');
div.className = 'bucket';
div.innerHTML = details;
var nhr = hr.cloneNode(false);
hr.parentNode.insertBefore(nhr, hr);
hr.parentNode.insertBefore(div, hr);
function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();

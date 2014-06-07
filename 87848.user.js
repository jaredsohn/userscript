// ==UserScript==
// @name           Amazon Total Cost
// @namespace      http://endflow.net/
// @description    Shows a total cost (= item price + shipping cost) to the cell in columns.
// @version        0.1.1
// @include        http://www.amazon.co.jp/gp/offer-listing/*/*
// @include        http://amazon.co.jp/gp/offer-listing/*/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2010-10-10] 0.1.0 first version
//                 [2011-05-18] 0.1.1 fix to support Google Chrome

(function() {
// styles
var style = document.createElement('style');
style.setAttribute('type', 'text/css');
style.appendChild(document.createTextNode(
    "td div.total_block {" +
    "    border: medium none;" +
    "    margin: 0;" +
    "    padding: 0 0 4px 2px;" +
    "}" +

    ".price_total {" +
    "    color: #666666;" +
    "    font-family: Arial,Verdana,Helvetica,sans-serif;" +
    "    font-size: 11px;" +
    "    font-weight: normal;" +
    "    margin: 0;" +
    "}" +

    ".word_total {" +
    "    color: #666666;" +
    "    font-family: Verdana,Arial,Helvetica,sans-serif;" +
    "    font-size: 11px;" +
    "    font-weight: normal;" +
    "    margin-left: 3px;" +
    "}"));
(document.body || document.head || document.documentElement).appendChild(style);

// main
var PRICE_PAT = /^\s*\+?\s*￥\s+(\d+)\s*$/;
var spans = $x('//span[@class="price_shipping"]');
if (spans.length){
    for(var i in spans){
        // extract shipping cost
        var span = spans[i];
        var matches = span.innerHTML.replace(',', '').match(PRICE_PAT);
        if(matches.length !== 2) { break; }
        var shipCost = parseInt(matches[1], 10);
        if(isNaN(shipCost)) { break; }

        // extract item cost
        var el = span.parentNode.previousSibling;
        while(el){
            if(el.nodeType === 1 && el.tagName.toLowerCase() === 'span'){ break; }
            el = el.previousSibling;
        }
        matches = el.innerHTML.replace(',', '').match(PRICE_PAT);
        if(matches.length !== 2) { break; }
        var itemCost = parseInt(matches[1], 10);
        if(isNaN(itemCost)) { break; }

        // add total box
        var total = itemCost + shipCost;
        var box = document.createElement('div');
        box.setAttribute('class', 'total block');
        box.innerHTML = '<span class="price_total">= ￥ ' + total + 
                        '</span><span class="word_total">（合計）</span>';
        span.parentNode.appendChild(box);
    }
}

function $x(x,c){c=c||document;var res=document.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();

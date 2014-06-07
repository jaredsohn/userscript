// ==UserScript==
// @name       Ebay GBP to EUR
// @namespace  http://example.com/
// @match  *://*ebay.co.uk/*
// @version    0.1
// @description  converts all prices in GBP on site to EUR
// @copyright  2012+, Luckylooke
// ==/UserScript==

GM_log('script "Ebay GBP to EUR" is running');
var node,
    nodewalk = function(node, str){
         if (typeof str != 'array'){ str = []};
         for (var i = 0; i < node.length; i++) {
              if (node[i].hasChildNodes() && 'SCRIPT' !== node[i].nodeName){
                  str = nodewalk(node[i].childNodes,str);
              };
              if (3 === node[i].nodeType){
                  var num, tmp = node[i].textContent;
                  if(tmp.indexOf('£')!=-1){
                      num = parseFloat(tmp.match(/[0-9]+.[0-9]+/));
                      if(num){
                          num *= parseFloat(window.top.document.getElementById('exchangeRate').innerHTML);
                          node[i].textContent = tmp.replace(/£[0-9]+.[0-9]+/,'€'+num.toFixed(2));
                      }
                  }
              };
          }
          return str;
      };
if (window.top == window.self) {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://rate-exchange.appspot.com/currency?from=GBP&to=EUR",
        onload: function(response) {
            var tmp = document.createElement('div');
            tmp.id = 'exchangeRate';
            tmp.innerHTML = response.responseText.match(/rate": [0-9]+.[0-9]+/)[0].replace('rate": ','');
            document.getElementsByTagName('body')[0].appendChild(tmp);
            nodewalk(document.getElementsByTagName('body'));
        }
    });
}else{
 	nodewalk(document.getElementsByTagName('body'));   
}
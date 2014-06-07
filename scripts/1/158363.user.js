// ==UserScript==
// @name       Ebay GBP to DKK
// @namespace  http://ebay.co.uk/
// @match  *://*ebay.co.uk/*
// @include  http://*ebay.co.uk/*
// @include  http://ebay.co.uk/*
// @version    1.2
// @description  converts all prices in GBP on site to DKK
// Credits to Luckylooke
// ==/UserScript==

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
                          node[i].textContent = tmp.replace(/£[0-9]+.[0-9]+/, num.toFixed(2)+' kr.');
                      }
                  }
              };
          }
          return str;
      };
if (window.top == window.self) {
    GM_xmlhttpRequest({
        method: "GET",
        url: "http://rate-exchange.appspot.com/currency?from=GBP&to=DKK",
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
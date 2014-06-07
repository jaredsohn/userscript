// ==UserScript==
// @name       Gmail: show full email addresses
// @namespace  http://example.com/
// @match  *://*mail.google.com/*
// @exclude       https://mail.google.com/*view=btop*
// @exclude       https://accounts.google.com/*
// @version    0.1
// @description  Gmail: showing full email addresses
// @copyright  2013+, Luckylooke
// ==/UserScript==

GM_log('script "Gmail: show full email addresses" is running');
if (window.top != window.self)  //don't run on frames or iframes
  return;

var node,
    nodewalk = function(node, str){
         if (typeof str != 'array'){ str = []};
         for (var i = 0; i < node.length; i++) {
              if (node[i].hasChildNodes() && 'SCRIPT' !== node[i].nodeName){
                  str = nodewalk(node[i].childNodes,str);
              };
              if (node[i].tagName && node[i].tagName == 'SPAN'){
                  var tmp = node[i].getAttribute('email');
                  if(tmp){
                      node[i].textContent = tmp;
                  }
              };
          }
          return str;
      };
setInterval(function(){nodewalk(document.getElementsByTagName('body'));  GM_addStyle(".yY { width:400px; }");},7000);


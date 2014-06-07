// Author: ssuede
// Version: 0.01
// ==UserScript==
// @name           Alabout Behave
// @namespace      ssuede
// @description    Strips intermediate advertising pages and link tracking from Alabout results.
// @include        http://www.alabout.com/*
// ==/UserScript==

rewriteLinks();

function rewriteLinks() {
  var links = $x("//a", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  links.forEach(function(link) { 
    var old = link.text;
    if (link.getAttribute('target')) { 
      link.removeAttribute('target');
      link.href = link.text;
    }
  });
}


// XPath helper, from
// http://wiki.greasespot.net/Code_snippets
function $x() {
  var x='',          // default values
  node=document,
  type=0,
  fix=true,
  i=0,
  toAr=function(xp){      // XPathResult to array
    var final=[], next;
    while(next=xp.iterateNext())
      final.push(next);
    return final
  },
  cur;
  while (cur=arguments[i++])      // argument handler
    switch(typeof cur) {
  case "string":x+=(x=='') ? cur : " | " + cur;continue;
  case "number":type=cur;continue;
  case "object":node=cur;continue;
  case "boolean":fix=cur;continue;
  }
  if (fix) {      // array conversion logic
    if (type==6) type=4;
    if (type==7) type=5;
  }
  if (!/^\//.test(x)) x="//"+x;            // selection mistake helper
  if (node!=document && !/^\./.test(x)) x="."+x;  // context mistake helper
  var temp=document.evaluate(x,node,null,type,null); //evaluate!
  if (fix)
    switch(type) {                              // automatically return special type
  case 1:return temp.numberValue;
  case 2:return temp.stringValue;
  case 3:return temp.booleanValue;
  case 8:return temp.singleNodeValue;
  case 9:return temp.singleNodeValue;
  }
  return fix ? toAr(temp) : temp;
}
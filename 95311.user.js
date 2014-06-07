// ==UserScript==
// @name           Cheebstas GM API
// @namespace      CGMAPI
// @description    Various toys and tools for GM scripting
// @version        0.01
// @include        *
// ==/UserScript==
var C_API = {
  debug:function(str)        { var d = document.createElement('div'); document.body.appendChild(d); d.innerHTML = str + ''; },
  xpath:function(query)      { return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); },
  getNode:function(path) { var value = C_API.xpath(path); if (value.snapshotLength == 1) { return value.snapshotItem(0); } return null;},
  getNodeTC:function(path) { var value = C_API.getNode(path); if (value != null) { return value.textContent; } return null;},
  getNodeValue:function(path) { var value = C_API.getNode(path); if (value != null) { return value.value; } return null; },
  set:function(key, value)   { GM_setValue(key, value); },
  get:function(key, defVal)  { var ret = GM_getValue(key); if (ret != undefined) { return ret; } else { return defVal; } },
  parseSep:function(number) { return number.replace(',', ''); },
  addSep:function(number)   { 
      if (number*1 == NaN) { return number; } 
      var ret = ''; 
      number += ''; 
      var ext = ''; 
      var sc = 0; 
      if (number[0] == '-') { 
        ext = '-'; 
        number = number.substring(1, number.length); 
      } 
      for (var i=0; i<number.length; i++) {
        ret = number[number.length - (i + 1)] + ret;
        sc  += 1;
        if (sc == 3 && i + 1 < number.length) { ret = ',' + ret;  sc = 0;  } 
      } 
      return ext + ret; 
    },
};
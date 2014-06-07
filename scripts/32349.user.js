// ==UserScript==
// @name           6hc
// @namespace      tamiaode
// @include        https://www.tamiaode.com/new/sixinput.asp?*
// ==/UserScript==


var D1;
D1 = document.getElementsByName("zhu");
var varItem = new Option("Come on!","10000"); 
// objSelect.options[objSelect.options.length] = varItem; 
D1[0].options.add(varItem); 
D1[0].options[22].selected = true; 

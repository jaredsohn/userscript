// ==UserScript==
// @name          Disable JavaScript Alert
// @author        
// @namespace     
// @description	  
// ==/UserScript==

var node = document.getElementsByTagName('script')[0];
var str = node.firstChild.textContent;
var result = str.replace(/alert("[\w\s.]*");/, "");
node.firstChild.textContent = result;
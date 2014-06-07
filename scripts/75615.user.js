// ==UserScript==
// @name           GridEraser for Google Docs
// @namespace      http://userscripts.org/users/bigg22
// @description    Allows for the removal of gridlines in Google Docs Spreadsheets when downloading sheet as HTML
// @include        http*://spreadsheets.google.*
// ==/UserScript==

javascript:var v="none",e="defaultView",o="border",m="Color",w=function(a,b){if(document[e]){if(document[e].getComputedStyle(a,null)[o+b+m]=="rgb(204, 204, 204)")a.style[o+b]=v}else if(a.currentStyle[o+b+m]=="#ccc")a.style[o+b]="none"},q=function(a){a=window.document.getElementsByTagName(a);for(var b=0;b<a.length;b++){var c=a[b];w(c,"Left");w(c,"Right");w(c,"Bottom");w(c,"Top")}};q("td");q("table");
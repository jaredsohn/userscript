// ==UserScript==
// @name           Restyle Absol
// @include        http://absol.site88.net/gtools/*
// ==/UserScript==

function addCss(cssString) {
   var head = document.getElementsByTagName('head')[0];
   if (!head) { return; }
   var newCss = document.createElement('style');
   newCss.type = "text/css";
   newCss.innerHTML = cssString;
   head.appendChild(newCss);
}
addCss ('html { background-color: #383838; background-attachment:fixed; color: white; min-height:100%;}a { color: lightblue;}.button { cursor: pointer;}.statcounter,#statCounter{ display:none;}#banned{ position:fixed; width:100%; height:100%; background-color:#383838; z-index:99999; margin:0px; padding:0px; top:0px; left:0px;}
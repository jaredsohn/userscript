// ==UserScript==
// @name           hide visited links
// @namespace      http://squarefree.com/pornzilla
// @description    show only unvisited galleries in a TGP
// @ include       *
// ==/UserScript==


  var newSS;
  var styles=':visited {display: none}';
  if(document.createStyleSheet) {
    document.createStyleSheet("javascript:'"+styles+"'");
  } else {
    newSS=document.createElement('link');
    newSS.rel='stylesheet';
    newSS.href='data:text/css,'+escape(styles);
    document.documentElement.childNodes[0].appendChild(newSS);
  } 
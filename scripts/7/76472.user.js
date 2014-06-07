// ==UserScript==
// @name          Simplified version of dblpFigures
// @description   DBLP past publications for paper's first author
// @include       http://icwe2009.webengineering.org/*
// ==/UserScript==

var doc=window.document;

//MOD-LOGIC
function createDblpFiguresPanel(author){
 var dblpFiguresPanel=doc.createElement("span");
 //A panel with a past publications of selected 
 //author from DBLP is created and assigned to
 //the dblpFigures variable
 ...
 return dblpFiguresPanel;
}

function init(){
 //HTML SCRAPING
 var papers=document.evaluate(
"//*[@class='paper']",document,null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
 for(var i=0;i<papers.snapshotLength;i++){
  //HTML SCRAPING
  var firstAuthor=document.evaluate(
".//*[@class='author']",papers[i],null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null).
item(0);
 //MOD-LOGIC CALL
 var dblpFiguresPanel=
 createDblpFiguresPanel(firstAuthor);
 //HTML INJECTION
 papers[i].appendChild(dblpFiguresPanel);
 }
}

doc.addEventListener('load',init,true);
// ==UserScript==
// @author         Denis Balazuc
// @name           Up To Ten Cleanup (french)
// @namespace      http://balazuc.net/scripts
// @description    Keeps only the shockwave flash game part of the page.
// @include        http://*.uptoten.com/enfants/*
// ==/UserScript==

(function() {  

  var body = window.document.lastChild.lastChild;  
  var div = body.lastChild;

  //removes the last table (disclaimer ads)  
  div.removeChild(div.lastChild);
  //some text element
  div.removeChild(div.lastChild);
  
  
  //TBODY of the content table
  var tableBody = div.lastChild.lastChild;
  
  //last 3 TRs are links to products
  tableBody.removeChild(tableBody.lastChild);
  tableBody.removeChild(tableBody.lastChild);
  tableBody.removeChild(tableBody.lastChild);
  tableBody.removeChild(tableBody.lastChild);
  tableBody.removeChild(tableBody.lastChild);
  tableBody.removeChild(tableBody.lastChild);
  
  //remove leftmost TD (ads and google)
  var tr = tableBody.firstChild;
  tr.removeChild(tr.firstChild); //text element
  tr.removeChild(tr.firstChild); //leftmost TD
}
)();


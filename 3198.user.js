// ==UserScript==
// @author         Denis Balazuc
// @name           Up To Ten Cleanup (english)
// @namespace      http://balazuc.net/scripts
// @description    Keeps only the shockwave flash game part of the page.
// @include        http://*.uptoten.com/kids/*
// ==/UserScript==

(function() {  

  var body = window.document.lastChild.lastChild;  
  var div = body.lastChild;

  //removes the last table (disclaimer ads)  
  //and some text element
  div.removeChild(div.lastChild); 
  div.removeChild(div.lastChild);
  div.removeChild(div.lastChild);
  
  //Content table
  var tbody = div.lastChild.lastChild;
  //remove last TR
  tbody.removeChild(tbody.lastChild);
  tbody.removeChild(tbody.lastChild);
  
  //First TD of first TR is google ads and other stores links
  var tr = tbody.firstChild;
  tr.removeChild(tr.firstChild);
  tr.removeChild(tr.firstChild);
}
)();


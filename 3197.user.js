// ==UserScript==
// @author         Denis Balazuc
// @name           Le Monde.fr Index Page Cleanup
// @namespace      http://balazuc.net/scripts
// @description    Keeps the main page and side stories
// @include        http://*.lemonde.fr/*
// ==/UserScript==

(function() {  

  var body = window.document.lastChild.lastChild;    

  //Wipe all up to the 2nd table
  var child = body.firstChild;
  var sibling = child.nextSibling;
  
  while (child.nodeName != "TABLE") {    
    body.removeChild(child);
    child = body.firstChild;
  }
  
  //TABLE
  body.removeChild(child);
  child = body.firstChild;
  
  while (child.nodeName != "TABLE") {    
      body.removeChild(child);
      child = body.firstChild;
  }
  
  //2nd table is top level links - keep
  child = child.nextSibling;
     
  //3rd table is ads - remove
  while (child.nodeName != "TABLE") {    
    sibling = child.nextSibling;
    body.removeChild(child);
    child = sibling;
  }
  //TABLE
  sibling = child.nextSibling;
  body.removeChild(child);
  child = sibling;
  
  //4th table is content
  while (child.nodeName != "TABLE") {    
      sibling = child.nextSibling;
      body.removeChild(child);
      child = sibling;
  }
  
  //3rd TD of 4th table is not great - remove  
  //child = TABLE  
  var tr = child.lastChild.firstChild;  
  tr.removeChild(tr.lastChild);
  tr.removeChild(tr.lastChild);    
  
  sibling = body.lastChild;
  //remove the rest...  
  while (child != sibling) {
    body.removeChild(sibling);
    sibling = body.lastChild;
  }
  
  //adjust TABLE widths
  var table = body.firstChild;
  table.style.width = "100%";
  
  table = table.nextSibling;
  table.style.width = "100%";
}
)();


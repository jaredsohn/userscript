// ==UserScript==
// @author         Denis Balazuc
// @name           Le Monde.fr Articles Cleanup
// @namespace      http://balazuc.net/scripts
// @description    Keeps the main page and side stories
// @include        http://*.lemonde.fr/web/article/*
// @include        http://*.lemonde.fr/web/sequence/*
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
  //remove ads from 2nd TR
  var tr = child.lastChild.lastChild.previousSibling;
  var td = tr.firstChild.nextSibling;
  var div = td.firstChild.nextSibling;
  div.removeChild(div.firstChild);
  div.removeChild(div.firstChild);
  div.removeChild(div.firstChild);
  div.removeChild(div.firstChild);
  div.removeChild(div.firstChild);
  div.removeChild(div.lastChild);
  div.removeChild(div.lastChild);
  div.removeChild(div.lastChild);
  div.removeChild(div.lastChild);
  div.removeChild(div.lastChild);
  
  //2nd TD of 4th table (content)
  td = tr.lastChild.previousSibling;
  td.removeChild(td.lastChild);
  td.removeChild(td.lastChild);
  td.removeChild(td.lastChild);
  
  
  //remove all from bottom, up to 2nd table
  child = body.lastChild;
  while (child.nodeName != "TABLE") {    
      body.removeChild(body.lastChild);
      child = body.lastChild;
  }    
  body.removeChild(lastChild);
  while (child.nodeName != "TABLE") {    
        body.removeChild(body.lastChild);
        child = body.lastChild;
  }    
  body.removeChild(lastChild);
}
)();


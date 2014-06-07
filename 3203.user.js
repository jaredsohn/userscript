// ==UserScript==
// @author         Denis Balazuc
// @name           Up To Ten Homepage Cleanup
// @namespace      http://balazuc.net/scripts
// @description    Keeps only the shockwave flash
// @include        http://www.uptoten.com/
// ==/UserScript==

(function() {  

  var body = window.document.lastChild.lastChild;  
  var div = body.lastChild.previousSibling;

  //removes all BUT the first table
  var child = div.firstChild;
  while (child.nodeName != "TABLE") {
    div.removeChild(child);
    child = div.firstChild;
  }
  //delete backward
  var backward = div.lastChild;
  while (backward != child) {
    div.removeChild(backward);
    backward = div.lastChild;
  }  
}
)();


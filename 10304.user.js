// ==UserScript==
// @name           showIdInTitle
// @namespace      http://gmscripts.bigsleep.net
// @description    Simply adds the ID of every element to its title attribute
// @version        0.3
// @include        *
// ==/UserScript==

// You should be able to change this to any attribute name
var attribute = "id";

var id_elms = getXPathSnapshot("//body//*[@"+attribute+"]");
for(var i=0; i < id_elms.snapshotLength; i++){
  var id_elm = id_elms.snapshotItem(i);
  var elm_title = "[ " +
      id_elm.tagName + " " + attribute + "=\"" +
      id_elm.getAttribute(attribute) + "\" ]";
  if(id_elm.title){
    elm_title = elm_title + "\n" + id_elm.title;
  }
  id_elm.setAttribute("title",elm_title);
}
function getXPathSnapshot(expr){
  var node = (arguments[1])? arguments[1]: document;
  var nodes = document.evaluate(expr, node, null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  return nodes;
}


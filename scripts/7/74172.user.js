// ==UserScript==
// @name           Replacer
// @description    Replaces vaginismus with feminism
// @include        http://en.wikipedia.org/wiki/Vaginismus
// ==/UserScript==

function replace (domobject, num) {
  if (domobject.nodeType==1){
    var nNodes = domobject.childNodes.length;
    for (var i=0;i<nNodes;++i)
      replace (domobject.childNodes[i],num+1);
  }
  if (domobject.nodeType == 3) {
    domobject.nodeValue = domobject.nodeValue.split ("vaginismus").join("feminism");
    domobject.nodeValue = domobject.nodeValue.split ("Vaginismus").join("Feminism");
    domobject.nodeValue = domobject.nodeValue.split ("vaginismic").join("feminist");
    domobject.nodeValue = domobject.nodeValue.split ("Vaginismic").join("Feminist");
    domobject.nodeValue = domobject.nodeValue.split ("vaginism").join("fæminism");
    domobject.nodeValue = domobject.nodeValue.split ("Vaginismus").join("Fæminism");
  }
}
function doShit() {
  replace (document.body, 0);
}
window.addEventListener ("load", doShit, false);
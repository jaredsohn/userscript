// ==UserScript==
// @name           BigSitePrint
// @namespace      http://mhill.net/greasemonkey
// @description    Eliminate "blank.gif" gaps in B* print pages
// @include        http://biggovernment.com/*/print/
// @include        http://bighollywood.breitbart.com/*/print/
// @include        http://bigjournalism.com/*/print/
// ==/UserScript==

// function find_img_nodes () {
function find_img_nodes () {
  var Elements = new Array();
  for (var i = 0; i < document.images.length; i++) {
    if (document.images[i].getAttribute ("src") == "/wp-includes/images/blank.gif") {
      Elements.push (document.images[i].parentNode);
    }
  }
  return (Elements);
}

nodeList = find_img_nodes();
// alert (nodeList.length + " blank.gif IMG tags found");
for (i = 0; i < nodeList.length; i++) {
  nodeList[i].parentNode.removeChild (nodeList[i]);
}

// alert ("GM script finished.");


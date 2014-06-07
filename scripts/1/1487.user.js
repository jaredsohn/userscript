// ==UserScript==
// @name          Orkut zoom album
// @namespace     http://www.orkut.com/
// @description   Replaces small images on album overview page with larger versions. It also updates the table so there is one large image per row.
// @include       http://www.orkut.com/AlbumView.aspx*
// ==/UserScript==

var images = document.evaluate(
    "//img[contains(@src, 'milieu')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// reformat the table so that there is only 1 photo per row
var tablecells = new Array();
for (var ii = 0; ii < images.snapshotLength; ii++) {
  var img_elem = images.snapshotItem(ii);
  var imgsrc = new String(img_elem.src);
  img_elem.src = imgsrc.replace(/milieu/,"album");
  
  tablecell = FindParentElem(img_elem, "TD");
  if (tablecell) tablecells.push(tablecell);
}

if (tablecells.length > 1) {
  var table_elem = FindParentElem(tablecells[0], "TABLE");
  if (table_elem) {
    var innerTableHTML = new String();
    
    for (var jj=0; jj< tablecells.length; jj++) {
      innerTableHTML += "<tr><td>" + tablecells[jj].innerHTML + "</td></tr>";
    }
    
    table_elem.innerHTML = innerTableHTML;
  }
}

function FindParentElem(element, nodename) {
  var parentElement = element;
  for (var jj=0; jj<10 && parentElement; jj++) { // safty first
    if (parentElement = parentElement.parentNode) {
      if (parentElement.nodeName.toLowerCase() == nodename.toLowerCase()) {
        return parentElement;
        break;
      }
    }
  }
  return null;
}
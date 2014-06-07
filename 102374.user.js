// ==UserScript==
// @name           Reference Catalog icon
// @namespace      bricklink
// @description    Changes the icon to the image of the part in the reference catalog
// @version        1.1
// @icon           http://www.sculpturesupplies.com.au/GMBL.png
// @include        http://www.bricklink.com/catalogItem.asp?*
// @include        http://www.bricklink.com/catalogPG.asp?*
// @match          http://www.bricklink.com/catalogItem.asp?*
// @match          http://www.bricklink.com/catalogPG.asp?*
// ==/UserScript==

var snapImg=document.evaluate("//img[@id='img1']",
	document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (snapImg.snapshotLength==0) {
  snapImg=document.evaluate("//img[@id='img-1']",
	document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
}
if (snapImg.snapshotLength==1) {
  var elm = snapImg.snapshotItem(0);
  if (elm.src.indexOf('noImage.gif'==-1)) {
    // Remove existing favicon
    oldLink = document.getElementById('dynamic-favicon');
    if (oldLink) {
      document.head.removeChild(oldLink);
    } 
    else {
      var links = document.head.getElementsByTagName("LINK");
      for (var i=0; i<links.length; i++) {
        var link = links[i]
        if (link.rel.toUpperCase() == "SHORTCUT ICON") {
          document.head.removeChild(link)
        }
      }
    }
    // Set new favicon
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = elm.src;
    document.getElementsByTagName('HEAD')[0].appendChild(link);
  }
}

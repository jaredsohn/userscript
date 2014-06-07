// ==UserScript==
// @name           google image direct
// @namespace      znerp
// @include        http://images.google.com/images?*
// @description    goes to large version of image if you mouseover holding alt
// ==/UserScript==

var allImages = document.evaluate('//img[contains(@src, "google.com/images?q=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (i = allImages.snapshotLength - 1; i >= 0; i--) {
  var thisImage = allImages.snapshotItem(i);
  thisImage.addEventListener(
    'mouseover',
    function(e){
      if(e.altKey){
        document.location = this.src.substring(this.src.lastIndexOf('http:') , this.src.length );
      }
    },
    false);
}

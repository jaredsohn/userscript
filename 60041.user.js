// ==UserScript==
// @name           Renderosity file source
// @namespace      http://nejc.info/
// @author         nEJC
// @description    display images are replaced with full images in image webpage
// @include        http://www.renderosity.com/mod/gallery/index.php?image_id=*
// ==/UserScript==

// NOTE:
// I used SparcMan's "Renderosity file links" script as a base for this one
//

// this script will 'fix' the image webpage to display original image instead
// of the display one - no more pop-up windows needed



var xpath = "//img[@class='gallery_display_image_cell']";



var links = document.evaluate(xpath, document, null,

            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



if (links.snapshotLength) {

  for (var i = 0; i < links.snapshotLength; i++) {

    var img, link;

    img = links.snapshotItem(i);

    var idx = img.src.indexOf("/display_");

    if (idx > 0) {
// http://www.renderosity.com/mod/gallery/media/folder_197/display_XXXX.jpg
      var newsrc = img.src.substr(0,idx) + "/file_" + img.src.substr(idx + 9);
// http://www.renderosity.com/mod/gallery/media/folder_197/file_XXXX.jpg
      var gifidx = newsrc.indexOf(".gif");

      if (gifidx > -1) newsrc = newsrc.substr(0,gifidx) + ".jpg" ;
      img.src = newsrc;

    }

  }

}
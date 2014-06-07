// ImageCASH redirector
// version 0.2
// created: 16 apr 2006
// last update: 21 apr 2006
// Copyright (c) 2006, darodi

// ==UserScript==
// @name          ImageCASH redirector
// @namespace     http://
// @description   Automatically redirects image pages to the image itself
// @include       http://www.imagecash.net/image.php*
// ==/UserScript==

//Changelog:
//*version 0.2: xpath more general (second centered image)
//*version 0.1: xpath of the image.

(function() {
   images = document.evaluate('//center/img',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    //GM_log(images.snapshotItem(1).src);
    if (images.snapshotItem(1).getAttribute('src')) {    
       document.location.href = images.snapshotItem(1).getAttribute('src');
    }
})();


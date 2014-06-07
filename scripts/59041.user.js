// ==UserScript==
// @name          AlteqFirefox
// @namespace     OJD
// @description   Simple tool to allow Firefox to display alt text on images if a title is not present.
// @version       1.0.0
// @author        Outsource Justified Design - ojd.websites@gmail.com
// @include       http://*
// @license       Public Domain
// ==/UserScript==

/*

  This short script has 1 purpose.

  If no title attribute is found on an image tag or it is an empty string and
    the alt attribute does exsist, copy the atl text to the title.

*/

 var images = document.evaluate("//img[@alt]",document,null,7,null);

 for ( var i = 0; i < images.snapshotLength; i++) {

     if ( images.snapshotItem(i).getAttribute('title') == null || images.snapshotItem(i).getAttribute('title') == '' )

         images.snapshotItem(i).setAttribute('title', images.snapshotItem(i).getAttribute('alt') )

 }
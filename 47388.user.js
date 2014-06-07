// ==UserScript==
// @name           Queerty Big Image Linkifier version 1.1
// @namespace      http://*.queerty.com/*
// @description    For pages that contain both a big image and a NEXT link, linkifies the image with the NEXT link
// @include        http://*.queerty.com/*
// ==/UserScript==
/*
 * This is my first attempt at writing a Greasemonkey script so LET THE USER BEWARE.
 * Suggestions for improvements encouraged.
 * Fixed a minor bug in v1.0 to make sure the NEXT div has a defined href
 */

var allDivs, thisDiv;
allDivs = document.evaluate(
    "//*[contains(.,'NEXT')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    // do something with thisDiv
      if(thisDiv.href!=null){
      var next_URL = thisDiv.href;   
      //alert(thisDiv.href);
      }
}

(function() {
  var MAX_WIDTH = 200;
  var MAX_HEIGHT = 200;
  var CSS_ID_NAME = "found-big-image";
  
  var found = 0;
  var imgs = document.getElementsByTagName('img');
  for (var i = 0; i < imgs.length; i++) {
    img = imgs[i];  
    if (img.width > MAX_WIDTH) {
      if (img.height > MAX_HEIGHT){
        found = 1;
        img.id = CSS_ID_NAME;
        img.setAttribute("onclick", 'window.location="' + next_URL + '"');

        }
    }
  }

  if (found) {
    //alert("Found a big image");
  }
 })();

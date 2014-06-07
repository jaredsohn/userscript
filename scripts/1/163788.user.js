// ==UserScript==
// @name           Use correct color image
// @namespace      bricklink
// @description    When listing what things a part in a particular color appears in, use the correct color image rather than the first one that was submittted
// @icon           http://www.sculpturesupplies.com.au/GMBL.png
// @grant          none
// @version        1.3
// @include        http://www.bricklink.com/catalogItemIn.asp?*
// @match          http://www.bricklink.com/catalogItemIn.asp?*
// ==/UserScript==

// what part/color are we looking at?
paramsRegex=/([PG])=(.+)&colorID=(\d+)/
params=paramsRegex.exec(document.URL);
// The path for parts/gear includes the color
if (params) {
  var basename='http://img.bricklink.com/'+params[1]+'/'+params[3]+'/'+params[2];
  smallGIF = new Image();
  var snapImg1 = document.evaluate("//img[@id='img-1']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (snapImg1.snapshotLength==1) {
    var elm = snapImg1.snapshotItem(0);
    // Try loading it as a GIF
    smallGIF.src=basename+'.gif';
    smallGIF.onerror=function() {
      // Loading as a GIF failed, do JPG instead
      elm.src=basename+'.jpg';
    }
    smallGIF.onload=function() {
      elm.src=smallGIF.src;
    }
    smallGIF.src=basename+'.gif';
  }
}
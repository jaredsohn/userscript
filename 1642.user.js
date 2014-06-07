// ==UserScript==

// @name           CNN Video link (ver. 0.0.1)

// @namespace      http://larytet.sf.net/myscripts

// @description    Display link to ASX file for embedded media links. Use "Copy link location" menu in Firefox. This script requires GreaseMonkey extension and Firefox browser

// @include        http://*.cnn.com/*

// ==/UserScript==
 

var allLinks, link, hrefLinkValue, mediaLink, mediaLinkRes;

// discover all links - <A>, <IMG>, etc.
allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) 
{
  link = allLinks.snapshotItem(i);

  // this is <A>, now i have to figure out the data. read value first
  hrefLinkValue = link.href;
  if (hrefLinkValue.indexOf("javascript:cnnVideo") == -1)  // the string should start from call to JS
     continue;

  // looks like i found it "javascript:cnnVideo('play'....
  // make sure that the link is what i expect - /video/...
  mediaLink = hrefLinkValue.match(/\'play\'\,.+\/video\/.+\'/);  
  if (!mediaLink)                             // i am not going to change anything 
    continue;                                 // if this is not what i expect



  // fetch the link and construct link to the ASX file
  if (hrefLinkValue.match(/.+\,.+\,.+/))  // call to the JS contains three arguments
    mediaLinkRes = hrefLinkValue.replace(/(.+\,)(.*)(\')(\/video\/)(.+)(\'\,)(.+)/, '$5');
  else  // easy case - two arguments only
    mediaLinkRes = hrefLinkValue.replace(/(.+)(\')(\/video\/)(.+)(\')(.+)/, '$4');

  mediaLinkRes = "http://dynamic.cnn.com/apps/tp/video/" + mediaLinkRes + "/video.ws.asx";

  GM_log("href= "+hrefLinkValue+" Result= "+mediaLinkRes);
  // replace javascript call by link to ASX
  link.href = mediaLinkRes;
}



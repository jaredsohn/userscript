// ==UserScript==
// @name          Közvetlen linkek a napTV-hez
// @namespace     http://blog.educomm.hu
// @description	  Átalakítja a naptv "Megtekintés", hogy azok közvetlenül a videófájlra mutassanak, ne pedig egy újabb pop-up ablakra
// @include       http://napkelte.wildom.hu/*
// ==/UserScript==
// Based on the CNN Video link (ver 0.0.1) from http://userscripts.org/scripts/show/1642

var allLinks, link, hrefLinkValue, mediaLink, mediaLinkRes;

// discover all links - <A>, <IMG>, etc.
allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) 
{
  link = allLinks.snapshotItem(i);

  // this is <A>, now i have to figure out the data. read value first
  if (link.class != 'megtek')
  	continue;
  
  hrefLinkValue = link.href;
  clickLinkValue = link.onclick;
  
  mediaLink = clickLinkValue.match(/\'jsp\/program\/wmv\.jsp?filename=.+/);
  
  alert(mediaLink);
  
  // ------------------
		  
  /*
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
  link.href = mediaLinkRes;*/
}

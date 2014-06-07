// ==UserScript==

// @name           MarketWatch media links (ver. 0.0.1)

// @namespace      http://larytet.sf.net/myscripts

// @description    Display link to ASX file for embedded media links. Use "Copy link location" menu in Firefox. Usually you have to click the link on the page - the one with 'sound' icon. After you moved to different page with embedded media player pay attention to the 'click to listen' line on the white background. This script requires GreaseMonkey extension and Firefox browser

// @include        http://*marketwatch.com/tvradio/*

// ==/UserScript==
 

var allLinks, link, hrefLinkValue;

// discover embed tags - <embed>
allLinks = document.evaluate('//embed', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) 
{
  link = allLinks.snapshotItem(i);

  // fetch source
  hrefLinkValue = link.src;

  GM_log("href = "+hrefLinkValue);

  // make sure that the link is what i expect - tvradio...
  if (hrefLinkValue.indexOf("tvradio") == -1)  
     continue;

  // create new HREF 
  var newLink = document.createElement("a");
  newLink.innerHTML = "click to listen";
  newLink.href = hrefLinkValue;
  link.parentNode.insertBefore(newLink, link);
}



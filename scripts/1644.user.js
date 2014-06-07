// ==UserScript==
// @name           Rambler.ru write message
// @namespace      http://rambler.ru/user.script
// @description    adds letter M(essage) and link between name and age in the search results
// @include        http://love.rambler.ru/*
// ==/UserScript==


var allLinks, link, newLink, hrefLinkValue, linkInnerHTML, mediaLink, mediaLinkRes;

// discover all links - <A>, <IMG>, etc.
allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) 
{
  link = allLinks.snapshotItem(i);

  // this is <A>, now i have to figure out the data. read value first
  hrefLinkValue = link.href;
  // link should be to "anketa" (form)
  if (hrefLinkValue.match(/.+anketa.phtml\?oid=\d+\&s_.+/) == null)  
     continue;

  if (hrefLinkValue.indexOf("http://love.rambler.ru/anketa.phtml?oid") == -1)  
     continue;

  linkInnerHTML = link.innerHTML;
  if (linkInnerHTML.indexOf("<img") != -1)  //skip images
     continue;
  
  // fetch OID (object ID ?) and construct link to the chat
  mediaLinkRes = hrefLinkValue.replace(/(.+anketa.phtml\?oid=)(\d+)(\&s_.+)/, '$2');
  mediaLinkRes = "http://love.rambler.ru/my/message.phtml?action=Message&oid=" + mediaLinkRes;

  GM_log("href= "+hrefLinkValue+" Result= "+mediaLinkRes);

  // create new href
  newLink = document.createElement("a");
  newLink.innerHTML = "M ";
  newLink.href = mediaLinkRes;
  link.parentNode.insertBefore(newLink, link);
}

// ==UserScript==
// @name          accesskey_removal
// @namespace     http://zzo38computer.cjb.net/userjs/
// ==/UserScript==

// Removes accesskey attribute from tags if they are set to f,e,v,g,b,t,h,d,a

// Latest version is available at:
//  http://zzo38computer.cjb.net/userjs/accesskey_removal.user.js

r=document.evaluate("//*[@accesskey]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(i=0;i<r.snapshotLength;i++) {
  item=r.snapshotItem(i);
  k=item.getAttribute("accesskey");
  if(k.match(/^[fevgbthda]$/i)) item.removeAttribute("accesskey");
}

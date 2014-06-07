// ==UserScript==
// @name           Xoom - Status
// @namespace      http://userscripts.org/users/rajeshsoni
// @include        https://www.xoom.com/sendmoneynow/track-transaction?trackingNumber=*
// ==/UserScript==


var s = document.body.innerHTML.match(/<h2>(.*)<\/h2>/i);
document.title = s[1] + " - " + document.title;
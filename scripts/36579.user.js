// ==UserScript==
// @name           Hide Comments from Useless Users on Engadget
// @version        0.2.1
// @description    Hide all comments from useless users "Zak", "Paul A. Chapel" and "Flashpoint" Engadget
// @include        *engadget*.com*
// ==/UserScript==


// You can add any user by the link to their profile, just add a | (like below) and include them. It's easy!
  
window.addEventListener("load", function(e) {
  
  var elements = document.evaluate("//*[contains(@href, 'http://www.engadget.com/profile/165240/')] | //*[contains(@href, 'http://www.engadget.com/profile/2567108/')] | //*[contains(@href, 'http://www.engadget.com/profile/1533343/')] | //*[contains(@href, 'http://www.engadget.com/profile/2545853/')] | //*[contains(@href, 'http://www.engadget.com/profile/2595731/')] | //*[contains(@href, 'http://www.engadget.com/profile/2525317/')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < elements.snapshotLength; i++) {
    var thisElement = elements.snapshotItem(i);
    thisElement.parentNode.parentNode.style.display = 'none';
  }
}, false);
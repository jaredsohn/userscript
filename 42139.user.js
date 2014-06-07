// ==UserScript==
// @name          Paperbackswap Wishlist Position
// @namespace     http://zedlopez.com/projects/greasemonkey/
// @description   Show your wish list items' position in their respective queues
// @include       http://www.paperbackswap.com/members/my_lists/wish_list.php*
// ==/UserScript==

var allInfoImgs, infoImg, textNode, text, pos, strong, newNode;
allInfoImgs = document.evaluate(
  "//img[@src='/images/info.gif']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
for (var i = 0; i < allInfoImgs.snapshotLength; i++) {
  infoImg = allInfoImgs.snapshotItem(i);
  pos = infoImg.title.match(/(\d+) of (\d+)/);
  strong = document.createElement("strong");
  strong.appendChild(document.createTextNode("Position:"));
  textNode = document.createTextNode(" " + pos[1] + "/" + pos[2]);
  newNode = document.createElement("span");
  newNode.appendChild(strong);
  newNode.appendChild(textNode);
  infoImg.parentNode.replaceChild(newNode, infoImg);
}

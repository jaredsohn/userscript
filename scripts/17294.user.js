// ==UserScript==
// @name          Newzbin NFO-filename
// @description   Shows the filename of the NFO.
// @include       http://v3.newzbin.com/*
// ==/UserScript==

var items = document.evaluate(
   "//tbody[@class='odd']|//tbody[@class='odd-new']|//tbody[@class='even']|//tbody[@class='even-new']",
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);
   
for (var i = 0; i < items.snapshotLength; i++)
{
   itemBody = items.snapshotItem(i);
   var imgTitle = new RegExp("View Report NFO .*-(.*)\.nfo");
   var nfoTitle1 = itemBody.innerHTML.match(imgTitle);
   if (nfoTitle1 != null) {
      var nfoTitle = nfoTitle1[1];
      var titleText = itemBody.getElementsByTagName('td');
      var oldHTML = titleText[2].innerHTML;
      
      titleText[2].innerHTML = oldHTML + " (" + nfoTitle + ")";
   }
}
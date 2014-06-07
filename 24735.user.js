// ==UserScript==
// @name           Ficlets Filter
// @namespace      http://philonoism.blogspot.com
// @description    Remove any Ficlets author you like from the Browse Stories page.
// @include        http://www.ficlets.com/stories
// @include        http://ficlets.com/stories
// ==/UserScript==

//List of names to exclude
var exclusionList = ['annoying author','another annoying author','and so on']

var allLis, thisLi;
allLis = document.evaluate(
    "//li[@class='hentry']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLis.snapshotLength; i++) 
{
    thisLi = allLis.snapshotItem(i);
    if (exclusionList.indexOf(thisLi.getElementsByTagName('a')[1].innerHTML) != -1)
      {
      thisLi.parentNode.removeChild(thisLi)
      }
}

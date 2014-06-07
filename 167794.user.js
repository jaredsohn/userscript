// ==UserScript==
// @name 眼不见心不烦-火星简装版
// @include http://huox.in/*
// @version 1.3
// ==/UserScript==

window.killSomeOne = function(userName)
{
var allDivs, targetDiv, currentPage;
currentPage = window.location.href;
currentPage = currentPage.substring(15,17);
if (currentPage == "d/" || currentPage == "di" )
{
allDivs = document.evaluate( "//a[@title='"+userName+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allDivs.snapshotLength; i++)
{
targetDiv = allDivs.snapshotItem(i);
targetDiv.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(targetDiv.parentNode.parentNode.parentNode.parentNode)
}
}else if  (window.location.href == "http://huox.in/")
{
allDivs = document.evaluate( "//a[@title='"+userName+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allDivs.snapshotLength; i++)
{
targetDiv = allDivs.snapshotItem(i);
targetDiv.parentNode.parentNode.parentNode.removeChild(targetDiv.parentNode.parentNode)
}
}
}
//下面示范屏蔽瑟银
window.setTimeout("killSomeOne('sein')",0);

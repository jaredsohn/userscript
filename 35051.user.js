// ==UserScript==
// @name           Web Bug Detector
// @namespace      http://www.click-now.net/forums/index.php?showtopic=1826
// @description    web bug detector
// @include        *
// @exclude        http://web.archive.org/web/*
// ==/UserScript==

(function()
{
window.addEventListener("load", function(e)
{
var imgList = document.getElementsByTagName("img");
for (i=0; i < imgList.length; i++)
{
var spy=document.evaluate("//SPAN[@class='spy']/.. | //IMG[contains(@src,'1x1')]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (imgList[i].width == 1 && imgList[i].height == 1 && imgList[i].src != "")
{
imgList[i].width = "101";
imgList[i].height = "101";
imgList[i].alt = "WeB BuG";
imgList[i].border = "7";
imgList[i].style.borderColor = '#ff0000';
imgList[i].style.backgroundColor = '#00ff00';
}
}
return;
}, false);
})();
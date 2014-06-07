// ==UserScript==
// @name           ShoeTube
// @namespace      http://novawave.ca
// @description    Changes YouTube to ShoeTube
// @include        http://youtube.com/*
// @include        http://www.youtube.com/*
// ==/UserScript==
var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif")
{
images[x].src = "http://i.imgur.com/Cuzpu.png";
break;
}
x=x+1;
}

textNodes = document.evaluate(
  "//text()",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);
var searchRE = new RegExp('YouTube','gi');
var replace = 'ShoeTube';
for (var i=0;i<textNodes.snapshotLength;i++) {
  var node = textNodes.snapshotItem(i);
  node.data = node.data.replace(searchRE, replace);
}
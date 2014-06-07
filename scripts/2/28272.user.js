// ==UserScript==
// @name           Travian BBLetters
// @namespace      t3
// @description    In Travian this script enables BBCode in your letters. Works when viewing letters.
// @include        http://*.travian.*/nachrichten.php?id=*
// ==/UserScript==

function parseBBCode(str)
{
   var ret;
   ret=str;
   ret=ret.replace(/\[b\](.*?)\[\/b\]/gi,'<span style="font-weight:bold">$1</span>');
   ret=ret.replace(/\[i\](.*?)\[\/i\]/gi,'<span style="font-style:italic">$1</span>');
   ret=ret.replace(/\[u\](.*?)\[\/u\]/gi,'<span style="text-decoration:underline">$1</span>');
   ret=ret.replace(/\[url\](.*?)\[\/url\]/gi,'<a href="$1" target="_blank">$1</a>');
   ret=ret.replace(/\[url=(.*?)\](.*?)\[\/url\]/gi,'<a href="$1" target="_blank">$2</a>');
   ret=ret.replace(/\[img\](.*?)\[\/img\]/gi,'<img src="$1" />');
   return ret;
}


OurArea=document.evaluate
(
	"//td[@colspan='3']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);

for (var i = 0; i < OurArea.snapshotLength; i++) {
    LetterArea = OurArea.snapshotItem(i);
    LetterArea.innerHTML=parseBBCode(LetterArea.innerHTML);
}
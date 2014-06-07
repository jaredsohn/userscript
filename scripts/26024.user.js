// ==UserScript==
// @name           Travian BBLetters
// @namespace      t3
// @description    In Travian this script enables BBCode in your letters. Works when viewing letters.
// @include        http://*.travian.*/nachrichten.php*
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
   ret=ret.replace(/(<br>|<br \/>|\s|\t|^)((ftp|http|https|file):\/\/[\w\.\/\?;&=\$\-_\.\+!\*'\(\)]+)(<br>|<br \/>|\s|\t|$)/gim,
      '$1<a href="$2" target="_blank">$2</a>$4');
   coords=ret.match(/\W\-?\d+\W\-?\d+\W/gi);
   root="http://"+document.domain;
   if (coords)
   {
   for (i=0;i<coords.length;i++)
   {
      current=coords[i];
      xs=current.replace(/\W(\-?\d+)\W(\-?\d+)\W/gi,"$1");
      ys=current.replace(/\W(\-?\d+)\W(\-?\d+)\W/gi,"$2");
      x=parseInt(xs)-400;
      y=400-parseInt(ys);
      z=801*(y+1)+x;
      ret=ret.replace(current,current+'[<a href="'+root+'/a2b.php?z='+z+'">T</a>  '+
      '<a href="'+root+'/build.php?z='+z+'&gid=17">M</a>  <a href="'+root+'/karte.php?z='+z+'">C</a>]');
   }
   }
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
    if (LetterArea.getElementsByTagName("textarea").length!=0) continue;
    LetterArea.innerHTML=parseBBCode(LetterArea.innerHTML);
}
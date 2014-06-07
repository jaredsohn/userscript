// ==UserScript==
// @name           Travian BBCode
// @namespace      t3
// @description    In Travian this script enables BBCode in your letters and in the Forum.
// @include        http://*.travian.*/allianz.php*
// @include        http://*.travian.*/nachrichten.php*
// ==/UserScript==

function parseBBCode(str)
{
   var ret;
   ret=str;
   ret=ret.replace(/(<br>|<br \/>|\b|^)((ftp|http|https|file):\/\/[\w\.\/\?;&=\$\-_\.\+!\*'\(\)]+)(<br>|<br \/>|\b|$)/gim,
      '/$2$4');
   ret=ret.replace(/(\{b\}|\[b\])(.*?)(\{\/b\}|\[\/b\])/gi,'<span style="font-weight:bold">$2</span>');
   ret=ret.replace(/(\{i\}|\[i\])(.*?)(\{\/i\}|\[\/b\])/gi,'<span style="font-style:italic">$2</span>');
   ret=ret.replace(/(\{u\}|\[u\])(.*?)(\{\/u\}|\[\/u\])/gi,'<span style="text-decoration:underline">$2</span>');
   ret=ret.replace(/(\{color=|\[color=)(.*?)(\}|\])(.*?)(\{\/color\}|\[\/color\])/gi,'<span style="color: $2">$4</span>');
   ret=ret.replace(/(\{size=|\[size=)(.*?)(\}|\])(.*?)(\{\/size\}|\[\/size\])/gi,'<span style="font-size: $2px">$4</span>');
   ret=ret.replace(/(\{font=|\[font=)(.*?)(\}|\])(.*?)(\{\/font\}|\[\/font\])/gi,'<span style="font-family: $2">$4</span>');
   ret=ret.replace(/(\{align=|\[align=)(.*?)(\}|\])(.*?)(\{\/align\}|\[\/align\])/gi,'<p style="text-align: $2">$4</p>');   
   ret=ret.replace(/(\{url\}|\[url\])\/(.*?)(\{\/url\}|\[\/url\])/gi,'<a href="$2" target="_blank">$2</a>');
   ret=ret.replace(/(\{url=|\[url=)\/(.*?)(\]|\})(.*?)(\{\/url\}|\[\/url\])/gi,'<a href="$2" target="_blank">$4</a>');
   ret=ret.replace(/(\{img\}|\[img\])\/(.*?)(\{\/img\}|\[\/img\])/gi,'<img src="$2" border="0" alt="$2" />');
   ret=ret.replace(/\/((ftp|http|https|file):\/\/[\w\.\/\?;&=\$\-_\.\+!\*'\(\)]+)(<br>|<br \/>|\b|$)/gim,
      '<a href="$1" target="_blank">$1</a>$3');         

   return ret;
}


OurArea=document.evaluate
(
	"//div[@class='postbody']",
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
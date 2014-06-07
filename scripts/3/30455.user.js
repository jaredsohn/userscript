// ==UserScript==
// @name           dAzea Style
// @include        http://*.deviantart.com/*

// @include        http://deviantart.com/*

// ==/UserScript==
// v2

var adiv = document.getElementsByTagName("div");
for(p=0;p<adiv.length;p++)
{
if(adiv.item(p).className == "thought block"||adiv.item(p).className == "text pp journaltext")
{
var dAcnt = adiv.item(p).innerHTML;

dAcnt = dAcnt.replace(/--<br/gi,'<hr style="border: solid 1px #d2ded5; width: 100%; display: block; !important"><span');

dAcnt = dAcnt.replace(/\[b\](.*?)\[\/b\]/gi, "<b>$1</b>");
dAcnt = dAcnt.replace(/\[u\](.*?)\[\/u\]/gi, "<u>$1</u>");
dAcnt = dAcnt.replace(/\[i\](.*?)\[\/i\]/gi, "<i>$1</i>");
dAcnt = dAcnt.replace(/\[list\](.*?)\[\/list\]/gi, "<ul>$1</ul>");
dAcnt = dAcnt.replace(/\[\*\](.*?)<br\W{1}/gi, "<li>$1</li>");
dAcnt = dAcnt.replace(/\[small\](.*?)\[\/small\]/gi, "<small>$1</small>");
dAcnt = dAcnt.replace(/\[strong\](.*?)\[\/strong\]/gi, "<strong>$1</strong>");
dAcnt = dAcnt.replace(/\[code\](.*?)\[\/code\]/gi, "<small>$1</small>");
dAcnt = dAcnt.replace(/\[img\]<a href="(.*?)\%5B\/img\%5D(.*?)">\[link\]<\/a>/gi, '<img src="$1">$2');
dAcnt = dAcnt.replace(/\[url="(.*?)"\](.*)\%5B\/url\%5D/gi, '<a href="$1">$2</a>');

dAcnt = dAcnt.replace(/\[url="(.*?)"\](.*)\[\/url\]/gi, '<a href="$1">$2</a>');
document.getElementsByTagName("div").item(p).innerHTML = dAcnt;

}
}
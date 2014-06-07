// ==UserScript==
// @name           TPB: Direct Link to Torrent
// @namespace      name.powell.matt
// @description    Gives you a direct link to the torrent file, bypassing the details page
// @include        http://thepiratebay.org*
//http://matt.powell.name for questions
// ==/UserScript==

a=document.getElementsByTagName("A")
for (x=0;x<a.length;x++) {
if (a[x].className=="detLink") {
tmp=a[x].href.split("/")
link="http://torrents.thepiratebay.org/"+tmp[4]+"/"+tmp[5]+"TPB.torrent"
a[x].href=link
}
}

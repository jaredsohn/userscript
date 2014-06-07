// ==UserScript==
// @name           One Click Download Link from BwT
// @namespace      Ahsaan Khatree
// @include        http://www.bwtorrents.com/showthread.php?t=*
// ==/UserScript==

downid=document.body.innerHTML.match(/attachmentid=(.*)\'/);
downid=downid[1];
document.body.innerHTML=document.body.innerHTML.replace('class="message">','class="message"><h1><center><a href="http://www.bwtorrents.com/attachment.php?attachmentid='+downid+'">Download Torrent</a></center></h1><br>');
// ==UserScript==
// @name           Ziza Video Link
// @namespace      http://userscripts.org/users/165265
// @description    Adds a link to download the video from ziza.ru
// @include        http://ziza.ru/20*
// ==/UserScript==

var embed = document.getElementsByTagName('embed');
for (i=0; i<embed.length; i++){
  var url = embed[i].src.substring(embed[i].src.indexOf("file=") + 5);
  
  var link = document.createElement("a");
  link.innerHTML = '<p><a href="'+url+'">Download video</a></p>';
  
  embed[i].parentNode.insertBefore(link, embed[i].nextSibling);  
}

// ==UserScript==
// @name           PussyTorrentsRD
// @namespace      *
// @description    PussyTorrents Description Remover
// @include        *.pussytorrents.*
// ==/UserScript==
var maxLen = 512;
var tds = document.getElementsByTagName('td');

for(i=0; i < tds.length;i++)
{
  // find description block
  if(tds[i].className == "heading" && tds[i].innerHTML.match("Description"))
  {
    // remove obscenely large, annoying descriptions    
    if(tds[i+1].innerHTML.length > maxLen)
    { 
      tds[i+1].parentNode.removeChild(tds[i+1]);
    }
  }
}
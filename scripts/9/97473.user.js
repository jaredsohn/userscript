// ==UserScript==
// @name           Skip Windows Live Messenger Link Security
// @namespace      http://kodewerx.org/
// @include        http://link.smartscreen.live.com/?l=*
// ==/UserScript==

var inputs = document.getElementsByTagNameNS("*", 'input');
for(x=0;x<inputs.length;x++)
{
if(inputs[x].value && inputs[x].value=="Continue")
  inputs[x].click();
}
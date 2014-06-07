// ==UserScript==
// @name           easy ice copy's
// @namespace      make live easyer with easy copy and past
// @version        1.0.0
// @description    Makes Facebook dialogs right clickable
// @match          *://www.facebook.com/dialog/feed*
// ==/UserScript==
var traps = document.getElementsByClassName('unclickableMask');
for(var i=0,len=traps.length;i<len;i++){
    traps[i].parentNode.removeChild(traps[i]);
}

// ==UserScript==
// @name           Damnit PUDDI
// @namespace      http://userscripts.org/users/257845
// @description    Death2PUDDI: this will remove the annoying PUDDI video without messing up any other flash stuff 
// @include        *4chan.org*
// ==/UserScript==
function killit(){
document.getElementsByTagName('html')[0].innerHTML=document.getElementsByTagName('html')[0].innerHTML.replace(/PUDDI/ig,'');
if(document.getElementsByTagName('embed').length>=1){
d=document.getElementsByTagName('embed')[0];
d.parentNode.removeChild(d);
}
}
killit();
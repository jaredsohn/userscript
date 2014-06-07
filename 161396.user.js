// ==UserScript==
// @name           Highlight 'Web DL'
// @namespace      +++
// @description     Highlight 'Web DL' in links
// ==/UserScript==



ancs = document.getElementsByTagName("a");
for(i=0;i<=ancs.length;i++){
if(ancs[i].innerHTML.match(/WEB-DL/gi)){
ancs[i].innerHTML = ancs[i].innerHTML.replace("WEB-DL", "<span style='color: #9A2EFE; background-color: white; font-weight:bold'>WEB-DL</span>");
}
}
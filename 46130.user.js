// ==UserScript==
// @name           QBN ad redux
// @namespace      http://userscripts.org/users/72765
// @include        http://www.qbn.com/*
// ==/UserScript==

function main(){
 var divs = document.getElementsByTagName("div");
 for(x=0;x<divs.length-1;x++){
  if(divs[x].id.indexOf("wide-ad")!=-1){
  divs[x].style.display = 'none';
  }
 }
}

main();
setInterval(main,500);
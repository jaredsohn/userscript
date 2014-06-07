// ==UserScript==
// @namespace     http://imagechan.com/
// @name          ImageChan evil crap remover
// @description   Removes all of the evil crap from ImageChan leaving the pure beef only
// @include       http://imagechan.com/img/*
// ==/UserScript==

lnk = document.links;
del = new Array();
for(i=0;i<lnk.length;i++) {
  /*if(lnk[i].href.match('/img/[0-9]{4}/')) continue;*/
  if(lnk[i].href.match('/tinyurl.com/')) del[del.length] = lnk[i];
}

for(i=0;i<del.length;i++) del[i].parentNode.removeChild(del[i]);
tbl = document.getElementsByTagName('table');
if(tbl[0]) tbl[0].parentNode.removeChild(tbl[0]);

//.user.js

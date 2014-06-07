// ==UserScript==
// @name         sidAdder
// @description	  Dodaje numer sesji do linkow na forum board.ogame.pl
// @include       *board.ogame.*
// @namespace       queyas@gmail.com
// ==/UserScript==

var aLst;
var sid;
var post;
var newlink;
var p

aLst = document.getElementsByTagName("a");
for (i=0; i < aLst.length; i++)
 {
  if (aLst[i].href.match(/sid/)) {break}
 } 
  sid = aLst[i].href.substr(aLst[i].href.indexOf("sid")+4,32);
  

for (j=0; j < aLst.length; j++)
 {
  if (aLst[j].href.match(/board/))
  {
  if (aLst[j].href.match(/sid/))
   {
    continue
   }
  else if (aLst[j].href.match(/\#post/))
   {
    post = aLst[j].href.substr(aLst[j].href.indexOf("#post"));
	p = aLst[j].href.indexOf("#post");
	newlink = aLst[j].href.substring(0,p) + "&sid=" + sid + post;
	aLst[j].href = newlink;
   }
  else
   {
    newlink = aLst[j].href + "&sid=" + sid;
    aLst[j].href = newlink;
   }
   }
 }
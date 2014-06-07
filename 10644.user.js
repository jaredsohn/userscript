// ==UserScript==
// @name          delOnet
// @description	  Usuwa baner Onetu
// @include       http://board.ogame.onet.pl*
// ==/UserScript==

var tblLst;
var i;

function delOnet()
 {
  tblLst = document.getElementsByTagName('table');
  for (i=0; i < tblLst.length; i++)
  {
  if(tblLst[i].width == 857)
   {
   tblLst[i].parentNode.removeChild(tblLst[i]);
   break
   }
  }
 }



delOnet();


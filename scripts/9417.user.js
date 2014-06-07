// ==UserScript==
// @name          sigHunter
// @description	  Dodaje ramke wokol nieregulaminowych sygnatur i usuwa baner Onetu
// @include       http://board.ogame.*
// ==/UserScript==

var j;
var tblLst;
var tbl;

var k;
var aLst;
var lnk;

var i;
var iLst;
var img;
var pth;
var brd;
var wh;
var ht;



function delOnet()
 {
  tblLst = document.getElementsByTagName('table');
  for (j=0; j < tblLst.length; j++)
  {
  tbl = tblLst[j];
  if (tbl.width == 857)
   {
   tbl.parentNode.removeChild(tbl);
   break
   }
  }

  aLst = document.getElementsByTagName('a');
  for (k=0; k < aLst.length; k++)
   {
    lnk = aLst[k];
    if (lnk.href.match(/board.ogame.onet/))
	 {
	  lnk.href = lnk.href.replace(/onet\./i,'');
	 }
   }
 } 

function sigHunter()
 {
 iLst = document.evaluate('//img', document, null, 6, null);
 for (i=0; i < iLst.snapshotLength; i++)
  {
   img = iLst.snapshotItem(i);
   pth = img.src;
   brd = pth.substr(0, 19);
   if (brd != "http://board.ogame.")
    {
	 wh = img.width;
	 ht = img.height;
	 if (wh > 500 || ht > 120)
      {
       img.border = 14;
	   img.style.borderColor = '#914481';
      }
    }
  }
 }

delOnet();
if (window.location.href.match(/thread/))
 {
  sigHunter();
 } 
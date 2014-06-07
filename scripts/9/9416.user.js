// ==UserScript==
// @name          opinie
// @description	  Pokazuje wszystkie opinie na forum Gazeta.pl
// @include       *gazeta.pl*
// @include       *gazetawyborcza.pl*
// @include       *wyborcza.pl*
// @include       *gazetadom.pl*
// @include       *edziecko.pl*
// @include       *sport.pl*
// @include       *jobspot.pl*
// @include       *polishworkers.pl*
// @include       *groszki.pl*
// @include       *limetka.pl*
// @include       *komunikaty.pl*
// @include       *emetro.pl*
// @namespace       queyas@gmail.com
// ==/UserScript==

var aLst

aLst = document.getElementsByTagName("a");
for (i=0; i < aLst.length; i++)
 {
  if (aLst[i].href.match(/72,2.html/))
   {
    aLst[i].href += '&v=2&s=0';
   }
 }
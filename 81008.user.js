// http://gazeta.hit.gemius.pl/hitredir/id=.FGV9fij5aWusN73iGG59dU7XkFNJXtUMEuuKIxVDe3.w7/stparam=pfhgiodtsp/url=http://forum.gazeta.pl/forum/w,902,113891981,,Masakra_w_Krakowie_cieli_ludzi_maczetami_noza_.html?v=2

// ==UserScript==
// @name          fu-gemius
// @description	  Usuwa redirect gemius'a z "pokaż wszystkie komentarze" na portalach gazeta.pl
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
// @namespace      madafa@gmail.com
// ==/UserScript==

var aList;

aList = document.getElementsByTagName("a");

for (i=0; i < aList.length; i++){
  if(aList[i].href.match(/w,.+html/)){
		  aList[i].href=aList[i].href.replace(/http.+gemius.+(http.+)/gi, '$1');
  }
}
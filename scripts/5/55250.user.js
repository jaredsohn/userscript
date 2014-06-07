// ==UserScript==
// @name          opinie v2
// @description	  Pokazuje wszystkie komentarze pod artykułami na forum Gazeta.pl
// @include       *aaaby.pl*
// @include       *agora.pl*
// @include       *alert24.pl*
// @include       *ams.com*
// @include       *autofoto.pl*
// @include       *autotrader.pl*
// @include       *avanti24.pl*
// @include       *bermudy.pl*
// @include       *biot.pl*
// @include       *blogfrog.pl*
// @include       *blox.pl*
// @include       *bryla.pl*
// @include       *bubleprawne.org*
// @include       *bubleprawne.com*
// @include       *bubleprawne.info*
// @include       *cafe.pl*
// @include       *ciacha.net*
// @include       *czterykaty.pl*
// @include       *dwukropek.pl*
// @include       *edziecko.pl*
// @include       *ekstraklasa.tv*
// @include       *emetro.pl*
// @include       *fundacjaagory.pl*
// @include       *g.pl*
// @include       *gamecorner.pl*
// @include       *gazeta.pl*
// @include       *gazetadom.pl*
// @include       *gazetaedukacja.pl*
// @include       *gazetapraca.pl*
// @include       *gazetaturystyka.pl*
// @include       *gazetawyborcza.pl*
// @include       *goldo.pl*
// @include       *groszki.pl*
// @include       *gwar.pl*
// @include       *infomuzyka.pl*
// @include       *jobspot.pl*
// @include       *kalendarzbudowy.pl*
// @include       *kolumber.pl*
// @include       *komunikaty.pl*
// @include       *kotek.pl*
// @include       *kulturalnysklep.pl*
// @include       *kupujprezenty.pl*
// @include       *londek.pl*
// @include       *logo24.pl*
// @include       *lula.pl*
// @include       *manageria.pl*
// @include       *metropraca.pl*
// @include       *moto.pl*
// @include       *naprzerwie.pl*
// @include       *news.pl*
// @include       *notsobigbrother.pl*
// @include       *plotek.pl*
// @include       *pobandzie.pl*
// @include       *polishworkers.pl*
// @include       *politbiuro.pl*
// @include       *polygamia.pl*
// @include       *popcorner.pl*
// @include       *pracawsprzedazy.pl*
// @include       *pracownicy.it*
// @include       *roxy.fm*
// @include       *reklamania.pl*
// @include       *sciagnij.pl*
// @include       *sport.pl*
// @include       *tabor24.pl*
// @include       *technoblog.pl*
// @include       *tivi.pl*
// @include       *tokfm.pl*
// @include       *tok.fm*
// @include       *trader.pl*
// @include       *tuba.fm*
// @include       *uczymysie.pl*
// @include       *ugotuj.to*
// @include       *ugotujto.pl*
// @include       *widelec.pl*
// @include       *wrocek.pl*
// @include       *wyborcza.pl*
// @include       *wyborcza.biz*
// @include       *wyhacz.pl*
// @include       *wychacz.pl*
// @include       *zczuba.pl*
// @include       *zczuba.tv*
// @namespace      madafa@gmail.com
// ==/UserScript==

var aList;

aList = document.getElementsByTagName("a");

for (i=0; i < aList.length; i++){
  if(aList[i].href.match(/w,.+html/)){
//	iframe = document.createElement('hr');
//        cur.parentNode.insertBefore(iframe, cur);
	aList[i].href += "?v=2";
  }
}
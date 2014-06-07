//no gemius

// ==UserScript==
// @name          no gemius
// @description	  Usuwa redirect gemius'a i ad.gazeta.pl na portalach gazeta.pl
// @include       *6win.*
// @include       *alert24.*
// @include       *autofoto.*
// @include       *autotrader.*
// @include       *avanti24.*
// @include       *ban.*
// @include       *blox.*
// @include       *cafe.*
// @include       *ciacha.*
// @include       *czterykaty.*
// @include       *deser.*
// @include       *domosfera.*
// @include       *edulandia.*
// @include       *edziecko.*
// @include       *emetro.*
// @include       *e-ogrody.*
// @include       *gadzetykobiety.*
// @include       *gamecorner.*
// @include       *gazeta.*
// @include       *gazetadom.*
// @include       *gazetapraca.*
// @include       *gazetawyborcza.*
// @include       *gazoo.*
// @include       *goldo.*
// @include       *groszki.*
// @include       *happyday.*
// @include       *jobspot.*
// @include       *kolumber.*
// @include       *komukomu.*
// @include       *komunikaty.*
// @include       *kotek.*
// @include       *kulturalnysklep.*
// @include       *kupsprzedaj.*
// @include       *ladnydom.*
// @include       *limetka.*
// @include       *logo24.*
// @include       *lula.*
// @include       *metropraca.*
// @include       *miastodzieci.*
// @include       *money.*
// @include       *moto.*
// @include       *multiwiedza.*
// @include       *namonciaku.*
// @include       *naprzerwie.*
// @include       *plotek.*
// @include       *policyjni.*
// @include       *polishworkers.*
// @include       *polygamia.*
// @include       *popcorner.*
// @include       *pracawbiurze.*
// @include       *pracawsprzedazy.*
// @include       *pracownicy.*
// @include       *roxy.*
// @include       *sciagnij.*
// @include       *sfd.*
// @include       *sport.*
// @include       *szuki.*
// @include       *tabor24.*
// @include       *talkfm.*
// @include       *targiedukacyjne.*
// @include       *tivi.*
// @include       *tuba.*
// @include       *ugotuj.*
// @include       *widelec.*
// @include       *wyborcza.*
// @include       *wysokieobcasy.*
// @include       *zczuba.*
// @include       *znam.*
// @namespace      Jas!ek
// ==/UserScript==

var aList;
var gemiuspattern="hit.gemius.pl/hitredir";
var adpattern="/ad/reloadwww";
var searchpattern="url=http";
var searchpattern1="url%3Dhttp";
var url;
aList = document.getElementsByTagName("a");

for (i=0; i < aList.length; i++){
  url=aList[i].href;
  if(url.indexOf(searchpattern)>-1){
	  url=url.substr(url.indexOf(searchpattern)+4,url.lenght);
    };
  if(url.indexOf(searchpattern1)>-1){
	  url=url.substr(url.indexOf(searchpattern1)+4,url.lenght);
    };
  aList[i].href=url;
};
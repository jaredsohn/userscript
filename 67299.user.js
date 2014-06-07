// ==UserScript==
// @name           Goldenizer
// @namespace      http://www.dirty.ru/comments/*
// @description    Sets "Golden Post" zhiopka on D3
// @include        http://www.dirty.ru/comments/*
// @include        http://dirty.ru/comments/*
// ==/UserScript==

document.onLoad = checkGoldTag();

function checkGoldTag() {
   // Thanks DimDimych!

  var GoldCode="%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%B9%20%D0%BF%D0%BE%D1%81%D1%82";
  var SilverCode="%D0%91%D1%8B%D0%B2%D1%88%D0%B8%D0%B9%20%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%B9";
  var ClassicGold="%D0%92%D1%8B%D0%B4%D0%B5%D1%80%D0%B6%D0%B0%D0%BD%D0%BD%D1%8B%D0%B9%20%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%B9";
  var stars=document.getElementsByClassName('stars');
  var wasstars=document.getElementsByClassName('wasstars');
  var myTags=document.getElementsByClassName('tag');
  var LblGold=false;
  var LblSilv=false;
  var LblClas=false;
  for (var Tag in myTags) LblGold|=(myTags[Tag].innerHTML==decodeURI(GoldCode));
  for (var Tag in myTags) LblSilv|=(myTags[Tag].innerHTML==decodeURI(SilverCode));
  for (var Tag in myTags) LblClas|=(myTags[Tag].innerHTML==decodeURI(ClassicCode));
  if ((stars.length>0||wasstars.length>0)&&(!LblGold)) {
    location.href="javascript:void(addTag(decodeURI('"+GoldCode+"')));";
  }
  if (stars.length>0) {
    if (LblSilv) location.href="javascript:void(delTag(decodeURI('"+SilverCode+"')));";
    if (!LblClas) location.href="javascript:void(addTag(decodeURI('"+ClassicGold+"')));";
  }
  if (wasstars.length>0) {
    if (!LblSilv) location.href="javascript:void(addTag(decodeURI('"+SilverCode+"')));";
    if (LblClas) location.href="javascript:void(delTag(decodeURI('"+ClassicGold+"')));";
  }
}

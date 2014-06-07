// ==UserScript==
// @name           Goldenizer
// @namespace      http://www.dirty.ru/comments/*
// @description    Sets "Golden Post" zhiopka on D3
// @include        http://www.dirty.ru/comments/*
// @include        http://dirty.ru/comments/*
// ==/UserScript==

document.onLoad = checkGoldTag();

function ajaxLoadHandler(ajaxObject,ajaxCallBackFunction,callObject,params,ajaxCallBackErrorFunction){
  if (ajaxObject.readyState == 4) {
    if (ajaxObject.status == 200) {
      ajaxCallBackFunction.call(callObject, ajaxObject, params);
    } else {
      if(ajaxCallBackErrorFunction){
        ajaxCallBackErrorFunction.call(callObject, ajaxObject);	
      }
    }
  }
}

function checkGoldTag()
{
  var GoldCode="%D0%B7%D0%BE%D0%BB%D0%BE%D1%82%D0%BE%D0%B9%20%D0%BF%D0%BE%D1%81%D1%82";
  var stars=document.getElementsByClassName('stars');
  var wasstars=document.getElementsByClassName('wasstars');
  var myTags=document.getElementsByClassName('tag');
  var Labeled=false;
  for (var Tag in myTags) Labeled|=(myTags[Tag].innerHTML==decodeURI(GoldCode));
  if(stars.length>0 && !Labeled ) {
    location.href="javascript:void(addTag(decodeURI('"+GoldCode+"')));"; // Thanks DimDimych!
  }
  else if(wasstars.length>0 && !Labeled ) {
    location.href="javascript:void(addTag(decodeURI('"+GoldCode+"')));"; // Thanks DimDimych 2 times;)!
  }
  var scr=document.createElement("script");
  scr.type="application/javascript";
  scr.textContent="var T; "+ajaxLoadHandler;
  document.body.appendChild(scr);
}
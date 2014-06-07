// ==UserScript==
// created by Tatarnikov Alexandr
// @name           bash.org.ru ads remover
// @namespace      
// @description    fixes up spikedhumor, removes ads, trims down layout
// @include        http://*bash.org.ru/*
// Released under the GPL license
// ==/UserScript==
// use this with adblockplus

  var iframes = document.getElementsByTagName('div');
  var aD;
  for(var x=0;x<iframes.length;x++) {
      if(iframes[x].className=="adtext"){
          iframes[x].style.display='none';
          continue;
      }
      if(iframes[x].className!="q"){
          continue;
      }
      for(var y=0; y<iframes[x].childNodes.length; y++){
          aD = iframes[x].childNodes[y];
          if( aD.tagName == "DIV"){
              if(aD.className !="vote") {
//                  console.log(aD);
                  aD.style.display='none';
                  iframes[x].style.display='none';
              }
              break;
          }
      }
  }

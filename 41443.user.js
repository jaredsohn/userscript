// ==UserScript==
// @name           Flash Full Screen
// @namespace      http://www.xeoos.fr/gmscripts/FlashFullScreen
// @description    Flash Video Ful Screen
// @include        http://www.coloriage.*
// @include        http://www.lesjeuxpourenfants.com/*
// @include        http://www.panfu.fr/*
// ==/UserScript==

function enable_fullscreen(){
    var allDivs = document.getElementsByTagName('embed');
    for(var i=0;i<allDivs.length;i++){		
      //alert(allDivs[i].id + '=' + allDivs[i].width+';'+allDivs[i].height);
      allDivs[i].width=screen.width-50;
      allDivs[i].height=screen.height-50;
      allDivs[i].style.width=screen.width-50;
      allDivs[i].style.height=screen.height-50;
      //allDivs[i].style.position='absolute !important';
      //alert(allDivs[i].id + '=' + allDivs[i].width+';'+allDivs[i].height);
    }
}

//enable_fullscreen();

GM_registerMenuCommand( "Flash Fullscreen!", enable_fullscreen);


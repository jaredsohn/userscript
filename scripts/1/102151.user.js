//1.) Start war in middle east
//2.) Create common enemy (bin laden)
//3.) Kill him early on
//4.) Campaign needing a boost? Uhh...we got em!
//5.) ?????
//6.) PROFIT!!!

//

// ==UserScript==
// @name        noAmerica
// @author	DrWrong
// @date        05/02/11
// @description Removes AMERICA FUCK YEAH from 4chan
// @version	v1.0
// @namespace   4chan
// @include	http://*4chan.org/b/*
// ==/UserScript==
    
var tar = document.getElementsByTagName('embed');
for (i=0; i<tar.length; i++) {
  if (tar[i].src='http://www.youtube.com/v/IhnUgAaea4M') {
    tar[i].src='null';
  }
}

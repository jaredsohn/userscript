// ==UserScript==
// @name        NoAmericaFYea
// @author	djherp
// @date        07/08/2012
// @description Removes AMERICA FUCK YEAH from 4chan
// @version	v1.0
// @namespace   4chan
// @include	http://*4chan.org/b/*
// ==/UserScript==
    
var tar = document.getElementsByTagName('object');
for (i=0; i<tar.length; i++) if (tar[i].data='//www.youtube.com/v/IhnUgAaea4M?autoplay=1&amp;showsearch=0&amp;version=3&amp;showinfo=0&amp;loop=1') tar[i].data='null';
  


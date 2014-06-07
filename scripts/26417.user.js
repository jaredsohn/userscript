// ==UserScript==
// @name           One Simpler Manga Preloader
// @namespace      OM-Preloader
// @description    Preloads pictures on OneManga
// @include        http://www.onemanga.com/*/*/
// @exclude        http://www.onemanga.com/directory/*/
// ==/UserScript==
window.onload=new Image().src=document.images[0].src.substring(0,document.images[0].src.length - document.images[0].src.split('/')[document.images[0].src.split('/').length-1].length) + document.getElementsByName('page')[0].options[document.getElementsByName('page')[0].selectedIndex+1].value + '.jpg';new Image().src=document.images[0].src.substring(0,document.images[0].src.length - document.images[0].src.split('/')[document.images[0].src.split('/').length-1].length) + document.getElementsByName('page')[0].options[document.getElementsByName('page')[0].selectedIndex-1].value + '.jpg'
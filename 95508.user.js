// ==UserScript==
// @name           JVC Flood
// @namespace      Jvc
// @description    Script pour flood jvc
// @include        http://www.jeuxvideo.com/commentaires/*
// @include        http://www.jeuxvideo.com/forums/0-*
// @include        http://www.jeuxvideo.com/forums/3-*
// @include        http://*.forumjv.com/0-*
// @include        http://*.forumjv.com/3-*
// @ author        ButterButter
// ==/UserScript==

var base = document.getElementsByTagName("textarea").item(0).value;
var wordlist = ['Onch' , 'Bide' , 'Lol' , 'Kk' , 'Xd' , 'jonc' , 'JVF' , 'pwn' , 'XxX' , 'joui' , 'DTC' , 'noel' , 'fck' , 'hap:' , 'FUK' , 'Raj?' , 'all' , 'M+Z' , 'pt1' , 'suce' , 'fvj' , 'math' , 'lowl']
var onche = []
randno = Math.floor ( Math.random() * wordlist.length ); 

function jvc () {
while (onche.length < 1149) {
onche.push(wordlist[randno] + "\n" + "\n" + "\n" + "\n") ;
}
document.getElementsByTagName("textarea").item(0).value = onche;
clearInterval (jvcid) 
}
jvcid = setInterval (jvc,0)
// ==UserScript==
// @name           JVC Flood TitreTopic
// @namespace      JVC Flood
// @description    Génère SEULEMENT titre du topic
// @include        http://www.jeuxvideo.com/forums/*
// @author         ButterButter
// ==/UserScript==
var subjectlist = ['WWWWW WWWWW WWWWWWWWWWWWWWWWWW' , 'ONCHE ATITUDE WWMMW@@@WMMWWMMW%%%WWWWWW@' , 'DESMONDTULUCIE WWWWWWWWWWWWWWWWWWWWWWWWW' , 'JVFLOOD WWWWWWWWWWWWWWWWW MMMMMMMMMMMMMM' , 'TROLOLOL WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW']
var randno;
randno = Math.floor ( Math.random() * wordlist.length ); 
function jvc () {
document.getElementById("newsujet").value = wordlist[randno];
clearInterval (jvcid) 
}
jvcid = setInterval (jvc,0)
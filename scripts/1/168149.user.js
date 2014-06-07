// ==UserScript==
// @name        iTix plattegrond sluiten bij annuleren
// @namespace   DNK iTix plattegrond
// @include     http://www.dnk.nl/beheer/zaalplattegrond*
// @version     1
// ==/UserScript==

window.onload=function(){

document.getElementById("annuleer_zaalplattegrond").onclick=function(){
    setTimeout(function(){
        window.close();},1000);};

document.getElementById("submit_zaalplattegrond").onclick=function(){
    setTimeout(function(){
        window.close();},2000);};}

window.onblur=function(){
    window.close();};
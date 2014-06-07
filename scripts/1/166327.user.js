// ==UserScript==
// @name        Simcracy Exp Bar
// @namespace   http://userscripts.org/scripts/show/166327
// @description Displays Experience better in Simcracy by CyberZe
// @include     http://*simcracy.com/*
// @grant       none
// @version     1.1
// ==/UserScript==

window.addEventListener('load', function() { 
document.getElementsByClassName('btn-exp')[0].style.width = "110px" ;
document.getElementsByClassName('txt-exp')[0].parentElement.style.width = "90px";
ExpEnhancer();
}, false);

window.addEventListener('click', function() {
ExpEnhancer();
}, false);


function ExpEnhancer(){
var expik=document.getElementsByClassName('txt-exp')[0].textContent;
var exp=parseFloat(expik);
var lvlik=document.getElementsByClassName('txt-lvl').item(0).textContent;
var lvl=parseFloat(lvlik);
var dobrylvl;
dobrylvl=lvl - 1;
var lvlexp;
lvlexp= lvl * lvl *100;
var zonk;
zonk= exp +'/'+ lvlexp;
document.getElementsByClassName('txt-exp')[0].innerHTML = zonk ;
};

    




    


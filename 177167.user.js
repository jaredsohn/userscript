// ==UserScript==
// @name        corrige codigos 2.0
// dono   gildomar farias
// @namespace   gildomar.com/corrige.user.js
// @description corrige o bug 2.0
// @include     http://facebook.com/*
// @version     1
// author     gildomar farias (fc.com/gildomar.farias
// ==/UserScript==

//Tem gente que critica porque não sabe fazer
//Tem gente que admira e até para pra ver
// você que me critica vem fazer o que eu faço
//no meio do caminho você vai sentir cansaço

function att(){
var c = document.getElementsByName('xhpc_message_text')[0];
document.getElementsByName('xhpc_message')[0].value = c.value;
console.log(document.getElementsByName('xhpc_message')[0].value);
}

function att2(){
document.getElementsByName('message')[0].value = document.getElementsByName('message_text')[0].value;
}

function corrige(){
if(document.getElementsByName("xhpc_message_text")[0]!== undefined){
     var varDivTexto = document.getElementsByName("xhpc_message_text")[0];
     varDivTexto.addEventListener("keypress",att, false);
     
var c = document.getElementsByName('xhpc_message_text')[0];
document.getElementsByName('xhpc_message')[0].value = c.value;
}

if(document.getElementsByName('message')[0] !== undefined){
     var varDivTexto = document.getElementsByName('message')[0];
     varDivTexto.addEventListener("keypress",att2, false);
document.getElementsByName('message')[0].value = document.getElementsByName('message_text')[0].value;
}

}

document.addEventListener ("mousemove", corrige, true);
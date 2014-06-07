// ==UserScript==
// @name        corrige codigos imacros
// dono   gildomar farias
// @namespace   gildomar.com/corrige.user.js
// @description corrige o bug 9.0
// @include     http://facebook.com/*
// @version     1
// author     gildomar farias (fc.com/gildomar.farias
// ==/UserScript==

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

document.addEventListener ("TAG POS=2 TYPE=BUTTON ATTR=TXT:Publicar", corrige, true);
// ==UserScript==
// @name       Corrige Script
// @namespace  www.Thyago.com/corrigebug
// @version    0.1
// @description  Corrigir o bug que não permitia marcar codigos
// @include     https://*.facebook.com/*
// @include     https://facebook.com/*
// @include     http://*.facebook.com/*
// @include     http://facebook.com/*
// @author      Thyago RIbeiro (www.fb.com/thyagosr)
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

document.addEventListener ("mousemove", corrige, true);
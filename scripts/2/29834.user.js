// ==UserScript==
// @name           Servipag
// @namespace      com.totexa.servipag.login
// @description    Arregla Servipag para usar con Firefox
// @include        http://www.servipag.com/*
// ==/UserScript==

function solorut_menu_ff(e){
    if (!(((e.charCode>47)&&(e.charCode<58))||(e.charCode==75)||(e.charCode==107) ||(e.charCode==0))){
        e.preventDefault(); 
    }
}

function PressEnter_menu_ff(e){
    if (e.keyCode == 13) unsafeWindow.Enviar_menu();
}

var rutInput;
rutInput = unsafeWindow.MM_findObj('rut_1');
if (rutInput) {
    rutInput.onkeypress=solorut_menu_ff;
}
var claveInput;
claveInput = unsafeWindow.MM_findObj('clave_1');
if (claveInput) {
    claveInput.onkeypress=PressEnter_menu_ff;
}


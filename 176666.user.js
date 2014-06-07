// ==UserScript==
// @name        Taringa Mensajes Rapidos | By AngelKrak
// @namespace   By AngelKrak
// @include     *://www.taringa.net/*
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     1
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==


var ASUNTO="Leer Urgente"
var MENSAJE="Visitanos y Ayudanos Registrandote, Gracias :D www.bpfc.tk"


function paginaPrincipal(){
    location.href="http://www.taringa.net/";
}

function enviarMensaje (){
    $("#new-message-subject ").val(ASUNTO);
    $("#nbody_fastreply").val(MENSAJE);
    $("#fastreply-button-text").click();
}


function abrirDialogoMensaje(){
    location.href="http://www.taringa.net" + $(".btn.g.require-login.floatL").attr("href");
}

function conseguirUser(){
    var user=($(":first .subinfo>a").attr("href"));
    if(GM_getValue(user,"undefined")=="undefined"){
        window.console.log("Nueva invitacion a " + user);
        GM_setValue( user, 1 );
    }else{
       window.console.log("Invitacion ya enviada. Saliendo");
       location.href="http://www.taringa.net/";
       return;
    }
    
    location.href="http://www.taringa.net/"+user
}

function enPerfil(){
    var urlSlice=location.href.replace("http://www.taringa.net/", "");
    if((urlSlice.search("/")==-1)){
        return true;
    }
    return false;
}


function enDialogoMensaje(){
    if(location.href.search("http://www.taringa.net/mensajes/a/")==0){
        return true;
    }
    return false;
}


function verificarPagina(){
    if("http://www.taringa.net/"==location.href || "https://www.taringa.net/"==location.href){
        conseguirUser();
    }
    else if(enPerfil() ){
        setTimeout(abrirDialogoMensaje, 5000);
    }
    else if(enDialogoMensaje()){
        setTimeout(enviarMensaje, 5000);
    }

    else {
        setTimeout(paginaPrincipal, 5000);
    }
}


try{

window.setTimeout(verificarPagina, 5000);

}
catch(e){
    alert(e.toString());
}

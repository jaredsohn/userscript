// ==UserScript==
// @name        Skoob Render Links
// @namespace   http://psicofrenia.com
// @description Faz com que os links em texto do Skoob passem a ser vistos como links
// @include     http://www.skoob.com.br/usuario/*
// @include     http://www.skoob.com.br/recados/listar/*
// @include     http://www.skoob.com.br/grupo/*
// @include     http://www.skoob.com.br/topico/mostrar/*
// @require     http://www.skoob.com.br/js/ver2/jquery-1.7.1.min.js
// @grant none
// @version     1.0
// ==/UserScript==

var kadStyles = new Array();
kadStyles[0] = "float:left;margin:6px 0px 0px 5px; border:blue 0px solid; width:495px;";
kadStyles[1] = "font-size:12px; border:0px solid; padding:8px 0px;";
kadStyles[2] = "font-size:11px; font-family:arial; color:#666666;";
kadStyles[3] = "margin:5px 0px 5px 0px; padding:0px; text-align:justify;";
                                
for(var i=0; i<kadStyles.length; i++){
    $("div[style='" + kadStyles[i] + "']").each(function(){
        $(this).html(replaceURLWithHTMLLinks($(this).html()));
    });
    $("p[style='" + kadStyles[i] + "']").each(function(){
        $(this).html(replaceURLWithHTMLLinks($(this).html()));
    });
}                                


function replaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a target='_BLANK' href='$1'>$1</a>"); 
}
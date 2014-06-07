// ==UserScript==
// @name           Comunidades fix
// @namespace      http://taringa.net/perfil/Cagmaster
// @description    Comunidades v2
// @include        http://*taringa.net/*
// ==/UserScript==
jQuery = $ = unsafeWindow.jQuery;
$(document).ready(function(){
$('head').append('<style>#comm-thread-list .thread {padding:5px;position:relative;} #comm-thread-list .thread:nth-child(2n+1) {background:#EFEFEF;}</style>'); // global designs
var locc = window.location.pathname.split('/');
var temas = 0;
var stickys = 0;
   $('.thread').each(function(){
if($(this).find('.info').find('.sticky').attr('class')=="icon sticky"){

  stickys = stickys + 1;
$(this).find('.info').find('.sticky').remove();
} else {
  temas = temas + 1;
}
if(temas==1){
   $(this).parent().prepend('<div class="list-header clearfix"><span style="font-size:17px; float:left; margin:10px; margin-bottom:15px; margin-top:15px; color: #101010; line-height: 1; font-family: Helvetica;"><b>Temas</b></span><a class="btn v floatR" href="/comunidades/'+locc[2]+'/agregar/">Nuevo tema</a></div><div style="background:#fff; padding:5px; color:#9C9E9C; border-bottom:1px solid #EFEFEF; height:15px"><div style="font-size:11px"><span style="float:left">Titulo</span> <span style="float:right; margin-right:10px">Respuestas</span><span style="float:right; margin-right:20px">Creado</span>');
} else if(stickys==1){
cosaSt = $(this).parent().find('.list-header').find('.btn');
if(cosaSt.html()=="Nuevo Tema"){
   cosaSt.remove();
   $(this).parent().find('.list-header').remove();
}
  $(this).parent().prepend('<div class="list-header clearfix"><span style="font-size:17px; float:left; margin:10px; margin-bottom:15px; margin-top:15px; color: #101010; line-height: 1; font-family: Helvetica;"><b>Importantes</b></span></div><div style="background:#fff; padding:5px; color:#9C9E9C; border-bottom:1px solid #EFEFEF; height:15px"><div style="font-size:11px"><span style="float:left">Titulo</span><span style="float:right; margin-right:10px">Respuestas</span><span style="float:right; margin-right:20px">Creado</span></div>');
}
     coso =  $(this).parent().find('h3').html();
if(coso=="Temas"){
  $(this).parent().find('h3').html('Importantes');
}
      $(this).find('a.author-avatar').remove();
  comentarios = $(this).find('.stadistics').find('.button-action-s').find('.action-number').find('span').html();
  tiempo = $(this).find('.info').find('span').text();
  tiempo2 = $(this).find('.info').find('span').find('a').text();
  tiempo3 = tiempo.replace(tiempo2, "");
  tiempo4 = tiempo3.replace("Por ", "");
  tiempo5 = tiempo4.replace("hace", "Hace");
  $(this).find('.info').find('span').html('Por <a class="nick" href="/'+tiempo2+'">'+tiempo2+'</a>');
    $(this).find('.stadistics').html('<div align="center"><div style="font-size:11px; margin-right:10px;margin-top:9px; float:right; width:50px" align="center">'+comentarios+'</div><div style="font-size:11px; margin-right:25px;margin-top:9px; float:right; width:110px" align="right">'+tiempo5+'</div></div>');
  });
});
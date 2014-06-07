// ==UserScript==
// @name           WTF - Denuncias
// @namespace      http://taringa.net/perfil/gonx_666
// @description    Script para denunciar temas en la comu WTF
// @include        *taringa.net/comunidades/*
// @include        *comunidad-wtf.net/*
// ==/UserScript==

 var loc = window.location.pathname.split('/');
 if(loc[1] == 'comunidades' && loc[2] == 'whatthefuck'){
  var $ = unsafeWindow.$; var jQuery = $;
  var loc = window.location.pathname.split('/');
  $('.denunciar').before('<a class="dwtf">Denuncia WTF</a><a class="hist">Historial</a><style>.denunciar{display:none}'+
  '.dwtf{position:relative;background:-moz-linear-gradient(top,#fff,#f7f7f7);float:right;margin:-0px 0 0 -12px;z-index:99;padding:5px;border:1px solid #ccc;-moz-border-radius:4px;color:#555;text-shadow:1px 1px 0 #fff}'+
  '.hist{position:relative;background:-moz-linear-gradient(top,#fff,#f7f7f7);float:left;margin:-0px 0 0 -20px;z-index:99;padding:5px;border:1px solid #ccc;-moz-border-radius:4px;color:#555;text-shadow:1px 1px 0 #fff}'+
  'yy{background:rgba(0, 0, 0,0.5);cursor:pointer;position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:99}'+'#WTFD{position:absolute;left:50%;top:100px;width:640px;height:745px;margin:0 -320px;border:10px solid rgba(0, 0, 0,0.5)!important;overflow:hidden;z-index:999999;-moz-border-radius:7px}'+'#HIST{position:absolute;left:50%;top:100px;width:1000px;height:1700px;margin:0 -500px;border:10px solid rgba(0, 0, 0,0.5)!important;overflow:hidden;z-index:999999;-moz-border-radius:7px}</style>');
  $('.dwtf').click(function(){
   $('#WTFD,yy').remove()
   $('body').after('<yy>');
   $('body').after('<iframe src="http://www.comunidad-wtf.net/denuncias/" id="WTFD">');
   $('yy').click(function(){ $('#WTFD,yy').remove() })
  })
  $('.hist').click(function(){
   $('#HIST,yy').remove()
   $('body').after('<yy>');
   $('body').after('<iframe src="http://www.taringa.net/comunidades/whatthefuck/mod-history/" id="HIST">');
   $('yy').click(function(){ $('#HIST,yy').remove() })
  })
 }
 if(loc[1] == 'denuncias'){
  document.getElementById('html2').setAttribute('style', 'display:none');
  document.getElementById('html1').style.left = '80px';
  document.getElementById('image1').style.left = '0px';
 }
// Actualizado por jian01 //
// Hecho por gonx_666 para la pagina www.taringa.net ~ Prohibida su copia y distribuci�n //
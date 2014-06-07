// ==UserScript==
// @name           Facebook shorcuts
// @namespace      http://www.taringa.net/perfil/gonx_666
// @include        *.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==



GM_addStyle('#gm_shorcuts{position:fixed;bottom:-1px;left:10px;background:url(http://s6.tinypic.com/5v9agw.jpg);line-height:10px;padding:4px;border:1px solid #b5b5b5;-moz-border-radius:4px 4px 0 0}'+
			'.GM_fs_add{float:right;display:inline-block;width:10px;height:10px;margin-top:3px;text-align:center;font-weight:bold;color:#777;text-shadow: #ccc 0 1px 0;cursor:pointer;position:relative;z-index:4}'+
			'#gm_shorcuts ul{display:inline-block;}'+'#gm_shorcuts ul li{display:inline-block;margin-right:4px}'+'#gm_shorcuts ul li img{width:16px;height:16px}'+
			'#gm_shorcuts_add{position:fixed;top:50%;left:50%;margin-left:-140px;margin-top:-45px;background:#dfdedf url(http://s6.tinypic.com/5v9agw.jpg) repeat-x;line-height:10px;padding:4px;border:1px solid #b5b5b5;'+
			'-moz-border-radius:4px}'+'#gm_shorcuts_add label{display:inline-block;width:175px;line-height:18px;margin-bottom:4px}'+'#gm_shorcuts_add hr{background:#ccc !important}'+
			'#gm_shorcuts_add input{-moz-appearance:none!important;padding:4px 3px;border:0px!important;-moz-border-radius:4px;margin:2px 0;background:#fff;border:1px solid #b5b5b5 !important;font-size:10px;color:#777;}'+
			'#gm_buttons{text-align:right;}'+'#gm_buttons input{margin-left:5px;padding:1px 3px 3px 3px;background:#dfdedf url(http://s6.tinypic.com/5v9agw.jpg);text-shadow: #ddd 0 1px 0;cursor:pointer;}')

$('body').append('<div id="gm_shorcuts"><ul></li></ul><span class="GM_fs_add">+</span></div>')
$('#gm_shorcuts ul').html(GM_getValue('fs'))
var loc = window.location.pathname.split('/')[1];
$('.GM_fs_add').click(function(){
  $('body').append('<div id="gm_shorcuts_add" style="display:none">'+
				   '<label for="GM_fs_link">Link de la aplicación:</label><input type="text" class="GM_fs_input" id="GM_fs_link" name="GM_fs_link"><br>'+
				   '<label for="GM_fs_img">Link del icono de la aplicación:</label><input type="text" class="GM_fs_input" id="GM_fs_img" name="GM_fs_img">'+
				   '<hr>'+
				   '<div id="gm_buttons"><input type="button" id="GM_fs_button" value="Agregar"><input type="button" id="GM_fs_cancel" value="Cancelar"></div></div>')
  $('#gm_shorcuts_add').fadeIn(300)
  $('#GM_fs_button').click(function(){
	var href = $('#GM_fs_link').val()
	if(href != null){
	  var img = $('#GM_fs_img').val()
	  if(img != null){
		$('#gm_shorcuts ul').append('<li><a href="'+href+'" target="_'+Math.random()+'"><img src="'+img+'"></a></li>')
		var fs = $('#gm_shorcuts ul').html()
		GM_setValue('fs', fs)
		$('#gm_shorcuts ul li a').mousedown(function(e){
		  if( e.button == 2 ) {
			if(confirm('Desea eliminar el marcador?')){
			  $(this).parent().remove()
			  var fsa = $('#gm_shorcuts ul').html()
			  GM_setValue('fs', fsa)
			}
		  }
		})
	  }
	}
	$('#gm_shorcuts_add').fadeOut(300, function(){$('#gm_shorcuts_add').remove()})
  })
  $('#GM_fs_cancel').click(function(){
	$('#gm_shorcuts_add').fadeOut(300, function(){$('#gm_shorcuts_add').remove()})
  })
})

  
  $('#gm_shorcuts ul').bind("contextmenu",function(e){ return false; });
  
  $('#gm_shorcuts ul li a').mousedown(function(e){
	if( e.button == 2 ) {
	  if(confirm('Desea eliminar el marcador?')){
		$(this).parent().remove()
		var fs = $('#gm_shorcuts ul').html()
		GM_setValue('fs', fs)
	  }
	}
  })
  

  

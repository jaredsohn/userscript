// ==UserScript==
// @name           Tscript - por gonx_666
// @namespace      http://taringa.net/perfil/gonx_666
// @include        http://*taringa.net/*
// @exclude        http://br.taringa.net/*
// ==/UserScript==

/*/ VARIABLES				/*/ if(1 == 1){
 var $ = unsafeWindow.$; var jQuery = $;
 var key = unsafeWindow.global_data.user_key;
 var user = $('.usernameMenu a').html();
 var img = 'http://i1007.photobucket.com/albums/af198/gonza_06/';
 var dom = 'http://'+window.location.href.split('/')[2]+'/';
 var subdom = window.location.href.split('/')[2].split('.taringa.')[0]; if(subdom == 'taringa.net'){ subdom = 'www' };
 var winloc = window.location;
 var dir = window.location.href;
 var loc = winloc.pathname.split('/');
 var lc = loc[2];
 if(loc[1] == 'posts'){if(loc[3] == null || loc[3] == ''){} else if(isNaN(loc[3]) == false)			lc = 'post';}
 if(loc[1] == 'comunidades'){if(loc[3] == null || loc[3] == ''){} else if(isNaN(loc[3]) == false)	lc = 'temas';}
 if(loc[2] == 'a' || loc[2] == 'redactar' || loc[1].split('?')[0] == 'mensajes-responder.php'){		lc = 'enviarmp';}
 if(loc[1] == 'posts'){	if(loc[3] == '' || loc[3].substr(0, 6) == 'pagina')							lc = 'categorias';}
 $('body').after('<style id="color_style"></style><style id="all_style"></style>');
 var tipsy = unsafeWindow.tipsy;
 
 // Variables personalizadas
 var def_iconos = '[CAT*]Default]|*|[true]|*|[http://o2.t26.net/images/smiles/smile.gif,:),|*|http://o2.t26.net/images/smiles/angry.gif,X(,|*|http://o2.t26.net/images/smiles/cool.gif,:cool:,|*|http://o2.t26.net/images/smiles/crying.gif,:cry:,|*|http://o2.t26.net/images/smiles/unsure.gif,:/,|*|http://o2.t26.net/images/smiles/blaf.gif,:blaf:,|*|http://o2.t26.net/images/smiles/winky.gif,:winky:,|*|http://o2.t26.net/images/smiles/sad2.gif,:noo:,|*|http://o2.t26.net/images/smiles/evil.gif,:twisted:,|*|http://o2.t26.net/images/smiles/grn.gif,^^,|*|http://o2.t26.net/images/smiles/huh.gif,:|,|*|http://o2.t26.net/images/smiles/laughing.gif,:D,|*|http://o2.t26.net/images/smiles/red.gif,:oops:,|*|http://o2.t26.net/images/smiles/s.gif,:?,|*|http://o2.t26.net/images/smiles/drool.gif,:F,|*|http://o2.t26.net/images/smiles/sad.gif,:(,|*|http://o2.t26.net/images/smiles/tongue.gif,:P,|*|http://o2.t26.net/images/smiles/wassat.gif,:roll:,|*|http://o2.t26.net/images/smiles/wink.gif,;),|*|http://o2.t26.net/images/smiles/cry.gif,:crying:,|*|http://o2.t26.net/images/smiles/bobo.gif,:bobo:,|*|http://o2.t26.net/images/smiles/grin.gif,:grin:,|*|http://o2.t26.net/images/smiles/alabama.gif,:alaba:,|*|http://o2.t26.net/images/smiles/lpmqtp.gif,:lpmqtp:,|*|http://o2.t26.net/images/smiles/idiot.gif,:idiot:,|*|http://o2.t26.net/images/smiles/shrug.gif,:shrug:,|*|http://o2.t26.net/images/smiles/8s.gif,:8S:,|*|http://o2.t26.net/images/smiles/5.gif,:],|*|http://o2.t26.net/images/smiles/15.gif,:blind:,|*|http://o2.t26.net/images/smiles/17.gif,:buaa:,|*|http://o2.t26.net/images/smiles/cold.gif,:cold:,|*|http://o2.t26.net/images/smiles/hot.gif,:hot:,|*|http://o2.t26.net/images/smiles/love.gif,:love:,|*|http://o2.t26.net/images/smiles/globo.gif,:globo:,|*|http://o2.t26.net/images/smiles/zombie.gif,:zombie:,|*|http://o2.t26.net/images/smiles/pacman.gif,:man:,|*|http://o2.t26.net/images/smiles/metal.gif,:metal:,|*|http://o2.t26.net/images/smiles/mario.gif,:mario:,|*|http://o2.t26.net/images/smiles/i.gif,:info:,|*|http://o2.t26.net/images/smiles/exclamacion.gif,:exc:,|*|http://o2.t26.net/images/smiles/pregunta.gif,:q:,|*|http://o2.t26.net/images/smiles/no.gif,:NO:,|*|http://o2.t26.net/images/smiles/ok.gif,:OK:,|*|http://o2.t26.net/images/smiles/wow.gif,:WOW:,|*|http://o2.t26.net/images/smiles/lol.gif,:LOL:,|*|http://o2.t26.net/images/smiles/papel.gif,:oo:,|*|http://o2.t26.net/images/smiles/rip.gif,:RIP:,|*|http://o2.t26.net/images/smiles/koe.gif,:alien:,|*|http://o2.t26.net/images/smiles/106.gif,:trago:,|*|http://o2.t26.net/images/smiles/dolar.gif,:money:,|*|http://o2.t26.net/images/smiles/culo.gif,:culo:,|*|http://o2.t26.net/images/smiles/car.gif,:auto:,|*|http://o2.t26.net/images/smiles/mobe.gif,:lala:,|*|http://o2.t26.net/images/smiles/fantasma.gif,:fantasma:,|*|http://o2.t26.net/images/smiles/buenpost.gif,:buenpost:,|*|http://o2.t26.net/images/smiles/getalife.gif,:GET A LIFE:,|*|http://o2.t26.net/images/smiles/bang.gif,:headbang:,|*|http://o2.t26.net/images/smiles/limoon.gif,:limon:,|*|http://o2.t26.net/images/smiles/verde.gif,:verde:,'+
 '[CAT*]Otros]|*|[true]|*|['+
 'http://k03.kn3.net/667E8FC12.png,[img=http://k03.kn3.net/667E8FC12.png],:trollface:|*|'+
 'http://k02.kn3.net/30F558D5E.gif,[img=http://k02.kn3.net/30F558D5E.gif],:nono:|*|'+
 'http://k01.kn3.net/E74CE9BAD.gif,[img=http://k01.kn3.net/E74CE9BAD.gif],:ehmm:|*|'+
 'http://k03.kn3.net/249F20B0E.png,[img=http://k03.kn3.net/249F20B0E.png],:awesome:|*|'+
 'http://k04.kn3.net/9EF0C9D94.png,[img=http://k04.kn3.net/9EF0C9D94.png],:$|*|'+
 'http://k03.kn3.net/280400664.gif,[img=http://k03.kn3.net/280400664.gif],:pedobear:|*|'+
 'http://k02.kn3.net/625ECF88D.gif,[img=http://k02.kn3.net/625ECF88D.gif],:panic:|*|'+
 'http://k02.kn3.net/84EA85230.png,[img=http://k02.kn3.net/84EA85230.png],._.|*|'+
 'http://k03.kn3.net/B7036C7A6.gif,[img=http://k03.kn3.net/B7036C7A6.gif],:bunchie:'+
 '';
 
 if(GM_getValue("fn_del_iconos") == null){
  GM_setValue('fn_iconos',def_iconos);
  GM_setValue("fn_del_iconos",'caca');
 }
 //GM_setValue('fn_iconos',def_iconos);
 var fn_sh_iconos = GM_getValue("fn_sh_iconos",true);
  var fn_iconos = GM_getValue('fn_iconos',def_iconos);
  var fn_iconos_dis = GM_getValue("fn_iconos_dis",false);
  var fn_iconos_car = GM_getValue("fn_iconos_car",false);
 var fn_filto = GM_getValue("fn_filto",true);
  var fn_filto1 = GM_getValue("fn_filto1",'-1');
  var fn_filto2 = GM_getValue("fn_filto2",'novatos');
 var fn_quotes = GM_getValue("fn_quotes",true);
 var fn_swf = GM_getValue("fn_swf",true);
 var fn_bbcode = GM_getValue("fn_bbcode",true);
  var fn_bbcode_dcolor = GM_getValue("fn_bbcode_dcolor",'#000000');
  var fn_bbcode_negritas = GM_getValue("fn_bbcode_negritas",false);
 var fn_chcolor = GM_getValue("fn_chcolor",true);
  var fn_chcolor_fondo = GM_getValue("fn_chcolor_fondo",'#f4f4f4');
  var fn_chcolor_tfondo = GM_getValue("fn_chcolor_tfondo",'#004a95');
}

/*/ FUNCIONES				/*/ jQuery.extend({
 S: function(estilo){
  $('#all_style').append(estilo); 
 },
 Quotes: function(){
  $('blockquote').each(function(){ $(this).find('blockquote blockquote').addClass('blq1'); $(this).find('blockquote blockquote blockquote').addClass('blq2'); })
  $('.blq2').each(function(){ $(this).removeClass('blq1 blq2'); });
  var diq = ''; var diq2 = 'Ocultar los quotes';
  if(fn_quotes == true){ diq = ' style="display:none"'; diq2 = 'Ver los demas quotes'; }
  $('.blq1').each(function(){ $(this).wrap('<div class="vermas_q"'+diq+'></div>'); $(this).parent().before('<div class="vmq_bar"><span>'+diq2+'</span></div>') });
  $('.vmq_bar').each(function(){ $(this).click(function(){
   var dis = $(this).next().css('display');
   if(dis == 'none'){ $(this).next().slideDown(300); $(this).find('span').html('Ocultar los quotes') }
   else{ $(this).next().slideUp(300); $(this).find('span').html('Ver los demas quotes') }
  })}) 
 },
 Flash: function(fff){
  var dis2 = 'Ocultar';
  $(fff).find('embed').each(function(){   
   var wee = $(this).width();
   if(fn_swf == true){ $(this).hide(); dis2 = 'Mostrar'; }
   $(this).wrap('<div class="hide_swf" style="width:'+wee+'"></div>');
   $(this).parent().prepend('<span>'+dis2+'</span><br>');
   $(this).parent().find('span').click(function(){
	var swf = $(this).parent().find('embed');
	if(swf.css('display') == 'none'){ swf.show(); $(this).html('Ocultar') }
	else{ swf.hide(); $(this).html('Mostrar') }
   });
  })
 },
 CP: function(d_color, func){
  $('#colorpicker_box').remove();
  $('body').prepend('<div id="colorpicker_box"><div id="cp_sv" style="background-color:#f00"><img src="'+img+'Ts_CP_sva.png"></div><div id="cp_hs"><img src="'+img+'Ts_CP_hsa.png"></div><br>'+
					'<div id="cp_preview"><span class="before"></span><span class="after"></span></div><input type="text" id="cp_hex" maxlength="7">'+
					'<div id="cp_botones"><input id="cp_cancelar" value="cancelar"> <input id="cp_aceptar" value="aceptar"></div><b style="display:none"><hue>0</hue><sat>0</sat><val>0</val></b></div>'+
					'<style>'+'#cp_sv,#cp_hs{display:inline-block;}'+'#cp_sv{background-image:url('+img+'Ts_CP_sv2.png);height:201px;width:201px}'+'#cp_sv img{position:relative;margin:-10px;cursor:pointer;}'+
					'#cp_hs{background-image:url('+img+'Ts_CP_hs.png);height:200px;width:15px;margin-left:20px}'+'#cp_hs img{position:relative;margin:-5px -10px;cursor:pointer;}'+
					'#colorpicker_box{position:fixed;z-index:9999;background:#fff;padding:10px 20px 7px 10px;border:1px solid #ccc;-moz-border-radius:4px;left:50px;top:50px}'+'#cp_preview{float:left;margin:7px 0 -7px 0;border:1px solid #000;}'+
					'#cp_preview span{display:inline-block;width:16px;height:16px;}'+'#cp_botones{text-align:center;border-top:1px solid #ccc;margin-top:30px;padding:7px 0 0 0;}'+
					'#cp_botones input{-moz-appearance:none!important;background:url(http://o2.t26.net/images/bg_title_comment.gif)!important;text-align:center;text-transform:uppercase;font-size:10px !important;cursor:pointer;text-shadow:1px 1px 0 #fff}'+
					'#cp_hex{float:right;text-align:center;text-transform:uppercase;font-size:10px !important;position:relative;top:7px;padding:2px!important;-moz-border-radius:4px;}</style>')
					
	// conversores de colores
  function hsv_rgb(h, s, v) { 
	var r, g, b, i, f, p, q, t; h = Math.max(0, Math.min(360, h)); s = Math.max(0, Math.min(100, s)); v = Math.max(0, Math.min(100, v)); s /= 100; v /= 100;
	if(s == 0) { r = g = b = v; return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)}; }
	h /= 60; i = Math.floor(h); f = h - i; p = v * (1 - s); q = v * (1 - s * f); t = v * (1 - s * (1 - f));
	switch(i) {
	  case 0:	r = v; g = t; b = p; break;
	  case 1:	r = q; g = v; b = p; break;
	  case 2:	r = p; g = v; b = t; break;
	  case 3:	r = p; g = q; b = v; break;
	  case 4:	r = t; g = p; b = v; break;
	  default:	r = v; g = p; b = q;
	}
	return {r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255)};
  }
  function rgb_hsv(r,g,b) {
	r = r / 255; g = g / 255; b = b / 255;
	var minVal = Math.min(r, g, b); var maxVal = Math.max(r, g, b); var delta = maxVal - minVal; v = maxVal;
	if (delta == 0) { h = 0; s = 0; }
	else {
	  s = delta / maxVal;
	  var del_R = (((maxVal - r) / 6) + (delta / 2)) / delta;
	  var del_G = (((maxVal - g) / 6) + (delta / 2)) / delta;
	  var del_B = (((maxVal - b) / 6) + (delta / 2)) / delta;

	  if (r == maxVal) {h = del_B - del_G;}
	  else if (g == maxVal) {h = (1 / 3) + del_R - del_B;}
	  else if (b == maxVal) {h = (2 / 3) + del_G - del_R;}

	  if (h < 0) {h += 1;}
	  if (h > 1) {h -= 1;}
	}
	return {h: h * 360, s: s * 100, v: v * 100}
  }
  function rgb_hex(num){
	if (num == null) { return "00" }
	num = parseInt(num)
	if (isNaN(num)){ return "00" }
	else if (num <= 0 ) { return "00" }
	else if (num > 255) { return "FF" }
	
	num = Math.round(num)
	return "0123456789ABCDEF".charAt((num - num % 16)/16) + "0123456789ABCDEF".charAt(num % 16)
  }
  function hex_rgb(hex_val){
	hex_val = hex_val.replace(/\#/gi, '');
	if(hex_val.length == 6){ var r = parseInt( hex_val.substring(0,2), 16 ); var g = parseInt( hex_val.substring(2,4), 16 ); var b = parseInt( hex_val.substring(4,6), 16 ); }
	else if(hex_val.length == 3){ var r = parseInt( hex_val.substring(0,1)+hex_val.substring(0,1), 16 ); var g = parseInt( hex_val.substring(1,2)+hex_val.substring(1,2), 16 ); var b = parseInt( hex_val.substring(2,3)+hex_val.substring(2,3), 16 ); }
	return {r: r, g: g,  b: b};
  }
  function get_pos(hex_val){
	var position = hex_rgb(hex_val); position = rgb_hsv(position.r,position.g,position.b)
	var hue_pos = Math.round(position.h / 1.8); var sat_pos = Math.round(position.s * 2); var val_pos = Math.round(position.v * 2)
	var sv_back = hsv_rgb(position.h,100,100); sv_back = sv_back.r + ', ' + sv_back.g + ', ' + sv_back.b
	$('#cp_sv').attr('style','background-color:rgb('+sv_back+')'); $('#cp_sv img').attr('style','left:'+sat_pos+'px;top:'+val_pos+'px'); $('#cp_hs img').attr('style','top:'+hue_pos+'px')
	$('#cp_preview span').attr('style','background-color:'+hex_val);
	$('#cp_hex').val(hex_val);
	$('hue').html(position.h);$('sat').html(position.s);$('val').html(position.v)
  }
  get_pos(d_color)
  $('#cp_hex').keyup(function(){
	var val = $(this).val()
	get_pos(val)
  })
  function rgb_valor() {
	var h = $('hue').html()
	var s = $('sat').html()
	var v = $('val').html()
	var rgb = hsv_rgb(h, s, v)
	var rgb2 = hsv_rgb(h, 100, 100)
	var hex = '#' + rgb_hex(rgb.r) + rgb_hex(rgb.g) + rgb_hex(rgb.b)
	var rgb = rgb.r + ', ' + rgb.g + ', ' + rgb.b
	var rgb2 = rgb2.r + ', ' + rgb2.g + ', ' + rgb2.b

	$('rgb').html(rgb)
	$('hex').html(hex)

	$('#cp_sv').attr('style','background-color: rgb('+rgb2+');')
	$('#cp_preview .after').attr('style','background:'+hex+';')
	$('#cp_hex').val(hex);
  }
  function cp_sv(e){
	var l = e.pageX - $('#cp_sv').offset().left;
	var t = e.pageY - $('#cp_sv').offset().top;
	if(l > 200){ l = 200 }
	if(l < 000){ l = 000 }
	if(t > 200){ t = 200 } 
	if(t < 000){ t = 000 }
	$('#cp_sv img').attr('style','left:'+l+'px;top:'+t+'px')
	l = Math.round(l/2)
	t = Math.round(t/2)
	$('sat').html(l)
	$('val').html(t)
	rgb_valor()
  }
  $('#cp_sv').mousedown(function(e){
	cp_sv(e)
	$('.sp1').removeClass('sp1')
	$(this).find('img').addClass('sp1')
	$(document).bind('mousemove',cp_sv)
  })
  function cp_hs(e){
	var t = e.pageY - $('#cp_hs').offset().top;
	if(t > 200){ t = 200 } 
	if(t < 000){ t = 000 }
	$('.select-picka').attr('style','top:'+t+'px')
	t = Math.round(t * 1.8)
	if(t == 360){ t = 0}
	$('hue').html(t)
	rgb_valor()
  }
  $('#cp_hs').mousedown(function(){
	$('.select-picka').removeClass('select-picka')
	$(this).find('img').addClass('select-picka')
	$(document).bind('mousemove',cp_hs)
  })
  $(document).mouseup(function(){
    $('.sp1').removeClass('sp1')
	$(document).unbind('mousemove',cp_sv)
	$('.select-picka').removeClass('select-picka')
	$(document).unbind('mousemove',cp_hs)
  })
  $('#cp_cancelar').click(function(){ $('#colorpicker_box').remove() })
  $('#cp_aceptar').click(function(){
	func($('#cp_hex').val());
	$('#colorpicker_box').remove();
  })
 },
 Add: function(destino, pre_t, t1, seleccion, t2, pro_t){
  var txt = document.getElementById(destino);
  var scrollTop =  txt.scrollTop;
  txt.value = pre_t + t1 + seleccion + t2 + pro_t;
  txt.focus();
  txt.selectionStart = pre_t.length + t1.length;
  txt.selectionEnd = pre_t.length + t1.length + seleccion.length;
  txt.scrollTop = scroll;
 },
 AT: function(destino, t1, t2){
   var txt = document.getElementById(destino);
   var inicio	 =  txt.selectionStart; 
   var fin		 =  txt.selectionEnd;  
   var pre		 =  txt.value.substr(0, inicio);  
   var next		 =  txt.value.substr(fin, txt.value.length);  
   var seleccion =  txt.value.substr(inicio, (fin - inicio)); 
   var scrollTop =  txt.scrollTop;
   txt.value = pre + t1 + seleccion + t2 + next;
   txt.focus();
  },
 ABB: function(lugar, destino){
  if(1 == 1){ // Barra BBCodes
   var bbc_bar  = '<li 1="[b]" 2="[/b]"><a><img src="'+img+'bbcode/bold.png"></a></li>'+
				  '<li 1="[i]" 2="[/i]"><a><img src="'+img+'bbcode/italic.png"></a></li>'+
				  '<li 1="[u]" 2="[/u]"><a><img src="'+img+'bbcode/underline.png"></a></li>';

	   bbc_bar += '<li class="b_space"></li>';

	if(loc[1] == 'agregar' || loc[1] == 'edicion.form.php' || lc == 'enviarmp' || loc[3] == 'agregar' || loc[3] == 'editar-tema'){
	   bbc_bar += '<li 1="[align=left]" 2="[/align]"><a><img src="'+img+'bbcode/text_align_left.png"></a></li>'+
				  '<li 1="[align=center]" 2="[/align]"><a><img src="'+img+'bbcode/text_align_center.png"></a></li>'+
				  '<li 1="[align=right]" 2="[/align]"><a><img src="'+img+'bbcode/text_align_right.png"></a></li>';

	   bbc_bar += '<li class="b_space"></li>';
	}
	
	   bbc_bar += '<li 3="menu1" 4="004a95" 5="[color=" 6="[/color]"><a>004a95,222222,444444,666666,888888,AAAAAA,000000,8B0000,FF0000,FFA500,FFFF00,00008B,0000FF,008000,808000,00FFFF,4B0082,EE82EE</a></li>&nbsp;&nbsp;';
	   
	if(loc[1] == 'agregar' || loc[1] == 'edicion.form.php' || lc == 'enviarmp' || loc[3] == 'agregar' || loc[3] == 'editar-tema'){
	   bbc_bar += '<li class="bsp2"></li><li 3="menu2" 4="50" 5="[size=" 6="[/size]"><a>9px,12px,14px,16px,18px,20px,22px,24px</a></li><li class="bsp2"></li>'+
				  '<li 3="menu2" 4="115" 5="[font=" 6="[/font]"><a>Times New Roman,Arial,Courier New,Georgia,Verdana,Trebuchet,Lucida Sans,Comic Sans MS</a></li>';
	}
				 
	   bbc_bar += '<li class="b_space"></li>';
				 
	   bbc_bar += '<li 3="imagen"><a><img src="'+img+'bbcode/imagen.png"></a></li>'+
				  '<li 3="link"><a><img src="'+img+'bbcode/link.png"></a></li>'+
				  '<li 3="quote"><a><img src="'+img+'bbcode/quote.png"></a></li>'+
				  '<li 3="code"><a><img src="'+img+'bbcode/code.png"></a></li>';

	   bbc_bar += '<li class="b_space"></li>';
				 
	   bbc_bar += '<li 3="flash"><a><img src="'+img+'bbcode/flash.png"></a></li>'+
				  '<li 3="youtube"><a><img src="'+img+'bbcode/youtube.png"></a></li>'+
				  '<li 3="megavideo"><a><img src="'+img+'bbcode/megavideo.png"></a></li>';

	   bbc_bar += '<li class="b_space"></li>';	
   }
   $(lugar).html(bbc_bar).find('li').each(function(ed){
	if($(this).attr('3') == 'menu1'){ // Color
	 $(this).addClass('slymenu smt1');
	 var def_color = $(this).attr('4');
	 var MI = '#bc_'+ed;
	 var color1 = $(this).find('a').html().split(',');
	 var color2 = ''; for (i=0;i<color1.length;i++){ color2 += '<li 1="#'+color1[i]+'" style="background:#'+color1[i]+'!important"></li>'; } ;
	 
	 $(this).find('a').replaceWith('<a id="bc_'+ed+'" style="width:39px!important">'+
								   '<div class="current_option" 1="#'+def_color+'"><img src="'+img+'edit-color.png"><span style="background:#'+def_color+'"></span></div>'+
								   '<span class="more_options"></span>'+
								   '<ul>'+color2+'<li class="cmas"><span>+</span></li></ul>'+
								   '</a>');
								   
	 $(this).find('div.current_option').click(function(){ 	   var txt = document.getElementById(destino); var pre	=  txt.value.substr(0, txt.selectionStart);
	   var next =  txt.value.substr(txt.selectionEnd, txt.value.length); var TS	=  txt.value.substr(txt.selectionStart, (txt.selectionEnd - txt.selectionStart));
	   $.Add(destino, pre, '[color='+$(this).attr('1')+']', TS , '[/color]', next); });
	 $(this).find('span.more_options').click(function(){ // Mostar menu despegable
	  $('.slymenu ul').not('#bc_'+ed+' ul').hide()
	  var cpul = $(this).parent().find('ul');
	  if(cpul.css('display') == 'none'){ cpul.show() }
	  else{ cpul.hide() }
	 });
	 $(this).find('ul li').not('.cmas').each(function(){ $(this).click(function(){
	  var SS = $(this).attr('1');
	  $(MI+' div.current_option').attr('1', SS);
	  $(MI+' div.current_option span').attr('style','background:'+SS+'!important');
	  var txt = document.getElementById(destino); var pre	=  txt.value.substr(0, txt.selectionStart);
	  var next =  txt.value.substr(txt.selectionEnd, txt.value.length); var TS	=  txt.value.substr(txt.selectionStart, (txt.selectionEnd - txt.selectionStart));	  
	  $.Add(destino, pre, '[color='+SS+']', TS, '[/color]', next);
	  $(MI+' ul').hide();	
	 })})
	 $(this).find('li.cmas').click(function(){ // Mostar color pick
	  var tcc = $(this).parent().prev().prev().attr('1');
	  $.CP(tcc, function(ec){
	   var txt = document.getElementById(destino); var pre	=  txt.value.substr(0, txt.selectionStart);
	   var next =  txt.value.substr(txt.selectionEnd, txt.value.length); var TS	=  txt.value.substr(txt.selectionStart, (txt.selectionEnd - txt.selectionStart));
	   $.Add(destino, pre, '[color='+ec+']', TS, '[/color]', next);
	   $(MI+' div.current_option').attr('1', ec);
	   $(MI+' div.current_option span').attr('style','background:#'+ec.replace(/\#/gi, '')+'!important');
	   $(MI+' ul').hide();	   
	  });	  
	 });
	}
	else if($(this).attr('3') == 'menu2'){ // Menus
	 var MI = '#bm_'+ed;
	 var T1 = $(this).attr('5');
	 var T2 = $(this).attr('6');
	 var w2 = $(this).attr('4') - 10;
	 $(this).addClass('slymenu smt2');
	 var ops = $(this).find('a').html().split(',');
	 var ops2 = ''; for (i=0;i<ops.length;i++){ ops2 += '<li 1="'+ops[i]+'" style="width:'+w2+'px!important">'+ops[i]+'</li>'; } ;
	 $(this).find('a').replaceWith('<a id="bm_'+ed+'" style="width:'+$(this).attr('4')+'px!important">'+
								   '<div class="current_option" 1="'+ops[0]+'"><b>'+ops[0]+'</b></div>'+
								   '<span class="more_options"></span>'+
								   '<ul>'+ops2+'</ul>'+
								   '</a>');								   
	 $(this).find('div.current_option').click(function(){
	  var txt = document.getElementById(destino);
	  var pre = txt.value.substr(0, txt.selectionStart);
	  var next =  txt.value.substr(txt.selectionEnd, txt.value.length);
	  var TS = txt.value.substr(txt.selectionStart, (txt.selectionEnd - txt.selectionStart));
	  $.Add(destino, pre, T1+$(this).attr('1')+']', TS, T2, next);
	 })
	 $(this).find('span.more_options').click(function(){ // Mostar menu despegable
	  $('.slymenu ul').not(MI+' ul').hide()
	  var cpul = $(this).parent().find('ul');
	  if(cpul.css('display') == 'none'){ cpul.show() }
	  else{ cpul.hide() }
	 });
	 $(this).find('ul li').each(function(eee){ $(this).click(function(){
	  var SS = $(this).attr('1');
	  $(MI+' div b').text(SS).parent().attr('1',SS);
	  var txt = document.getElementById(destino);
	  var pre = txt.value.substr(0, txt.selectionStart);
	  var next =  txt.value.substr(txt.selectionEnd, txt.value.length);
	  var TS = txt.value.substr(txt.selectionStart, (txt.selectionEnd - txt.selectionStart));	  
	  $.Add(destino, pre, T1+$(this).attr('1')+']', TS, T2, next);
	  $(this).parent().hide();
	 })});
	}
	else{ // BBCodes comunes
	 $(this).click(function(){
	  var txt = document.getElementById(destino);
	  var T1 = '';
	  var T2 = '';
	  var TP = $(this).attr('3');
	  var pre	=  txt.value.substr(0, txt.selectionStart);  
	  var next	=  txt.value.substr(txt.selectionEnd, txt.value.length);
	  var TS	=  txt.value.substr(txt.selectionStart, (txt.selectionEnd - txt.selectionStart));
	  if(TP == null){
	   T1 = $(this).attr('1'); T2 = $(this).attr('2');
	  }
	  if(TP == 'imagen' || TP == 'flash'){
	   var xx1 = ''; if(TP == 'imagen'){ xx1 = 'img' } if(TP == 'flash'){ xx1 = 'swf' }
	   var link = ''; if(TS == ''){ link = prompt('Ingrese el link de la imagen/animacion'); } else{ link = TS; }
	   if(link == ''){} else if(link.substr(0,7) == 'http://'){ TS = '['+xx1+'=' + link + ']'; }
	  }
	  if(TP == 'link'){
	   var link = ''; if(TS == ''){ link = prompt('Ingrese el link'); } else{ link = TS; }
	   if(link.substr(0,7) == 'http://'){
		if(confirm('¿Desea agregarle un texto al enlace?')){
		 var text = prompt('Ingrese el texto');
		 if(text == '' || text == null){
		  TS = '[url]' + link + '[/url]';
		 }
		 else{
		  TS = '[url=' + link + ']' + text + '[/url]';
		 }
		}
		else{
		 TS = '[url]' + link + '[/url]';
		}	
	   }
	   else{
		var text = link;
		link = prompt('Ingrese el enlace');
		if(link == '' || link == null){} else{
		 TS = '[url=' + link + ']' + text + '[/url]';
		}
	   }
	  }
	  if(TP == 'quote' || TP == 'code'){
	   var xx1 = ''; if(TP == 'quote'){ xx1 = 'quote' } if(TP == 'code'){ xx1 = 'code' }
	   var text = ''; if(TS == ''){ text = prompt('Ingrese el texto'); } else{ text = TS; }
	   if(text == '' || text == null){} else{ TS = '['+xx1+']' + text + '[/'+xx1+']'; }	  
	  }	  
	  if(TP == 'youtube'){
	   if(TS == ''){ var yt = prompt('Ingrese la direccion, el id o el codigo del video').split('&')[0]; }
	   else{  var yt = TS.split('&')[0]; }
	   if(yt == '' || yt == null){ } else{
		if(yt.length == 11){ yt = yt }
		if(yt.length == 42){ yt = yt.split('=')[1]; }
		if(yt.split('?')[0].length == 96){ yt = yt.split('?')[0].split('"')[7].substr(25); }
		TS = '[swf=http://www.youtube.com/v/' + yt + ']';
	   }
	  }
	  if(TP == 'megavideo'){
	   if(TS == ''){ var mv = prompt('ingrese el codigo del video').substr(60, 67) }
	   else{  var mv = TS.substr(60, 67) }
	   if(mv != ''){
		TS = '[swf=' + mv + ']';
	   }
	  }
	  $.Add(destino, pre, T1, TS, T2, next)
	 });
   	}
   });   
  $.S('.slymenu {height:20px !important;background:url(http://o2.t26.net/images/bg_title_comment.gif)!important;border:1px solid #bbb;-moz-border-radius:4px;margin:0 2px!important;font-size:10px;}'+
	  '.slymenu .current_option{height:20px;}'+'.slymenu .current_option b{text-decoration:none!important;position:relative;top:3px;left:5px}'+
	  '.slymenu .more_options{background:url('+img+'moreopts.png) no-repeat 0 center;width:10px;height:22px;float:right;position:relative;top:-21px;left:-4px}'+
	  '.slymenu *:hover{text-decoration:none!important;}'+'.bsp2{min-width:4px!important}'+
	  '.slymenu ul{display:none;float:left;background:#fff;position:relative;top:-23px;left:-1px;border:1px solid #ccc;-moz-border-radius:0 0px 4px 4px;padding:2px !important;}'+

	  '.smt1 {width:37px;}'+'.smt1 ul{width:70px;}'+'.smt1 .current_option img{position:relative;top:-2px;float:left;}'+
	  '.smt1 .current_option span{width:16px;height:3px;float:left;position:relative;top:14px;left:-19px}'+
	  '.smt1 ul li{border:2px solid #fff;float:left;min-width:10px!important;height:11px!important;}'+'.smt1 ul li.cmas{width:24px!important;}'+
	  '.smt1 ul li.cmas span{float:right;position:relative;top:-2px;}'+'.smt1 ul li.cmas:hover{background:none!important;text-decoration:none!important;}'+
	  '.smt2 ul li{padding:1px 3px!important;height:15px!important}'+'.smt2 ul li:hover{background:#f0f0f0!important;}');
 },
 transform_bbc: function(text){
  function core(text){ text = text.replace(/\//gi,'\/').replace(/\:/gi,'\:').replace(/\./gi,'\.'); return text; }  
  text = escape(text);
  var car_iconos = fn_iconos.substr(6, fn_iconos.length).split('[CAT*]');  
  for(i = 0; i < car_iconos.length; i++){ // Dividir por categorias
   var all_icons = car_iconos[i].split(']|*|[');
   if(fn_iconos_car == true && all_icons[1] == 'false'){  } else{
	if(all_icons[2] != ''){
	 var each_icon = all_icons[2].split('|*|');
	 for(h = 0; h < each_icon.length; h++){
	  var thico = each_icon[h].split(',');
	  var re = escape(thico[2])
	  if(thico[2] != ''){
	   text = text.replace(new RegExp(re, "gi"),escape(thico[1]));
	  } 
	 }
	}
   }
  }
  return unescape(text);
 },
 addbcolor: function(text){
  function addCC(text){ return text.replace(/(\[(?:color)(?:=.*?)?\][\s\S]+?\[\/(?:color)\])/ig, '['+d2+'$1'+d1+']'); }  
  var new_text = ''; var d1 = ''; var d2 = '';
  if(fn_bbcode_dcolor != '#000000' && fn_bbcode_negritas == true){	d1 = '[b][color='+fn_bbcode_dcolor+''; d2 = '/color][/b]'; }
  else if(fn_bbcode_dcolor != '#000000'){ d1 = '[color='+fn_bbcode_dcolor+''; d2 = '/color]';  }
  else if(fn_bbcode_negritas == true){	d1 = '[b'; d2 = '/b]'; }
  var texto = text
  text = text.split('quote');
  var all_xx = new Array();
  var as1 = 0;
  var as2 = 'non';
  var ttl = 0;
  if(text.length > 1){
   for (var i = 0; i < text.length; i++) {
	if(texto.substr(ttl-6, 6) == '[quote'){ as1++; if(as1 == 1){ as2 = 'emp'  } else{ as2 = 'non'};}
	else if(texto.substr(ttl-6, 6) == '/quote'){ as1--; if(as1 == 0){ as2 = 'ter' } else{ as2 = 'non'};}
	if(as2 == 'emp'){
	 new_text += d2 + '[quote' + text[i];
	}
	else if(as2 == 'ter'){
	 new_text += 'quote]'+d1 + addCC(text[i]);
	}
	else if(as2 == 'non'){
	 if(i == 0){ new_text += addCC(text[i]); }
	 else{ new_text += 'quote'+text[i]; }
	}	
	ttl += text[i].length+5;	
   }   
  } else{ new_text = addCC(texto); }
  $('#pie').html(d1 + ']' + new_text + '[' + d2)
  return d1 + ']' + new_text + '[' + d2;
 },
 html_bbcode: function(text){
  var pa = 'position: absolute; top: ';
  var pa2 = 'smiles/';
  var icp = new Array('-288', '-310', '-332', '-354', '-376', '-398', '-420', '-442', '-464', '-486', '-508', '-530', '-552', '-574', '-596', '-618');
  var icpc = new Array(':)', ';)', ':roll:', ':P', ':D', ':(', 'X(', ':cry:', ':twisted:', ':|', ':?', ':cool:', ':oops:', '^^', '8|', ':F');
  
  var icp2 = new Array('blaf', 'winky', 'sad2', 'cry', 'bobo', 'grin', 'alabama', 'lpmqtp', 'idiot', 'shrug', '8S', '5', '15', '17', 'cold', 'hot', 'love', 'globo', 'zombie', 'pacman', 'metal', 'mario', 'i', 'exclamacion', 'pregunta', 'no', 'ok', 'wow', 'lol', 'papel', 'rip', 'koe', '106', 'dolar', 'culo', 'car', 'mobe', 'fantasma', 'buenpost', 'getalife', 'bang', 'limoon', 'verde');
  var icp2c = new Array(':blaf:', ':winky:', ':noo:', ':twisted:', ':crying:', ':bobo:', ':grin:', ':alaba:', ':lpmqtp:', ':idiot:', ':shrug:', ':8S:', ':]', ':blind:', ':buaa:', ':cold:', ':hot:', ':love:', ':globo:', ':zombie:', ':man:', ':metal:', ':mario:', ':info:', ':exc:', ':q:', ':NO:', ':OK:', ':WOW:', ':LOL:', ':oo:', ':RIP:', ':alien:', ':trago:', ':money:', ':culo:', ':auto:', ':lala:', ':fantasma:', ':buenpost:', ':GET A LIFE:', ':headbang:', ':limon:', ':verde:');
  
  text = text.replace(/<blockquote><div class="cita"><strong>(.*?)<\/strong> dijo:<\/div><div class="citacuerpo"><p>/gi,"[quote=$1]")
			 .replace(/(.*?)<\/p><\/div><\/blockquote>/gi," $1[/quote]")
			 .replace(/\n(.*)El (.*) a las (.*), (.*) escribió:\n/gi,"[quote=El $2 a las $3, $4]")
			 .replace(/&gt; (.*)\n[^>]* /i,"$1[/quote]")
			 .replace(new RegExp(pa+icp[0], "gi"),icpc[0]).replace(new RegExp(pa+icp[1], "gi"),icpc[1]).replace(new RegExp(pa+icp[2], "gi"),icpc[2]).replace(new RegExp(pa+icp[3], "gi"),icpc[3])
			 .replace(new RegExp(pa+icp[4], "gi"),icpc[4]).replace(new RegExp(pa+icp[5], "gi"),icpc[5]).replace(new RegExp(pa+icp[6], "gi"),icpc[6]).replace(new RegExp(pa+icp[7], "gi"),icpc[7])
			 .replace(new RegExp(pa+icp[8], "gi"),icpc[8]).replace(new RegExp(pa+icp[9], "gi"),icpc[9]).replace(new RegExp(pa+icp[10], "gi"),icpc[10]).replace(new RegExp(pa+icp[11], "gi"),icpc[11])
			 .replace(new RegExp(pa+icp[12], "gi"),icpc[12]).replace(new RegExp(pa+icp[13], "gi"),icpc[13]).replace(new RegExp(pa+icp[14], "gi"),icpc[14]).replace(new RegExp(pa+icp[15], "gi"),icpc[15])
			 .replace(new RegExp(pa2+icp2[0], "gi"),icp2c[0]).replace(new RegExp(pa2+icp2[1], "gi"),icp2c[1]).replace(new RegExp(pa2+icp2[2], "gi"),icp2c[2]).replace(new RegExp(pa2+icp2[3], "gi"),icp2c[3])
			 .replace(new RegExp(pa2+icp2[4], "gi"),icp2c[4]).replace(new RegExp(pa2+icp2[5], "gi"),icp2c[5]).replace(new RegExp(pa2+icp2[6], "gi"),icp2c[6]).replace(new RegExp(pa2+icp2[7], "gi"),icp2c[7])
			 .replace(new RegExp(pa2+icp2[8], "gi"),icp2c[8]).replace(new RegExp(pa2+icp2[9], "gi"),icp2c[9]).replace(new RegExp(pa2+icp2[10], "gi"),icp2c[10]).replace(new RegExp(pa2+icp2[11], "gi"),icp2c[11])
			 .replace(new RegExp(pa2+icp2[12], "gi"),icp2c[12]).replace(new RegExp(pa2+icp2[13], "gi"),icp2c[13]).replace(new RegExp(pa2+icp2[14], "gi"),icp2c[14]).replace(new RegExp(pa2+icp2[15], "gi"),icp2c[15])
			 .replace(new RegExp(pa2+icp2[16], "gi"),icp2c[16]).replace(new RegExp(pa2+icp2[17], "gi"),icp2c[17]).replace(new RegExp(pa2+icp2[18], "gi"),icp2c[18]).replace(new RegExp(pa2+icp2[19], "gi"),icp2c[19])
			 .replace(new RegExp(pa2+icp2[20], "gi"),icp2c[20]).replace(new RegExp(pa2+icp2[21], "gi"),icp2c[21]).replace(new RegExp(pa2+icp2[22], "gi"),icp2c[22]).replace(new RegExp(pa2+icp2[23], "gi"),icp2c[23])
			 .replace(new RegExp(pa2+icp2[24], "gi"),icp2c[24]).replace(new RegExp(pa2+icp2[25], "gi"),icp2c[25]).replace(new RegExp(pa2+icp2[26], "gi"),icp2c[26]).replace(new RegExp(pa2+icp2[27], "gi"),icp2c[27])
			 .replace(new RegExp(pa2+icp2[28], "gi"),icp2c[28]).replace(new RegExp(pa2+icp2[29], "gi"),icp2c[29]).replace(new RegExp(pa2+icp2[30], "gi"),icp2c[30]).replace(new RegExp(pa2+icp2[31], "gi"),icp2c[31])
			 .replace(new RegExp(pa2+icp2[32], "gi"),icp2c[32]).replace(new RegExp(pa2+icp2[33], "gi"),icp2c[33]).replace(new RegExp(pa2+icp2[34], "gi"),icp2c[34]).replace(new RegExp(pa2+icp2[35], "gi"),icp2c[35])
			 .replace(new RegExp(pa2+icp2[36], "gi"),icp2c[36]).replace(new RegExp(pa2+icp2[37], "gi"),icp2c[37]).replace(new RegExp(pa2+icp2[38], "gi"),icp2c[38]).replace(new RegExp(pa2+icp2[39], "gi"),icp2c[39])
			 .replace(new RegExp(pa2+icp2[40], "gi"),icp2c[40]).replace(new RegExp(pa2+icp2[41], "gi"),icp2c[41]).replace(new RegExp(pa2+icp2[42], "gi"),icp2c[42])
			 .replace(/<span style="position: relative;"><img src="http:\/\/o2.t26.net\/images\/big2v5.gif" style="(.*?)px; clip: rect\((.*?)\);" hspace="3" vspace="2"><img src="http:\/\/o2.t26.net\/images\/space.gif" style="vertical-align: middle; width: 15px; height: 15px;" hspace="3" vspace="2"><\/span>/gi,'$1')
			 .replace(/<img class="imagen" src="(.*?)" border="0">/gi,'[img=$1]')
			 .replace(/<span style="color: rgb\((.*?)\);">(.*?)<\/span>/gi,"[color=$1]$2[/color]")
			 .replace(/<span style="font-size: (.*?)pt;">(.*?)<\/span>/gi,"[size=$1px]$2[/size]")
			 .replace(/<span style="font-family: (.*?);">(.*?)<\/span>/gi,"[font=$1]$2[/font]")
			 .replace(/<b>(.*?)<\/b>/gi,"[b]$1[/b]")
			 .replace(/<em>(.*?)<\/em>/gi,"[i]$1[/i]")
			 .replace(/<u>(.*?)<\/u>/gi,"[u]$1[/u]")
			 .replace(/<br><center><embed src="(.*?)" quality="high" (.*?)><\/center><br>/gi,"[swf=$1]")
			 .replace(/<br>/gi,'\n')
			 .replace(/&gt;/gi,"")		   
 return text;
 },
 Otras: function(lugar, destino){
  $(lugar).append('<div id="fb_buttons"></div><div id="fb_all"></div>');
  var rr = $('#fb_buttons');
  var tt = $('#fb_all');
  if(fn_sh_iconos == true && fn_iconos != ''){
   rr.append('<input type="button" value="Iconos" class="button">');
   tt.append('<div class="fn_box db_'+fn_iconos_dis+'" id="fb_iconos"></div>');
   var car_iconos = fn_iconos.substr(6, fn_iconos.length).split('[CAT*]');   
   for(i = 0; i < car_iconos.length; i++){ // Dividir por categorias
    var all_icons = car_iconos[i].split(']|*|[');
	if(fn_iconos_car == true && all_icons[1] == 'false'){  } else{
	if(all_icons[2] != ''){
	 var each_icon = all_icons[2].split('|*|');
	 for(h = 0; h < each_icon.length; h++){
	  var thico = each_icon[h].split(',');
	  var ty1 = ' act'; if(thico[1].substr(0,1) != '['){ ty1 = ' dis'}
	  $('#fb_iconos').append('<a class="l_addico'+ty1+'" 0="'+thico[0]+'" 1="'+thico[1]+'" 2="'+thico[2]+'"><img src="'+thico[0]+'"></a>');
	 }
	}}
   }
   if($('#fb_iconos .l_addico').size() == 0){ $('#fb_buttons').remove() }
   $('#fb_iconos').append('<div style="clear:both"></div>');
   $('.l_addico').each(function(){ $(this).click(function(){
	var txt = document.getElementById(destino);
	var inicio	=  txt.selectionStart; 
	var fin		=  txt.selectionEnd;  
	var pre		=  txt.value.substr(0, inicio);  
	var next		=  txt.value.substr(fin, txt.value.length);  
	var seleccion =  txt.value.substr(inicio, (fin - inicio));
	var bbc = $(this).attr('2');
	if(bbc == ''){ bbc = $(this).attr('1'); }
	$.Add(destino,pre,seleccion+' '+bbc+' ','','',next);
   }) })
   $.S('.l_addico img{max-height:50px;}'+'.l_addico{margin:1px 2px;}')
  }
  $.S('.db_true{display:none}'+'#fb_buttons{margin:-5px 0 -2px 0;text-align:center;}'+'#fb_all{margin:7px 0 0 0;}'+
  '.fn_box{text-align:center;background:#eee;border-top:1px dotted #ccc;padding:3px;}')
  $('#fb_buttons input').each(function(e){ $(this).click(function(){ var qq = $('.fn_box'); if(qq.css('display') == 'none'){ qq.slideDown(300) } else{ qq.slideUp(300) } })})
  if(tt.html() == ''){ tt.parent().remove(); }
 }
}).fn.scrollTo = function(time){
  var t = $(this).offset().top;
  if(t > 10){t = t - 10}
  if(time == 'fast'){time = 400}
  if(time == 'medium'){time = 800}
  if(time == 'slow'){time = 1200}
  if(time == null){time = 1000}
  $('html,body').animate({scrollTop: t}, time);
};
jQuery.fn.select = function(func, w1) {
 $(this).each(function(){
  $(this).hide();
  var t = $(this).attr('id');
  if(w1 == null){ w1 = $(this).width(); } 
  w2 = w1 + 4;
  $(this).wrap('<div class="ts_select" id="s_'+t+'" style="width:'+w1+'px;"></div>');
  $('#s_'+t).append('<cos><b></b><span></span></cos><ul class="ts_select_m"></ul>');
  $(this).find('option').each(function(){
   $('#s_'+t+' .ts_select_m').append('<li 1="'+$(this).attr("value")+'" style="'+$(this).attr("style")+'">'+$(this).html()+'</li>');
  })
  $(this).parent().find('cos b').html($(this).find('option:selected').val());
  $(this).parent().find('cos').click(function(){
   var dis = $('.ts_select[id="s_'+t+'"] ul'); $('.jq_select div').hide();
   if(dis.css('display') == 'none'){ dis.slideDown(300) }
   else{ dis.slideUp(300) }
  })
  $('.ts_select[id="s_'+t+'"] ul li').click(function(){
   var tt = $('.ts_select[id="s_'+t+'"]'); var sl = $(this).html();
   tt.find('ul').hide();
   tt.find('cos b').html(sl)
   tt.find('select option:selected').removeAttr("selected")
   tt.find('select').val($(this).attr('1'))
   if(func != null){ func($(this).attr('1')) }  
  })
 }) 
}

/*/ ESTILO GENERAL			/*/ if(1 == 1){
 $('.rtop,.rbott,.banner,.banner-300').remove()
 $('.menuTabs li').each(function(ee){ $(this).mouseover(function(){
  if($(this).attr('class') != 'tabbed here'){
   $('.menuTabs li.here').removeClass('here');
   $(this).addClass('here');
   $('.subMenu').hide();
   $('.subMenu:eq('+ee+')').fadeIn(150);
  }
 }); });
 
 // Banner
 var min = 0; var max = 5; var RN = Math.round(parseInt(min) + Math.random() * (max-min));
 $('#banner').html(RN);
 if(RN == 0){ $('#banner').append('0'); }
 if(RN == 1){ $('#banner').append('dasdadada'); }
 $('#banner').html('<form name="top_search_box" class="buscador-h" action="http://buscar.taringa.net/posts">'+
 '<div class="search-in"><a onclick="search_set(this, \'web\')">Web</a> - <a onclick="search_set(this, \'posts\')" class="search_active">Posts</a> - <a onclick="search_set(this, \'comunidades\')">Comunidades</a></div>'+
 '<input class="mini_ibuscador onblur_effect" type="text" title="Buscar" value="Buscar" onblur="onblur_input(this)" onfocus="onfocus_input(this)" onkeypress="ibuscador_intro(event)" name="q" id="ibuscadorq" />'+
 '<input class="mini_bbuscador" vspace="2" type="submit" hspace="10" align="top" title="Buscar" class="bbuscador" alt="Buscar" value="" />'+
 '</form>');
 
 $('#footer').html('<center>© 2010 Tscript 2.0 - hecho por <a href="http://www.taringa.net/perfil/gonx_666">gonx_666</a>.<br><br></center>');

 if(fn_chcolor == true){ $('#color_style').html('body{background:'+fn_chcolor_fondo+'!important}'+'input.button{background:'+fn_chcolor_tfondo+' !important}'+'#maincontainer{background-color:'+fn_chcolor_tfondo+'!important;}') } 
 	  
 $.S('#amc_c{background:#f7f7f7;border:1px solid #b4b4b4;padding:7px;-moz-border-radius:5px;}'+'#amc_s{padding-top:7px;text-align:right;height:20px}'+
 '#tema-puntos{float:right;border-left:1px solid #ccc;margin-left:7px;padding:0 5px;font-weight:bold;}'+
 'textarea.amc_t{-moz-border-radius:4px;background:#fff!important;width:748px;border:1px solid #ccc!important;-moz-appearance:none!important;min-height:100px}'+
 '#to_s,#to_l{float:left;padding-left:30px;height:16px}'+'#to_l{background:url(http://o2.t26.net/images/cargando.gif) no-repeat 5px 0;}'+'.lch{float:right;cursor:pointer;}'+
 '.lch .ltext{display:none;position:relative;top:-4px;left:-5px}'+'.lch .limg{display:inline-block!important;width:16px;height:16px;background:url(http://k03.kn3.net/06BC2F539.gif) 16px}'+
 '.lpch .limg{background:url(http://k03.kn3.net/06BC2F539.gif) 0!important}'); 
 
 $.S('#maincontainer{-moz-border-radius:12px;margin-bottom:15px!important;background-image:url(http://k02.kn3.net/3D9B66D45.png)!important;background-repeat: repeat-x}'+
	 '.box_cuerpo{border:0!important;}'+'input.button{border:0!important;-moz-border-radius:4px}'+'#tabbedPosts{border-left:0!important;margin:0!important}'+
	 '#menu,.menuTabs{-moz-border-radius:5px 5px 0 0}'+'#tabbedPosts{-moz-border-radius:4px 0 0 0}.opciones_usuario {-moz-border-radius:0 4px 0 0}'+
	 '#tabbedPosts a,.userInfoLogin{background-image:none!important;}'+'.menuTabs li.tabbed{background-image:none!important;border-right:1px solid #ccc;border-left:1px solid #fff}'+
	 '.op_info{background:#eee;border:1px solid #ccc;-moz-border-radius:5px;padding:7px;margin:0 0 5px 0}'+
	 '.menuTabs li.tabbed.here{background:-moz-linear-gradient(top, rgba(0, 0, 0, 0.07), rgba(0, 0, 0, 0.15))!important;}'+'.tabbed.here *{color:#555!important;text-shadow:1px 1px 0 #fff !important}'+
	 '.subMenuContent .subMenu{background:rgba(0, 0, 0, 0.1)!important;border:0!important;margin-left:0px!important;width:945px!important}'+'.logout{height:16px!important;}'+
	 '.subMenuContent .subMenu li{background:rgba(255, 255, 255, 0.15)!important;}'+'.subMenuContent .subMenu li.here{background:#fff!important;}'+
	 '#logo{height:69px!important;padding-top:14px;}'+'#banner form{width:515px!important;}'+'#banner .search-in{float:left!important;;position:relative;top:3px;margin-right:10px!important}'+
	 '.mini_ibuscador,.mini_bbuscador{-moz-appearance:none!important;background:rgba(255, 255, 255, 0.1)!important;color:#fff!important;}'+'.filterCat{height:30px;line-height:22px;margin-top:-6px}'+
	 '.filterCat span{color:#fff!important;}'+'.mini_ibuscador{-moz-border-radius:5px;border:1px solid rgba(255, 255, 255, 0.1)!important;height:20px!important;padding:0px 10px!important;}'+
	 '.mini_bbuscador{background:url(http://cdn.iconfinder.net/data/icons/stuttgart/16/search.png) no-repeat 5px 4px!important;height:20px!important;padding:0!important;width:20px!important}'+
	  
 // Opciones
	// General
	'xx{position:relative;top:-2px;left:3px;font-size:10px;color:#777;}'+'#op_box{cursor:pointer;position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:99}'+
	'#op_cont{font-family:tahoma;top:10%;left:50%;margin:-10px -400px;position:absolute;z-index:100;color:#555;font-size:12px;z-index:100;background:rgba(0, 0, 0, 0.5);padding:10px;'+
	'-moz-border-radius:7px}'+'#op_menu li{padding:7px;-moz-border-radius:5px 5px 0 0;display:inline-block;margin-right:5px;font-weight:bold;color:#fff;cursor:pointer;}'+
	'#op_menu li:hover{background:rgba(0, 0, 0, 0.4);}'+'#op_menu li.here{background:#f7f7f7;color:#555;cursor:default;}'+'.op_all {margin:0 0 7px 0!important;}'+
	'#op_menu li.op_close{float:right;width:16px;height:16px;padding:0;background:url('+img+'close.png);margin-top:3px;cursor:pointer;}'+
	'#op_content{background:#f7f7f7;-moz-border-radius:0 5px 5px 5px;padding:7px;width:786px;}'+'bx{display:none}'+'bx.here{display:block;}'+
	'.op_all li{color:#444 !important;line-height:24px;cursor:pointer;border-bottom:1px dotted #ccc;}'+'.op_all li input[type=checkbox]{position:relative;top:2px}'+
	'.op_all li tx{position:relative;left:2px}'+'.op_all li ul{background:#eee;border-bottom:1px solid #fff;border-top:1px dotted #ccc;}'+
	'.op_all li ul li{padding-left:20px!important;border:0!important}'+'#op_savediv,#op_saveicon{text-align:right;}'+	
	
	// Iconos
	'pp close{float:Right;padding:7px;background:url(http://i1007.photobucket.com/albums/af198/gonza_06/muerto.png);margin-top:-1px;cursor:pointer;}'+
	'#paquetes{background:#f7f7f7;padding:0 5px 5px 0;-moz-border-radius-bottomright:7px;width:312px;display:inline-block;float:left;margin:-6px 6px 6px -6px;'+
	'border-right:1px solid #ccc;border-bottom:1px solid #ccc;}'+'#paquetes table{width:317px;}'+'#paquetes td{padding:2px!important;text-align:center;}'+
	'#pre_paq{background:#fff;padding:5px;-moz-border-radius:7px;border:1px solid #ccc;margin-bottom:7px}#pre_paq img{margin:0 4px 2px 0;max-width:50px;max-height:50px;}'+
 
	// Chat
	'#all_Cc{margin-bottom:5px;border-bottom:1px dotted #ccc}'+'#pct{width:89px;-moz-border-radius:4px;margin:0 5px 0 0;}'+
	'#all_Cc carg{padding:37px;border-top:1px dotted #ccc;background:#fff url(http://o1.t26.net/images/cargando.gif) no-repeat center;display:block;}'+
	'#chat .actualizar{background:url(http://k03.kn3.net/06BC2F539.gif) 16px;display:inline-block!important;position:relative;top:3px;cursor:pointer;padding:8px}'+
	'#chat .accl{background-position:0;}'+'#mct{width:703px;-moz-border-radius:4px;margin:0 5px;}'+'#ect{padding:4px 5px!important;position:relative;top:-1px;}'+
 
 
 /*'xx{position:relative;top:-2px;left:3px;font-size:10px;color:#777;}'+'#op_box{cursor:pointer;position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:99}'+
 '#op_cont{font-family:tahoma;top:10%;left:50%;margin:-10px -400px;position:absolute;z-index:100;color:#555;font-size:12px;z-index:100;background:rgba(0, 0, 0, 0.5);padding:10px;'+
 '-moz-border-radius:7px}'+'#op_menu li{padding:7px;-moz-border-radius:5px 5px 0 0;display:inline-block;margin-right:5px;font-weight:bold;color:#fff;cursor:pointer;}'+
 '#op_menu li:hover{background:rgba(0, 0, 0, 0.4);}'+'#op_menu li.here{background:#f7f7f7;color:#555;cursor:default;}'+
 '#op_menu li.op_close{float:right;width:16px;height:16px;padding:0;background:url('+img+'close.png);margin-top:3px;cursor:pointer;}'+
 '#op_content{background:#f7f7f7;-moz-border-radius:0 5px 5px 5px;padding:7px;width:786px;}'+'bx{display:none}'+'bx.here{display:block;}'+'.op_all {margin:0 0 7px 0!important;}'+
 '.op_all li{color:#444 !important;line-height:24px;cursor:pointer;border-bottom:1px dotted #ccc;}'+'.op_all li input[type=checkbox]{position:relative;top:2px}'+
 '.op_all li tx{position:relative;left:2px}'+'.op_all li ul{background:#eee;border-bottom:1px solid #fff;border-top:1px dotted #ccc;}'+
 '.op_all li ul li{padding-left:20px!important;border:0!important}'+'#op_savediv,#op_saveicon{text-align:right;}'+
 '#op_savediv span,#op_saveicon span{float:left;position:relative;top:4px;left:10px;font-size:10px;color:#000;}'+
 'cp{display:inline-block;position:relative;top:3px;margin-left:7px;background:#eee;border:1px solid #ccc;-moz-border-radius:3px;height:16px;width:16px;}'+
 'cp span{display:inline-block;height:10px;width:10px;margin:3px;-moz-box-shadow:0 0 4px #aaa}'+'#op_saveicon{border-top:1px dotted #ccc;padding-top:6px;margin-top:4px}'+
 '.l_ico,#ico_options{background:#eee;border:1px solid #ccc;-moz-border-radius:4px;padding:4px;}'+'#ico_pi{padding-bottom:5px;border-bottom:1px solid #ddd;height:200px;}'+
 '.ico_int{display:inline-block;padding:2px 5px}'+'#ico_options input{-moz-border-radius:4px;margin:5px 0 1px 0;padding:3px 5px!important}'+'#ico_link{width:472px;margin-right:2px}'+
 '#ico_abre{width:100px;text-align:center;}'+'#ico_save{margin:5px 0 1px 6px!important;}'+'#iconos{margin:3px -3px 0 -3px!important}'+
 '.l_ico{float:left;margin:3px;height:50px;}'+'.l_ico img{max-height:50px;cursor:pointer;position:relative;float:left;}'+'.l_ico.selec{-moz-box-shadow:0 0 5px #ccc}'+
 '.add_ico{background:#eee url(http://www.sonoran.co.jp/iPhone/fcards/img/icon_add.png) no-repeat center center;cursor:pointer;}'+'.l_ico.dis img{opacity:0.3}'+
 '.l_ico span{display:none;float:right;position:relative;z-index:9;background:#eee;margin:-4px -4px 0 -32px;-moz-border-radius:0 0 0 4px;-moz-box-shadow:-2px 2px 4px rgba(255, 255, 255, 0.5)}'+
 '.l_ico:hover span{display:block;}'+'.l_ico span a{float:right;width:16px;height:16px;padding:0;cursor:pointer;}'+
 '.l_ico .ico_del{background:url('+img+'muerto.png);}'+*/
 
 // Selects
 '.ts_select{background:-moz-linear-gradient(top, #f7f7f7 , #e0e0e0);border:1px solid #ccc;-moz-border-radius:4px;height:25px;}'+'.ts_select select{display:none}'+
 '.ts_select cos{color:#777;text-shadow:1px 1px 0 #f7f7f7;display:block;padding-left:6px;line-height:25px;color:#555;cursor:pointer;}'+
 '.ts_select cos span{float:right;background:url('+img+'moreopts.png) no-repeat center;padding:0 10px;height:25px;}'+
 '.ts_select_m{display:none;position:relative;z-index:9999;background:#fff;border:1px solid #ccc;-moz-border-radius:0 0 4px 4px;top:-2px;padding:2px!important;'+
 'margin:0 -1px!important;overflow:auto;height:145px}'+'.ts_select_m li{padding:0 0 0 6px!important;cursor:pointer;}'+'.ts_select select{display:none}'+
 
 // Paginador
 '.ts_paginas{width:768px;border:1px solid #b4b4b4;background: url(http://o2.t26.net/images/bg_title_comment.gif);-moz-border-radius:4px;margin:5px 0 10px 0;height:26px}'+
 '.ts_paginas .before,.ts_paginas .next{padding:2px 0;display:inline-block;}'+'.ts_paginas .before a,.ts_paginas .next a{padding:4px 11px;display:inline-block;}'+
 '.ts_paginas .before a {border-right:1px solid #bbb}'+'.ts_paginas .next a {border-left:1px solid #bbb}'+'.ts_paginas ul{padding:3px;display:inline-block;width:594px;text-align:center;}'+
 '.ts_paginas ul li.numbers{display:inline-block;margin:0 2px;font-weight:bold;font-size:10px;}'+'.ts_paginas ul li.numbers a{padding:3px 5px;-moz-border-radius:3px;}'+
 '.ts_paginas ul li.numbers a:hover{background:rgba(0, 0, 0, 0.1)}'+'.ts_paginas ul li.numbers a.here{background:#555;color:#fff!important;}'+'.ts_paginas #ba_nw *{color:#999 !important;}'+  
  
 // BBCodes
 'ul#bbcode {display:inline-block;}'+
 'ul#bbcode li{float:left;height:22px;min-width:22px;margin:0!important}'+'ul#bbcode li img{margin:3px!important}'+
 'ul#bbcode li:hover{background:url(http://o1.t26.net/images/bbcodeshover.png);}'+
 'ul#bbcode li a{display:inline-block;height:16px;width:16px;margin:0 0 -2px 0!important}'+
 'ul#bbcode li.b_space{background:#ccc!important;max-width:1px;min-width:1px;margin:0 5px!important}'+

  // Quotes
 '.vmq_bar{background:#ddd;text-align:right;padding:5px;-moz-border-radius:4px;border:1px solid #bbb;margin-bottom:6px;color:#555;cursor:pointer;text-shadow:1px 1px 0 #fff}'+
 'blockquote blockquote{display:block!important;margin:5px 0!important}'+'.citacuerpo p{background:none!important}'+
 'blockquote .cita,#respuestas .cita{background:url(http://o2.t26.net/images/box_titlebg.gif)!important;padding:5px 0 6px 6px!important;}'+
 '#respuestas .citacuerpo,blockquote .citacuerpo{border:1px solid #ccc!important;-moz-border-radius:0 0 5px 5px !important;'+
 'background:#fff repeat-x url(http://o2.t26.net/images/bg-box.gif)0 -4px!important;padding:8px!important}'+
 
 // Flashs
 '.hide_swf{margin:0 -3px;padding:2px;background:rgba(0, 0, 0, 0.05);border:1px solid rgba(0, 0, 0, 0.1);-moz-border-radius:5px;display:inline-block;}'+
 '.hide_swf span{float:right;padding:4px 10px 5px 8px;font-size:10px;cursor:pointer;color:#555;text-shadow:1px 1px 0 #fff}')

 $.Quotes(); $.Flash('body');
 
 if(loc[1] == 'top' && loc[2] == 'usuarios'){
  $.S('.xtralarge{height:430px!important}');
 }
 
}

/*/ OPCIONES				/*/ $('<li><a title="Opciones del script"><img src="'+img+'options.png"></a></li>').prependTo(".userInfoLogin ul").click(function(){
 unsafeWindow.xx = function(){};
 if($('#op_box').size() == 0){
 $('body').after('<div id="op_box"></div>');
 $('body').after('<div id="op_cont"><ul id="op_menu"></ul><div id="op_content"></div></div>');
 $('#op_menu').html('<li class="here" 1="0">Opciones generales</li><li 1="1">Iconos</li><li 1="2">Chat</li><li 1="3">Acerca de</li><li 1="4">Publicidad</li><li class="op_close"></li>');
 $('#op_box,.op_close').click(function(){ $('#op_box,#op_cont').hide();  });
 function add_C(id){
  if(id == 0){ // Opciones
   $('#op_content').html('<bx class="here">'+
						 '<p class="op_info">En esta seccion podras modificar a gusto las funciones del script.<xx>(Nota: para notar los cambios refresque la pagina)</xx></p>'+
						 '<ul class="op_all">'+
						 '<li 1="fn_quotes" class="och"><input type="checkbox"'+(fn_quotes? 'checked':'')+'><tx>Ocultar quotes automaticamente</tx></li>'+
						 '<li 1="fn_swf" class="och"><input type="checkbox"'+(fn_swf? 'checked':'')+'><tx>Ocultar animaciones automaticamente</tx></li>'+
						 '<li 1="fn_bbcode" class="och"><input type="checkbox"'+(fn_bbcode? 'checked':'')+'><tx>Mejorar la barra de BBCodes</tx><ul>'+
							'<li 1="fn_bbcode_dcolor" class="ose" 2="'+fn_bbcode_dcolor+'"><tx>Color por defecto al comentar:<cp><span style="background:'+fn_bbcode_dcolor+';"></span></cp><xx> (Default: #000000)</xx></tx></li>'+
							'<li 1="fn_bbcode_negritas" class="och"><input type="checkbox"'+(fn_bbcode_negritas? 'checked':'')+'><tx>Agregar negritas automaticamente</tx></li>'+
						 '</ul></li>'+
						 '<li 1="fn_chcolor" class="och"><input type="checkbox"'+(fn_chcolor? 'checked':'')+'><tx>Cambiarle el color a Taringa</tx><ul>'+
							'<li 1="fn_chcolor_fondo" class="ose" 2="'+fn_chcolor_fondo+'"><tx>Color de fondo:<cp><span style="background:'+fn_chcolor_fondo+';"></span></cp><xx> (Default: #f4f4f4)</xx></tx></li>'+
							'<li 1="fn_chcolor_tfondo" class="ose" 2="'+fn_chcolor_tfondo+'"><tx>Color de taringa:<cp><span style="background:'+fn_chcolor_tfondo+';"></span></cp><xx> (Default: #004a95)</xx></tx></li>'+
						 '</ul></li>'+
						 '<li 1="fn_sh_iconos" class="och"><input type="checkbox"'+(fn_sh_iconos? 'checked':'')+'><tx>Agregar cuadro con iconos al comentar.</tx><ul>'+
							'<li 1="fn_iconos_dis" class="och"><input type="checkbox"'+(fn_iconos_dis? 'checked':'')+'><tx>Mantener oculto al cargar la pagina.</tx></li>'+
							'<li 1="fn_iconos_car" class="och"><input type="checkbox"'+(fn_iconos_car? 'checked':'')+'><tx>Agregar solo las categorias seleccionadas.</tx></li>'+
						 '</ul></li>'+
						 '</ul><div id="op_savediv"><span style="display:none">Opciones guardadas</span><input id="op_saveop" class="button" value="Guardar" type="button"> <input id="op_saveop2" class="button" value="Guardar y cerrar" type="button"></div></bx>');

   $('.op_all li cp').click(function(){
	var di = $(this).parent().parent().attr('1');
	var dc = $(this).parent().parent().attr('2');
	$.CP(dc,function(ndc){ $('li[1="'+di+'"]').attr('2',ndc).find('cp span').attr('style','background:'+ndc+';') })
   }); 
   
   $('#op_saveop,#op_saveop2').click(function(){
	$('.op_all li').each(function(){
	 var type = $(this).attr('class');
	 var name = $(this).attr('1');
	 var valu = ''; var valu2 = ''; var valu3 = '';
	 if(type == 'och'){ valu = $(this).find('input:first').attr("checked")?true:false; }
	 if(type == 'ose'){ valu = $(this).attr("2"); }
	 if(name == 'fn_chcolor'){ 
	  if(valu == true){
	   valu2 = $(this).find('li[1="fn_chcolor_fondo"]').attr('2')
	   valu3 = $(this).find('li[1="fn_chcolor_tfondo"]').attr('2')
	  } else{
	   valu2 = '#f4f4f4';
	   valu3 = '#004a95';	  
	  }
	  $('#color_style').html('body{background:'+valu2+'!important}'+'input.button{background:'+valu3+' !important}'+
		'#maincontainer{background-color:'+valu3+';');

	 }
	 if(name != null){ setTimeout(function(){ GM_setValue(name, valu); },0); }
	});
	$('#op_savediv span').fadeIn(300).delay(1000);
	if($(this).attr('id') == 'op_saveop2'){ $('#op_box,#op_cont').fadeTo(1300, 1, function(){ $(this).fadeOut(300, function(){ window.location = window.location; }); }) }
   })
  
  }
  if(id == 1){ // Iconos
   unsafeWindow.xx = function(ty, li, ad, ab, id){
	if(ty == 'act' || ty == 'add'){
	 var butval = 'Agregar'; if(ty == 'act'){ butval = 'Guardar'; }
	 var lia = li; if(li == ''){ lia = img+'noimagen.png' }
	 $('#ico_options').html('<div id="ico_pi" style="background:url('+lia+') no-repeat center center;"></div>'+
	 '<span class="ico_int">Link:</span><input type="text" id="ico_link" value="'+li+'">'+
	 '<span class="ico_int">Abreviatura:</span><input type="text" id="ico_abre" value="'+ab+'">'+
	 '<input type="button" id="ico_save" value="'+butval+'" class="button">');
	 $('#ico_link').focus();
	}
	$('#ico_save').click(function(){
	 var yy = $('#ico_link').val(); if(yy == ''){ $('#ico_link').focus(); return false; }
	 var tt = $('#ico_abre').val();
	 var uu = '[img='+yy+']';
	 var pp = '<li class="l_ico act" 0="'+yy+'" 1="'+uu+'" 2="'+tt+'"><span><a class="ico_del" onclick="ico_del(this)"></a></span><img src="'+yy+'" onclick="addico(this)"></li>';
	 if(ty == 'act'){ $('.car_iconos[1="'+id+'"] .l_ico.selec').replaceWith(pp); $('#op_saveicon span').html('Cambios guardados'); }
	 if(ty == 'add'){ $('.car_iconos[1="'+id+'"] .l_ico.add_ico').before(pp); $('#op_saveicon span').html('Nuevo icono agregado'); }
	 $('#op_saveicon span').fadeIn(300).delay(1000).fadeOut(300);
	})
	$('#ico_link').keyup(function(){
	 var zz = $(this).val();
	 if(zz == ''){ zz = img+'noimagen.png' }
	 $('#ico_pi').css('background','url('+zz+') no-repeat center center')
	})
   }
   unsafeWindow.add_car = function(){
	var car_name = prompt('Ingrese el nombre de la carpeta');
	if(car_name != ''){
	 var thcn = $('#iconos .car_iconos').size() + 1;
	 $('#iconos').append('<div class="car_iconos" 0="'+name+'" 1="'+thcn+'" 2="true"><h2><name>'+car_name+'</name><span><a class="car_del" onclick="car_del(this)"></a><a class="car_ren" onclick="car_ren(this)"><a class="car_save"></a></span></h2><ul class="thcat_icons"><li class="l_ico add add_ico" 0="" 1="" 2=""><img src="'+img+'transparent.png" width="50" onclick="addico(this)"></li></ul></div>');
	 $('#op_saveicon span').html('Carpeta creada exitosamente').fadeIn(300).delay(1000).fadeOut(300);
	}
   }   
   unsafeWindow.car_del = function(dd){ 
	if($('.car_iconos').size() == 1){ alert('Debe haber almenos una carpeta'); return false }
	if(confirm('¿Realmente deseas eliminar esta carpeta junto con todos sus iconos?')){ $(dd).parent().parent().parent().remove(); $('#op_saveicon span').html('Carpeta eliminada con exito').fadeIn(300).delay(1000).fadeOut(300); }
   };
   unsafeWindow.car_res = function(dd){ 
	var cl = $(dd).parent().parent().parent().attr('class')
	if(cl == 'car_iconos'){ $(dd).parent().parent().parent().attr('class','rofl'); }
	if(cl == 'rofl'){ $(dd).parent().parent().parent().attr('class','car_iconos'); }
   };
   unsafeWindow.car_ren = function(dd){ 
	$(dd).hide(); $(dd).next().show();
	var cn = $(dd).parent().parent().find('name').html();
	var sh = $(dd).parent().parent().parent().attr('2');
	if(sh == 'true'){ sh = ' checked'; } else{ sh = ''; }
	$(dd).parent().parent().find('name').html('<b>Nombre:</b> <input type="text" value="'+cn+'"> <b>Mostrar al comentar:</b> <input type="checkbox"'+sh+'>');
	$(dd).parent().parent().find('name input:first').focus();
	$(dd).next().one('click',function(){
	 $(this).hide(); $(dd).show();
	 var cn = $(dd).parent().parent().find('name input:first').val();
	 var sh = $(dd).parent().parent().find('name input:last').attr("checked")?true:false;
	 $(dd).parent().parent().parent().attr('0',cn).attr('2',sh).find('h2 name').html(cn);
	})
   };
   unsafeWindow.addico = function(dd){ 
	$('.l_ico.selec').removeClass('selec'); 
	var i_type = $(dd).parent().attr('class').substr(6,3);
	if(i_type == 'act'){ $(dd).parent().addClass('selec'); }
	var i_link = $(dd).parent().attr('0');
	var i_addf = $(dd).parent().attr('1');
	var i_abre = $(dd).parent().attr('2');
	var id = $(dd).parent().parent().parent().attr('1');
	unsafeWindow.xx(i_type, i_link, i_addf, i_abre, id);   
   };   
   unsafeWindow.ico_del = function(dd){ 
	if(confirm('¿Realmente deseas eliminar el icono?')){ $(dd).parent().parent().remove(); }
   };
   unsafeWindow.ico_move = function(dd){ 
	//if(confirm('¿Realmente deseas eliminar el icono?')){ $(dd).parent().parent().remove(); }
   };
   unsafeWindow.add_pack = function(id){
    if(id == null){ id = prompt('Ingrese el id del pack'); }
	else{ if(!confirm('¿Desea instalar el paquete?')){ return false; } }
	if(id != ''){
	 $('#op_saveicon span').html('Cargando pack...').fadeIn(300);
	 setTimeout(function(){GM_xmlhttpRequest({ method: "GET", url: 'http://gonza-06.zxq.net/T/ver.php?id='+id, onload: function(res) {
	  if(res.responseText == '|-|'){
	   $('#op_saveicon span').html('El paquete no existe').fadeIn(300).delay(1000).fadeOut(300);
	  } else{
	   var name = res.responseText.split('|-|')[0];
	   var iconos = res.responseText.split('|-|')[1];
	   iconos = iconos.substr(0,iconos.length - 3).split('|*|');
	   var thcn = $('#iconos .car_iconos').size() + 1;
	   var icons = ''; for(i = 0; i < iconos.length; i++){
		var ic = iconos[i].split(',');
		icons += '<li class="l_ico act" 0="'+ic[0]+'" 1="[img='+ic[0]+']" 2="'+ic[1]+'">'+
		'<span><a class="ico_del" onclick="ico_del(this)"></a><a class="ico_move" onclick="ico_move(this)"></a></span>'+'<img src="'+ic[0]+'" onclick="addico(this)" style=""></li>'
	   }
	   $('#iconos').append('<div class="car_iconos" 0="'+name+'" 1="'+thcn+'" 2="true"><h2><name>'+name+'</name><span>'+
	   '<a class="car_res" onclick="car_res(this)"></a><a class="car_del" onclick="car_del(this)"></a><a class="car_ren" onclick="car_ren(this)"><a class="car_save"></a></span></h2>'+
	   '<ul class="thcat_icons">'+icons+'<li class="l_ico add add_ico" 0="" 1="" 2=""><img src="'+img+'transparent.png" width="50" onclick="addico(this)"></li></ul></div>');
	   $('#op_saveicon span').html('Paquete agregado con exito').fadeIn(300).delay(1000).fadeOut(300);
	  }
	 }})},0);
	}	
   }
   unsafeWindow.search_pack = function(){
	$('#op_content pp').html('<p class="op_info">En esta seccion podras Buscar distitos paquetes de iconos y agregarlos al script. <close onclick="$(this).parent().parent().removeClass(\'here\').html(\'\')"></p><div id="pre_paq"><div id="paquetes"></div><div class="clearBoth"></div></div>').addClass('here');
	setTimeout(function(){GM_xmlhttpRequest({ method: "GET", url: 'http://gonza-06.zxq.net/T/index.php', onload: function(res) {
	 $('#op_content pp #paquetes').html(res.responseText)
	}})})
	unsafeWindow.show_pack = function(id){
	 $('#op_content pp #pre_paq img').not('#paquetes img').remove()
	 setTimeout(function(){GM_xmlhttpRequest({ method: "GET", url: 'http://gonza-06.zxq.net/T/mostrar.php?id='+id, onload: function(res) {
	  $('#op_content pp #pre_paq .clearBoth').before(res.responseText)
	 }})})
	}
   }   
   $('#op_content').append('<pp></pp><bx><p class="op_info">En esta seccion podras agregar todos los iconos que quieras, para tenerlos a la mano.</p><div id="ico_options"></div><div id="iconos"></div><div id="op_saveicon"><span style="display:none"></span><input class="button" value="Buscar pack" onClick="search_pack()" type="button"> <input class="button" value="Agregar pack" onClick="add_pack()" type="button"> <input class="button" value="Agregar carpeta" onClick="add_car()" type="button"> <input class="button" value="Guardar iconos" type="button"></div></bx>');
   var car_iconos = fn_iconos.substr(6, fn_iconos.length).split('[CAT*]');
   for(i = 0; i < car_iconos.length; i++){ // Dividir por categorias
    var all_icons = car_iconos[i].split(']|*|[');
	$('#iconos').append('<div class="car_iconos" 0="'+all_icons[0]+'" 1="'+i+'" 2="'+all_icons[1]+'"><h2><name>'+all_icons[0]+'</name><span><a class="car_res" onclick="car_res(this)"></a><a class="car_del" onclick="car_del(this)"></a><a class="car_ren" onclick="car_ren(this)"><a class="car_save"></a></span></h2></div>');
	$('.car_iconos[1="'+i+'"]').append('<ul class="thcat_icons"></ul>');
	if(all_icons[2] != ''){
	 var each_icon = all_icons[2].split('|*|');
	 for(h = 0; h < each_icon.length; h++){
	  var thico = each_icon[h].split(',');
	  var ty1 = ' act'; if(thico[1].substr(0,1) != '['){ ty1 = ' dis'}
	  $('.car_iconos[1="'+i+'"] ul').append('<li class="l_ico'+ty1+'" 0="'+thico[0]+'" 1="'+thico[1]+'" 2="'+thico[2]+'">'+
	  '<span><a class="ico_del" onclick="ico_del(this)"></a><a class="ico_move" onclick="ico_move(this)"></a></span>'+'<img src="'+thico[0]+'" onclick="addico(this)" style=""></li>');
	 }
	}
	$('.car_iconos[1="'+i+'"] ul').append('<li class="l_ico add add_ico" 0="" 1="" 2=""><img src="'+img+'transparent.png" width="50" onclick="addico(this)"></li>');   
   }
   $('#op_saveicon input:last').click(function(){ // Guardar iconos
	var qq = ''; $('#iconos .car_iconos').each(function(){
	 var car_name = $(this).attr('0'); var car_disp = $(this).attr('2');
	 qq += '[CAT*]'+car_name+']|*|['+car_disp+']|*|[';
	 $(this).find('li').not('.add_ico').each(function(e){
	  var i0 = $(this).attr('0'); var i1 = $(this).attr('1'); var i2 = $(this).attr('2');
	  if(e == 0){ qq += i0+','+i1+','+i2; }
	  else{ qq += '|*|'+i0+','+i1+','+i2; }
	 })
	})
	$('#op_saveicon span').html('Iconos guardados').fadeIn(300).delay(1000).fadeOut(300);
	setTimeout(function(){ GM_setValue('fn_iconos',qq); },0);
   })
  }
  if(id == 2){ // Chat
   $('#op_content').append('<bx id="chat"></bx>');
   if(user == null){
	$("#chat").html('<div id="error-chat"><span>Error :</span> Debes conectarte para poder ver el chat.</div>')
   } else{
	unsafeWindow.load_cp = function(page){
	 $('#all_Cc').attr('1',page);
	 $('#chat .actualizar').addClass('accl');
	 setTimeout(function(){GM_xmlhttpRequest({
	  method:'GET',
	  url:'http://gonza-06.zxq.net/C/index2.php?p='+page+'&user='+user,
	  onload: function(a){
	   var xx = a.responseText.substr(0,1);
	   if(xx == 1){ if($('#pct').size() == 0){ $("#chat #ect").before('<input id="pct" type="text"><style id="pcts">#mct{width:603px!important}</style>');} }	   
	   if(xx == 2){ $("#chat").html('<div id="error-chat"><span>Error :</span> Baneado indefinidamente del chat, <b>causa:</b> '+a.responseText.substr(1,a.responseText.length-1)+'.</div>'); return false; }	   
	   $('#all_Cc').html(a.responseText.substr(1,a.responseText.length-1));
	   if(xx == 0){ $('#pct,#pcts,ip').remove(); }	   
	   $('#chat .actualizar').removeClass('accl');
	  }
	 });},0)
	}; unsafeWindow.load_cp(1);
	$('#chat').html('<div id="all_Cc" 1="1"></div><span class="actualizar" onclick="load_cp(1)"></span>'+
	'<input type="text" maxlength="300" autocomplete="off" size="9" value="" id="mct">'+
	'<input id="ect" type="submit" value="Enviar" class="button">');
	function send_cm(){
	 if($('#mct').val() == ''){
	  alert('Escribe un mensaje'); $('#mct').focus();
	 } else{
	  $('#chat .actualizar').addClass('accl');
	  var key = $('#pct').val();
	  if($('#pct').val() == null || $('#pct').val() == ''){ key = 1234; }
	  setTimeout(function(){GM_xmlhttpRequest({
	   method:'GET',
	   url:'http://gonza-06.zxq.net/C/addm.php?nombre='+user+'&key='+key+'&mensaje='+encodeURIComponent($('#mct').val()),
	   onload: function(a){
		$('#footer').html(a.responseText)
		$('#mct').val('').focus();
		unsafeWindow.load_cp(1);
	   }
	  });},0);
	 }
	}
	$('#ect').click(function(){ send_cm(); });
	$('#mct').keypress(function(e){ if(e.which == 13){ send_cm(); } });
   }
  }
  if(id == 3){ // Acerca de
   $('#op_content').append('<bx>esta es la publicidad? xD</bx>');
  }
  if(id == 4){ // Publicidad
   $('#op_content').append('<bx><center>'+
			'<a href="'+dom+'comunidades/t-tutos/" target="_blank"><img class="imagen" border="0" src="http://k01.kn3.net/742DC7B8A.png"></a>'+
			'<a href="'+dom+'comunidades/t-scripts/" target="_blank"><img class="imagen" border="0" src="http://k03.kn3.net/1CE60948F.png"></a>'+
			'<a href="'+dom+'comunidades/ideasparamejorataringa/" target="_blank"><img class="imagen" border="0" src="http://k04.kn3.net/B63EBAC22.png"></a>'+
			'</center></bx>');
  }
 };
 $('#op_menu li').not('.op_close').each(function(){
  var id = $(this).attr('1'); add_C(id);
  $(this).click(function(){
   var id = $(this).attr('1');
   $('#op_menu li.here').removeClass('here');
   $(this).addClass('here');
   $('bx.here,pp.here').removeClass('here');
   $('bx:eq('+id+')').addClass('here');
   $('li.l_ico').each(function(){ ht = $(this).find('img').height(); if(ht < 50){ ht = 25 - ht / 2; $(this).find('img').attr('style','top:'+ht+'px;'); } else{ $(this).find('img').attr('style','top:0px;'); } })
   unsafeWindow.xx('add','','','',1);
   if($('bx:eq('+id+')').attr('id') == 'chat'){ if($('#all_Cc').attr('1') == '1'){
	var caca = setInterval(function(){unsafeWindow.load_cp(1);},10000);
   }} else{
	clearInterval(caca);
   }
  })
 });
 } else{
  $('#op_box,#op_cont').show(); 
 } 
});

/*/ PRINCIPAL				/*/ if(loc[1] == '' || loc[1] == 'index.php' || lc == 'categorias'){
 $('.climaHome,.birthHome').prependTo('#centro');
 $('.new-search,#estadisticasBox,#centro .space:first').remove();
 $('#juegosBox .box_title:first,#juegosBox .box_cuerpo:first,#juegosBox .space:first').wrap('<div id="juegos"></div>');
 $('#derecha').html('')
 
 
 /*function fix_stickys(){
  $('#izquierda .categoriaPost,#derecha .categoriaPost').each(function(){
   if($(this).attr('class').split(' ')[1] == 'sticky'){
	var thisc = $(this).find('a').attr('class').split(' ')[1];
	$(this).find('a').removeAttr('class');
	$(this).attr('class','categoriaPost tsti '+thisc);
   } else{
	$(this).addClass('nosti');
   }
  })
 }; 
 var page_num = dir.split('pagina')[1]; if(page_num==null){page_num = 0}
 var categori = loc[2]; if(categori==null){categori = -1}
 $('#izquierda,#derecha').html('<div class="box_title"><div class="box_txt">Últimos posts</div><div class="box_rss" id="rc"><a><img src="'+img+'bbcode/refresh.png"></a></div></div>'+
 '<div class="box_cuerpo pp_charger"><span class="bcpt"><a class="cp_b">&laquo; Anterior </a><a class="cp_n">Siguiente &raquo;</a></span><ul><center id="loadp"><img src="http://i.t.net.ar/images/cargando.gif"></center></ul><span class="bcpb"><a class="cp_b">&laquo; Anterior </a><a class="cp_n">Siguiente &raquo;</a></span></div>');

 
 $('#izquierda .box_cuerpo ul').load(dom+'posts/'+categori+'/pagina'+page_num+ ' #izquierda .box_cuerpo ul li',function(){ fix_stickys(); })
 $('#derecha .box_cuerpo ul').html(pp2)*/
 
 
 
 $.S('#cuerpocontainer{padding:5px!important;width:950px !important;}'+'#izquierda,#derecha{padding:0!important;width:330px !important;}'+
 '#centro{padding:0 5px!important;width:280px !important;}'+'.climaHome,.birthHome{margin:0 0 6px 0 !important;}');


}

/*/ POSTS					/*/ if(lc == 'post'){
 $('.post-relacionados li:odd').attr('style','float:right;margin-top:-22px;');
 if($('.post-relacionados li').length == 0){ $('.post-relacionados').parent().remove() }
 $('#post-comentarios div:first,#google_ads_div_tar_p_120_noticias').not('.comentarios-title,#comentarios').remove();
 var tp = $('.numbers .here').html() * 1; if(tp == 0){ tp = 1 }
 function grn(xx){ if(xx == '' || xx == null){ return 0; } else{ xx = xx.replace(/\./,''); var xx1 = xx.length - 12; xx = xx.substr(0, xx1); return xx; } }
 function fix_paginator(rn,tp){
  $('.paginadorCom,.lch').remove();
  $('.titulorespuestas').html('<b>'+rn+'</b> Comentarios').before('<div class="lch" 1="'+tp+'"><span class="ltext">Cargando</span><span class="limg"></span></div>');
  rn = Math.ceil(rn / 100); var tp2 = tp - 1; tp3 = tp*1 + 1; if(tp2 == 0){ tp2 = 'no-w" id="ba_nw' }; if(tp3 > rn){ tp3 = 'no-w" id="ba_nw' };
  $('#bbcode').after('<div class="lch" 1="'+tp+'"><span class="ltext">Cargando</span><span class="limg"></span></div>');
  
  if(rn > 1){ if($('.ts_paginas').size() == 0){ $('#comentarios').before('<div class="ts_paginas"></div>').after('<div class="ts_paginas"></div>') } }
  $('.ts_paginas:eq(0),.ts_paginas:eq(1)').html('<div class="before" 1="'+tp2+'"><a><b>&laquo; Anterior</b></a></div><ul></ul><div class="next" style="text-align: right;" 1="'+tp3+'"><a><b>Siguiente &raquo;</b></a></div>');
  for (var i = 1; i < rn+1; i++) { $('.ts_paginas:eq(0) ul,.ts_paginas:eq(1) ul').append('<li class="numbers"><a href="'+dom+'comunidades//'+loc[3].split('.')[0]+'.'+i+'/'+loc[4]+'" 1="'+i+'">'+i+'</a></li>') }
  $('.numbers a[1="'+tp+'"]').addClass('here');   
  if(rn >  10){
   h1 = tp*1 - 6;	  h2 = tp*1 + 4;	  $('.ts_paginas:eq(0) .numbers:lt('+h1+'), .ts_paginas:eq(0) .numbers:gt('+h2+')').remove();	  $('.ts_paginas:eq(1) .numbers:lt('+h1+'), .ts_paginas:eq(1) .numbers:gt('+h2+')').remove();
   if(h1 > 0){ $('.ts_paginas:eq(0) ul li:first,.ts_paginas:eq(1) ul li:first').replaceWith('<li class="numbers"><a href="comunidades//'+loc[3].split('.')[0]+'.1/'+loc[4]+'" 1="1">1</a></li> ... ')}
   if(h2 < rn){ $('.ts_paginas:eq(0) ul li:last, .ts_paginas:eq(1) ul li:last ').replaceWith(' ... <li class="numbers"><a href="comunidades//'+loc[3].split('.')[0]+'.'+rn+'/'+loc[4]+'" 1="'+rn+'">'+rn+'</a></li>') }
  } 
 };
 $('.miComentario').replaceWith('<div id="addmc" style="width:768px;margin-left:67px;"><div id="amc_c"><ul id="bbcode"></ul><div id="tema-puntos"></div><textarea id="body_respu" class="amc_t"></textarea><div id="ot_func"></div></div>'+
 '<div id="amc_s"><span id="to_l" style="display:none">Enviando respuesta.</span><span id="to_s" style="display:none">Debes esperar <b>0</b> segundos antes de poder comentar nuevamente.</span><input type="button" value="Enviar" class="button" 1="'+tp+'"></div></div>');
 $(document).ready(function(){
  $('#body_respu').replaceWith('<textarea id="body_comm" class="amc_t" style="width:746px;"></textarea>');
  $.ABB('#bbcode','body_comm');
  $('#bbcode').attr('style','margin:-2px 0 4px 0!important')
 }) 
 fix_paginator(grn($('.titulorespuestas').html()),tp);  
 $.S('#post-comentarios{width:837px!important;}'+'.comment-box{-moz-border-radius:0 4px 4px 4px;width:768px!important;}'+ '.comment-content{-moz-border-radius:0 0 3px 3px}'+
 '.comment-info{-moz-border-radius:0 3px 0 0}'+'.ts_paginas{margin-left:67px;}')
}

/*/ AGREGAR POST			/*/ if(loc[1] == 'agregar' || loc[1] == 'edicion.form.php'){
  $.S('.container250{width:186px !important}'+'#post_agregar{padding:0px!important;margin-left:10px;width:744px !important}'+
	   '#post_agregar .box_cuerpo{width:728px !important}'+'.p_name1{padding:5px 4px 4px 0;font-weight:bold;color:#444;text-shadow:1px 1px 0 #fff}'+
	   '.m_anuncio1{padding:4px 9px 4px 8px;font-weight:bold;color:#777;background:#ffc;-moz-border-radius:4px;border:1px solid #ccc;float:right;'+
	   'cursor:default;text-align:center;}'+'.m_anuncio2{font-weight:bold;color:#a00;float:left;cursor:default;}'+'#p_titulo{width:542px;-moz-border-radius:4px}'+
	   '#p_post{min-height:410px;width:722px;-moz-border-radius:4px;margin-top:6px}'+'#p_tags{width:487px;-moz-border-radius:4px;}'+
	   '#m_titulo{width:113px;}'+'#m_tags{width:173px;}'+'#tacl .milc{color:#090;}'+'#tacl .mxlc{color:#a00;}'+'#p_otros{text-align:left!important}'+
	   '#tacl{margin-bottom:8px;border-bottom:1px dotted #bbb;padding:5px;text-align:right;font-weight:bold;color:#777;text-shadow:1px 1px 0 #fff;}'+	   
	   '#p_botones,#p_otros{margin-top:8px!important;border-top:1px dotted #bbb;padding-top:8px!important;text-align:right}'+
	   '#p_otros li{display:inline-block;padding:0px 7px 4px 3px;border-right:1px solid #bbb;cursor:pointer;}'+'#p_otros li input{position:relative;top:3px}'+'#p_botones input{margin-left:6px}'+	
	   '#p_botones span{float:left;margin:1px 0 0 10px;font-size:10px}'+'#p_botones img{float:left;margin:-1px 7px 0 -10px;font-size:10px}'+
	   '#ap_cat{height:324px;width:170px;-moz-appearance:none!important;border:1px solid #fff!important;outline:1px solid #ccc;background:#eee!important;'+
	   'padding:3px 3px 0 3px;}'+'#ap_cat option{margin-bottom:3px;font-size:10px;padding:0 6px 6px 6px;-moz-border-radius:3px;border:1px solid #eee!important}'+
	   '.op_icon{display:inline-block;height:16px;overflow:hidden;position:relative;top:4px;left:-2px;margin-right:5px}'+'.op_icon img{position:relative;}'+
	   '#p_preview{margin-bottom:10px;text-align:right;}'+'#p_preview .post-title{-moz-border-radius:5px 5px 0 0;}'+
	   '#p_preview .post-contenido{background:#e7e7e7;margin:-1px 0 10px 0;-moz-border-radius:0 0 6px 6px;text-align:left;border:0px solid #cfcfcf;}'+
	   '#bbcode{display:block!important;margin-top:5px!important;border-top:1px dotted #ccc;padding-top:5px!important;}'+
	   '#borradores .cargando{background:url(http://o2.t26.net/images/cargando.gif) no-repeat center;padding:10px}'+'#borradores li a{margin:7px 0px}'+
	   '#borradores li{padding:0 7px;cursor:pointer;border-bottom:1px dotted #ccc;border-top:1px solid #fff;max-height:24px;line-height:24px;overflow:hidden;}')

  var borid = loc[2]; if(borid == null){ borid = ''; }
  var p_title = $('input[name="titulo"]').val();
  var p_mensaje = $('#markItUp').val();
  var p_tags = $('input[name="tags"]').val();
  var p_cat = $('select.agregar').val();
  var p_suo = $('input[name="privado"]').attr('checked');
  var p_noc = $('input[name="sin_comentarios"]').attr('checked');
  var svbv3 = '';  var svbv = ''; if(loc[1] == 'agregar'){ svbv = 'Enviar post'; svbv3 = 'Agregar post'; } else{ svbv = 'Guardar cambios'; svbv3 = 'Editar post'; }
  var svbv2 = ''; if(loc[2] == '' || loc[2] == null){ svbv2 = 'Guardar en borradores'; } else{ svbv2 = 'Guardar cambios'; }
  $('#cuerpocontainer').html('<div class="container250" style="display:inline-block;float:left;"><div class="box_title"><div class="box_txt"></div></div><div class="box_cuerpo"></div></div><div id="post_agregar" style="display:inline-block" 1="'+borid+'"><div class="box_title"><div class="box_txt">'+svbv3+'</div></div><div class="box_cuerpo"></div></div><div style="clear:both"></div>')
  $('.container250 .box_txt').html('Elegir una categoría')
  $('.container250 .box_cuerpo').html('<select id="ap_cat" size="34"><option value="7">Animaciones</option><option value="18">Apuntes y Monografías</option><option value="4">Arte</option><option value="25">Autos y Motos</option><option value="17">Celulares</option><option value="33">Ciencia y Educación</option><option value="19">Comics e Historietas</option><option value="16">Deportes</option><option value="9">Downloads</option><option value="23">E-books y Tutoriales</option><option value="34">Ecología</option><option value="29">Economía y Negocios</option><option value="24">Femme</option><option value="35">Hazlo tu mismo</option><option value="26">Humor</option><option value="1">Imágenes</option><option value="12">Info</option><option value="0">Juegos</option><option value="2">Links</option><option value="15">Linux y GNU</option><option value="22">Mac</option><option value="32">Manga y Anime</option><option value="30">Mascotas</option><option value="8">Música</option><option value="10">Noticias</option><option value="5">Off-topic</option><option value="21">Recetas y Cocina</option><option value="27">Salud y Bienestar</option><option value="20">Solidaridad</option><option value="28">Taringa!</option><option value="31">Turismo</option><option value="13">TV, Peliculas y series</option><option value="3">Videos On-line</option></select>')
  $('#post_agregar .box_cuerpo').html('<span class="p_name1">Título:</span> <input id="p_titulo" maxlength="48" value="'+p_title+'">'+
									  '<span id="m_titulo" class="m_anuncio1" style="display:none"></span>'+
									  '<ul id="bbcode"></ul>' + '<textarea id="p_post">'+p_mensaje+'</textarea>'+
									  '<div id="tacl"><span id="m_post" class="m_anuncio2" style="display:none">El post esta vacio</span><span id="pcc"></span></div>'+
									  
									  '<span class="p_name1">Tags:</span> <input id="p_tags" value="'+p_tags+'">'+
									  '<span id="m_tags" class="m_anuncio1" style="display:none"></span>'+
									  
									  '<ul id="p_otros">'+
									  '<li style="display:none"><input type="checkbox" id="facebook"> Compartir en Facebook</li>'+
									  '<li><input type="checkbox" id="privado"'+(p_suo? 'checked':'')+'><span> Solo usuarios registrados</span></li>'+
									  '<li><input type="checkbox" id="sin_comentarios"'+(p_noc? 'checked':'')+'><span> No permitir comentarios</span></li>'+
									  '</ul>'+
									  
									  '<div id="p_botones"><span></span><input id="p_enviar" class="button" type="button" value="'+svbv+'">'+
									  '<input id="p_prev" class="button" type="button" value="Previsualizar">'+
									  '<input id="p_save" class="button" type="button" value="'+svbv2+'"></div>');
									  $('#ap_cat').val(p_cat)
  $('#mensaje-top').remove();
  var p_estado1 = 'bien';
  var p_estado2 = 'bien';
  var p_estado3 = 'bien';
  $(window).bind('beforeunload', function() { if($('#p_post').val() != p_mensaje){ return "Este post no fue publicado y se perderá."; } });
  
  $('.container250').append('<br class="space"><div id="borr_content"><div class="box_title"><div class="box_txt">Borradores</div></div><div class="box_cuerpo"><ul id="borradores"><li class="cargando"></li></ul></div></div>')
  unsafeWindow.eliminar_bor = function(id){
   if(confirm('¿Desea eliminar el borrador?')){
	$('#p_botones span').html('<img src="http://o2.t26.net/images/cargando.gif">Eliminando borrador').fadeIn(300);
	$.ajax({
	 type: 'POST',
	 url: '/borradores-eliminar.php',
	 data: 'borrador_id=' + id,
	 success: function(h){
	  $('#p_botones span').html('Borrador eliminado con exito').delay(1000).fadeOut(300);
	  $('#borradores li[1="'+id+'"]').remove();
	 }
	})
   }
  };
  $.ajax({
   type: "GET",
   url: dom+"mis-borradores/",
   success: function(ss){
	var ff = ss.split('borradores_data = [{')[1].split('}];')[0].split('},{');
	$('#borradores').html('');
	for(i=0; i < ff.length; i++){
	 var gg = ff[i].split(',');
	 var id = gg[0].substr(6,gg[0].length-7);
	 var titulo = gg[1].substr(10,gg[1].length-11);	 
	 var causa = gg[5].substr(9,gg[5].length-10);
	 if(causa == ''){
	  $('#borradores').append('<li 1="'+id+'"><a style="float: right;" onclick="eliminar_bor('+id+');"><img src="http://o2.t26.net/images/borrar.png" alt="eliminar" title="Eliminar Borrador"></a>'+titulo+'</li>');
	 }
	}
	$('#borradores li').each(function(){ $(this).click(function(){
	 if($('#p_post').val() != p_mensaje){if(!confirm('¿Realmente desea cargar el borrador? el post actual se perdera')){ return false; }}
	 $('#p_botones span').html('<img src="http://o2.t26.net/images/cargando.gif">Cargando borrador').fadeIn(300);
	 borid = $(this).attr('1')
	 $.get(dom+'agregar/'+$(this).attr('1'), function(e){
	  var titulo = $(e).find('.text-inp[name="titulo"]').val();
	  var tags = $(e).find('.text-inp[name="tags"]').val();
	  var post = $(e).find('#markItUp').val();
	  var cat = $(e).find('select.agregar').val();
	  var suo = $(e).find('input[name="privado"]').attr('checked');
	  var noc = $(e).find('input[name="sin_comentarios"]').attr('checked');
	  
	  $('#p_titulo').val(titulo); $('#p_post').val(post); $('#p_tags').val(tags); $('#ap_cat').val(cat);
	  p_title = titulo; p_mensaje = post; p_tags = tags; p_cat = cat; 	  
	  $('#p_botones span').html('Borrador cargado con exito').delay(1000).fadeOut(300);
	 })
	})})
	

   }
 });
  
  $('#p_otros li span').each(function(){ $(this).click(function(){
   var opcheck = $(this).parent().find('input').attr('checked')
   if(opcheck == false){
    $(this).parent().find('input').attr('checked',true)   
   }
   if(opcheck == true){
    $(this).parent().find('input').attr('checked',false)   
   }
  })})
  
  // Funciones
  function check_may(e, name, por){ // Checkear las mayusculas del titulo
   if(e == 1){
	var total_le = $(name).val().length;
	var total_ma = total_le - $(name).val().replace(/([A-Z])+/g, '').length;
	var total_mi = total_le - $(name).val().replace(/([a-z])+/g, '').length;
	var porcentaje = 100 / (total_ma + total_mi) * total_ma;
	if(porcentaje > por){ $('#m_titulo').html('Muchas mayúsculas'); $('#m_titulo').fadeIn(300); p_estado1 = 'mal'; }
	else{ $('#m_titulo').fadeOut(300); p_estado1 = 'bien'; }
   }
   if(e == 2){
	if($('#p_titulo').val() == ''){ $('#m_titulo').html('Ingrese un titulo'); $('#m_titulo').fadeIn(300); p_estado1 = 'mal'; }
	else{ $('#m_titulo').fadeOut(300); p_estado1 = 'bien'; }
   }  
  }; check_may(1, '#p_titulo', 80);
  function check_car(e){			// Checkear caracteres del post
   if(e == 1){
	var caraacteres_maximos = 63206
	var teval = caraacteres_maximos - $('#p_post').val().length;
	if(teval > -1){ $('#pcc').html('Caracteres restantes <span class="milc">'+teval+'</span>'); p_estado2 = 'bien';}
	else{ teval = teval * -1; $('#pcc').html('Caracteres excedidos <span class="mxlc">'+teval+'</span>'); p_estado2 = 'mal';}
   }
   if(e == 2){
	if($('#p_post').val() == ''){ $('#m_post').html('El post esta vacio').fadeIn(300); p_estado2 = 'mal'; }
	else{ $('#m_post').fadeOut(300); p_estado2 = 'bien'; }
   }
  } check_car(1);
  function check_tags(e){			// Checkear tags del post
   if(e == 1){
	var tags = $('#p_tags').val().split(',')
	if($('#p_tags').val() == ''){} else{
	 if(tags.length < 4){ $('#m_tags').html('Tienen que ser 4 tags distintos'); $('#m_tags').fadeIn(300); p_estado3 = 'mal'; }
	 else{
	  if(tags[0] == tags[1] || tags[0] == tags[2] || tags[0] == tags[3] || tags[1] == tags[2] || tags[1] == tags[3] || tags[2] == tags[3]){
	   $('#m_tags').html('Tienen que ser 4 tags distintos'); $('#m_tags').fadeIn(300); p_estado3 = 'mal';
	  }
	  else{
	   $('#m_tags').fadeOut(300); p_estado3 = 'bien';
	  }
	 }
	}
   }
   if(e == 2){
	if($('#p_tags').val() == ''){ $('#m_tags').html('Ingrese los Tags'); $('#m_tags').fadeIn(300); p_estado3 = 'mal'; }
	else{ $('#m_tags').fadeOut(300); p_estado3 = 'bien'; }
   }
  } check_tags(1);
  $('#ap_cat option').each(function(){
   var icon_top;
   var valu = $(this).attr('value');
   switch(valu){
	case '7':	icon_top = '-177'; break;	case '18':	icon_top = '-617'; break;
	case '4':	icon_top = '-133'; break;	case '25':	icon_top = '-746'; break;
	case '17':	icon_top = '-597'; break;	case '33':	icon_top = '-961'; break;
	case '19':	icon_top = '-639'; break;	case '16':	icon_top = '-573'; break;
	case '9':	icon_top = '-220'; break;	case '23':	icon_top = '-792'; break;
	case '34':	icon_top = '-462'; break;	case '29':	icon_top = '-849'; break;
	case '24':	icon_top = '-728'; break;	case '35':	icon_top = '-938'; break;
	case '26':	icon_top = '-769'; break;	case '1':	icon_top = '-65';  break;
	case '12':	icon_top = '-286'; break;	case '0':	icon_top = '-45';  break;
	case '2':	icon_top = '-88';  break;	case '15':	icon_top = '-551'; break;
	case '22':	icon_top = '-706'; break;	case '32':	icon_top = '-914'; break;
	case '30':	icon_top = '-869'; break;	case '8':	icon_top = '-199'; break;
	case '10':	icon_top = '-243'; break;	case '5':	icon_top = '-154'; break;
	case '21':	icon_top = '-681'; break;	case '27':	icon_top = '-813'; break;
	case '20':	icon_top = '-662'; break;	case '28':	icon_top = '-440'; break;
	case '31':	icon_top = '-892'; break;	case '13':	icon_top = '-309'; break;
	case '3':	icon_top = '-111'; break;
   }
   $(this).prepend('<span class="op_icon"><img src="http://o1.t26.net/images/big1v12.png" style="top:'+icon_top+'px"></span>')
  })
  $.ABB('#bbcode','p_post');
  var check_tm; $('#p_titulo').focus(function(){ check_tm = setInterval(function(){ check_may(1, '#p_titulo', 80) }, 50) }).blur(function(){ clearInterval(check_tm) });
  var check_ca; $('#p_post').focus(function()  { $('#m_post').fadeOut(300); var check_ca = setInterval(function(){ check_car(1) }, 50) }).blur(function() { clearInterval(check_ca) })
  var check_ta; $('#p_tags').focus(function()  { $('#m_tags').fadeOut(300); check_ta = setInterval(function(){ check_tags(1) }, 50) }).blur(function() { clearInterval(check_ta) })
  $('#p_enviar').click(function(){
   check_may(1, '#p_titulo', 80); if(p_estado1 == 'bien'){ check_may(2); }
   check_tags(2); if(p_estado3 == 'bien'){ check_tags(1); }
   check_car(1); if(p_estado2 == 'bien'){ check_car(2); }
   if(p_estado1 == 'bien' && p_estado2 == 'bien' && p_estado3 == 'bien' && $('#ap_cat').val() != null){
    var p_page = ''; var p_params = '';	var ask = '';
	if(loc[1] == 'agregar'){			ask = '¿Deseas enviar el post?'; p_page = dom+'agregar.php'; }
	if(loc[1] == 'edicion.form.php'){	ask = '¿Deseas guardar los cambios del post?'; p_page = dom+'edicion.php'; p_params = 'id='+dir.split('id=')[1]+'&'; }
	var p_pri = $('#privado').attr('checked')? '&privado=1':'';
	var p_sic = $('#sin_comentarios').attr('checked')? '&sin_comentarios=1':'';
	p_params += 'key='+key+'&titulo='+encodeURIComponent($('#p_titulo').val())+'&cuerpo='+encodeURIComponent($('#p_post').val())+'&tags='+encodeURIComponent($('#p_tags').val())+'&categoria='+$('#ap_cat').val()+p_pri+p_sic+'';
	if(confirm(ask)){
	 $('#p_botones span').html('<img src="http://o2.t26.net/images/cargando.gif">Guardando cambios').fadeIn(300);
	 $.ajax({	 
	  type: 'POST',
	  url: p_page,
	  data: p_params,
	  success: function(c){
	   var m1 = $(c).find('#cuerpocontainer .container400 .box_cuerpo').html().substr(10, 108);
	   var a1 = 'El post ha sido modificado satisfactoriamente! IMPORTANTE: Los cambios serán aplicados en menos de 1 minuto.';
	   var m2 = $(c).find('#cuerpocontainer .container400 .box_cuerpo').html().substr(10, (11+$('#p_titulo').val().length+17));
	   var a2 = 'El post <b>'+$('#p_titulo').val()+'</b> fue agregado';
	   if(m1 == a1){
		$('#p_botones span').html('Los cambios fueron guardados correctamente - <a href="posts/'+dir.split('id=')[1]+'/">Entrar</a>.');
	   }
	   else if(m2 == a2){
		var l2 = $(c).find('#cuerpocontainer .container400 .box_cuerpo input').attr('onclick').toString();
		l2 = l2.substr(47,l2.length-51);
		$('#p_botones span').html('Post enviado con exito - <a href="'+l2+'">Entrar</a>.');
	   }
	   else{
		$('#p_botones span').html('Se produjo un error la guardar los cambios').delay(1000).fadeOut(300);
	   }
	  }
	 })
	}   
   }
  });  
  $('#post_agregar').prepend('<div id="p_preview" style="display:none">'+
  '<div class="box_title"><div class="box_txt"></div></div>'+
  '<div class="post-contenido"><span property="dc:content"></span></div>'+
  '<input id="p_close_preview" class="button" type="button" value="Cerrar previsualizaci&oacute;n"></div>')
  $('#p_close_preview').click(function(){
   $('#p_preview').slideUp(300,function(){
	$('#p_preview .post-title h1').html('');
	$('#p_preview .post-contenido span:first').html('');   
   });   
  })
  $('#p_prev').click(function(){
   check_may(1, '#p_titulo', 80); if(p_estado1 == 'bien'){ check_may(2); }
   check_tags(2); if(p_estado3 == 'bien'){ check_tags(1); }
   check_car(1); if(p_estado2 == 'bien'){ check_car(2); }
   if(p_estado2 == 'bien'){
	$('#p_preview .box_title .box_txt').html($('#p_titulo').val());
	$.get(dom+'preview.php?titulo=' + encodeURIComponent($('#p_titulo').val()) + '&cuerpo=' + encodeURIComponent($('#p_post').val()),function(pre){
	 $('#p_preview .post-contenido span:first').html(pre).parent().parent().slideDown(300);
	})
   }
  });
  $('#p_save').click(function(){
   if($('#p_titulo').val() != ''){
	var p_pri = $('#privado').attr('checked')? '&privado=1':'';
	var p_sic = $('#sin_comentarios').attr('checked')? '&sin_comentarios=1':'';
	p_params += 'key='+key+'&titulo='+encodeURIComponent($('#p_titulo').val())+'&cuerpo='+encodeURIComponent($('#p_post').val())+'&tags='+encodeURIComponent($('#p_tags').val())+'&categoria='+$('#ap_cat').val()+p_pri+p_sic+'';
		
	if($('#post_agregar').attr('1') != ''){
	
	
	}
	
	if(confirm('¿Deseas guardar el post en borradores?')){
	 alert('enviado')
	}   
   }
  })
 } 

/*/ PERFILES				/*/ if(loc[1] == 'perfil'){
  $.S('.edit_bottons{display:inline-block;float:right;}'+'.edit_bottons a{margin:-3px -3px -5px 5px;padding:3px 3px 1px 3px;background:#f7f7f7;border-left:1px solid #ddd;'+
	  'border-right:1px solid #ddd}'+'.edit_bottons img{display:block!important;opacity:0.5}'+'#ultimos_post li:hover{background-color:#fcfcfc!important;}'+
	  '#ultimos_post li img:hover{opacity:1}'+'#post_paginas,#post_paginas li{display:inline-block;border-bottom:0!important}'+'#post_paginas{background:#eee;position:relative;top:5px}'+
	  '#post_paginas li{padding:1px 3px 2px 4px;text-align:center;cursor:pointer;text-shadow:1px 1px 0 #fff;color:#555;border-left:1px solid #eee;border-right:1px solid #eee}'+
	  '#post_paginas li.here{background:#f7f7f7;border-left:1px solid #ccc;border-right:1px solid #bbb}'+'.perfil-sidebar div[style="margin-bottom: 10px;"]{display:none}'+
	  '#post_paginas li.p_before,#post_paginas li.p_next{margin:0 4px;padding:1px 2px 2px 2px;}'+'#ultimos_post{min-height:50px}'+
	  '.p_load{background:url(http://o2.t26.net/images/cargando.gif) no-repeat center center;}');
	   
  //var userid = $('.perfil-avatar a img').attr('src').split('/')[8].split('.')[0].split('_')[1];
	   
  $('.w-posts .ultimos li.categoriaPost').wrapAll('<div id="ultimos_post"></div>');
  $('.w-posts .ultimos li.see-more').wrap('<div id="ultimos_post_pie"></div>');
  $('#ultimos_post_pie').prepend('<ul id="post_paginas"></ul>');
  function load_posts(page){
   $('#ultimos_post').html('').addClass('p_load');
   GM_xmlhttpRequest({ method: "GET", url: page, onload: function(res) {
	$('#ultimos_post').removeClass('p_load');
	$(res.responseText).find('.result-i').each(function(){
	 var p_class = $(this).find('h2').attr('class'); var p_link = $(this).find('h2 a').attr('href').replace(/http\:\/\/www.taringa.net/gi,'');
	 var p_titulo = $(this).find('h2 a').attr('title'); var p_puntos = $(this).find('.info strong:eq(2)').html();
	 var p_respu = $(this).find('.info strong:eq(4)').html(); var p_fav = $(this).find('.info strong:eq(3)').html();
	 $('#ultimos_post').append('<li class="clearfix '+p_class+'"><a href="'+p_link+'" title="'+p_respu+' comentarios. <br> '+p_fav+' favoritos.">'+p_titulo+'</a> <span>'+p_puntos+' Puntos</span></li>');
	})
	add_edits();
	$('#ultimos_post li a').tipsy({gravity: 's'});
   }})
  }
  function add_edits(){ if(loc[2] == user){
   $('.w-posts .ultimos li.categoriaPost').each(function(){
	var id = $(this).find('a').attr('href').split('/')[3];
	$(this).find('span').append('<div class="edit_bottons">'+
								'<a target="'+Math.random()+'" href="http://taringa.net/edicion.form.php?id='+id+'" title="Editar Post"><img src="'+img+'bbcode/lapiz-1.png"></a>'+
								'<a target="'+Math.random()+'" class="del_post" title="Borrar Post" 1="'+id+'"><img src="'+img+'muerto.png"></a>'+
								'</div>');
   })
   $('.del_post').each(function(){ $(this).click(function(){
	unsafeWindow.global_data.postid = $(this).attr('1')
	unsafeWindow.borrar_post()
   })})
  }}; add_edits();
  function posts_pages(current){
   var num = Math.ceil(($('.w-stats ul li:eq(2)').html().substr(5,$('.w-stats ul li:eq(2)').html().length - 31) * 1) / 10);
   $('#post_paginas').html('');
   $('#post_paginas').append('<li class="p_before">«</li>');
   var n1 = current - 7; var n2 = current + 7;
   function checke(nn){
    if(num > 14){
	 if(n1 < 1){ n1++; n2++; checke(current); }
     if(n2 > num){ n1--; n2--; checke(current); }
	}
   }; checke(current)
   for(i = 1; i<=num; i++){
    if(i >= n1 && i <= n2){
	 if(i < 10){ $('#post_paginas').append('<li 1="'+i+'" class="p_num">0'+i+'</li>'); }
	 else{ $('#post_paginas').append('<li 1="'+i+'" class="p_num">'+i+'</li>'); }
	}
   }
   $('#post_paginas').append('<li class="p_next">»</li>');
   $('#post_paginas li[1='+current+']').addClass('here');
   $('#post_paginas li.p_num').each(function(e){
    $(this).click(function(){ setTimeout(function(){
	 load_posts('http://buscar.taringa.net/posts?q=autor:'+loc[2]+'&p='+th_num)
	}); var th_num = $(this).attr('1')*1; posts_pages(th_num); })
   })
   load_posts('http://buscar.taringa.net/posts?q=autor:'+loc[2]+'&p=1')
  }; posts_pages(1);  
  
  // Carga dinamica de pestañas
  $('.menu-tabs-perfil ul li').each(function(e){ $(this).click(function(){
   if($(this).find('a').html() == '<img src="http://o2.t26.net/images/facebook.png" width="14" height="14" />' || $(this).attr('class') == 'enviar-mensaje'){ window.location = $(this).find('a').attr('href'); return false; }
   var ess = 'no'; if($(this).find('a').html() == 'General'){ var ess = 'si'; }
   $('.menu-tabs-perfil ul li.selected').removeClass('selected');
   $(this).addClass('selected');
   $('.perfil-content').html('<center><img src="http://o1.t26.net/images/cargando.gif"></center>');
   $('.perfil-content').load($(this).find('a').attr('href')+' .perfil-content', function(){ if(ess == 'si'){
	$('.w-posts .ultimos li.categoriaPost').wrapAll('<div id="ultimos_post"></div>');
	$('.w-posts .ultimos li.see-more').wrap('<div id="ultimos_post_pie"></div>');
	$('#ultimos_post_pie').prepend('<ul id="post_paginas"></ul>'); posts_pages(1);   
   }})
   return false;
  })})
  $('.perfil-sidebar .see-more').each(function(e){ $(this).click(function(){
   $('.perfil-content').html('<center><img src="http://o1.t26.net/images/cargando.gif"></center>');
   $('.perfil-content').load($(this).attr('href')+' .perfil-content');
   $('.menu-tabs-perfil ul li.selected').removeClass('selected');
   $('.menu-tabs-perfil ul li a[href="'+$(this).attr('href')+'"]').parent().addClass('selected');
   return false;   
  })})
}

/*/ CENTRO DE MENSAJES		/*/ if(loc[1] == 'mensajes' || loc[1].split('?')[0] == 'mensajes-responder.php'){
 function get_page(){ // obtener la pagina actual
  var th_page = ''; var ca_page = ''; var asd;
  if(loc[2] == null){ loc[2] = '' }
  if(loc[2] == 'a' || loc[2] == 'redactar' || loc[1].split('?')[0] == 'mensajes-responder.php')	{  asd = ':eq(0)'; };
  if(loc[2] == '' || loc[2].substr(0,6) == 'pagina')	{ ca_page = '';						th_page = loc[2].substr(6); $('.container702 .mensajes_titulo').html('Bandeja de entrada'); asd = ':eq(1)'; };
  if(loc[2] == 'carpetas_personales')					{ ca_page = 'carpetas_personales/'+loc[3]+'/';	if(loc[4] != null){ th_page = loc[4].substr(6);} else{th_page = '1'} $('.container702 .mensajes_titulo').html(decodeURIComponent(loc[3])); asd = '[2="'+decodeURIComponent(loc[3])+'"]'; };
  if(loc[2] == 'eliminados')							{ ca_page = 'eliminados/';			th_page = loc[3].substr(6); $('.container702 .mensajes_titulo').html('Mensajes eliminados'); asd = ':eq(3)';  };
  if(loc[2] == 'enviados')								{ ca_page = 'enviados/';			th_page = loc[3].substr(6); $('.container702 .mensajes_titulo').html('Bandeja de salida'); asd = ':eq(4)';  };
  if(th_page == '')										{ th_page = '1'; };
  $('.container702 .mensajes_titulo').append(' - <span class="curpage">Pagina '+th_page+'</span>');
  th_page = th_page * 1;
  th_page2 = th_page * 2 - 1;
  return [dom+'mensajes/'+ca_page+'pagina', th_page2, asd, th_page];
 }
 function add_pages(page, num1, asd, curapage){

  // Nuevo menu de carpetas
  var pcar = '<ul id="n_car"><li class="m_write"><img src="'+img+'icon-mensajes-nuevo.png"><span><a href="/mensajes/redactar/">Escribir un nuevo mensaje</a></span></li>';  var timg = 'http://o2.t26.net/images/'
  $('.m-menu').each(function(e){
   $('.m-menu:eq('+e+')').after('/*/sasas'+e+'/*/');
   var no_read = $('.container230 .box_cuerpo').html().split('/*/sasas'+e+'/*/')[1].split('<')[0];
   if(no_read.substr(0,2) == ' ('){ no_read = no_read.substr(2,no_read.length-5) }
   else if(no_read.substr(0,3) == '  ('){ no_read = no_read.substr(3,no_read.length-4) }
   else{ no_read = '0' }; var ee;
   ee = '<span class="no_read" title="Usted tiene '+no_read+' mensajes sin leer en esta carpeta.">(<b>'+no_read+'</b>)</span>';
   if(e == 0){ pcar += '<li><img src="'+timg+'icon-mensajes-recibidos.gif"><span><a href="/mensajes/">Bandeja de entrada</a></span>'+ee+'</li>'; }
   else if(e == 1){ pcar += '<li><img src="'+timg+'icon-mensajes-enviados.gif"><span><a href="/mensajes/enviados/">Bandeja de salida</a></span>'+ee+'</li>'; }
   else if(e == 2){ pcar += '<li><img src="'+timg+'icon-mensajes-eliminados.gif"><span><a href="/mensajes/eliminados/">Mensajes Eliminados</a></span>'+ee+'</li>'; }
   else if(e == 3){ pcar += '</ul><ul id="p_car">'; }
   else{
	var name = $('.m-menu:eq('+e+')').html(); var eee = e-4;
	var id = $('div[id^="opciones_carpeta_"]:eq('+eee+')').attr('id').replace('opciones_carpeta_','');
	pcar += '<li 1="'+id+'" 2="'+name+'"><span class="name_car"><a href="/mensajes/carpetas_personales/'+name+'">'+name+
	'</a></span><span class="change_name" style="display:none"><input type="text"><img src="'+img+'saveHS.png"></span>'+
	'<span class="op_car"><a class="edit_car"><img src="http://o2.t26.net/images/icon-mensajes-carpeta-opc.gif"></a>'+
	'<a class="del_car"><img src="'+img+'bbcode/close-icon.png"></a></span>'+ee+'</li>';
   }
  }); pcar += '<li class="add_car"><span>Agregar nueva carpeta +</span></li></ul>';
  $('.container230 .box_cuerpo').html(pcar);
  $('.container230 li'+asd).addClass('car_here');
  
  // Opciones Carpetas
  $('.edit_car').click(function(){ 
   $('.name_car').show(); $('.change_name').hide();
   var id = $(this).parent().parent().attr('1');
   var name = $(this).parent().parent().attr('2');
   $(this).parent().parent().find('.name_car').hide();
   $(this).parent().parent().find('.change_name').show().html('<input type="text" value="'+name+'"><img src="'+img+'saveHS.png">');
   $('#p_car li').each(function(e){ $(this).find('.change_name img').click(function(){
	$(this).attr('src','http://i.t.net.ar/images/cargando.gif');
	$.post(dom+'mensajes-cambiar-nombre-carpetar.php?id='+id+'&key='+key+'&carpeta='+$('#p_car li:eq('+e+') .change_name input').val(), function(){
	 $('.change_name').hide(); $('#p_car li:eq('+e+')').attr('2',$('#p_car li:eq('+e+') .change_name input').val()); $('#p_car li:eq('+e+') .name_car').html('<a href="/mensajes/carpetas_personales/'+$('#p_car li:eq('+e+') .change_name input').val()+'" target="'+Math.random()+'">'+$('#p_car li:eq('+e+') .change_name input').val()+'</a>').show();
	})
   })})
  })
  
  // Agregar carpeta
  $('.add_car').click(function(){ 
   var name = prompt('Ingrese el nombre de la nueva carpeta');
   $.ajax({
	type: 'post',
	url: '/mensajes-carpeta-crear.php',
	data: 'carpeta_nombre='+name+'&key='+key,
	success: function(m){
	  if($(m).find('#cuerpocontainer .box_cuerpo').html().substr(10,21) == 'La carpeta fue creada'){
	   $('#p_car .add_car').before('<li class="loadd">'+name+'</li>')
	   $.ajax({ type: 'get', url: dom+'mensajes/', success: function(n){ 
		var id = $(n).find('.container230 .box_cuerpo div[id^="opciones_carpeta_"]:last').attr('id').replace('opciones_carpeta_','');
		$('#p_car .loadd').replaceWith('<li 1="'+id+'" 2="'+name+'"><span class="name_car"><a href="/mensajes/carpetas_personales/'+name+'">'+name+
		'</a></span><span class="change_name" style="display:none"><input type="text"><img src="'+img+'saveHS.png"></span>'+
		'<span class="op_car"><a class="edit_car"><img src="http://o2.t26.net/images/icon-mensajes-carpeta-opc.gif"></a>'+
		'<a class="del_car"><img src="'+img+'bbcode/close-icon.png"></a></span><span class="no_read">(<b>0</b>)</span></li>')
	   }})	  
	  }
	}
   })	
  })
  
  
  if(loc[2] == '' || loc[2].substr(0,6) == 'pagina' || loc[2] == 'carpetas_personales' || loc[2] == 'eliminados' || loc[2] == 'enviados'){  
  
    var num2 = num1 + 1; var cp1 = curapage - 1; var cp2 = curapage + 1;
  if(curapage == 1){ $('.container702 .box_rss').html('<a href="'+page+cp2+'">Siguiente »</a>'); }
  else{ $('.container702 .box_rss').html('<a href="'+page+cp1+'">« Anterior</a><a href="'+page+cp2+'">Siguiente »</a>'); }
  $('.container702 .box_cuerpo').html('<ul id="mensajes"><li id="load_me">Cargando</li></ul><div id="botones"></div>');
  $('#botones').append('<span class="bot_select"><b>Seleccionar:</b> <a 1="1">Todos</a>, <a 1="2">Ninguno</a>, <a 1="3">Leídos</a>, <a 1="4">No leídos</a>, <a 1="5">Invertir</a></span>');
  $('#botones').after('<span class="bot_funcion"><input id="delm" type="button" value="Eliminar" class="button"> <input id="mcl" type="button" value="Marcar como leidos" class="button">  <input id="mcnl" type="button" value="Marcar como no leidos" class="button"></span>');
  
  // Agregar mensajes
  function add_me(mess){
   var sos = '<img src="'+img+'responder.png"></a></span>'+'<span id="so_del"><img src="'+img+'muerto.png"></span>'+'<span id="so_view"><img src="'+img+'moreopts.png" style="margin:3px"></span>'+'</div>';
   $(mess).find('.container702 .box_cuerpo div[class^="m-linea-mensaje"]').each(function(){
	var clas = $(this).attr('class').substr(16); if(clas == ''){ clas = 'close'; }
	var user = $(this).find('div[class^="m-remitente"] a').text();
	var mpid = $(this).find('div[class^="m-asunto"] a').attr('href').substr(15);
	var name = $(this).find('div[class^="m-asunto"] a').text();
	var date = $(this).find('div[class^="m-fecha"]').text();
	$('#mensajes').append('<li style="display:none" 1="' + mpid + '" class="mp_' + clas + '" 2="' + name + '"><span class="cb"><input type="checkbox"> ' +
						  '<strong><a href="/perfil/' + user + '" target="'+Math.random()+'">' + user + '</a> </strong> ' + name + '</span><div id="mp_opciones"><span id="so_resp">' +
						  '<a href="/mensajes-responder.php?id='+mpid+'" target="'+Math.random()+'">' + sos + '<span class="mp_date">' + date + '</span>' +
						  '<div class="mp_content"><span class="loading"></span></div>' + '</li>')
   });
  }  
  $.get(page+num1, function(e){
   $('.bn_pages span').removeClass('not_works'); if(num1 == 1){ $('.bn_pages span.bbs').addClass('not_works') }
   var thp1 = $(e).find('.m-bottom a:last').text();
   if(thp1 == 'Invertir'){ $('.bn_pages span.bbs,.bn_pages span.bns').addClass('not_works') };
   if(thp1 == '« Anterior'){ $('.bn_pages span.bns').addClass('not_works') }; $('#mensajes').html('<li id="load_me">Cargando</li>');
   if($(e).find('.container702 .box_cuerpo div[class^="m-linea-mensaje"]').size() > 1){ add_me(e) }
   else{ $('.container702 .box_cuerpo').html('<ul><li class="mp_nome"><b>Error:</b> no se encontro ningun mensaje.</li></ul>'); }
   if(thp1 == 'Siguiente »'){ $.ajax({ type: "GET", url: page+num2, async: false, success: function(m){
    if($(e).find('.container702 .box_cuerpo div[class^="m-linea-mensaje"]').size() > 1){ add_me(m) }   
   }}) };
   $('#mensajes li span.cb').click(function(){ if($(this).parent().find('input').attr('checked') == true) { $(this).parent().removeClass('checked');$(this).parent().find('input').attr('checked', false) } else {$(this).parent().addClass('checked');$(this).parent().find('input').attr('checked', true)}})
   
   // Eliminar mensaje
   $('#mp_opciones #so_del').each(function(){ $(this).click(function(){
	var mpi = $(this).parent().parent().attr('1');
	if(confirm('¿Desea eliminar este mensaje?')){
	 $.post('http://www.taringa.net/mensajes-marcar-eliminado.php?ids='+mpi+'&key='+key,function(){
	  $('li[1="' + mpi + '"]').remove();
	  if($('#mensajes li').size() < 3){
	   var d = $('#mensajes').attr('1') * 2; var e = d - 1; add_pages(get_page()[0], get_page()[1]);  
	  }
	 })
	}		
   })})
   
   // Ver mensaje & responder
   $('#mp_opciones #so_view').each(function(){ $(this).click(function(){
	var name = $(this).parent().parent().attr('2');
	var mpi = $(this).parent().parent().attr('1');
	var sop = $(this).parent().parent().find('.mp_content');
	var nick = $(this).parent().parent().find('strong a').text();
	var date = $(this).parent().parent().find('.mp_date').text();
	var sopd = sop.css('display');
	$('.mp_content').slideUp(300);
	$('.mp_content').html('<span class="loading"></span>');
	if(sopd == 'none'){ sop.slideDown(300) };
	$.get(dom+'mensajes/leer/'+mpi, function(e){
	 $('#mensajes li[1="'+mpi+'"]').attr('class','mp_open');
	 var mensa = $(e).find('.container702 .box_cuerpo .m-col2m').html().substr(4);
	 sop.html(mensa)
	 sop.append('<div class="prev"></div><div class="fast_answer"><div id="resp_m"><input type="button" value="Responder" class="button"></div>'+
	 '<resp style="display:none"><textarea></textarea><span class="input_more"><a href="/mensajes-responder.php?id='+mpi+'" target="'+Math.random()+'">Ir a avanzado</a></span>'+
	 '<span class="input_buttons"><input id="prev_m" type="button" value="Previsualizar" class="button"> <input id="canc_m" type="button" value="Cancelar" class="button"> <input id="send_m" type="button" value="Enviar" class="button"></span>'+
	 '</resp></div>');

	 $('#resp_m input').click(function(){ $(this).parent().slideUp(300); $('resp').slideDown(300); $('.fast_answer textarea').focus(); })
	 $('#canc_m').click(function(){ $('#resp_m').slideDown(300); $('resp').slideUp(300); $('.fast_answer textarea').val(''); $('div.prev').slideUp(300); $('div.prev').html(''); })

	 var date1 = date.split(' ')[0].replace(/-/gi,'.'); var date2 = date.split(' ')[1]; mensa = mensa.substr(0, mensa.length - 4);
	 var answer = encodeURIComponent('[quote="El '+date1+' a las '+date2+', '+nick+'"]'+$.html_bbcode(mensa)+'[/quote]');
	 $('#send_m').click(function(){
	  if($('.fast_answer textarea').val() == ''){
	   alert('Debes escribir una respuesta.');
	   $('.fast_answer textarea').focus();
	  } else if($('#sto_m b').html() > 0){
	   alert('Debes esperar '+$('#sto_m b').html()+' para poder enviar otro mensaje.');
	  } else{
	   if(name.substr(0,4) != 'RE: '){ name = 'RE: '+name }
	   $.post(dom+'mensajes-enviar.php?&msg_to='+nick+'&msg_subject='+name+'&msg_body='+encodeURIComponent($('.fast_answer textarea').val())+answer+'&key='+unsafeWindow.global_data.user_key,function(h){
		$('#resp_m').slideDown(300); $('resp').slideUp(300); $('.fast_answer textarea').val('');  $('div.prev').slideUp(300); $('div.prev').html('');
		$('#sto_m').slideDown(300); $('#sto_m b').html(20); $('#sto_m b').countDown(20,1000,function(){ $('#sto_m').slideUp(300); $('#sto_m b').html(20); })
	   })
	  }		  
	 })
	 $('#prev_m').click(function(){
	  if($('.fast_answer textarea').val() == ''){
	   alert('Debes escribir una respuesta.');
	   $('.fast_answer textarea').focus();
	  }	else{
	   if(name.substr(0,4) != 'RE: '){ name = 'RE: '+name }
	   $.get(dom+'preview.php?titulo='+name+'&cuerpo='+encodeURIComponent($('.fast_answer textarea').val())+answer,function(p){
		var respuesta = $('<div id="respuesta">'+p+'</div>').find('#post-centro div[class="box_cuerpo"]').html().replace('					','');
		$('div.prev').html('<h1>Previsualizar <span></span></h1>'+respuesta)
		$('div.prev').slideDown(300);
		$('div.prev h1 span').click(function(){ $(this).parent().parent().slideUp(300); $(this).parent().parent().html(''); })
	   })
	  }
	 })		  
	});
   })})
   
   // Eliminar, Marcar como leido, Marcar como no leido
   $('.bot_funcion input').mousedown(function(){ 
	var menid = '';
	$('#mensajes li span.cb input:checked').each(function(i){
	 if(i == 0){ menid = $(this).parent().parent().attr('1'); }
	 else{ menid += ',' + $(this).parent().parent().attr('1'); }
	 $(this).attr('checked', false);
	 $(this).parent().find('.div').removeClass('checked');
	})
	var bot_id = $(this).attr('id');
	if(bot_id == 'delm'){
	 if(confirm('¿Desea eliminar estos mensajes?')){
	  $.post(dom+'/mensajes-marcar-eliminado.php?ids='+menid+'&key='+key,function(){
	   menid  = menid.split(',');
	   for (var i = 0; i < menid.length; i++){
		$('li[1="' + menid[i] + '"]').remove();
	   }
	   if($('#mensajes li').size() < 3){
		var d = $('#mensajes').attr('1') * 2; var e = d - 1; get_more_mesaje(e,d);  
	   }
	  })
	 }
	}
	if(bot_id == 'mcl'){
	 $.post(dom+'mensajes-marcar-leido.php?leido=1&ids=' + menid + '&key='+key, function(e){
	  menid  = menid.split(',');
	  for (var i = 0; i < menid.length; i++){
	   $('li[1="' + menid[i] + '"]').attr('class','mp_open')
	  }
	 })
	}
	if(bot_id == 'mcnl'){
	 $.post(dom+'mensajes-marcar-leido.php?leido=0&ids=' + menid + '&key='+key, function(e){
	  menid  = menid.split(',');
	  for (var i = 0; i < menid.length; i++){
	   $('li[1="' + menid[i] + '"]').attr('class','mp_close')
	  }
	 })
	}		
   })   
	  
   // Seleccionar
   $('#botones .bot_select a').each(function(){ $(this).click(function(){
	  var type = $(this).attr('1')
	  if(type != '5'){ $('#mensajes li input').attr('checked', false); $('#mensajes li input').parent().parent().removeClass('checked'); }
	  if(type == '1'){
		$('#mensajes li input').each(function(){
		  $(this).attr('checked', true);
		  $(this).parent().parent().addClass('checked');
		})
	  }
	  if(type == '3'){
		$('#mensajes li.mp_open input').each(function(){
		  $(this).attr('checked', true);
		  $(this).parent().parent().addClass('checked');
		})
	  }
	  if(type == '4'){
		$('#mensajes li.mp_close input').each(function(){
		  $(this).attr('checked', true);
		  $(this).parent().parent().addClass('checked');
		})
	  }
	  if(type == '5'){
		$('#mensajes li input').not(':checked').each(function(){ $(this).addClass('not_checked'); })
		$('#mensajes li input:checked').each(function(){
		  $(this).attr('checked', false);
		  $(this).parent().parent().removeClass('checked');
		})
		$('#mensajes li .not_checked').each(function(){
		  $(this).removeClass('not_checked');
		  $(this).attr('checked', true);
		  $(this).parent().parent().addClass('checked');
		})
	  }		  
	})})
	  
   $('#mensajes li').not('#load_me').slideDown(300); $('#load_me').slideUp(300);
  })
 } 
 }
 add_pages(get_page()[0], get_page()[1], get_page()[2], get_page()[3]);
 
  // Enviar mensaje
 if(lc == 'enviarmp'){
  var m_bor = GM_getValue('m_bor','');  
  var m_des = $('input[name="msg_to"]').val();
  var m_tit = $('input[name="msg_subject"]').val();
  var m_cue = $('#markItUp').val();
  
	// Borradores
  $('.container230').append('<br class="space"><div class="box_title"><div class="box_txt">Borradores</div></div><div class="box_cuerpo" id="bor_box"><ul></ul></div>')
  if(m_bor.length == ''){ $('#bor_box ul').html('<li>No hay ningun borrador disponible</li>') }
  
  $('.container702 .box_cuerpo').html('<span class="m_st">Destinatario:</span> <input id="m_des" maxlength="120" value="'+m_des+'">'+
									  '<span class="m_sends">Enviado mensajes 1/1</span><br>'+
									  '<span class="m_st">Asunto:</span> <input id="m_tit" maxlength="120" value="'+m_tit+'">'+
									  '<ul id="bbcode"></ul>'+
									  '<textarea id="m_cue">'+m_cue+'</textarea>'+
									  '<div id="ot_func"></div>'+
									  '<div id="m_botones"><input class="button" value="Previsualizar" type="button"><input class="button" value="Guardar" type="button"><input class="button" value="Enviar" type="button"></div>'+
									  '');
  $.Otras('#ot_func','body_resp');
  $.ABB('#bbcode','m_cue');
  
  $('.m-bottom').prepend('<input class="button" value="Guardar" type="button"> ');
  
  $.S('.m-bottom{display:none}'+'#m_botones{text-align:right!important;border-top:1px dotted #bbb}'+'#m_botones input{margin:7px 3px 0 3px}'+
  '.m_st{padding:5px 4px 4px 0;font-weight:bold;color:#666;text-shadow:1px 1px 0 #fff;display:inline-block;width:73px;}'+
  '#m_des,#m_tit,#m_cue{width:270px;-moz-border-radius:4px;padding:3px 5px 4px 5px!important;background:#fdfdfd!important}'+'#m_tit{width:594px;margin-top:7px;}'+
  '#m_cue{width:670px;margin:7px 2px;padding:5px 4px!important;height:200px}'+'.m_sends{float:right}'+
  '#bbcode{display:block!important;margin-top:5px!important;border-top:1px dotted #ccc;padding-top:5px!important;}')
 } 
 $.S('.container230 .box_cuerpo,.container702 .box_cuerpo{background:#f7f7f7!important;border:1px solid #ccc!important;-moz-border-radius:5px;padding:7px!important}'+
	  '#maincontainer .box_title{background:none!important;}'+'#maincontainer .box_title *{text-shadow: 0 0 0 !important;}'+
	  '#p_car li.add_car{background:none;text-align:right;border:0;color:#666;text-shadow: 1px 1px 0 #fff !important;cursor:pointer}'+
	  ' .container230 .box_cuerpo li{border-bottom:1px dotted #ccc;padding:5px 4px;height:15px}'+'.bot_funcion a{float:left;margin:3px 10px}'+
	  '#n_car img{float:left;position:relative;top:2px;margin-right:6px}'+'.op_car,.no_read,.change_name img,#mensajes #mp_opciones{float:right}'+
	  '#p_car li{padding:5px 3px 5px 24px;background:url(http://o2.t26.net/images/icon-mensajes-carpeta.gif) no-repeat 3px 4px;}'+
	  '#n_car li span,.name_car,.change_name,.no_read{display:inline-block;color:#999;text-shadow: 1px 1px 0 #fff !important;height:15px}'+
	  '#p_car img,#mp_opciones img{opacity:0.5;cursor:pointer}'+'#p_car img:hover,#mp_opciones img:hover{opacity:0.9}'+
	  '.change_name input{padding:1px 3px !important;margin:-1px 0;-moz-border-radius:3px;width:92px;margin-right:4px;}'+
	  '.mp_nome{line-height:30px !important;text-align: center;}'+'#mensajes li{border-bottom:1px dotted #ccc;padding:3px 5px 3px 27px;}'+
	  '#load_me{background:#eee url(http://o2.t26.net/images/cargando.gif) no-repeat 650px 6px;-moz-border-radius:5px 5px 0 0;padding:7px!important;text-align:center;color:#555;cursor:default}'+
	  '.bot_select{background:#eee;padding:3px 5px;display:block;border-bottom:1px dotted #ccc;border-top:1px solid #fff}'+'.bot_funcion{display:block;margin-top:6px;text-align:right}'+
	  '.mp_close{background:url(http://o2.t26.net/images/icon-email.png) no-repeat 5px 3px}'+'.mp_close a{color:#000 !important;}'+
	  '.mp_open{background: url(http://s1007.photobucket.com/albums/af198/gonza_06/icon-email-open.png) no-repeat 5px 2px}'+'.mp_open a{color:#555 !important; font-weight:normal;}'+
	  '#mensajes input[type=checkbox]{display:none;}'+'.checked,.car_here{background-color: #def !important}'+
	  '.cb strong{display:inline-block;width:93px;border-right:1px solid #ccc;margin-right:5px;position:relative;top:0px;}'+
	  '#mensajes #mp_opciones span{display:inline-block;height:16px;width:16px;} #so_del{margin-left:5px;margin-right:2px;}'+
	  '.mp_date{background:rgba(0, 0, 0, 0.08);float:right;padding:0 7px;margin-right:5px;-moz-border-radius:3px}'+
	  '.container702 .box_rss a{background:#f7f7f7;border:1px solid #ccc;padding:2px 7px;margin:2px;-moz-border-radius:3px}'+
	  '.container702 .box_rss a:hover{background:#fff!important;text-decoration:none!important}'+
	  '.mp_content .loading{display:block;height:26px !important;background:url(http://i.t.net.ar/images/cargando.gif)no-repeat center center;}'+
	  '.mp_content{display:none;background:#eee;margin:5px 0 -3px -27px;border-top:1px dotted #ccc;padding:7px;width:672px;}'+
	  '.prev{display:none;margin:8px -7px -7px -7px;padding:4px 6px 34px 6px;border-top:1px solid #ccc}'+
	  '.prev h1{background:#dadada;margin:-4px -6px 8px -6px;padding:5px 6px;border-bottom:1px solid #ccc;font-weight:bold !important;}'+
	  '.prev h1 span{float:right;background:url(http://i1007.photobucket.com/albums/af198/gonza_06/del.png);padding:8px;cursor:pointer;}'+
	  '#sto_m{display:none;position:fixed;bottom:-4px;right:10px;background:#fff;border:1px solid #ccc;padding:10px 20px}'+
	  '.fast_answer{text-align:right;background:#dadada;margin:8px -7px -7px -7px;padding:4px 6px;border-top:1px solid #ccc;border-bottom:1px solid #fff;}'+
	  '.fast_answer textarea{width:662px;-moz-border-radius:5px;padding:7px 5px !important;color:#888!important;}'+'.fast_answer .input_more{display:inline-block;margin:4px 10px;}'+
	  '.fast_answer .input_buttons{float:right;margin:3px 10px 0 0;}'+'#resp_m{padding:5px 0;}resp{text-align:left;}')
} 

/*/ COMUNIDADES				/*/ if(loc[1] == 'comunidades'){
 var rango = $('.comunidadData b').html(); if(rango == null){rango = 'no-member'} 
 $('.ads120-240,.banner,#respuestas hr,.miRespuesta').remove();
 
 function load_temas(page){ // Buscador dinamico
  GM_xmlhttpRequest({ method: "GET", url: page, onload: function(res) {
   $('#bcsearch table tbody').html('<tr><td class="thead"></td><td class="thead titulo">Título</td><td class="thead" style="text-align: right; width: 120px;">Creado</td><td class="thead">Respuestas</td></tr>')
   $(res.responseText).find('.result-i').each(function(e){
	var t_class = ''; if(e % 2){ t_class = 'color2' } else{ t_class = 'color1' }
	var t_titulo = $(this).find('h2 a').attr('title');
	var t_link = $(this).find('h2 a').attr('href').replace(/http\:\/\/www.taringa.net/gi,'');
	var t_autor = $(this).find('.info img[title="Autor"]').next().html();
	var fecha1 = $(this).find('.info img[title="Creado"]').next().attr('title');
	var fecha2 = $(this).find('.info img[title="Creado"]').next().html();
	$('#bcsearch table tbody').append('<tr class="temas '+t_class+'"><td class="tema_icon"><img src="http://o2.t26.net/images/page.png"></td>'+
	'<td class="temaTitulo"><a href="'+t_link+'">'+t_titulo+'</a><br><span class="small color_gray">Por <a href="/perfil/'+t_autor+'/">'+t_autor+'</a></span></td>'+
	'<td class="datetema" style="text-align: right;" title="'+fecha1+'">'+fecha2+'</td>'+
	'<td class="tema_respnum">??</td></tr>');
   })
   if($(res.responseText).find('.result-i').size() == 0){
	$('#bcsearch table tbody').html('<error>No se encontro ningun tema relacionado con <b>"'+$('#centro form input[name="q"]').val()+'"</b>.</error>');
   }
  }}) 
 } $('#centro .bubbleCont:eq(1)').attr('style','margin: 10px 0 -4px 0;padding:10px').after('<div id="bcsearch" class="bubbleCont" style="display:none;margin:14px 0 -5px 0;">dsdd</div>').find('form input[name="q"]').keyup(function(){
  if($('#bcsearch').css('display') == 'none'){ $('#bcsearch').slideDown(300); }
  $('#bcsearch').html('<div class="Container"><h1>Buscando <b>"'+$(this).val()+'"</b> <span onclick="$(this).parent().parent().parent().html(\'\').slideUp(300).prev().find(\'form input:eq(2)\').val(\'\').focus()"></span></h1><table style="clear: both;" cellpadding="0" cellspacing="0"><tbody><cargando></tbody></table></div>');
  var page = 'http://buscar.taringa.net/comunidades?comunidad='+loc[2]+'&type=temas&q='+$(this).val();
  setTimeout(function(){load_temas(page);},0);
  return false;
 }); $.S('#bcsearch h1 span{float:right;padding:8px;background:url('+img+'muerto.png);cursor:pointer;}'+'#centro .bubbleCont input[value="Buscar"]{display:none}'+
 '#centro .bubbleCont input[name="q"]{width:500px!important;padding:4px!important}'+'error{text-align:center;display:block;padding:17px 0 0 0;border-top:1px solid #ccc}'+
 'cargando{background:url(http://o2.t26.net/images/cargando.gif) no-repeat bottom;display:block;padding:30px 0 0 0;border-top:1px solid #ccc}')
 if(rango == 'Administrador' || rango == 'Moderador'){ // Buscador de usuarios
  $('#derecha').prepend('<div class="box_title"><div class="box_txt">Buscar usuario</div></div><div class="box_cuerpo">'+
  '<input id="miembros_list_search" class="search_input" type="text" value=""></div><br class="space"><br class="space">');
  $('#centro .bubbleCont:eq(1)').attr('style','margin: 10px 0 -4px 0;padding:10px')
  .before('<div id="bcuser" class="bubbleCont" style="display:none;margin:11px 0 1px 0;"><div class="Container">'+
  '<h1>Buscando al user <b></b> <span onclick="$(this).parent().parent().parent().slideUp(300); $(\'.search_input\').val(\'\').focus()"></span></h1>'+
  '<div id="miembros"></div></div></div>')
  $('#miembros_list_search').keyup(function(){
   $('#bcuser h1 b').html($(this).val())
   if($('#bcuser').css('display') == 'none'){ $('#bcuser').slideDown(300); }
   var params = 'comid='+unsafeWindow.global_data.comid+'&key='+unsafeWindow.global_data.user_key+'&ajax=1&section=Miembros&p=0&q='+$('.search_input').val()
   $.ajax({
	type: 'GET',
	url: '/comunidades/miembros.php',
	data: params,
	success: function(h){
	 $('#bcuser #miembros').html('<div id="showResult">'+h.substring(3)+'</div><div class="clearBoth"></div>');
	 $('#bcuser #miembros .emptyData').html('No hay ningun miembro con ese nombre en esta comunidad.').css('margin','-2px 0 0 0');
	}
   });
  }); $.S('#miembros{border-top:1px solid #ccc!important;margin-top:10px}'+'#miembros_list_search{width:189px;-moz-border-radius:4px;}'+'#bcuser h1 span{float:right;padding:8px;background:url('+img+'muerto.png);cursor:pointer;}');
 }
 $('.temas').each(function(d){ // Agregar paginas
  $(this).find('td:first').addClass('tema_icon');
  $(this).find('.datetema:last').attr('class','tema_respnum');
  var resp_num = $(this).find('td:last').html().replace(/\./gi,'') * 1;
  var link = $(this).find('td:eq(1) a').attr('href').split('/');
  link1 = 'http://www.taringa.net/'+link[1]+'/'+link[2]+'/'+link[3];
  link2 = link[4];
  var links = '<span class="ct_pages"> - <b>Paginas:</b> ';
  if(resp_num > 20){links +=' <a href="'+link1+'.1/'+link2+'">1</a> - <a href="'+link1+'.2/'+link2+'">2</a>'}
  if(resp_num > 40){links +=' - <a href="'+link1+'.3/'+link2+'">3</a>'}
  if(resp_num > 60){links +=' - <a href="'+link1+'.4/'+link2+'">4</a>'}
  if(resp_num > 80){links +=' - <a href="'+link1+'.ultima/'+link2+'">Última</a>'}
  links +='</span>';
  if(links != '<span class="ct_pages"> - <b>Paginas:</b> </span>'){ $(this).find('.temaTitulo span').after(links) }
 });
 if(lc == 'mis-comunidades'){ // Mis comunidades
  $.S('.filterBy{width:922px!important;border:1px solid #ccc;background:#f4f4f4!important;font-size:11px !important;font-weight:bold;padding:3px 8px!important}'+
	  '.xResults{font-size:11px !important;text-shadow:1px 1px 0 #fff !important;position:relative;top:1px}'+'.orderTxt{top:-1px!important;}'+
	  '.filterBy .floatR li a{padding:1px 6px 3px 6px!important;}'+'.filterBy .floatR li{position:relative;top:2px;border:0!important}'+
	  '.paginadorCom{width:922px!important;border:1px solid #ccc;background:#f4f4f4!important;margin:-25px 0 0 0!important;padding:4px 8px!important}'+
	  '#showResult{margin:5px -5px!important}'+'#google_ads_div_tar_general_160_general{display:none!important}'+
	  '.resultBox{background:#f4f4f4;width:449px!important;margin:5px!important;border:1px solid #ccc;padding:2px 7px!important;-moz-border-radius:5px}'+
	  '.paginadorCom .before,.paginadorCom .next{height:15px!important}'+'.paginadorCom ul{width:698px!important;}');
 }
 if(lc == 'temas'){ // Temas
  var tp = $('.numbers .here').html() * 1; if(tp == 0){ tp = 1 }
  var d2 = $('.emptyData').html();
  $('.emptyData').remove();
  function grn(xx){ xx = xx.replace(/\./,''); if(xx == '' || xx == null){ return 0; } else{ var xx1 = xx.length - 11; xx = xx.substr(0, xx1); return xx; } }
  function aem(d1, d2, d3){
   if(d1 != null){ if(d1.substr(10,17) == 'El tema no existe'){ $('#all_res').html('<div id="tre">El tema fue eliminado</div>'); $('#addmc').slideUp(300);  return false; } }
   if($('.titulorespuestas b').html() == 0){ $('#all_res').html('<div id="tre">No hay ninguna respuesta en este tema</div>'); }
   if(d3 == 'no-member' || d3 == null){ $('#tre').remove(); $('#all_res').append('<div id="tre">Debes ser miembro de la comunidad para comentar</div>'); $('#addmc').slideUp(300); return false; }
   else{ $('#addmc').slideDown(300); }
   if(d2 == 'Las respuestas de este tema fueron cerradas'){ $('#tre').remove(); $('#all_res').append('<div id="tre">Las respuestas de este tema fueron cerradas</div>'); $('#addmc').slideUp(300); }
   else{ $('#addmc').slideDown(300); }
  }
  function aac(ss){
   $('.respuesta-post').each(function(i) {
	var r_un = $(this).find('.nick').html();
	var r_ui = $(this).find('li[class*="bloquear desbloquear_"] a').attr('href'); if(r_ui != null){ r_ui = r_ui.substr(21,r_ui.length - 44) }
	if(rango == 'Administrador' || rango == 'Moderador'){
	 if(r_un != user){
	  $(this).find('.answerCitar').removeClass('answerCitar');
	  $(this).find('.answerOptions ul').prepend('<li class="answerCitar admin-user"><a href="javascript:com.admin_users('+r_ui+');"><img title="Administrar usuario" src="http://gonx-666.zxq.net/img/user.png" width="16" height="16" align="absmiddle"/></a></li>');
	 }
	}
	$('.respuesta-post:eq('+i+') .avatar-box ul').append('<li><a href="javascript:notifica.follow(\'user\', '+r_ui+', notifica.userInPostHandle)">Seguir usuario<span></span></a></li>');
	i++; i = (ss-1) * 20 + i; $(this).find('.nick').parent().prepend('<span>#'+i+' - </span>');
   })
  }
  function fix_paginator(rn,tp){
   $('.paginadorCom,.lch').remove();
   $('.titulorespuestas').html('<b>'+rn+'</b> Respuestas').before('<div class="lch" 1="'+tp+'"><span class="ltext">Cargando</span><span class="limg"></span></div>');
   $('#tema-puntos').after('<div class="lch" 1="'+tp+'"><span class="ltext">Cargando</span><span class="limg"></span></div>');
   $('#amc_s input').attr('1',tp)
   rn = Math.ceil(rn / 20); var tp2 = tp - 1; tp3 = tp*1 + 1; if(tp2 == 0){ tp2 = 'no-w" id="ba_nw' }; if(tp3 > rn){ tp3 = 'no-w" id="ba_nw' };
   aac(tp);
   if(rn > 1){ if($('.ts_paginas').size() == 0){ $('#all_res').before('<div class="ts_paginas"></div>').after('<div class="ts_paginas"></div>') } }
   $('.ts_paginas:eq(0),.ts_paginas:eq(1)').html('<div class="before" 1="'+tp2+'"><a><b>&laquo; Anterior</b></a></div><ul></ul><div class="next" style="text-align: right;" 1="'+tp3+'"><a><b>Siguiente &raquo;</b></a></div>');
   for (var i = 1; i < rn+1; i++) { $('.ts_paginas:eq(0) ul,.ts_paginas:eq(1) ul').append('<li class="numbers"><a href="'+dom+'comunidades//'+loc[3].split('.')[0]+'.'+i+'/'+loc[4]+'" 1="'+i+'">'+i+'</a></li>') }
   $('.numbers a[1="'+tp+'"]').addClass('here');   
   if(rn >  10){
	h1 = tp*1 - 6;	  h2 = tp*1 + 4;	  $('.ts_paginas:eq(0) .numbers:lt('+h1+'), .ts_paginas:eq(0) .numbers:gt('+h2+')').remove();	  $('.ts_paginas:eq(1) .numbers:lt('+h1+'), .ts_paginas:eq(1) .numbers:gt('+h2+')').remove();
	if(h1 > 0){ $('.ts_paginas:eq(0) ul li:first,.ts_paginas:eq(1) ul li:first').replaceWith('<li class="numbers"><a href="comunidades//'+loc[3].split('.')[0]+'.1/'+loc[4]+'" 1="1">'+1+'</a></li> ... ')}
	if(h2 < rn){ $('.ts_paginas:eq(0) ul li:last, .ts_paginas:eq(1) ul li:last ').replaceWith(' ... <li class="numbers"><a href="comunidades//'+loc[3].split('.')[0]+'.'+rn+'/'+loc[4]+'" 1="'+rn+'">'+rn+'</a></li>') }
   }
   $('.lch,.before,.next,.numbers a').each(function(){ $(this).click(function(){
	var ee = $(this).attr('1'); if(ee != 'no-w'){
	 if($(this).attr('class') != 'lch'){ $('#respuestas').scrollTo(200); }
	 var page = dom+'comunidades/temas/'+loc[3].split('.')[0]+'.'+ee+'/'+loc[4];
	 $('.lch').addClass('lpch').find('.ltext').fadeIn(300);
	 $('.respuesta-post').fadeTo(300, 0.5);
	 $.get(page , function(data) {
	  $('#all_res').html('');
	  $(data).find('.respuesta-post').parent().each(function(){ $(this).appendTo('#all_res'); });
	  $.Quotes(); $.Flash('#all_res');
	  fix_avy();
	  var sss = grn($(data).find('.titulorespuestas').html());
	  aem($(data).find('.container400 .box_cuerpo').html(), $(data).find('.emptyData').html(), $(data).find('.comunidadData b').html());
	  fix_paginator(sss,ee);
	  $('.lch').removeClass('lpch').find('.ltext').fadeOut(300);   
	 })
	}
	return false;
   })});
  };
  function fix_avy(){
   $('.avatar-48').each(function(e){
	var url = $(this).attr('orig')
	$(this).replaceWith('<img src="'+url+'"  class="avatar-48 lazy">')
	$('.avatar-48:eq('+e+')').parent().parent().hover(function(){ 
	 $(this).find('ul').show();	 
	}, function(){
	 $(this).find('ul').hide();	
	});
   })  
  }  
  var cr = grn($('.titulorespuestas').html());  
  if(cr == 0){
   $('#respuestas').show().append('<div id="all_res"></div>');
  } else{
   $('.respuesta-post').parent().wrapAll('<div id="all_res"></div>');
  }
  $('#centroDerecha').append('<div id="addmc"><div id="amc_c"><ul id="bbcode"></ul><div id="tema-puntos"></div><textarea id="body_respu" class="amc_t"></textarea><div id="ot_func"></div></div>'+
  '<div id="amc_s"><span id="to_l" style="display:none">Enviando respuesta.</span><span id="to_s" style="display:none">Debes esperar <b>0</b> segundos antes de poder comentar nuevamente.</span><input type="button" value="Enviar" class="button" 1="'+tp+'"></div></div>');
  fix_paginator(cr,tp);
  $(document).ready(function(){
   $('#body_respu').replaceWith('<textarea id="body_resp" class="amc_t"></textarea>');
   $.ABB('#bbcode','body_resp');
  })
  aem('', d2, rango);
  
  $.Otras('#ot_func','body_resp');
  
  // Puntuar
  $('.rateBox #votos_total').clone().appendTo('#tema-puntos');
  $('.rateBox #actions').clone().appendTo('#tema-puntos');
  $('#tema-puntos .thumbs').click(function(){
	var punt = $('#tema-puntos #votos_total').html().substr(1)*1
	if($('#tema-puntos #votos_total').html().substr(0,1) == '-'){
	  punt = punt - punt - punt
	}
	if($(this).attr('class') == 'thumbs thumbsUp'){ punt = punt + 1 } if($(this).attr('class') == 'thumbs thumbsDown'){ punt = punt - 1	}
	if(punt >  0){$('#tema-puntos #votos_total').html('<span style="color:green !important">'+ '+' + punt + '<span>');  }
	if(punt == 0){$('#tema-puntos #votos_total').html('<span style="color:green !important">'+       0    + '<span>');  }
	if(punt <  0){$('#tema-puntos #votos_total').html('<span style="color:red   !important">'+       punt + '<span>');  }
  })
  
  // Enviar
  $('#amc_s input').click(function(){
   if($('.amc_t').val()==''){ $('.amc_t').focus(); return false; }
   $('#to_l').fadeIn(300);
   var coment = $.addbcolor($.transform_bbc($('.amc_t').val()));
   $.get(dom+'/preview.php?titulo=titulo&cuerpo='+encodeURIComponent(coment),function(p){ $('#footer').html(p) })

   $.ajax({
	type: 'POST',
	url: dom+'comunidades/respuesta.php',
	data: 'respuesta=' + encodeURIComponent(coment) + '&mostrar_resp=true&temaid=' + unsafeWindow.global_data.temaid + '&key=' + unsafeWindow.global_data.user_key,
	success: function(c){
	 $('#to_l').hide();
	 if(c.charAt(0) == 1){
	  $('.amc_t').val('').focus();
	  $('#amc_s #to_s').fadeIn(300).find('b').html('30')
	  $('#amc_s input').fadeOut(300)
	  var ee = $('#amc_s input').attr('1')
	  var page = dom+'comunidades//'+loc[3].split('.')[0]+'.'+ee+'/'+loc[4];
	  $('.lch').addClass('lpch').find('.ltext').fadeIn(300);
	  $('.respuesta-post').fadeTo(300, 0.5);
	  var seg = setInterval("var htm= $('#amc_s #to_s b').html() - 1 ; $('#amc_s #to_s b').html(htm)",1000);
	  setTimeout("clearInterval("+seg+");$('#amc_s input').fadeIn(300);$('#amc_s #to_s').fadeOut(300)",30000);
	  $.get(page , function(data) {
	   $('#all_res').html('');
	   $(data).find('.respuesta-post').parent().each(function(){ $(this).appendTo('#all_res'); });
	   $.Quotes(); fix_avy(); $.Flash('#all_res');
	   var sss = grn($(data).find('.titulorespuestas').html())
	   fix_paginator(sss,ee);
	   $('.lch').removeClass('lpch').find('.ltext').fadeOut(300);   
	  })
	 }
	}
   });
  }); 
  
  // Estilo
  $.S('.btnActions{background:url(http://o1.t26.net/images/bg_g.gif) 0 20px!important;border:1px solid #ccc}'+'#bbcode{margin:-3px 0 3px 0!important}'+
	  '.titulorespuestas{font-size:11px!important;border-bottom:1px dotted #bbb!important;padding:1px 0 5px 0;margin:-11px 0 10px 0!important}'+'.comment-box{width:767px!important;}'+
	  '#all_res{width:836px !important;margin-left:-66px;}'+'#tre{background:#ffc;margin: 10px 0 10px 66px;padding:8px;-moz-border-radius:5px;border:1px solid #c8c82d;font-weight:bold;text-align:center;}'+
	  '')
	  

 }
 if(loc[3] == 'agregar' || loc[3] == 'editar-tema'){ // Agregar tema
  var t_comid = unsafeWindow.global_data.comid;
  var t_temaid = unsafeWindow.global_data.temaid;
  var t_titulo = $('.c_input[name="titulo"]').val();
  var t_cuerpo = $('#markItUp').val();
  var t_tags = 'estos,son,tags,por defecto';
  var t_action = $('form[name="add_tema"]').attr('action');
  var t_otros1 = $('.postLabel input:eq(0)').attr('checked');
  var t_otros2 = $('.postLabel input:eq(1)').attr('checked');
  var t_otros = '<li><input type="checkbox" id="ch_seguir" name="follow" '+(t_otros1? 'checked':'')+'> Seguir este tema</li>'+'<li><input type="checkbox" id="ch_comentarios" name="cerrado" '+(t_otros2? 'checked':'')+'> No permitir comentarios</li>';
  if($('.postLabel input').size() == 3){
   var t_otros3 = $('.postLabel input:eq(2)').attr('checked');
   t_otros += '<li><input type="checkbox" id="ch_sticky" name="sticky" '+(t_otros3? 'checked':'')+'> Sticky</li>';
  }
  
  if(loc[3] == 'agregar'){ var ebtype = 'Enviar'; var t_mas = '<input name="comid" value="'+t_comid+'" type="hidden">';}
  else{ var ebtype = 'Guardar cambios'; var t_mas = '<input name="temaid" value="'+t_temaid+'" type="hidden">'; }
  
  $('#centroDerecha').prepend('<div id="t_preview" style="display:none"><div id="temaComunidad"><div class="temaBubble"> <div class="bubbleCont"><div class="Container"><div class="TemaCont"><div class="postBy"><a href="/perfil/'+user+'"><img title="Ver perfil de '+user+'" alt="Ver perfil de '+user+'" class="avatar" src="http://www.bodytrainer.tv/template/images/avatar.gif"></a><strong><a title="Ver perfil de '+user+'" href="/perfil/'+user+'">'+user+'</a></strong><ul class="userIcons clearbeta"><li><span style="float: left; width: 16px; height: 16px; background: url(http://o2.t26.net/images/big2v1.png); background-position: 0 -792px" title="Online"></span></li><li><span title="Hombre" class="systemicons sexoM"></span></li><li><img title="Argentina" src="http://o2.t26.net/images/flags/ar.png" width="16" height="11" align="absmiddle" alt="Argentina" /></li><li><a title="Enviar un mensaje privado" href="/mensajes/a/'+user+'"><span class="systemicons mensaje"></span></a></li></ul></div><div class="temaCont" style="width:600px;"><div class="floatL"><h1 class="titulopost"></h1></div><div class="floatR"></div><div class="clearBoth"></div><hr><p id="tprevc"></p></div></div></div></div></div></div><div id="t_close_preview"><input class="button" type="button" value="Cerrar previsualizaci&oacute;n" onclick="$(this).parent().parent().slideUp(300)"></div></div>')
  
  $('#post_agregar .box_cuerpo').html('<form name="add_tema" id="add_tema" method="post" action="'+t_action+'">'+
  '<input name="key" value="'+key+'" type="hidden">'+t_mas+
  '<span class="t_name1">Título:</span> <input id="t_titulo" maxlength="48" value="'+t_titulo+'" name="titulo">'+
  '<span id="m_titulo" class="m_anuncio1" style="display:none">Ingrese un titulo</span>'+
  '<ul id="bbcode"></ul>' + '<textarea id="t_cuerpo" name="cuerpo">'+t_cuerpo+'</textarea>'+
  '<span class="t_name1">Tags:</span> <input id="t_tags" value="'+t_tags+'" name="tags">'+
  '<span id="m_tags" class="m_anuncio1" style="display:none">Tienen que ser 4 tags distintos</span>'+
  '<ul id="t_otros">'+t_otros+'</ul>'+  
  '<div id="t_botones"><input id="t_prev" class="button" type="button" value="Previsualizar">'+
  '<input id="t_save" class="button" type="button" value="'+ebtype+'"></div></form>');
  
  $.ABB('#bbcode','t_cuerpo');  
  $('#t_otros li').each(function(){ $(this).click(function(){ var opcheck = $(this).find('input').attr('checked'); if(opcheck == false){ $(this).find('input').attr('checked',true); } if(opcheck == true){ $(this).find('input').attr('checked',false); } })})
  var p_estado1 = 'bien'; var p_estado2 = 'bien'; var p_estado3 = 'bien';
  function ch_titulo(){
   if($('#t_titulo').val() == '' || $('#t_titulo').val() == null){ p_estado1 = 'mal'; $('#m_titulo').fadeIn(300); $('#t_titulo').focus(); }
   else{ p_estado1 = 'bien'; $('#m_titulo').fadeOut(300); }
  }
  function ch_tags(){
	if($('#t_tags').val() == ''){
	 p_estado2 = 'mal'; $('#m_tags').fadeIn(300); $('#m_tags').html('Ingrese los Tags'); $('#t_tags').focus(); return false;
	} else{
	 var tags = $('#t_tags').val().split(',');
	 if(tags.length < 4){
	  $('#m_tags').html('Tienen que ser 4 tags distintos'); $('#m_tags').fadeIn(300); p_estado2 = 'mal'; return false;
	 } else if(tags[0] == tags[1] || tags[0] == tags[2] || tags[0] == tags[3] || tags[1] == tags[2] || tags[1] == tags[3] || tags[2] == tags[3]){
	  $('#m_tags').html('Tienen que ser 4 tags distintos'); $('#m_tags').fadeIn(300); p_estado2 = 'mal'; return false;
	 }
	}
	p_estado2 = 'bien'; $('#m_tags').fadeOut(300);
  }
  function ch_cuerpo(){
   if($('#t_cuerpo').val() == '' || $('#t_cuerpo').val() == null){ p_estado3 = 'mal'; $('#t_cuerpo').focus(); }
   else{ p_estado3 = 'bien'; }
  }
  
  $('#t_prev').click(function(){
	ch_titulo(); ch_tags(); ch_cuerpo();
	if(p_estado1 == 'bien' && p_estado2 == 'bien' && p_estado3 == 'bien'){
	 $('#t_preview').slideDown(300);
	 $('#t_preview .titulopost').html($('#t_titulo').val())
	 $('#t_preview #tprevc').html('<center><img src="http://www.meadowgrounds.com/image/load.gif"></center>')
	 $('#t_preview #tprevc').load(dom+'preview.php?titulo=' + encodeURIComponent($('#t_titulo').val()) + '&cuerpo=' + encodeURIComponent($('#t_cuerpo').val()) + ' #preview',function(){   })
	} 
  });
  $('#t_save').click(function(){
	ch_titulo(); ch_tags(); ch_cuerpo();
	if(p_estado1 == 'bien' && p_estado2 == 'bien' && p_estado3 == 'bien'){
	 $('#add_tema').submit();
	}
  })
  
  $.S('#post_agregar{width:770px!important;margin:0!important;padding:0!important}'+'#mensaje-top{display:none!important}'+
      '#post_agregar .box_cuerpo{width:756px!important;padding:7px!important}'+'#bbcode{border-top:1px dotted #ccc;margin-top:5px!important;padding-top:5px!important;display:block!important}'+
	  '.data input,.data textarea{background:#f7f7f7!important;-moz-border-radius:4px;padding:5px!important;width:738px!important;}'+
	  '.data input:focus,.data textarea:focus{background:#ffffff!important;border-color:#ccc!important}'+
      '.t_name1{padding:5px 4px 4px 0;font-weight:bold;color:#444;text-shadow:1px 1px 0 #fff}'+
      '.m_anuncio1{padding:4px 9px 4px 8px;font-weight:bold;color:#777;background:#ffc;-moz-border-radius:4px;border:1px solid #ccc;'+
      'float:right;cursor:default;text-align:center;}'+'#t_cuerpo{margin:5px 0 7px 0;width:750px;-moz-border-radius:4px;min-height:300px;}'+
      '#t_titulo{width:588px;-moz-border-radius:4px}'+'#t_tags{width:514px;-moz-border-radius:4px}'+'#m_tags{width:173px;}'+
	  '#t_botones,#t_otros{margin-top:8px!important;border-top:1px dotted #bbb;padding-top:8px!important;text-align:right}'+
      '#t_otros{text-align:left}'+'#t_otros li{display:inline-block;margin-right:6px;background:#eee;-moz-border-radius:5px;'+
      'padding:1px 7px 5px 3px;border:1px solid #cfcfcf;cursor:pointer;}#t_otros li input{position:relative;top:3px}'+
      '#t_botones input{margin-left:6px}'+'#t_preview #temaComunidad{margin-bottom:10px;}'+'#tprevc #preview{width:600px!important;margin:0!important;}'+
	  '#t_close_preview{margin-bottom:10px;text-align:right;}'+'#tprevc .box_cuerpo{background:#f7f7f7!important;padding:0!important;position:relative;left:4px}')
 }
 
 // Estilo General
 $.S('.titulopost{font-size:11px!important;font-weight:bold;text-shadow:1px 1px 0 #fff;color:#777;margin:-1px 0 1px 0!important}'+
	 '.avatar{width:120px!important;height:120px!important;}'+'.infoPost{width:748px!important;padding:10px 0 0 0!important}'+
	 '#izquierda{padding:0!important}'+'#centroDerecha{width:770px!important}'+
	 '#centroDerecha .bubbleCont{width:748px!important;padding:10px!important}'+'.postBy{width:120px!important;}'+
	 '.ct_pages{font-size:10px;color:#888;}'+'.ct_pages b{color:#000;}'+'.ct_pages a{color:#888 !important;}')
}







if(subdom == 'posts' && loc[1] == ''){
 function fix_posts(wew){ var sticky = ''; var posts = ''; $(wew).each(function(){
  var thisi = $(this).find('a').attr('href');
  var thist = $(this).find('a').attr('title');
  if($(this).attr('class').split(' ')[1] == 'sticky'){
   var thisc = $(this).find('a').attr('class').split(' ')[1];
   sticky += '<li class="categoriaPost '+thisc+'"><a href="'+thisi+'" title="'+thist+'" onclick="load_p(this); return false;">'+thist+'</a></li>';
  } else {
   var thisc = $(this).attr('class').split(' ')[1];
   posts += '<li class="categoriaPost '+thisc+'"><a href="'+thisi+'" title="'+thist+'" onclick="load_p(this); return false;">'+thist+'</a></li>';
  }
 }); return {sticky:sticky, posts:posts}; }
 function load_posts(page){
  $('#Post').fadeTo(300, 0.5); //$('#Post').html('<div id="load_nps"><img src="http://o1.t26.net/images/cargando.gif"> Cargando pagina <b>'+page+'</b>.</div>');
  $('#ultipost img').fadeIn(300);
  $('#Post').addClass('caca')
  $.ajax({
   type: "GET",
   url: page,
   success: function(ss){
	var ss = $(ss).find('#izquierda .box_cuerpo ul').html()
	$('#Post').html(ss);
	var pss = fix_posts('#Post li.categoriaPost');
	$('#Post').html(pss.posts).fadeTo(0, 1);
	$('#ultipost img').fadeOut(300);
	$('#Post').removeClass('caca')
   }
  });
 } 
 function posts_pages(current){
  var page = dom+'posts/'+$('#Post').attr('1')+'/pagina';
  if(current < 0){ current = 0 }; if(current > 50){ current = 50 };
  $('tit .bb').html('');
  $('tit .bb').append('<a class="ppber" 1="'+(current-1)+'">«</a>');
   var n1 = current - 2; var n2 = current + 2;
   function checke(nn){
    if(n1 < 0){ n1++; n2++; checke(current); }
	if(n2 > 50){ n1--; n2--; checke(current); }
   }; checke(current);
   if(n1 > 0){ $('tit .bb').append('<a 1="0" class="bs">00</a>...'); n1++; }
   if(n2 < 50){ n2-- }
   for(i = 0; i<=50; i++){
    if(i >= n1 && i <= n2){
	 if(i < 10){ $('tit .bb').append('<a 1="'+i+'" class="bs">0'+i+'</a>'); }
	 else{ $('tit .bb').append('<a 1="'+i+'" class="bs">'+i+'</a>'); }
	}
   }
   if(n2 < 50){ $('tit .bb').append('...<a 1="50" class="bs">50</a>'); }
   $('tit .bb').append('<a class="ppnex" 1="'+(current+1)+'">»</a>');
   $('tit .bb a[1='+current+']').addClass('here');
   $('tit .bb a').each(function(e){ $(this).click(function(){
    var th_num = $(this).attr('1')*1; posts_pages(th_num);
	load_posts(page+th_num)
   })})
 };
 unsafeWindow.load_p = function(ee){
  $('.pseleci').removeClass('pseleci'); $(ee).parent().addClass('pvisto pseleci');
  var titulo = $(ee).attr('title');
  var link = $(ee).attr('href');
  var id = $(ee).attr('href').split('/')[3];
  $('#ainb').html('<div id="aiava"><ca></div><pti></pti><name><a>Cargando...</a></name>');
  $('#prec').html('<div id="tsmeslp"><img src="http://o1.t26.net/images/cargando.gif"> Cargando post <b>'+titulo+'</b>.</div>');
  $('title').html(titulo+' - Taringa!')
  setTimeout(function(){
   $.ajax({
	type: "GET",
	url: link,
	success: function(ss){
	 var autorn = $(ss).find('.given-name').html();
	 var autori = $(ss).find('.avatarBox img').attr('src'); //.split('_')[1].split('.')[0];
	 var rango = '<span style="position: relative;">'+$(ss).find('.post-autor .box_cuerpo span:eq(3)').html()+'</span>';
	 var sexo = '<span style="position: relative;">'+$(ss).find('.post-autor .box_cuerpo span:eq(4)').html()+'</span>';
	 var estado = $(ss).find('.post-autor .box_cuerpo span:eq(2)').attr('title'); if(estado == 'Online'){
	  estado = '<span style="float: left; width: 16px; height: 16px; background: url(&quot;http://o1.t26.net/images/big2v1.png&quot;) repeat scroll 0pt -792px transparent;" title="Online"></span>'
	 } else{
	  estado = '<span style="float: left; width: 16px; height: 16px; background: url(&quot;http://o1.t26.net/images/big2v1.png&quot;) repeat scroll 0pt -814px transparent;" title="Offline"></span>'
	 }
	 var smp = $(ss).find('.post-autor .box_cuerpo a:eq(2)').html();
	 var cou = $(ss).find('.post-autor .adr').html();
	 var ops = '<opt>'+rango+sexo+cou+'<a href="/mensajes/a/'+autorn+'">'+smp+'</a><a href="javascript:notifica.sharePost('+id+')" class="shp"><img src="http://o1.t26.net/images/favicon.ico"></a></opt>'
	 var ss = $(ss).find('.post-contenido span[property="dc:content"]').html();
	 if(ss == null){ $('#prec').html('<div id="tsmeslp">El post <b>'+titulo+'</b> ha sido eliminado.</div>'); return false; }
	 $('#ainb').html('<div id="aiava"><a href="perfil/'+autorn+'"><img src="'+autori+'"></a></div>'+ops+'<pti>'+titulo+'</pti><name>Por <a href="perfil/'+autorn+'">'+autorn+'</a> '+estado+'</name>');
	 $('#prec').html(ss);
	}
   });  
  },0); 
 };
 var cat = '-1';
 var pss = fix_posts('#izquierda li.categoriaPost');
 $('#cuerpocontainer').html('<div id="p_left"><tit><b>Stickys</b></tit><cuer>'+pss.sticky+'</cuer><br class="space"><cate></cate><br class="space"><div id="dinamicpost"><tit id="ultipost"><b>Últimos</b> <img src="http://o1.t26.net/images/cargando.gif"><span class="bb"></span></tit><cuer id="Post" 1="'+cat+'">'+pss.posts+'</cuer></div></div>'+
 '<div id="p_right"><div id="ainb"></div>'+
 '<cuer id="prec"><div id="tsmeslp">Seleccione un post para verlo.</div></cuer></div><div class="clearBoth"></div>');
 $('cate').replaceWith('<select id="Fc_di"><option value="-1">Todas</option><option value="novatos">Novatos</option><option value="animaciones">Animaciones</option><option value="apuntes-y-monografias">Apuntes y Monograf&iacute;as</option><option value="arte">Arte</option><option value="autos-motos">Autos y Motos</option><option value="celulares">Celulares</option><option value="ciencia-educacion">Ciencia y Educaci&oacute;n</option><option value="comics">Comics e Historietas</option><option value="deportes">Deportes</option><option value="downloads">Downloads</option><option value="ebooks-tutoriales">E-books y Tutoriales</option><option value="ecologia">Ecolog&iacute;a</option><option value="economia-negocios">Econom&iacute;a y Negocios</option><option value="femme">Femme</option><option value="hazlo-tu-mismo">Hazlo tu mismo</option><option value="humor">Humor</option><option value="imagenes">Im&aacute;genes</option><option value="info">Info</option><option value="juegos">Juegos</option><option value="links">Links</option><option value="linux">Linux y GNU</option><option value="mac">Mac</option><option value="manga-anime">Manga y Anime</option><option value="mascotas">Mascotas</option><option value="musica">M&uacute;sica</option><option value="noticias">Noticias</option><option value="offtopic">Off-topic</option><option value="recetas-y-cocina">Recetas y Cocina</option><option value="salud-bienestar">Salud y Bienestar</option><option value="solidaridad">Solidaridad</option><option value="taringa">Taringa!</option><option value="turismo">Turismo</option><option value="tv-peliculas-series">TV, Peliculas y series</option><option value="videos">Videos On-line</option></select>');
 $('#Fc_di').select(function(e){ $('#Post').attr('1',e); load_posts(dom+'posts/'+e+'/pagina'+0); posts_pages(0); },192);
 posts_pages(0);


 $.S('#p_left{float:left;width:194px;}'+'.bb{opacity:0}'+'#p_left:hover tit,#p_left:hover cuer{position:relative;z-index:99}'+'#Post{overflow:hidden;height:267px}'+
 '#dinamicpost:hover #ultipost{width:302px;}'+'#ultipost img{width:10px;margin-left:3px;display:none}'+'.caca{width:186px;position:relative;top:-9px;margin-bottom:-9px}'+
 '#dinamicpost:hover #Post{width:310px;opacity:0.9!important;overflow:auto;top:0px;margin-bottom:0;}'+'#dinamicpost:hover .bb{opacity:1}'+
 'cuer{display:block;padding:3px;background:#f7f7f7;border:1px solid #ccc;-moz-border-radius:0 0 4px 4px;border-top:1px solid #fff;}'+'#p_right{margin:0 0 0 auto;width:751px;}'+
 '#p_left li {overflow:hidden;line-height:16px;-moz-border-radius:4px;}'+'#p_left li:hover{background-color:rgba(221, 238, 255, 1)!important;}'+
 'tit{display:block;padding:5px 7px;background:-moz-linear-gradient(top, #f7f7f7, #e0e0e0);color:#777;border:1px solid #ccc;-moz-border-radius: 4px 4px 0 0}'+
 'tit b{text-shadow:1px 1px 0 #f7f7f7;}'+'tit span.bb{float:right;}'+'tit span.bb a.bs{padding:2px 4px;-moz-border-radius:4px;font-size:10px!important}'+
 'tit span.bb a.bs.here{background:#004a95;color:#fff;}'+'tit span.bb a.ppber{margin-right:5px}'+'tit span.bb a.ppnex{margin-left:5px}'+'tit span.bb a{font-size:13px!important}'+
 'tit span.bb a:hover{text-decoration:none!important;}'+'.pvisto{opacity:0.5;}'+'.pseleci{background-color:rgba(221, 238, 255, 1)!important;}'+'.pseleci a{color:#555!important;}'+
 '#tsmeslp{background:-moz-linear-gradient(top, #f7f7f7, #eee);text-align:center;padding:44px;margin:-87px -8px -41px -8px;color:#888;border:1px solid #ccc;-moz-border-radius:4px;'+
 'position:relative;z-index:99}'+'#tsmeslp img{margin:0 5px -3px 0;opacity:0.5}'+'#prec {padding:40px 7px 13px 7px}'+'#prec *{max-width:100%!important}'+'#prec *{line-height:1.1em;}'+
 '#ainb{background:-moz-linear-gradient(top, #f7f7f7, #eee);margin:0;padding:7px;height:30px;border:1px solid #ccc;-moz-box-shadow:0 1px 0 #fff;-moz-border-radius:4px 4px 0 0;}'+
 '#aiava{width:60px;height:60px;float:left;background:-moz-linear-gradient(top, #fff, #f0f0f0);display:inline-block;padding:3px;border:1px solid #ccc;-moz-border-radius:4px;margin-right:5px;'+
 '-moz-box-shadow:0 0 7px rgba(0, 0, 0, 0.2)}'+'ca{display:block;width:60px;height:60px;background:url(http://o1.t26.net/images/cargando.gif) no-repeat center;opacity:0.5}'+
 '#aiava img{width:60px;height:60px;}'+'#aiava img:hover{background:-moz-linear-gradient(top, #fff, #f0f0f0);width:120px;height:120px;margin:-30px;-moz-box-shadow:0 0 7px rgba(0, 0, 0, 0.9);'+
 'position:relative;z-index:99;padding:4px;border:1px solid #ccc;-moz-border-radius:4px;}'+'name{float:right;margin-top:43px;color:#888;}'+
 'pti{float:left;margin:9px 0 0 10px;color:#888;font-size:14px;text-shadow:1px 1px 0 #fff;position:relative;left:-105px}'+'name span{margin:-1px 3px 0 0}'+
 'opt{float:left;margin:44px 0 0 3px;}'+'.shp{float:right;margin-left:3px}');

}

// Tscript 2.0 ~ Hecho por gonx_666 para la pagina www.taringa.net ~ Prohibida su copia y distribución //
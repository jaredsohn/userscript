
// ==UserScript==
// @name           Tscript mensajes- por gonx_666
// @namespace      http://www.taringa.net/perfil/gonx_666
// @include        *taringa.net/*
// @include        *poringa.net/*
// @exclude        *br.taringa.net/*
// @exclude        *br.poringa.net/*
// @include        http://plugin.tinypic.com/plugin/*
// ==/UserScript==

//--------------------------------------- Tscript � ---------------------------------------// Variables
var ultver = 2.0;
eval(function(p,a,c,k,e,r){e=String;if(!''.replace(/^/,String)){while(c--)r[c]=k[c]||c;k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('0 $=1.2;',3,3,'var|unsafeWindow|jQuery'.split('|'),0,{}))
var user = $('.username').html();
var dom = location.hostname;
var img = 'http://s1007.photobucket.com/albums/af198/gonza_06/';
var dir = window.location.href;
var dirl = window.location.href.length;
var spa = '<br class="space"><hr class="divider"><br class="space">';
var locc = window.location.pathname.split('/'); var loc = '';
switch(locc[1]){
  case 'opciones': 																						loc = 'opciones';			break;
  case '': case 'index.php': 																			loc = 'principal';			break;
  case 'posts':	if(locc[3] == '' || locc[3].substr(0, 6) == 'pagina')									loc = 'categorias';			break; 
  case 'agregar': case 'edicion.form.php':																loc = 'agregar';			break;
  case 'monitor':																						loc = 'monitor';			break;
  case 'favoritos.php':																					loc = 'favoritos';			break;
  case 'mensajes':
    if(locc[2] == '' || locc[2].substr(0, 6) == 'pagina' || locc[2] == 'carpetas_personales')			loc = 'mensajes-home';
    if(locc[2] == 'redactar' || locc[2] == 'a')															loc = 'mensajes-mp';
    if(locc[2] == 'leer')																				loc = 'mensajes-leer';
  break;
  case 'mensajes-responder.php':																		loc = 'mensajes-mp';		break;
  case 'perfil':																						loc = 'perfil';
    if(locc[2] == user)																					loc = 'miperfil';
  break;
  
// Comunidades
  case 'comunidades':																					loc = 'comunidades'; 
	if(locc[2]=='')																						loc = 'comunidades-home'; 
    if(locc[2]=='home')																					loc = 'comunidades-cat'; 
    if(locc[2]=='mis-comunidades')																		loc = 'comunidades-mc'; 
    if(locc[3] == 'agregar' || locc[3] == 'editar-tema')												loc = 'comunidades_nt'; 
    if(locc[3]=='crear')																				loc = 'comunidades-nc'; 
    if(locc[3]=='editar')																				loc = 'comunidades-editar'; 
    if(locc[2]=='t-scripts')																			loc = 'ts-comu'; 
  break; 
}




$('a[href="javascript:openpopup()"],.rtop,#avisosTop,object,#google_ads_div_tar_general_728_general,#google_ads_div_tar_p_728_info,#google_ads_div_tar_ch_160_general,#google_ads_div_tar_p_750_videos,iframe[width="160"],.banner-300,.rbott,.destacadas,.ads120-240,#mensaje-top,.banner,.banner300x250,#google_ads_div_tar_p_120_manga-anime,script:contains("_google"),script:contains("pageTracker"),script:contains("gaJsHost"),script[src^="http://partner.googleadservices.com/gampad/"],script[src^="http://www.google-analytics.com/"],#bannera').remove()
$('#footer').html('<br><br>')
$('#banner').html('<form name="top_search_box" class="buscador-h" action="http://buscar.taringa.net/comunidades"><div class="search-in"><a onclick="search_set(this, \'web\')">Web</a> - <a onclick="search_set(this, \'posts\')">Posts</a> - <a onclick="search_set(this, \'comunidades\')" class="search_active">Comunidades</a></div><div style="clear:both"><input class="mini_ibuscador onblur_effect" type="text" title="Buscar" value="Buscar" onblur="onblur_input(this)" onfocus="onfocus_input(this)" onkeypress="ibuscador_intro(event)" name="q" id="ibuscadorq"><input class="mini_bbuscador" vspace="2" type="submit" hspace="10" align="top" title="Buscar" class="bbuscador" alt="Buscar" value=""></div></form>')

$('body').append('<style id="allstyle">#head{background:url(http://gonx-666.zxq.net/tscript/Ts-back.png);height:83px !important;}'+
'#logo{float:none !important;display:inline-block;margin-top:13px;}'+
'#Ts-back-tl{float:left;margin-left:-12px;}'+
'#Ts-back-tr{float:right;margin-right:-480px;}'+
'.search-in{margin:10px 20px 7px 0}'+
'.mini_ibuscador{background:url(http://i1007.photobucket.com/albums/af198/gonza_06/Ts_search1.png)!important;width:254px!important;color:#fff!important;padding:5px 10px!important;}'+
'.mini_bbuscador{background:url(http://i1007.photobucket.com/albums/af198/gonza_06/Ts_search2.png)!important;width:033px!important;}'+
'#maincontainer{-moz-border-radius:10px;margin-bottom:14px !important;}'+

'.box_cuerpo{border:0 !important}'+'input.button{-moz-border-radius:4px;border:0 !important;margin:0 2px}'+

'</style>')

function html_bbcode(text){
  var pa = 'position: absolute; top: ';
  var pa2 = 'smiles/';
  var icp = new Array('-288', '-310', '-332', '-354', '-376', '-398', '-420', '-442', '-464', '-486', '-508', '-530', '-552', '-574', '-596', '-618');
  var icpc = new Array(':)', ';)', ':roll:', ':P', ':D', ':(', 'X(', ':cry:', ':twisted:', ':|', ':?', ':cool:', ':oops:', '^^', '8|', ':F');
  
  var icp2 = new Array('blaf', 'winky', 'sad2', 'cry', 'bobo', 'grin', 'alabama', 'lpmqtp', 'idiot', 'shrug', '8S', '5', '15', '17', 'cold', 'hot', 'love', 'globo', 'zombie', 'pacman', 'metal', 'mario', 'i', 'exclamacion', 'pregunta', 'no', 'ok', 'wow', 'lol', 'papel', 'rip', 'koe', '106', 'dolar', 'culo', 'car', 'mobe', 'fantasma', 'buenpost', 'getalife', 'bang', 'limoon', 'verde');
  var icp2c = new Array(':blaf:', ':winky:', ':noo:', ':twisted:', ':crying:', ':bobo:', ':grin:', ':alaba:', ':lpmqtp:', ':idiot:', ':shrug:', ':8S:', ':]', ':blind:', ':buaa:', ':cold:', ':hot:', ':love:', ':globo:', ':zombie:', ':man:', ':metal:', ':mario:', ':info:', ':exc:', ':q:', ':NO:', ':OK:', ':WOW:', ':LOL:', ':oo:', ':RIP:', ':alien:', ':trago:', ':money:', ':culo:', ':auto:', ':lala:', ':fantasma:', ':buenpost:', ':GET A LIFE:', ':headbang:', ':limon:', ':verde:');
  
  text = text.replace(/<blockquote><div class="cita"><strong>(.*?)<\/strong> dijo:<\/div><div class="citacuerpo"><p>(.*?)<\/p><\/div><\/blockquote>/i,"[quote=$1]$2[/quote]")
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
			 .replace(/<span style="position: relative;"><img src="http:\/\/i.t.net.ar\/images\/big2v5.gif" style="(.*?)px; clip: rect\((.*?)\);" hspace="3" vspace="2"><img src="http:\/\/i.t.net.ar\/images\/space.gif" style="vertical-align: middle; width: 15px; height: 15px;" hspace="3" vspace="2"><\/span>/gi,'$1')
			 .replace(/<img src="http:\/\/i.t.net.ar\/images\/(.*?).gif">/gi,'$1')
			 .replace(/<img src="(.*?).gif">/gi,'$1')
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
}














//--------------------------------------- Tscript ��---------------------------------------// Optimizar centro de mensajes 
if(loc == 'mensajes-home' || locc[2] == 'eliminados' || locc[2] == 'enviados'){
  var key = unsafeWindow.global_data.user_key;
  if(locc[2] == 'carpetas_personales'){ var page = 'http://www.taringa.net/mensajes/carpetas_personales/'+locc[3]+'/pagina';  var th = locc[4]; if(th == null){ th = 'pagina1'; }; th = th.substr(6);   }
  else if(locc[2] == 'eliminados'){ var page = 'http://www.taringa.net/mensajes/eliminados/pagina'; var th = locc[3].substr(6);  }
  else if(locc[2] == 'enviados'){ var page = 'http://www.taringa.net/mensajes/enviados/pagina'; var th = locc[3].substr(6); $('#allstyle').append('#mp_opciones #so_resp,.fast_answer{display:none !important}') }
  else{ var page = 'http://www.taringa.net/mensajes/pagina'; var th = locc[2].substr(6); }
  if(th == ''){th = 1};
  var bnp = '<div class="bn_pages"><span class="bbs">&laquo; Anterior </span><span class="bss">'+th+'</span><span class="bns">Siguiente &raquo;</span></div>';
  $('.container702 .box_cuerpo').html(bnp);
  $('.container702 .box_cuerpo').append('<ul id="mensajes" 1="'+th+'"><li class="loading"></li></ul>');
  $('.container702 .box_cuerpo').append('<div id="botones"></div>')
  $('#botones').append('<span class="bot_select"><b>Seleccionar:</b> <a 1="1">Todos</a>, <a 1="2">Ninguno</a>, <a 1="3">Leídos</a>, <a 1="4">No leídos</a>, <a 1="5">Invertir</a></span>');
  $('#botones .bot_select a').each(function(){ $(this).click(function(){
	  var type = $(this).attr('1')
	  if(type != '5'){$('#mensajes li input').attr('checked', false); $('#mensajes li input').parent().find('.div').removeClass('checked'); }
	  if(type == '1'){
		$('#mensajes li input').each(function(){
		  $(this).attr('checked', true);
		  $(this).parent().find('.div').addClass('checked');
		})
	  }
	  if(type == '3'){
		$('#mensajes li.mp_open input').each(function(){
		  $(this).attr('checked', true);
		  $(this).parent().find('.div').addClass('checked');
		})
	  }
	  if(type == '4'){
		$('#mensajes li.mp_close input').each(function(){
		  $(this).attr('checked', true);
		  $(this).parent().find('.div').addClass('checked');
		})
	  }
	  if(type == '5'){
		$('#mensajes li input').not(':checked').each(function(){ $(this).addClass('not_checked'); })
		$('#mensajes li input:checked').each(function(){
		  $(this).attr('checked', false);
		  $(this).parent().find('.div').removeClass('checked');
		})
		$('#mensajes li .not_checked').each(function(){
		  $(this).removeClass('not_checked');
		  $(this).attr('checked', true);
		  $(this).parent().find('.div').addClass('checked');
		})
	  }		  
	})})
  $('#botones').append('<span class="bot_funcion"><input id="delm" type="button" value="Eliminar" class="button"> <input id="mcl" type="button" value="Marcar como leidos" class="button">  <input id="mcnl" type="button" value="Marcar como no leidos" class="button"></span>');
  $('.container702 .box_cuerpo').append(bnp);
  $('body').append('<div id="sto_m">Debes esperar <b>0</b> para poder enviar otro mensaje.</div>')
  
  $.fn.countDown = function(num,time,fn,n2){
  thdis = $(this).css('display'); if(thdis == 'none'){ var disp = 0 } else{ var disp = 1 }
  if(n2 == null){ n2 = num }
  else{ $(this).html(n2) }
  n2 = n2-1
  $(this).fadeTo(time, disp,function(){ if(n2 == 0){ fn() } else{ $(this).countDown(num,time,fn, n2) }; })
}
  function get_more_mesaje(e,d){
	$('.container702 .box_cuerpo #mensajes').html('<li class="loading"></li>');
	var sos = '<img src="'+img+'responder.png"></a></span>'+
	'<span id="so_del"><img src="'+img+'muerto.png"></span>'+
	'<span id="so_view"><img src="http://i47.tinypic.com/vzdhk2.png" style="margin:3px"></span>'+
	'</div>';
	
	$.get(page+e,function(m){
	  $('.bn_pages span').removeClass('not_works');
	  if(e == 1){ $('.bn_pages span.bbs').addClass('not_works') };
	  var thp1 = $(m).find('.m-bottom a:last').text();
	  if(thp1 == 'Invertir'){ $('.bn_pages span.bbs,.bn_pages span.bns').addClass('not_works') };
	  if(thp1 == '« Anterior'){ $('.bn_pages span.bns').addClass('not_works') };
	  if($(m).find('.container702 .box_cuerpo div[class^="m-linea-mensaje"]').size() > 1){
		$(m).find('.container702 .box_cuerpo div[class^="m-linea-mensaje"]').each(function(){
		  var clas = $(this).attr('class').substr(16); if(clas == ''){ clas = 'close'; }
		  var user = $(this).find('div[class^="m-remitente"] a').text();
		  var mpid = $(this).find('div[class^="m-asunto"] a').attr('href').substr(15);
		  var name = $(this).find('div[class^="m-asunto"] a').text();
		  var date = $(this).find('div[class^="m-fecha"]').text();
		  $('#mensajes').append('<li style="display:none" 1="' + mpid + '" class="mp_' + clas + '" 2="' + name + '"><span class="cb"><div class="div"></div><input type="checkbox"> ' +
								'<strong><a href="/perfil/' + user + '" target="'+Math.random()+'">' + user + '</a> </strong>// ' + name + '</span><div id="mp_opciones"><span id="so_resp">' +
								'<a href="/mensajes-responder.php?id='+mpid+'" target="'+Math.random()+'">' + sos + '<span class="mp_date">' + date + '</span>' +
								'<div class="mp_content"><span class="loading"></span></div>' + '</li>')
		})
	  }
	  else{ $('#mensajes').append('<li class="mp_nome"><b>Error:</b> no se encontro ningun mensaje.</li>'); }
	  if(thp1 == 'Siguiente »'){
		$.ajax({ type: "GET", url: page+d, async: false, success: function(m){
          $(m).find('.container702 .box_cuerpo div[class^="m-linea-mensaje"]').each(function(){
			var clas = $(this).attr('class').substr(16); if(clas == ''){ clas = 'close'; }
			var user = $(this).find('div[class^="m-remitente"] a').text();
			var mpid = $(this).find('div[class^="m-asunto"] a').attr('href').substr(15);
			var name = $(this).find('div[class^="m-asunto"] a').text();
			var date = $(this).find('div[class^="m-fecha"]').text();
			$('#mensajes').append('<li style="display:none" 1="' + mpid + '" class="mp_' + clas + '" 2="' + name + '"><span class="cb"><div class="div"></div><input type="checkbox"> ' +
								  '<strong><a href="/perfil/' + user + '" target="'+Math.random()+'">' + user + '</a> </strong>// ' + name + '</span><div id="mp_opciones"><span id="so_resp">' +
								  '<a href="/mensajes-responder.php?id='+mpid+'" target="'+Math.random()+'">' + sos + '<span class="mp_date">' + date + '</span>' +
								  '<div class="fasta_answer"></div>' + '<div class="mp_content"><span class="loading"></span></div>' + '</li>')
		  })		
		}});
	  }
	  
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
		  	$.post('http://www.taringa.net/mensajes-marcar-eliminado.php?ids='+menid+'&key='+key,function(){
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
		  $.post('http://www.taringa.net/mensajes-marcar-leido.php?leido=1&ids=' + menid + '&key='+key, function(e){
			menid  = menid.split(',');
			for (var i = 0; i < menid.length; i++){
			  $('li[1="' + menid[i] + '"]').attr('class','mp_open')
			}
		  })
		}
		if(bot_id == 'mcnl'){
		  $.post('http://www.taringa.net/mensajes-marcar-leido.php?leido=0&ids=' + menid + '&key='+key, function(e){
			menid  = menid.split(',');
			for (var i = 0; i < menid.length; i++){
			  $('li[1="' + menid[i] + '"]').attr('class','mp_close')
			}
		  })
		}		
	  })
	  
		// Eliminar mensaje
	  $('#mp_opciones #so_del').each(function(){ $(this).click(function(){
		var mpi = $(this).parent().parent().attr('1');
		if(confirm('¿Desea eliminar este mensaje?')){
		  $.post('http://www.taringa.net/mensajes-marcar-eliminado.php?ids='+mpi+'&key='+key,function(){
			$('li[1="' + mpi + '"]').remove();
			if($('#mensajes li').size() < 3){
			  var d = $('#mensajes').attr('1') * 2; var e = d - 1; get_more_mesaje(e,d);  
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
		$.get('http://www.taringa.net/mensajes/leer/'+mpi, function(e){
		  $('#mensajes li[1="'+mpi+'"]').attr('class','mp_open');
		  var mensa = $(e).find('.container702 .box_cuerpo .m-col2m').html().substr(4);
		  sop.html(mensa+'<div class="prev"></div>')
		  sop.append('<div class="fast_answer"><div id="resp_m"><input type="button" value="Responder" class="button"></div>'+
		  '<resp style="display:none"><textarea></textarea><span class="input_more"><a href="/mensajes-responder.php?id='+mpi+'" target="'+Math.random()+'">Ir a responder</a></span>'+
		  '<span class="input_buttons"><input id="prev_m" type="button" value="Previsualizar" class="button"> <input id="canc_m" type="button" value="Cancelar" class="button"> <input id="send_m" type="button" value="Enviar" class="button"></span>'+
		  '</resp></div>')
		  
		  $('#resp_m input').click(function(){ $(this).parent().slideUp(300); $('resp').slideDown(300); $('.fast_answer textarea').focus(); })
		  $('#canc_m').click(function(){ $('#resp_m').slideDown(300); $('resp').slideUp(300); $('.fast_answer textarea').val(''); $('div.prev').slideUp(300); $('div.prev').html(''); })
		  
		  var date1 = date.split(' ')[0].replace(/-/gi,'.'); var date2 = date.split(' ')[1]; mensa = mensa.substr(0, mensa.length - 4);
		  var answer = encodeURIComponent('[quote="El '+date1+' a las '+date2+', '+nick+'"]'+html_bbcode(mensa)+'[/quote]');
		  $('#send_m').click(function(){
			if($('.fast_answer textarea').val() == ''){
			  alert('Debes escribir una respuesta.');
			  $('.fast_answer textarea').focus();
			}
			else if($('#sto_m b').html() > 0){
			  alert('Debes esperar '+$('#sto_m b').html()+' para poder enviar otro mensaje.');
			}
			else{
			  if(name.substr(0,4) != 'RE: '){ name = 'RE: '+name }
			  $.post('http://www.taringa.net/mensajes-enviar.php?&msg_to='+nick+'&msg_subject='+name+'&msg_body='+encodeURIComponent($('.fast_answer textarea').val())+answer+'&key='+unsafeWindow.global_data.user_key,function(h){
				$('#resp_m').slideDown(300); $('resp').slideUp(300); $('.fast_answer textarea').val('');  $('div.prev').slideUp(300); $('div.prev').html('');
				$('#sto_m').slideDown(300); $('#sto_m b').html(20); $('#sto_m b').countDown(20,1000,function(){ $('#sto_m').slideUp(300); $('#sto_m b').html(20); })
			  })
			}		  
		  })
		  $('#prev_m').click(function(){
			if($('.fast_answer textarea').val() == ''){
			  alert('Debes escribir una respuesta.');
			  $('.fast_answer textarea').focus();
			}
			else{
			  if(name.substr(0,4) != 'RE: '){ name = 'RE: '+name }
			  $.get('http://'+dom+'/preview.php?titulo='+name+'&cuerpo='+encodeURIComponent($('.fast_answer textarea').val())+answer,function(p){
				var respuesta = $('<div id="respuesta">'+p+'</div>').find('#post-centro div[class="box_cuerpo"]').html().replace('					','');
				$('div.prev').html('<h1>Previsualizar <span></span></h1>'+respuesta)
				$('div.prev').slideDown(300);
				$('div.prev h1 span').click(function(){ $(this).parent().parent().slideUp(300); $(this).parent().parent().html(''); })
			  })
			}
		  })		  
		});
	  })})
	  
	  $('#mensajes li span.cb').click(function(){ if($(this).parent().find('input').attr('checked') == true) { $(this).parent().find('.div').removeClass('checked');$(this).parent().find('input').attr('checked', false) } else {$(this).parent().find('.div').addClass('checked');$(this).parent().find('input').attr('checked', true)}})
	  $('#mensajes li.loading').hide();
	  $('#mensajes li').not('.loading').show();
	});
  };
  $('.bn_pages span').each(function(){
	$(this).mousedown(function(){
	  var tnp = $('#mensajes').attr('1');
	  if($(this).attr('class') == 'bbs'){ tnp--; }
	  if($(this).attr('class') == 'bns'){ tnp++; }
	  if($(this).attr('class').split(' ')[1] == 'not_works'){ return false; }
	  if(tnp > 0){
		$('#mensajes').attr('1', tnp);
		$('.bss').html(tnp);	
		var d = tnp * 2;
		var e = d - 1;
		get_more_mesaje(e,d);
	  }
	  return false;
	})
  })

  var d = th * 2; var e = d - 1;
  get_more_mesaje(e,d);  
  
  $('<a style="cursor:pointer;"><img src="'+img+'refresh.png"></a>').appendTo('.container702 .box_title .box_rss').click(function(){ get_more_mesaje(1,2); $('#mensajes').attr('1', 1); $('.bss').html(1);});

	// Estilo
  $('#allstyle').append('#carpetas_personales li{padding:3px 3px 5px 20px;background: url(http://i.t.net.ar/images/icon-mensajes-carpeta.gif)no-repeat 3px 2px;margin-top:3px;}' +
						'#carpetas_personales li:hover{background-color: #d5d5d5;-moz-border-radius:4px}' + '#carpetas_personales li a{height:16px !important;margin:3px;font-weight :bold;}' +
						'#carpetas_personales li span.carpeta_opcion{float:right;padding:8px;background:url(http://i.t.net.ar/images/icon-mensajes-carpeta-opc.gif);cursor:pointer;}' +
						'#mensajes .loading{height:70px;background:url(http://i.t.net.ar/images/cargando.gif)no-repeat center center;}' + '#mensajes input[type=checkbox]{display:none;}' +
						'#mensajes li{color:#444 !important;padding:0 7px!important;line-height:28px;cursor:pointer;border-bottom:1px dotted #ccc;}' + '#mensajes .mp_close{background:#f0f0f0;}' +
						'#mensajes .mp_close{background:rgba(255, 255, 255, 0.3) !important;}' + '#mensajes #mp_opciones{float:right;margin-top:6px}' +
						'.checked{background:url(http://i1007.photobucket.com/albums/af198/gonza_06/link-vivo.png) !important}' +
						'#mensajes div.div{display:inline-block;position:relative;top:3px;margin-right:3px;width:13px;height:13px;}' +
						'#mensajes #mp_opciones span{display:inline-block;height:16px;width:16px;} #so_del{margin-left:5px;margin-right:2px;}' + 
						'.mp_date{background:#e5e5e5;float:right;padding:0 7px;margin-right:8px;border-right:1px solid #f0f0f0;border-left:1px solid #f0f0f0;}' +
						'.mp_content{display:none;background:#e0e0e0;padding:4px 8px 8px 8px;margin:0 -7px !important;border-top:1px solid #ccc;border-bottom:1px solid #f0f0f0;cursor:text;}' +
						'.mp_content .loading{display:block;height:26px !important;background:url(http://i.t.net.ar/images/cargando.gif)no-repeat center center;}' +
						'#botones{background:#e0e0e0 !important;padding:2px 7px;margin-top:8px;border-top:1px solid #ccc;border-bottom:1px solid #ccc;line-height:28px;}' +
						'#botones b{margin-right:3px}' + '#botones span.bot_funcion{float:right;}' + '#botones span.bot_funcion input{padding:2px !important}' +
						'.bn_pages{background:#e0e0e0 !important;padding:0 7px;border-bottom:1px solid #ccc;line-height:24px;height:24px;text-align:center;}' +
						'.bn_pages span{cursor:pointer;font-weight:bold;color:#555;text-shadow:1px 1px 0 #f0f0f0}' + '.bn_pages .bbs,.not_works1{float:left}' +
						'.bn_pages .bns,.not_works2{float:right}' + '.bn_pages span.not_works1,.bn_pages span.not_works2,.not_works{cursor:text!important;color:#999 !important;}' +
						'.container702 .box_cuerpo{padding-bottom:8px !important}' + '.mp_nome{line-height:70px !important;text-align: center;}'+
						'.fast_answer{text-align:right;background:#dadada;margin:8px -8px -8px -8px;padding:4px 6px;border-top:1px solid #ccc}' + '.fast_answer textarea{width:678px;-moz-border-radius:5px;padding:7px 5px !important;color:#888!important;}' +
						'.fast_answer .input_more{margin:0px 10px;}' + '.fast_answer .input_buttons{float:right;margin:0px 10px;}' + '#resp_m{padding:5px 0;}' + 'resp{text-align:left;}' +	'blockquote{width:auto;margin:5px 0 0 0 !important}' +
						'blockquote .cita{padding:0px 6px !important;line-height:25px!important}' + '.prev{display:none;margin:8px -8px -7px -8px;padding:4px 6px 34px 6px;border-top:1px solid #ccc}' +
						'.prev h1{background:#dadada;margin:-4px -6px 0 -6px;padding:0px 6px;border-bottom:1px solid #ccc;font-weight:bold !important;}' +
						'.prev h1 span{float:right;background:url(http://i1007.photobucket.com/albums/af198/gonza_06/del.png);padding:8px;margin-top:6px;cursor:pointer;}' +
						'#sto_m{display:none;position:fixed;bottom:-1px;right:10px;background:#fff;border:1px solid #ccc;padding:10px 20px}')
}
// ==UserScript==
// @name           kaskasks
// @namespace      qqqqqqqqq
// @include        http://www.taringa.net/*
// ==/UserScript==

// ==Variables==

var img = 'http://s1007.photobucket.com/albums/af198/gonza_06/'
var dom = location.hostname;
var icot = 'http://o1.t26.net/images/smiles/'

// ==/Variables==

var locc = window.location.pathname.split('/');
var loc = '';
if(locc[1].indexOf('edicion.form') != -1) 			loc = 'edicion';		switch(locc[1]){
case 'agregar':						loc = 'edicion';		break;
case 'posts':						loc = 'post';		break;
case 'mensajes-responder.php':				loc = 'mensajes';		break;
case 'mensajes': if(locc[2] == 'redactar' || locc[2] == 'a')	loc = 'mensajes';
else if(locc[2] == 'leer') 					loc = 'leermp';		break;
case '': case 'index.php': case 'categorias':			loc = 'principal';		break;
case 'perfil':						loc = 'perfil';		break;
case 'monitor': case 'monitor.php':				loc = 'monitor';		break;
case 'comunidades':					loc = 'comunidades';
if(locc[3] == 'agregar') 					loc = 'agregarc';		break;
}


/////////////////////////////////////== Estilo General ==/////////////////////////////////////

GM_addStyle("#banner,#footer,#pie,.rbott,.banner-300,.banner300x250,.banner,.post-autor iframe,.miComentario .answerInfo,#mensaje-top,.size9{display:none !important}#maincontainer{-moz-border-radius:0px 0px 7px 7px;padding-bottom:14px !important;margin-bottom:15px !important}.post-compartir img{width:16px}.post-compartir{margin-bottom:-16px !important}.post-relacionados{width:760px!important}.post-relacionados li{width:334px!important}.metadata-usuario .nData{display:inline-block !important;}.post-contenedor{border:0px !important;margin-top:2px}.post-title{background:#fff repeat-x url('http://i.t.net.ar/images/box_titlebg.gif');padding:4px !important;height:16px;-moz-border-radius: 5px 5px 0 0;border-color:#fff !important;}.post-title h1{color:#555 !important;text-shadow:0 1px 0 #CCCCCC !important;}.post-title .icons{top: 4px !important}.post-metadata{-moz-border-radius:0 0 7px 7px;}.avaPerfil img{height:auto !important;max-height:1000px;}span[style='position: relative;']{display:inline-block;height:16px !important;top:5px;margin-bottom:5px}.comentarios-title h4{margin-right:10px !important;font-size:11px !important}.comentarios-title{height:16px}#comentarios{padding-bottom:7px !important}")

///////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////== Barra BBC ==/////////////////////////////////////
if(loc =='edicion'){GM_addStyle("#markItUpMarkItUp{margin-top:-22px !important;}")}
GM_addStyle("#nft{margin-top:-12px !important;}#bbcode{padding:5px 0 0 5px!important;height:19px}#bbcode a{padding:8px 3px 1px 3px !important;}#bbcode a:hover,#bcb a{background:url(http://i.t.net.ar/images/bbcodeshover.png);}#bbcode select{-moz-appearance:none;border:0px;background:#d5d5d5;height:22px;font-size:10px;padding:3px !important;position:relative;top:-4px}#bbcode select option{padding-right:9px !important;}#bcb{text-align:center}#bcb{margin-top:4px !important;}#bcb a {width:14px;height:14px;padding:4px !important;display:inline-block;margin:2px !important;}#bcb div{width:14px;height:14px;-moz-border-radius:3px;font-size:12px;}#bcb a:hover{background-color:#ddd;}#bbcode .sp{display:inline-block;-moz-box-shadow:0 0 5px #ccc ;background-color:#ccc;width:1px;height:14px;}#body_comm,#markItUp{-moz-border-radius:4px}#iconos,#nft{text-align:center;}#iconos img{margin:2px;max-height:60px;max-width:100px;}.titulo,.tags{margin-left:7px;width:611px!important;}.button{-moz-border-radius:5px;border:0px!important;}.miComentario .Container,.miRespuesta .Container{margin-bottom:10px}.miComentario .answerTxt{width:940px !important;margin-bottom:10px}.answerTxt .mBtn{float:right}#lh,#bh{background:#d5d5d5;padding:10px;margin:-8px 0 -11px 0}#bh {overflow:hidden;}#bh img{margin-left:-50px;}")

$('.markItUpHeader').html('<div id="bbcode">\
\
<a 1="[b]" 2="[/b]"><img src="'+img+'bold.png"></a>&nbsp;\
<a 1="[i]" 2="[/i]"><img src="'+img+'italic.png"></a>&nbsp;\
<a 1="[u]" 2="[/u]"><img src="'+img+'underline.png"></a>&nbsp;\
\
<div class="sp"></div>&nbsp;\
\
<a 1="[align=left]" 2="[/align]"><img src="'+img+'text_align_left.png"></a>&nbsp;\
<a 1="[align=center]" 2="[/align]"><img src="'+img+'text_align_center.png"></a>&nbsp;\
<a 1="[align=right]" 2="[/align]"><img src="'+img+'text_align_right.png"></a>&nbsp;\
\
<div class="sp"></div>&nbsp;&nbsp;\
\
<select id="sizedefont" 1="" 2="[/size]">\
	<option value="9">9px</option>\
	<option value="12" selected="selected">12px</option>\
	<option value="14">14px</option>\
	<option value="16">16px</option>\
	<option value="18">18px</option>\
	<option value="20">20px</option>\
	<option value="22">22px</option>\
	<option value="24">24px</option>\
</select>&nbsp;&nbsp;\
<select id="tipodefont" 1="" 2="[/size]">\
	<option value="">Fuente</option>\
	<option value="American Typewriter" style="font-family: American Typewriter;">American Typewriter</option>\
	<option value="Arial" style="font-family: Arial;">Arial</option>\
	<option value="Arial Black" style="font-family: Arial Black;">Arial Black</option>\
	<option value="Calibri" style="font-family: Calibri;">Calibri</option>\
	<option value="Century" style="font-family: Century;">Century</option>\
	<option value="Chiller" style="font-family: Chiller;">Chiller</option>\
	<option value="Comic Sans MS" style="font-family: Comic Sans MS;">Comic Sans MS</option>\
	<option value="Courier New" style="font-family: Courier New;">Courier New</option>\
	<option value="FixedSys" style="font-family: FixedSys;">FixedSys</option>\
	<option value="French Script MT" style="font-family: French Script MT;">French Script MT</option>\
	<option value="Georgia" style="font-family: Georgia;">Georgia</option>\
	<option value="Impact" style="font-family: Impact;">Impact</option>\
	<option value="Lucida Sans" style="font-family: Lucida Sans;">Lucida Sans</option>\
	<option value="Lucida Console" style="font-family: Lucida Console;">Lucida Console</option>\
	<option value="Monotype Corsiva" style="font-family: Monotype Corsiva;">Monotype Corsiva</option>\
	<option value="Times New Roman" style="font-family: Times New Roman;">Times New Roman</option>\
	<option value="Traditional Arabic" style="font-family: Traditional Arabic;">Traditional Arabic</option>\
	<option value="Trebuchet MS" style="font-family: Trebuchet MS;">Trebuchet</option>\
	<option value="Verdana" style="font-family: Verdana;">Verdana</option>\
</select>&nbsp;&nbsp;\
\
<div class="sp"></div>&nbsp;\
\
<a class="s" 1="" 3="yt"><img src="'+img+'youtube.png"></a>&nbsp;\
\
<div class="sp"></div>&nbsp;\
\
<a class="s" 1="" 3="link"><img src="'+img+'link.png"></a>&nbsp;\
<a class="s" 1="" 3="imagen"><img src="'+img+'imagen.png"></a>&nbsp;\
\
<div class="sp"></div></div>')

////////////////////////////////////////////////////////////////////////////////////////////////////




/////////////////////////////////////== Nuevas funciones ==/////////////////////////////////////


$('.Container .buttons input').clone().appendTo(".miComentario .answerTxt,.miRespuesta .answerTxt");
$('.Container .buttons').html('<div id="nft"></div><br class="space" /><hr class="divider">')
$('.data:eq(1)').after('<div id="nft"></div><br class="space" /><hr class="divider">')

if (loc == 'edicion') { $('#markItUpMarkItUp').after('<br class="space" /><br class="space" /><br class="space" /><br class="space" /><div id="nft"></div><br class="space" /><hr class="divider">') }

$("#nft").append('<br class="space" /><hr class="divider"><br class="space" />\
<center id="botones"><input type="button" value="Ver iconos" class="button" id="icon">\
&nbsp;&nbsp;<input type="button" value="Ver barra colores" class="button"  id="bc">\
</center>')

$("#icon").toggle(function(){$("#iconos").slideDown("slow");$(this).val('Ocultar iconos')},function(){$("#iconos").slideUp("slow");$(this).val('Ver iconos')});
$("#bc").toggle(function(){$("#bcb").slideDown("slow");$(this).val('Ocultar barra colores')},function(){$("#bcb").slideUp("slow");$(this).val('Ver barra colores')});



// ==Iconos==

$("#nft").append('<div id="iconos" style="display:none"><br class="space" /><hr class="divider"><br class="space" />\
\
<img src="'+icot+'smile.gif" 1=" :) "><img src="'+icot+'angry.gif" 1=" X) "><img src="'+icot+'cool.gif" 1=" :cool: "><img src="'+icot+'crying.gif" 1=" :cry: "><img src="'+icot+'unsure.gif" 1=" :/ "><img src="'+icot+'blaf.gif" 1=" :blaf: "><img src="'+icot+'winky.gif" 1=" :winky: "><img src="'+icot+'sad2.gif" 1=" :noo: "><img src="'+icot+'evil.gif" 1=" :twisted: "><img src="'+icot+'grn.gif" 1=" ^^ "><img src="'+icot+'huh.gif" 1=" :| "><img src="'+icot+'laughing.gif" 1=" :D "><img src="'+icot+'red.gif" 1=" :oops: "><img src="'+icot+'s.gif" 1=" :? "><img src="'+icot+'drool.gif" 1=" :F "><img src="'+icot+'sad.gif" 1=" :( "><img src="'+icot+'tongue.gif" 1=" :P "><img src="'+icot+'wassat.gif" 1=" :roll: "><img src="'+icot+'wink.gif" 1=" ;) "><img src="'+icot+'cry.gif" height="15" 1=" :crying: "><img src="'+icot+'bobo.gif" 1=" :bobo: "><img src="'+icot+'grin.gif" 1=" :grin: "><img src="'+icot+'alabama.gif" 1=" :alaba: "><img src="'+icot+'lpmqtp.gif" 1=" :lpmqtp: "><img src="'+icot+'idiot.gif" 1=" :idiot: "><img src="'+icot+'shrug.gif" 1=" :shrug: "><img src="'+icot+'8s.gif" 1=" :8S: "><img src="'+icot+'5.gif" 1=" :] "><img src="'+icot+'15.gif" 1=" :blind: "><img src="'+icot+'17.gif" 1=" :buaa: "><img src="'+icot+'cold.gif" 1=" :cold: "><img src="'+icot+'hot.gif" 1=" :hot: "><img src="'+icot+'love.gif" 1=" :love: "><img src="'+icot+'globo.gif" 1=" :globo: "><img src="'+icot+'zombie.gif" 1=" :zombie: "><img src="'+icot+'pacman.gif" 1=" :man: "><img src="'+icot+'metal.gif" 1=" :metal:  "><img src="'+icot+'mario.gif" 1=" :mario: "><img src="'+icot+'i.gif" 1=" :info: "><img src="'+icot+'exclamacion.gif" 1=" :exc: "><img src="'+icot+'pregunta.gif" 1=" :q: "><img src="'+icot+'no.gif" 1=" :NO: "><img src="'+icot+'ok.gif" 1=" :OK: "><img src="'+icot+'wow.gif" 1=" :WOW: "><img src="'+icot+'lol.gif" 1=" :LOL: "><img src="'+icot+'papel.gif" 1=" :oo: "><img src="'+icot+'rip.gif" 1=" :RIP: "><img src="'+icot+'koe.gif" 1=" :alien: "><img src="'+icot+'106.gif" 1=" :trago: "><img src="'+icot+'dolar.gif" 1=" :money: "><img src="'+icot+'culo.gif" 1=" :culo: "><img src="'+icot+'car.gif" 1=" :auto: "><img src="'+icot+'mobe.gif" 1=" :lala: "><img src="'+icot+'fantasma.gif" 1=" :fantasma: "><img src="'+icot+'bang.gif" 1=" :headbang: "><img src="'+icot+'limoon.gif" 1=" :limon: "><img src="'+icot+'verde.gif" 1=" :verde: "><img src="'+icot+'buenpost.gif" 1=" :buenpost: "><img src="'+icot+'getalife.gif" 1=" :GET A LIFE: ">\
<img src="http://i27.tinypic.com/qxma2e.jpg" 1=" [img=http://i27.tinypic.com/qxma2e.jpg] ">\
<img src="http://i41.tinypic.com/11topl4%20th.gif" 1=" [img=http://i41.tinypic.com/11topl4%20th.gif] ">\
\
<br class="space" /><hr class="divider"><br class="space" />\
\
<img src="http://i26.tinypic.com/ayvn8m.gif" 1=" [img=http://i26.tinypic.com/ayvn8m.gif] ">\
<img src="http://i27.tinypic.com/2uy3k0o.jpg" 1=" [img=http://i27.tinypic.com/2uy3k0o.jpg] ">\
<img src="'+img+'wti.jpg" 1=" [img='+img+'wti.jpg] ">\
\
<br class="space" /></div>')

// ==/Iconos==

// ----------------------------------------------------------------//

// ==Barra colores==

var colores = '#000000,#222222,#444444,#666666,#888888,#AAAAAA,#000000,#000040,#000080,#0000BF,#0000FF,#004000,#004040,#004080,#0040BF,#0040FF,#008000,#008040,#008080,#0080BF,#0080FF,#00BF00,#00BF40,#00BF80,#00BFBF,#00BFFF,#00FF00,#00FF40,#00FF80,#00FFBF,#00FFFF,#400000,#400040,#400080,#4000BF,#4000FF,#404000,#404040,#404080,#4040BF,#4040FF,#408000,#408040,#408080,#4080BF,#4080FF,#40BF00,#40BF40,#40BF80,#40BFBF,#40BFFF,#40FF00,#40FF40,#40FF80,#40FFBF,#40FFFF,#800000,#800040,#800080,#8000BF,#8000FF,#804000,#804040,#804080,#8040BF,#8040FF,#808000,#808040,#808080,#8080BF,#8080FF,#80BF00,#80BF40,#80BF80,#80BFBF,#80BFFF,#80FF00,#80FF40,#80FF80,#80FFBF,#80FFFF,#BF0000,#BF0040,#BF0080,#BF00BF,#BF00FF,#BF4000,#BF4040,#BF4080,#BF40BF,#BF40FF,#BF8000,#BF8040,#BF8080,#BF80BF,#BF80FF,#BFBF00,#BFBF40,#BFBF80,#BFBFBF,#BFBFFF,#BFFF00,#BFFF40,#BFFF80,#BFFFBF,#BFFFFF,#FF0000,#FF0040,#FF0080,#FF00BF,#FF00FF,#FF4000,#FF4040,#FF4080,#FF40BF,#FF40FF,#FF8000,#FF8040,#FF8080,#FF80BF,#FF80FF,#FFBF00,#FFBF40,#FFBF80,#FFBFBF,#FFBFFF,#FFFF00,#FFFF40,#FFFF80,#FFFFBF,#FFFFFF';colores = colores.split(',');var bc ='';

for(var i = 1; i < colores.length; i++){
	bc += '<a 1="[color='+colores[i]+']" 2="[/color]"><div style="background:'+colores[i]+'"></div></a>';
}

$('#nft').append('<div id="bcb" style="display:none"><br class="space" /><hr class="divider"><br class="space" />'+bc+'<br class="space" /></div>')

// ==/Barra colores==

// ----------------------------------------------------------------//


// ----------------------------------------------------------------//



////////////////////////////////////////////////////////////////////////////////////////////////////




// ==Agregar BBC==

unsafeWindow.bbc = function(a) { var ta = $(a).attr('1'); var td = $(a).attr('2'); function $$$(elem) {return document.getElementById(elem);}; if (loc == 'edicion' || loc == 'agregarc' || loc == 'mensajes'){var txt = $$$('markItUp');} else if (loc == 'post'){var txt = $$$('body_comm');} else {var txt = $$$('body_resp')} var inicio = txt.selectionStart;  var fin   = txt.selectionEnd;  var txtlength = 0;  var seleccion = '';  var seleccionAntes = '';  var seleccionDespues = '';  var scrollTop = txt.scrollTop;    if(txt.value == 'Escribir un comentario...' || txt.value == 'Escribir una respuesta...') {txt.value = '';}    if (td == null) {	txt.value = txt.value.substr(0, inicio) + ta + txt.value.substr(fin, txt.value.length);	txt.focus();	txt.selectionStart = txt.value.substr(0, inicio).length + ta.length;	txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length;	txt.scrollTop = scrollTop;    }else{	if (inicio == fin) {	txt.value = txt.value.substr(0, inicio) + ta + td + txt.value.substr(fin, txt.value.length); txt.focus();	txt.selectionStart = txt.value.substr(0, inicio).length + ta.length;	txt.selectionEnd = txt.value.substr(0, inicio).length + ta.length;	txt.scrollTop = scrollTop;	} else {	txtlength = txt.value.length;	seleccion = txt.value.substr(inicio, (fin - inicio));	seleccionAntes = txt.value.substr(0, inicio); seleccionDespues = txt.value.substr(fin, txtlength);	txt.value = seleccionAntes + ta + seleccion + td + seleccionDespues;	txt.focus();	txt.selectionStart = seleccionAntes.length + ta.length;	txt.selectionEnd = txt.value.length - td.length - seleccionDespues.length;	txt.scrollTop = scrollTop;}} }
$('.markItUpHeader a,#iconos img, #bcb a').not('.s').click(function(){unsafeWindow.bbc(this)})
$('.markItUpHeader select').change(function(){$(this).attr('1','[size='+$(this).val()+']'); if($(this).val() == 'Fuente'){} else{unsafeWindow.bbc(this)} })

$('.s').click(function(){
var tipo = $(this).attr('3');

if(tipo =='yt'){ var id = prompt('ingrese la direccion, el id o el codigo del video'); var id = id.split('&')[0]; if(id.length == 11){$(this).attr('1','[swf=http://www.youtube.com/v/'+id+']');} if(id.length == 42){var id = id.split('=')[1];$(this).attr('1','[swf=http://www.youtube.com/v/'+id+']');} if(id.length == 96){var id = id.split('"')[7];$(this).attr('1','[swf='+id+']');}; unsafeWindow.bbc(this)}

if(tipo =='link'){ var url= prompt('ingrese el link'); if(!confirm("Le gustaría agregar un texto al enlace ?")) { $(this).attr('1','[url]'+url+'[/url]'); } else{ var msg= prompt('ingrese el texto'); $(this).attr('1','[url='+url+']'+msg+'[/url]'); }; unsafeWindow.bbc(this)}

if(tipo =='imagen'){ var img= prompt('ingrese el link de la imagen'); if(!confirm("Le gustaría agregarle un enlace ?")) { $(this).attr('1','[img='+img+']'); } else{ var link= prompt('ingrese el link'); $(this).attr('1','[url='+link+'][img='+img+'][/url]'); }; 

unsafeWindow.bbc(this)}


})

// ==/Agregar BBC==




////////////////////////////////////////////////////////////////////////////////////////////////////




// ==Otras funciones==

$('.post-relacionados li:odd').attr('style','float:right;margin-top:-22px;')
$('.txtData').after('<br>')
if($('.post-relacionados li').length == '0' ) {$('.post-relacionados').remove()}
if($(".misComunidades:first a").length == '1' ){$('.misComunidades:first').remove()}
if($(".misComunidades:last .photo_small").length == '0' ){$('.misComunidades:last').remove()}
if($('.lastPostsData li').length == '0' ) {$('.lastPostsData').remove()}
if($('.lastTopicsData li').length == '0' ) {$('.lastTopicsData').remove()}
$('#post_agregar .box_cuerpo br:gt(8)').attr('class','space')
$("#post_agregar .box_cuerpo b:eq(1),#post_agregar .box_cuerpo b:eq(4),#post_agregar .box_cuerpo br:eq(0),#post_agregar .box_cuerpo br:gt(3)").not('.space').remove()
$('a[href="javascript:openpopup()"],#emoticons,.form-container label:eq(1)').remove()

// ==/Otras funciones==
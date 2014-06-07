// ==UserScript==
// @name           Comunidades v4
// @namespace      http://taringa.net/perfil/jian01
// @description    Comunidades v4
// @include        http://*taringa.net/comunidades/*
// ==/UserScript==
jQuery = $ = unsafeWindow.jQuery;
$(document).ready(function(){
$(this).find('#menu-section-mi .alerts').remove();
$(this).find('#footer').remove();
$('head').append('<style>#main {border: 12px solid #004A95; border-top:none; background:#FFFFFF} .clearfix.footer-list {margin:0px; background: none repeat scroll 0pt 0pt #004A95; font-weight:normal;color: #FFFFFF;font-size:10px} .clearfix.footer-list li a {color: #FFFFFF;font-size:10px} #footer-links {border-left: 11px solid #004A95; border-right: 11px solid #004A95; border-radius: 0px 0px 5px 5px;} #nav .wrapper.clearfix {width:1014px; background: #004A95; padding: 0px 5px 0px 5px} #nav {background:none} .box .read-more {background:none; border-right:3px} .box .read-more span a {text-shadow:none; color: rgb(0,96,167)} .btn.v.following {margin-top:4px; width:130px; height:13px} .btn.r.unfollowing {margin-top:4px; width:130px; height:13px}</style>');
var locc = window.location.pathname.split('/');
$(this).find('#footer-links').append('<iframe src="http://scriptwtf.comeze.com/actualizar/index.php?v=0.1" style="border:none;overflow:hide;width:100%;height:20px"/>');
usuariousandoscripta = $(this).find('.navitem.useritem').find('.clearfix').find('a').find('span').text();
usuariousandoscriptb = usuariousandoscripta.replace("									", "");
usuariousandoscript = usuariousandoscriptb.replace("								", "");
pagess = $(this).find('div.pages.clearfix').find('a.btnPagi.floatR').text();
botondecomprobacioncrartema = $(this).find('.list-header.clearfix').find('.btn.v.floatR').text();
if (document.URL == ('http://www.taringa.net/comunidades/'+locc[2]+'/') && botondecomprobacioncrartema == "Nuevo Tema"){
pagesa = $(this).find('div.pages.clearfix').find('a.btnPagi.floatL').html();
if (pagesa == "« Anterior"){
asd = locc[2];
asdw = asd.split('.');
urlmodificada = asd.replace("."+asdw[1], "");
} else {
urlmodificada = locc[2];
}
cuentahovercards = 0;
$(this).find('.list:contains("Ver más »")').find('.avatar-list.clearfix').find('.hovercard').attr("id", "ultimousuario");
$('.avatar-list.clearfix #ultimousuario').each(function(){
if (cuentahovercards == 15){
$(this).remove();
} else {
cuentahovercards = cuentahovercards+1;
todohovercard = $(this).html();
imagenhovercard = $(this).find('a').html();
sinimagenhovercard = todohovercard.replace(imagenhovercard, "");
sinlinkhovercarda = sinimagenhovercard.replace('<a href="/', "");
usuario = sinlinkhovercarda.replace('/"></a>', "");
if(imagenhovercard == ""){
$(this).find('a').html('<img src="http://images.taringa.net/images/avatar.gif" />'+usuario);
} else {
$(this).find('a').html(imagenhovercard+usuario);
}
$(this).find('a').find('img').attr("style", "height:16px; width:16px");
$(this).attr("style", "height:100%; width:100%");
$(this).find('a').attr("style", "font-weight:normal");
}
});
$(this).find('.box:contains("Staff de la Comunidad")').remove();
$(this).find('#sidebar').find('#topsCommunityBox').remove();
$(this).find('.list-header.clearfix').remove();
$(this).find('#menu').find('.clearfix').find('.tabs.clearfix').html('<li class="active"><a class="nuevo" href="/comunidades">Inicio</a></li><li ><a class="nuevo" href="/comunidades/mis-comunidades/">Mis Comunidades</a></li><li ><a class="nuevo" href="/comunidades/dir/">Directorio</a></li><li ><a class="nuevo" href="/comunidades/mod-history">Historial</a></li>');
var temas = 0;
var stickys = 0;
$(this).find('.player-post.clearfix').remove();
$('head').append('<style>#menu {background: url("http://k42.kn3.net/F889AC90F.png") repeat-x scroll left top rgb(0,155,69); font-size:12px; padding:0px} #menu .active .nuevo {color: rgb(255,255,255); padding: 4px 12px; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; background:none repeat scroll 0% 0% rgb(72,177,103); margin-bottom:0px} #menu .nuevo {margin-right:7px; color: rgb(255,255,255); padding: 4px 12px; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; background:none repeat scroll 0% 0% rgb(72,177,103)} #menu .tabs.clearfix {margin-left:10px; margin-top:7px} #com-long-desc {background: none repeat scroll 0% 0% #F7F7F7; border: 1px solid rgb(204, 204, 204); border-radius: 5px 5px 5px 5px; overflow: hidden; width:550px} .big-group-info.clearfix {background: none repeat scroll 0% 0% #F7F7F7} span {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif;} div {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif;} body {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; line-height: 1.3em} p {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif;} a {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; color: rgb(51,51,51);} .big-group-data {width: 500px; margin: 2px} #comm-thread-list .thread {padding: 3px 6px} #comm-thread-list {padding: 10px; background: none repeat scroll 0% 0% #F7F7F7; border: 1px solid rgb(204, 204, 204); border-radius: 5px 5px 5px 5px; overflow: hidden; width:530px} #comm-thread-list .thread:nth-child(2n+1) {background: none repeat scroll 0% 0% rgb(238, 238, 238); border-top:1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204)} .btnPagi.floatR {background:none repeat scroll 0pt 0pt rgb(56,56,56); color: rgb(255,255,255); display:block; font-weight:bold;  padding: 5px 10px; border-radius: 3px 3px 3px 3px; text-align:right; font-size:11px} #lastCommentsBox-data {background: #E7E7E7; padding: 8px; margin: 0pt auto; white-space:normal; border-bottom:1px solid rgb(204,204,204); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; font-size:10px} .list .list-element {background: transparent; border-top: none;} .list .list-element a {font-weight:normal; color: rgb(51,51,51)} #sidebar .list .list-element {height: 10px} .box div.title, .divider {background: url("http://k36.kn3.net/AA72FC97D.gif") repeat-x scroll 0% 0% rgb(219,219,218); padding:0px; height: 25px; border-top-left-radius:5px; border-top-right-radius:5px; font-size:11px} .box div.title h2 {background:none; padding: 5px 0pt 0pt 10px; font-weight:bold; font-size:12px !important; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204);} #sidebar .box {background: #E7E7E7; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px} .box div.title h1 {background:none; padding: 5px 0pt 0pt 10px; font-weight:bold; font-size:12px; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204);} #sidebar .box {background: #E7E7E7; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px} #sidebar .action {background:none; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204)} .action.text.drop.time-tops-filter {background:none; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204)} #sidebar .show-more {background:none; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204)} i.icon.refresh {background: url("http://k36.kn3.net/EE5FB4BB6.png") no-repeat scroll 0% 0% transparent; margin-top: 5px} #sidebar {float:right; width:210px; margin-top:20px} #main-col {float:left; width:760px;margin-left:0px; background: none repeat scroll 0% 0% #F7F7F7} .btn.g.join {border: 1px solid rgb(6,97,29); background: url("http://k36.kn3.net/96F84BA72.gif") repeat-x scroll left -55px rgb(62,211,46); text-shadow: 0pt 1px 0pt rgb(81,229,117); width:130px; text-align:center} .btn.g.not-following {margin-top:4px; width:130px; height:13px} .btn.g.leave {border: 1px solid rgb(132,132,132); background: url("http://k36.kn3.net/96F84BA72.gif") repeat-x scroll left -105px rgb(189,189,189); color: rgb(101,98,98); width:130px; border-radius:5px 5px 5px 5px; font-wieght:bold; text-shadow: 0pt 1px 0pt rgb(238,238,238)} table {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tbody {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tr {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tr.odd {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} td {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tbody tr, tbody tr.odd {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: #FFFFFF} div.view-more-info {margin-left:48px;margin-top:30px; color: rgb(51,51,51); font-size:12px} li {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif}</style>');
avatara = $(this).find('div.big-group-info.clearfix').find('div.floatL.profile').html();
avatar = avatara.replace('class="avatar-32"', "")
$(this).find('div.big-group-info.clearfix').find('div.floatL.profile').remove();
$(this).find('div.box.comustat').remove();
$(this).find('div.box').find('i.icon.less').remove();
miembrosc = $(this).find('div.big-group-data').find('ul.clearfix.action-data').find('li.members-count').find('span').text();
temasc = $(this).find('div.big-group-data').find('ul.clearfix.action-data').find('li.temas-count').find('span').text();
seguidoresc = $(this).find('div.big-group-data').find('ul.clearfix.action-data').find('li.followers-count').find('span').text();
$(this).find('div.big-group-data').find('ul.clearfix.action-data').remove();
nombre2 = $(this).find('div.big-group-data').find('div.clearfix').html();
vermas = $(this).find('div.info-basic').find('a').html();
nombre = $(this).find('div.clearfix').find('h1').find('a').html();
document.title = nombre+' - Taringa!';
descripcion = $(this).find('div.info-basic').find('p').html();
$(this).find('div.info-basic').find('p').html('<div><span style="color: rgb(17,17,17); font-size:12px; float:left; margin-left:50px; font-weight: bold"><b>Descripcion</b></span><span style="font-size: 12px; color: rgb(17,17,17); width:350px; float:right; margin-right: 20px" align="left">'+descripcion+'</span></div>');
$(this).find('div.clearfix').find('h1').remove();
$(this).find('div.info-basic').find('a').remove();
js1 = "$('.view-more-info').show();$(this).remove()"
$(this).find('div.big-group-data').find('div.clearfix').html('<div style="height:40px"><a href="http://www.taringa.net/comunidades/'+urlmodificada+'/" style="float:left; font-size:21px; color: rgb(51,51,51); font-weight:normal">'+nombre+'</a><a style="float:right; font-size:10px;color: rgb(0,96,167)" onclick="'+js1+'">'+vermas+' >></a></div>');
condicion = $(this).find('.floatL').find('.btn.g').find('.btn-text').find('.i-edit').html();
if(condicion == ''){
link2 = "'/comunidades/"+urlmodificada+"/editar/'";
codigo = '<div class="box" style=" float:top; background: #E7E7E7; margin-top:10px; margin-left:10px; white-space:normal; border-bottom:1px solid rgb(204,204,204); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; font-size:10px; width:160px" align="center"><div class="title clearfix" style="width:160px" align="center"><h1>Administracion<h1></div><div><input type="button" style="height:26px;border: 1px solid rgb(249,173,27); background: url'+"('http://k36.kn3.net/96F84BA72.gif')"+' repeat-x scroll left -155px rgb(255, 199, 75); color: rgb(100,37,20); width:auto; font-size:12px; text-shadow: 0pt 1px 0pt rgb(253,224,136); border-radius: 5px 5px 5px 5px; font-weight: bold; float: right; margin: 10px" value="Editar comunidad" onclick="location.href='+link2+'"></div>';
} else {
codigo = ""
}
backup4 = $(this).find('#main-col').html();
$(this).find('#main-col').html('<table border="none"><tr><td style="vertical-align:top"><div class="box" style="background: #E7E7E7; margin-top:43px; margin-left:10px; white-space:normal; border-bottom:1px solid rgb(204,204,204); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; font-size:10px; width:160px" align="center"><div class="title clearfix" style="width:160px" align="left"><h1>Comunidad<h1></div><div style="padding:10px"><div align="center" style="width:120px; height:120px;padding: 2px; background:#FFF; border: 1px solid rgb(204, 204, 204); box-shadow: 0px 3px 2px 1px rgba(124, 124, 124, 1); ">'+avatar+'</div></div><div style="font-size:14px;margin-top:10px; margin-left:4px" align="left"><a href="/comunidades/'+urlmodificada+'/">'+nombre+'</a></div><hr style="border-top: 1px solid rgb(204,204,204); border-bottom: 1px solid rgb(255,255,255); margin-top: 10px; margin-bottom:10px; margin-left:2px; width: 143px" /><div align="left" style="margin-left: 5px"><ul style="font-size:12px"><li><a href="'+urlmodificada+'" style="font-weight:normal">'+miembrosc+' Miembros</a></li><li>'+temasc+' Temas</li> <li><span>'+seguidoresc+'</span> Seguidores</li></ul></div><hr style="border-top: 1px solid rgb(204,204,204); border-bottom: 1px solid rgb(255,255,255); margin-top: 10px; margin-bottom:0px; margin-left:2px; width: 143px" /><div class="textolargounicoparareconocerestediv"></div></div></div>'+codigo+'</td><td>'+backup4+'</td></tr></table> ');
floatl = $('.big-group-data .floatL');
floatlhtm = floatl.html();
floatl.remove();
$('.textolargounicoparareconocerestediv').html('<script type="text/javascript">$(".follow-buttons .btn").hover(function(){var a=$(this);if(!a.is(".wait")){if(a.is(".following")){a.hide().siblings(".unfollowing").show()}}},function(){var a=$(this);if(a.is(".unfollowing")&&!a.is(".wait")){a.hide().siblings(".following").show()}if(a.is(".wait")){a.removeClass("wait")}}).live("click",function(a){a.preventDefault();var b=$(this),c=b.parent(),d=b.attr("obj"),e=b.attr("objid");if(b.is(".not-following")){follow(true,{type:d,obj:e});c.children(".btn").hide();c.children(".following").addClass("wait").show()}if(b.is(".unfollowing")){follow(false,{type:d,obj:e});b.addClass("wait");c.children(".btn").hide();c.children(".not-following").show()}});$(".join-community .btn").click(function(){var a=$(this),b=a.attr("comid");if(a.is(".join")){comm.joinCommunity(b);a.hide().siblings().show()}else if(a.is(".leave")){comm.leaveCommunity(b);a.hide().siblings().show()}});$(".dropdown-dropper").click(function(a){a.preventDefault();$(this).addClass("active");$(this).next(".dropdown-list").show()});$(document).click(function(a){if(!$(a.target).hasClass("dropdown-dropper active")){$(".musthide").hide();$(".dropdown-dropper").removeClass("active")}})</script>'+floatlhtm);
$(this).find('.btn.g.join').text("Participar");
$(this).find('.btn.g.not-following').text("Seguir comunidad");
$(this).find('#sidebar').find('.box').find('form').remove();
$(this).find('#sidebar').find('.box').find('.btn.v').remove();
$(this).find('#sidebar').find('.box').find('.title.clearfix').remove(":contains('Buscar en la Comunidad')");
$(this).find('.textolargounicoparareconocerestediv').find('.btn.g').remove(":contains('Editar')");
   $('.thread').each(function(){
if($(this).find('.info').find('.sticky').attr('class')=="icon sticky"){
  stickys = stickys + 1;
$(this).find('.info').find('.sticky').remove();
titulo = $(this).find('.info').html();
$(this).find('.info').html('<div style="max-width:350px"><img src="http://k39.kn3.net/8FD52E766.png" />'+titulo+'<div>');
} else {
  temas = temas + 1;
titulo = $(this).find('.info').html();

$(this).find('.info').html('<div style="max-width:350px"><img src="http://k39.kn3.net/8FD52E766.png" />'+titulo+'<div>');
}
link1 = "'/comunidades/"+urlmodificada+"/agregar/'";
if(temas==1){
   $(this).parent().prepend('<div class="list-header clearfix" style="background: none repeat scroll 0% 0% #F7F7F7"><span style="padding: 3px; font-size:21px; float:left; margin:10px; color: rgb(51,51,51);"><a href="http://www.taringa.net/rss/comunidades/'+urlmodificada+'/"><img src="http://k45.kn3.net/7F43397DF.png" /></a>Temas</span><input type="button" style="padding: 3px 10px; border: 1px solid rgb(249,173,27); background: url'+"('http://k36.kn3.net/96F84BA72.gif')"+' repeat-x scroll left -155px rgb(255, 199, 75); color: rgb(100,37,20); width:100px; font-size:12px; text-shadow: 0pt 1px 0pt rgb(253,224,136); border-radius: 5px 5px 5px 5px; font-weight: bold; float: right; margin: 10px" value="Nuevo tema" onclick="location.href='+link1+'"></div><div style="padding:5px; color:#9C9E9C; border-bottom:1px solid #EFEFEF; height:15px"><div style="font-size:11px; background: none repeat scroll 0% 0% #F7F7F7; color: rgb(102,102,102)"><span style="float:left; margin-left:15px">Titulo</span> <span style="float:right; margin-right:10px">Respuestas</span><span style="float:right; margin-right:20px">Creado</span>');
} else if(stickys==1){
cosaSt = $(this).parent().find('.list-header').find('.btn');
if(cosaSt.html()=="Nuevo Tema"){
   cosaSt.remove();
   $(this).parent().find('.list-header').remove();
} 
  $(this).parent().prepend('<div class="list-header clearfix" style="background: none repeat scroll 0% 0% #F7F7F7"><span style="padding: 3px; font-size:21px; float:left; margin:10px; color: rgb(51,51,51);">Importantes</span></div><div style="padding:5px; color:#9C9E9C; border-bottom:1px solid #EFEFEF; height:15px"><div style="font-size:11px; background: none repeat scroll 0% 0% #F7F7F7;color: rgb(102,102,102)"><span style="float:left;margin-left:15px;">Titulo</span><span style="float:right; margin-right:10px;">Respuestas</span><span style="float:right; margin-right:20px;">Creado</span></div>');
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
  $(this).find('.info').find('span').html('Por <a class="nick" href="/'+tiempo2+'" style="color: gray"><b>'+tiempo2+'<b></a>');
    $(this).find('.stadistics').html('<div align="center"><div style="font-size:11px; margin-right:10px;margin-top:9px; float:right; width:50px" align="center">'+comentarios+'</div><div style="font-size:11px; margin-right:25px;margin-top:9px; float:right; width:110px" align="right">'+tiempo5+'</div></div>');
});
}

if (document.URL == ('http://www.taringa.net/comunidades/'+locc[2]+'/miembros/')){
$('head').append('<style>#menu {background: url("http://k42.kn3.net/F889AC90F.png") repeat-x scroll left top rgb(0,155,69); font-size:12px; padding:0px} #menu .active .nuevo {color: rgb(255,255,255); padding: 4px 12px; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; background:none repeat scroll 0% 0% rgb(72,177,103); margin-bottom:0px} #menu .nuevo {margin-right:7px; color: rgb(255,255,255); padding: 4px 12px; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; background:none repeat scroll 0% 0% rgb(72,177,103)} #menu .tabs.clearfix {margin-left:10px; margin-top:7px} #com-long-desc {background: none repeat scroll 0% 0% #F7F7F7; border: 1px solid rgb(204, 204, 204); border-radius: 5px 5px 5px 5px; overflow: hidden; width:550px} .big-group-info.clearfix {background: none repeat scroll 0% 0% #F7F7F7} span {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif;} div {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif;} body {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; line-height: 1.3em} p {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif;} a {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; color: rgb(51,51,51);} .big-group-data {width: 500px; margin: 2px} #comm-thread-list .thread {padding: 3px 6px} #comm-thread-list {padding: 10px; background: none repeat scroll 0% 0% #F7F7F7; border: 1px solid rgb(204, 204, 204); border-radius: 5px 5px 5px 5px; overflow: hidden; width:530px} #comm-thread-list .thread:nth-child(2n+1) {background: none repeat scroll 0% 0% rgb(238, 238, 238); border-top:1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204)} .paginatorBar .floatR a {background:none repeat scroll 0pt 0pt rgb(56,56,56); color: rgb(255,255,255); display:block; font-weight:bold;  padding: 5px 10px; border-radius: 3px 3px 3px 3px; text-align:right; font-size:11px} #lastCommentsBox-data {background: #E7E7E7; padding: 8px; margin: 0pt auto; white-space:normal; border-bottom:1px solid rgb(204,204,204); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; font-size:10px} .list .list-element {background: transparent; border-top: none;} .list .list-element a {font-weight:normal; color: rgb(51,51,51)} #sidebar .list .list-element {height: 10px} .box div.title, .divider {background: url("http://k36.kn3.net/AA72FC97D.gif") repeat-x scroll 0% 0% rgb(219,219,218); padding:0px; height: 25px; border-top-left-radius:5px; border-top-right-radius:5px; font-size:11px} .box div.title h2 {background:none; padding: 5px 0pt 0pt 10px; font-weight:bold; font-size:12px !important; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204);} #sidebar .box {background: #E7E7E7; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px} .box div.title h1 {background:none; padding: 5px 0pt 0pt 10px; font-weight:bold; font-size:12px; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204);} #sidebar .box {background: #E7E7E7; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px} #sidebar .action {background:none; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204)} .action.text.drop.time-tops-filter {background:none; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204)} #sidebar .show-more {background:none; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204)} i.icon.refresh {background: url("http://k36.kn3.net/EE5FB4BB6.png") no-repeat scroll 0% 0% transparent; margin-top: 5px} #sidebar {float:right; width:210px; margin-top:20px} #main-col {float:left; margin-left:0px;} table {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tbody {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tr {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tr.odd {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} td {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tbody tr, tbody tr.odd {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: #FFFFFF} li {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif} .resultBox.clearfix {width:265px} #full-col {width:530px!important; margin-left:170px} #miembros_list_search {width:100px} .paginatorBar .floatL a {background:none repeat scroll 0pt 0pt rgb(56,56,56); color: rgb(255,255,255); display:block; font-weight:bold;  padding: 5px 10px; border-radius: 3px 3px 3px 3px; text-align:right; font-size:11px} .here a{background:none repeat scroll 0% 0% rgb(0, 103, 205); color: rgb(255, 255, 255)!important; text-shadow:none!important} .here {background:none repeat scroll 0% 0% rgb(0, 103, 205)!important; color: rgb(255, 255, 255); border-radius:0px 0px 0px 0px!important; text-shadow:none} .mis-comunidades .resultBox {border:none!important} hr {margin: 2px 0px 2px}</style>');
document.title = 'Inteligencia Colectiva - Taringa!';
cuentahovercards = 0;
$(this).find('.list:contains("Ver más »")').find('.avatar-list.clearfix').find('.hovercard').attr("id", "ultimousuario");
$(this).find('#menu').find('.clearfix').find('.tabs.clearfix').html('<li class="active"><a class="nuevo" href="/comunidades">Inicio</a></li><li ><a class="nuevo" href="/comunidades/mis-comunidades/">Mis Comunidades</a></li><li ><a class="nuevo" href="/comunidades/dir/">Directorio</a></li><li ><a class="nuevo" href="/comunidades/mod-history">Historial</a></li>');
$(this).find('#___plusone_0').remove();
$('.avatar-list.clearfix #ultimousuario').each(function(){
if (cuentahovercards == 15){
$(this).remove();
} else {
cuentahovercards = cuentahovercards+1;
todohovercard = $(this).html();
imagenhovercard = $(this).find('a').html();
sinimagenhovercard = todohovercard.replace(imagenhovercard, "");
sinlinkhovercarda = sinimagenhovercard.replace('<a href="/', "");
usuario = sinlinkhovercarda.replace('/"></a>', "");
if(imagenhovercard == ""){
$(this).find('a').html('<img src="http://images.taringa.net/images/avatar.gif" />'+usuario);
} else {
$(this).find('a').html(imagenhovercard+usuario);
}
$(this).find('a').find('img').attr("style", "height:16px; width:16px");
$(this).attr("style", "height:100%; width:100%");
$(this).find('a').attr("style", "font-weight:normal");
}
});
resultboxcuenta = 1;
$('.resultBox.clearfix').each(function(){
usuarioadministrar = $(this).find('.floatL.infoBox').find('h4').html();
$(this).find('.floatL.infoBox').find('h4').remove();
$(this).prepend('<div id="idparaasd" style="font-size: 14px;">'+usuarioadministrar+'<div>');
$(this).find('.floatL.infoBox').find('ul').find('li').prepend('<hr>');
$(this).find('#idparaasd').find('a').attr('style', 'color rgb(5, 62, 120);');
if (resultboxcuenta == 10){
$(this).attr("style", "margin-top:20px");
}
if (resultboxcuenta == 9){
resultboxcuenta = resultboxcuenta+1;
$(this).attr("style", "float:right;margin-top:20px");
}
if (resultboxcuenta == 8){
resultboxcuenta = resultboxcuenta+1;
$(this).attr("style", "margin-top:20px");
}
if (resultboxcuenta == 7){
resultboxcuenta = resultboxcuenta+1;
$(this).attr("style", "float:right; margin-top:20px");
}
if (resultboxcuenta == 6){
resultboxcuenta = resultboxcuenta+1;
$(this).attr("style", "margin-top:20px");
}
if (resultboxcuenta == 5){
resultboxcuenta = resultboxcuenta+1;
$(this).attr("style", "float:right; margin-top:20px");
}
if (resultboxcuenta == 4){
resultboxcuenta = resultboxcuenta+1;
$(this).attr("style", "margin-top:20px");
}
if (resultboxcuenta == 3){
resultboxcuenta = resultboxcuenta+1;
$(this).attr("style", "float:right; margin-top:20px");
}
if (resultboxcuenta == 2){
resultboxcuenta = resultboxcuenta+1;
$(this).attr("style", "margin-top:20px");
}
if (resultboxcuenta == 1){
resultboxcuenta = resultboxcuenta+1;
$(this).attr("style", "float:right");
}
});
}
temacomprobacion = $(this).find('#post-author-box').attr("class");
if (document.URL == ('http://www.taringa.net/comunidades/'+locc[2]+'/'+locc[3]+'/'+locc[4]+'') && temacomprobacion == "box"){
textodelifborrar = $(this).find('.ui-button-text:contains("Borrar")').parent().attr("title");
floatl = $('.big-group-data .floatL');
floatlhtm = floatl.html();
condicion = $(this).find('.floatL').find('.btn.g').find('.btn-text').find('.i-edit').html();
if(condicion == ''){
link2 = "'/comunidades/"+locc[2]+"/editar/'";
codigo = '<div class="title clearfix" style="width:160px" align="center"><h1>Administracion<h1></div><div><input type="button" style="height:26px;border: 1px solid rgb(249,173,27); background: url'+"('http://k36.kn3.net/96F84BA72.gif')"+' repeat-x scroll left -155px rgb(255, 199, 75); color: rgb(100,37,20); width:auto; font-size:12px; text-shadow: 0pt 1px 0pt rgb(253,224,136); border-radius: 5px 5px 5px 5px; font-weight: bold; float: right; margin: 10px" value="Editar comunidad" onclick="location.href='+link2+'">';
admin = 1;
} else {
codigo = "";
admin = 0;
}
$('head').append('<style>#menu {background: url("http://k42.kn3.net/F889AC90F.png") repeat-x scroll left top rgb(0,155,69); font-size:12px; padding:0px} #menu .active .nuevo {color: rgb(255,255,255); padding: 4px 12px; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; background:none repeat scroll 0% 0% rgb(72,177,103); margin-bottom:0px} #menu .nuevo {margin-right:7px; color: rgb(255,255,255); padding: 4px 12px; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px; background:none repeat scroll 0% 0% rgb(72,177,103)} #menu .tabs.clearfix {margin-left:10px; margin-top:7px} #com-long-desc {background: none repeat scroll 0% 0% #F7F7F7; border: 1px solid rgb(204, 204, 204); border-radius: 5px 5px 5px 5px; overflow: hidden; width:550px} .big-group-info.clearfix {background: none repeat scroll 0% 0% #F7F7F7} span {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif;} div {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif;} body {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; line-height: 1.3em} p {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif;} a {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; color: rgb(51,51,51);} .big-group-data {width: 500px; margin: 2px} #comm-thread-list .thread {padding: 3px 6px} #comm-thread-list {padding: 10px; background: none repeat scroll 0% 0% #F7F7F7; border: 1px solid rgb(204, 204, 204); border-radius: 5px 5px 5px 5px; overflow: hidden; width:530px} #comm-thread-list .thread:nth-child(2n+1) {background: none repeat scroll 0% 0% rgb(238, 238, 238); border-top:1px solid rgb(204, 204, 204); border-bottom: 1px solid rgb(204, 204, 204)} .paginatorBar .floatR a {background:none repeat scroll 0pt 0pt rgb(56,56,56); color: rgb(255,255,255); display:block; font-weight:bold;  padding: 5px 10px; border-radius: 3px 3px 3px 3px; text-align:right; font-size:11px} #lastCommentsBox-data {background: #E7E7E7; padding: 8px; margin: 0pt auto; white-space:normal; border-bottom:1px solid rgb(204,204,204); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; font-size:10px} .list .list-element {background: transparent; border-top: none;} .list .list-element a {font-weight:normal; color: rgb(51,51,51)} #sidebar .list .list-element {height: 10px} .box div.title, .divider {background: url("http://k36.kn3.net/AA72FC97D.gif") repeat-x scroll 0% 0% rgb(219,219,218); padding:0px; height: 25px; border-top-left-radius:5px; border-top-right-radius:5px; font-size:11px} .box div.title h2 {background:none; padding: 5px 0pt 0pt 10px; font-weight:bold; font-size:12px !important; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204);} #sidebar .box {background: #E7E7E7; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px} .box div.title h1 {background:none; padding: 5px 0pt 0pt 10px; font-weight:bold; font-size:12px; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204);} #sidebar .box {background: #E7E7E7; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px} #sidebar .action {background:none; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204)} .action.text.drop.time-tops-filter {background:none; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204)} #sidebar .show-more {background:none; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204)} i.icon.refresh {background: url("http://k36.kn3.net/EE5FB4BB6.png") no-repeat scroll 0% 0% transparent; margin-top: 5px} #sidebar {float:right; width:210px; margin-top:20px} table {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tbody {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tr {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tr.odd {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} td {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: none} tbody tr, tbody tr.odd {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; background: #FFFFFF} li {font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif} hr {margin: 2px 0px 2px} img.ui-button-positive {padding:0px; border-width: 0px} #comments {margin-top:10px} .tema-content .imagen {max-width:575px!important} #full-col {width:100%!important;} #main-col {width:100%} #comments .title.clearfix {background:none!important; border-bottom:1px solid #CCCCCC;}#comments .title.clearfix h2 {text-shadow:none; font-size:14px!important; font-weight:normal!important; color: #000000} blockquote .citacuerpo {border:1px solid #DEDEDE!important; background:url("http://k44.kn3.net/B35D15C6E.gif") no-repeat scroll 5px 5px rgb(231, 231, 231);border-radius:5px; font-style:normal; min-height:32px; padding:5px} blockquote p {background:url("http://k40.kn3.net/553E502B3.gif") no-repeat scroll right bottom transparent; margin-left:30px;font-weight:normal!important; font-style:normal; color: rgb(0,0,0);} blockquote .cita {font-style:normal} blockquote .cita a {color: #000000;} blockquote {border:none!important; background:none;} .comment:hover blockquote {background:none!important} .min-avatar {padding:1px; box-shadow:none} .comment.clearfix {border:none; padding:0px; margin-bottom:10px;} .comment-text {background:none repeat scroll 0% 0% rgb(237,237,237); border: 1px solid rgb(180,180,180); margin:0px; width:700px;padding-left:10px;padding-bottom:10px} #comments .title.clearfix {margin-bottom:5px} .comment-author.clearfix {height:22px;padding:0px;font-size:11px;color:#000000;border-bottom:1px solid rgb(180,180,180);background:url("http://k38.kn3.net/4482C5128.gif") repeat-x scroll left top transparent;padding-left:5px;margin-left:-10px;padding-top:4px} .comment-text .subtext {color:#000000} .comment-text .hovercard {color:#004A95} .comment-actions.rounded.shadow {background:none;border:none;display:block;top:3px;right:30px} .comment-actions.rounded.shadow li {border:none;background:url("http://k38.kn3.net/F0EFC24B0.png") repeat-y scroll left top transparent} .comment.clearfix.comment-highlight-postauthor {background:none!important} .comment.clearfix.comment-highlight-postauthor .comment-text {box-shadow: 0px 0px 10px rgb(125,190,241);} .comment-text img {max-width:700px} #myComment-text-box {padding:12px; font-size:12px; line-height:20px; color: rgb(17,17,17); width:685px; background:none repeat scroll 0px 0px rgb(247, 247,247); border:1px solid rgb(204,204,204);} .myComment.clearfix {background:none} .comment:hover {background:none} #comment-button-text {border:1px solid rgb(28,107,198); text-shadow:0px 1px 0px rgb(145,198,249); line-height:20px; color:rgb(17,17,17); background:url("http://k36.kn3.net/96F84BA72.gif") repeat-x scroll left top rgb(46, 138, 245);} .comment.clearfix.comment-highlight-own {background:none} #full-col .box .title.clearfix h1 {background:none; padding: 5px 0pt 0pt 10px; font-weight:bold; font-size:12px; color: rgb(70, 70, 70); text-shadow: 0pt 1px 0pt rgb(204,204,204); letter-spacing:normal; border:none} #comments {margin-left:180px} .btn.g.leave {border: 1px solid rgb(132,132,132); background: url("http://k36.kn3.net/96F84BA72.gif") repeat-x scroll left -105px rgb(189,189,189); color: rgb(101,98,98); width:130px; border-radius:5px 5px 5px 5px; font-wieght:bold; text-shadow: 0pt 1px 0pt rgb(238,238,238)} .btn.g.not-following {margin-top:4px; width:130px; height:13px} .btn.v.following {margin-top:4px; width:130px; height:13px} .btn.r.unfollowing {margin-top:4px; width:130px; height:13px} .btn.g.join {border: 1px solid rgb(6,97,29); background: url("http://k36.kn3.net/96F84BA72.gif") repeat-x scroll left -55px rgb(62,211,46); text-shadow: 0pt 1px 0pt rgb(81,229,117); width:130px; text-align:center}</style>');
$(this).find('#comments').find('.title.clearfix').prepend('<a href="http://www.taringa.net/rss/comunidades/tema-respuestas/'+locc[3]+'/" style="float:left"><img src="http://k45.kn3.net/7F43397DF.png" /></a>');
$(this).find('.comment.clearfix').find('.comment-text').prepend('<div style="position:absolute; width:9px; height:15px;left:70px;top:5px;background:url'+"('http://k36.kn3.net/231656D2E.png')"+' repeat scroll 0% 0% transparent;"></div>');
$(this).find('#menu').find('.clearfix').find('.tabs.clearfix').html('<li class="active"><a class="nuevo" href="/comunidades">Inicio</a></li><li ><a class="nuevo" href="/comunidades/mis-comunidades/">Mis Comunidades</a></li><li ><a class="nuevo" href="/comunidades/dir/">Directorio</a></li><li ><a class="nuevo" href="/comunidades/mod-history">Historial</a></li>');
$(this).find('#comment-button-text').text("Responder");
textodelifborrar = $(this).find('#sidebar').find('.box').find('.ui-btn.ui-button-negative.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only').attr('title');
avatara = $(this).find('div.big-group-info.clearfix').find('div.floatL.profile').html();
avatarotro = avatara.replace('class="avatar-32"', "");
nombreotro = $(this).find('div.clearfix').find('h1').find('a').html();
miembroscotro = $(this).find('div.big-group-data').find('ul.clearfix.action-data').find('li.members-count').find('span').text();
rango = $(this).find('.rank.online.hastipsy').find('a').text();
temascotro = $(this).find('div.big-group-data').find('ul.clearfix.action-data').find('li.temas-count').find('span').text();
seguidorescotro = $(this).find('div.big-group-data').find('ul.clearfix.action-data').find('li.followers-count').find('span').text();
codigootro = "";
avatar = $(this).find('#sidebar').find('.author.clearfix').find('.floatL.profile').find('a').html();
nick = $(this).find('#sidebar').find('.title.clearfix').find('.author-nick').find('.textlimit').text();
oncomprobacion = $(this).find('#sidebar').find('.author.clearfix').find('.floatL.profile').find('.rank.online.hastipsy').html();
if(oncomprobacion == ""){
estado = '<img src="http://k40.kn3.net/B68851780.png" style="float:left"/>';
} else {
estado = '<img src="http://k39.kn3.net/4DAB0A9ED.png" style="float:left"/>';
}
$(this).find('#sidebar').find('.title.clearfix').find('.icon.hastipsy.male').html("a");
sexocomprobacion = $(this).find('#sidebar').find('.title.clearfix').find('.icon.hastipsy.male').html();
if(sexocomprobacion == ""){
sexo = '<i class="icon haptipsy female" original-title="Mujer"></i>';
} else {
sexo = '<i class="icon haptipsy male" original-title="Hombre"></i>';
}
pais = $(this).find('#sidebar').find('.title.clearfix').find('.icon.flag').html();
$(this).find('#full-col').find('div').find('h1').parent().prepend('<div style="border-radius:5px; border: 1px solid #CCCCCC; padding: 10px; float:left; background: #EEEEEE; width:120px; margin-right:10px" id="usuariocoso"><div><a href="/perfil/'+nick+'">'+avatar+'</a></div><div><a href="/perfil/'+nick+'">'+nick+'</a></div><div>'+rango+'</div><div>'+estado+sexo+pais+'<a href="/perfil/mensaje/'+nick+'"><img src="http://k40.kn3.net/01B664B18.png" /></a></div></div>');
if (textodelifborrar=="Borrar tema" && admin == 1){
$(this).find('#full-col').find('div').find('h1').parent().attr("style", 'border-radius:5px; border: 1px solid #CCCCCC; padding:10px; background: #F7F7F7; width:750px; margin-left:180px; margin-top:-460px');
} else if(textodelifborrar=="Borrar tema" && admin == 0){
$(this).find('#full-col').find('div').find('h1').parent().attr("style", 'border-radius:5px; border: 1px solid #CCCCCC; padding:10px; background: #F7F7F7; width:750px; margin-left:180px; margin-top:-405px');
} else {
$(this).find('#full-col').find('div').find('h1').parent().attr("style", 'border-radius:5px; border: 1px solid #CCCCCC; padding:10px; background: #F7F7F7; width:750px; margin-left:180px; margin-top:-405px');
}
botoncomp = $(this).find('#post-data-stats').find('.floatL').find('.require-login.follow-tema-tema.follow-button.ui-btn.ui-button.ui-widget.ui-state-default.ui-corner-all.ui-button-text-only').attr("name");
jsbotons = "'tema', '"+locc[3]+"',";
if (botoncomp == "follow"){
botonseguircod = '<a style="float:right" role="button" name="follow" onclick="notifica.follow('+jsbotons+' notifica.temaIntemaContext, $(this), false);" class="require-login follow-tema-tema follow-button ui-btn ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text"><i class="icon followers"></i><span class="follow-button-text">Seguir</span><span class="following-button-text" style="display:none">Siguiendo</span><span class="unfollow-button-text disabled" style="display:none">Dejar de seguir</span></span></a>';
} else {
botonseguircod = '<a style="float:right" role="button" name="unfollow" onclick="notifica.follow('+jsbotons+' notifica.temaIntemaContext, $(this), false);" class="unfollow-tema-tema ui-button-positive following-button ui-btn ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"><span class="ui-button-text"><i class="icon followers"></i><span style="display: block;" class="following-button-text">Siguiendo</span><span class="unfollow-button-text" style="display: none;">Dejar de seguir</span><span class="follow-button-text" style="display:none">Seguir</span></span></a>';
}
$(this).find('#post-data-stats').find('.action-data.floatR').find('li:contains("Visitas")').attr("id", "visitas");
visitas = $(this).find('#post-data-stats').find('.action-data.floatR').find("#visitas").find("span").text();
seguidores = $(this).find('#post-data-stats').find('.action-data.floatR').find(".followers-count").find(".data-followers-count").text();
calificacionespn = $(this).find('#post-data-stats').find('.action-data.floatR').find(".votes-count").find("span").attr("class");
calificaciones = $(this).find('#post-data-stats').find('.action-data.floatR').find(".votes-count").find("span").text();
if (calificacionespn == "positive"){
colorcalif = "#008000";
signopn = ""
} else {
colorcalif = "#C60000";
signopn = ""
}
creado = $(this).find('#full-col').find('div').find('.clearfix').find('.breadcrumb').find('.hastipsy').text();
$(this).find('#post-data-stats').remove();
$(this).find('#full-col').find('div').find('h1').parent().append('<div style="border-top: 1px solid #CCCCCC; padding: 5px"><div style="font-weight:bold" class="followBox"><span>Calificar:</span> <span style="margin-left:55px">Creado</span> <span style="margin-left:100px">Visitas:</span> <span style="margin-left:70px">Seguidores</span>'+botonseguircod+'</div><div align="left"><table><tr style="background:none"><td style="padding:0px; width:110px; float:left!important"><span><img src="http://k42.kn3.net/3529EE567.png" onclick="com.tema_votar(1, this)" /><img src="http://k36.kn3.net/1E048D3EF.png" style="margin-left:5px" onclick="com.tema_votar(-1, this)" /><span style="margin-left:5px; color: '+colorcalif+';" class="calificacion"><b>'+signopn+calificaciones+'</b></span></span></td><td style="padding:0px; width:145px; float:left!important"> <span>'+creado+'</span></td> <td style="padding:0px; width:120px; float:left!important"><span>'+visitas+'</span></td> <td style="padding:0px; width:30px; float:left!important"><span>'+seguidores+'</span></td></tr></table></div></div>');
$(this).find('#full-col').find('div').find('h1').attr("style", 'border-top: none; font-weight:normal; font-size:14px; font-family: "Lucida Grande",Tahoma,Arial,Verdana,Sans-Serif; border-bottom:1px solid #CCCCCC; letter-spacing:normal');
$(this).find('#full-col').find('div').find('.tema-content').attr("style", 'min-height:120px; overflow:visible; width:600px; margin-left:150px');
$(this).find('#full-col').find('div').find('.clearfix').find('.breadcrumb').parent().remove();
$(this).find('.post-share-bottom.rounded.clearfix.post-share-list').remove();
$(this).find('#com-long-desc').remove();
$(this).find('#sidebar').remove();
$(this).find('blockquote').find('.cita').find('a').find('img').remove();
$(this).find('blockquote').find('blockquote').remove();
$(this).find('#full-col').find('#com-short-desc').remove();
titulodeltema = $(this).find('#full-col').find('div').find('h1').text();
document.title = titulodeltema+' - Taringa!';
$(this).find('#full-col').prepend('<div class="box" style="background: #E7E7E7; margin-left:10px; white-space:normal; border-bottom:1px solid rgb(204,204,204); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; font-size:10px; width:160px; overflow:hidden" align="center"><div class="title clearfix" style="width:160px" align="left"><h1>Comunidad<h1></div><div style="padding:10px"><div align="center" style="width:120px; height:120px;padding: 2px; background:#FFF; border: 1px solid rgb(204, 204, 204); box-shadow: 0px 3px 2px 1px rgba(124, 124, 124, 1); ">'+avatarotro+'</div></div><div style="font-size:14px;margin-top:10px; margin-left:4px" align="left"><a href="/comunidades/'+locc[2]+'/">'+nombreotro+'</a></div><hr style="border-top: 1px solid rgb(204,204,204); border-bottom: 1px solid rgb(255,255,255); margin-top: 10px; margin-bottom:10px; margin-left:2px; width: 143px" /><div align="left" style="margin-left: 5px"><ul style="font-size:12px"><li style="font-size:11px"><span><a href="/comunidades/'+locc[2]+'/" style="font-weight:normal">'+miembroscotro+' Miembros</span></a></li><li style="font-size:11px">'+temascotro+' Temas</li> <li style="font-size:11px"><span>'+seguidorescotro+'</span> Seguidores</li></ul></div><hr style="border-top: 1px solid rgb(204,204,204); border-bottom: 1px solid rgb(255,255,255); margin-top: 10px; margin-bottom:0px; margin-left:2px; width: 143px" /><div class="textolargounicoparareconocerestediv"></div></div></div><div class="box" id="administracioneditar" style=" float:top; background: #E7E7E7; margin-top:10px; margin-left:10px; white-space:normal; border-bottom:1px solid rgb(204,204,204); border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; font-size:10px; width:160px; overflow:hidden" align="center">'+codigo+'</div>');
$('.textolargounicoparareconocerestediv').html('<script type="text/javascript">$(".follow-buttons .btn").hover(function(){var a=$(this);if(!a.is(".wait")){if(a.is(".following")){a.hide().siblings(".unfollowing").show()}}},function(){var a=$(this);if(a.is(".unfollowing")&&!a.is(".wait")){a.hide().siblings(".following").show()}if(a.is(".wait")){a.removeClass("wait")}}).live("click",function(a){a.preventDefault();var b=$(this),c=b.parent(),d=b.attr("obj"),e=b.attr("objid");if(b.is(".not-following")){follow(true,{type:d,obj:e});c.children(".btn").hide();c.children(".following").addClass("wait").show()}if(b.is(".unfollowing")){follow(false,{type:d,obj:e});b.addClass("wait");c.children(".btn").hide();c.children(".not-following").show()}});$(".join-community .btn").click(function(){var a=$(this),b=a.attr("comid");if(a.is(".join")){comm.joinCommunity(b);a.hide().siblings().show()}else if(a.is(".leave")){comm.leaveCommunity(b);a.hide().siblings().show()}});$(".dropdown-dropper").click(function(a){a.preventDefault();$(this).addClass("active");$(this).next(".dropdown-list").show()});$(document).click(function(a){if(!$(a.target).hasClass("dropdown-dropper active")){$(".musthide").hide();$(".dropdown-dropper").removeClass("active")}})</script>'+floatlhtm);
$(this).find('.textolargounicoparareconocerestediv').find('.btn.g').remove(":contains('Editar')");
$(this).find('.btn.g.join').text("Participar");
$(this).find('.btn.g.not-following').text("Seguir comunidad");
$(this).find('.player-post.clearfix').remove();
if (textodelifborrar=="Borrar tema"){
$(this).find('#full-col').prepend('<div class="box" style="background: none repeat scroll 0px 0px rgb(238,238,238); margin-left:10px; white-space:normal; border-bottom:1px solid rgb(204,204,204); border-radius: 5px; font-size:10px; width:765px; overflow:hidden; padding: 12px 4px; margin-left:180px;"><a href="javascript:com.del_tema()" style="background: none repeat scroll 0% 0% rgb(204,204,204); padding: 3px 5px; margin-left:5px; font-size:11px; color: rgb(51,51,51); font-weight:bold"><img src="http://k35.kn3.net/D2FDA9AD1.png" style="margin-right:3px" />Borrar</a><a href="/comunidades/whatthefuck/editar-tema/'+locc[3]+'/" style="background: none repeat scroll 0% 0% rgb(204,204,204); padding: 3px 5px; margin-left:5px; font-size:11px; color: rgb(51,51,51); font-weight:bold"><img src="http://k32.kn3.net/A4845DF54.png" style="margin-right:3px" />Editar</a></div>');
}
}
});
// ==UserScript==
// @name		Tuenti's hack
// @namespace		DJMeu
// @description		Script para personalizar el Tuenti
// @include		http://*.tuenti.com/*
// @exclude		http://*.tuenti.com/?m=login
// @version		3.10
// ==/UserScript==

//-------------------------------------------------------------------------------------------//
//YA NO HACE FALTA MODIFICAR EL SCRIPT PARA CONFIGURARLO, USA EL MENÚ DE LA PARTE SUPERIOR DEL TUENTI.
//-------------------------------------------------------------------------------------------//

version='3.10';
scripturl='http://userscripts.org/scripts/source/43374.user.js';
scripturl2='http://userscripts.org/scripts/show/43374';
scriptname="Tuenti's hack";
//-------------------------------------------------------------------------------------------//

GM_registerMenuCommand(scriptname+ ': Buscar actualizaciones', update);
GM_registerMenuCommand(scriptname+ ': Ir a la p\u00e1gina del script', scriptpage);
function update(evt){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/43374.meta.js',
		onload: function(resp) {
			resp.responseText.match(/@version\s+([\d.]+)/);
			updatedversion = RegExp.$1;
			if (version <= updatedversion){
				if (version != updatedversion){
					if (confirm("Se ha encontrado una nueva versi\u00f3n de "+scriptname+" (v" +updatedversion+ "). ¿Desea actualizar?")) {
						document.location.href = scripturl
					}
				}else{
					alert('Tienes la \u00faltima actualizaci\u00f3n disponible (v' +version+ ')')
				};
			}else{
				alert('Tienes la \u00faltima actualizaci\u00f3n disponible (v' +version+ ')')
			};
		}
	});	
}
function instalar() document.location.href = scripturl;
function scriptpage(evt) document.location.href = scripturl2;
function autoactualizar(){
	if (GM_getValue('checkboxautoactualizar') == true){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/43374.meta.js',
			onload: function(resp) {
				resp.responseText.match(/@version\s+([\d.]+)/);
				updatedversion = RegExp.$1;
				if (version <= updatedversion){
					if (version != updatedversion){
						if (confirm("Se ha encontrado una nueva versi\u00f3n de "+scriptname+" (v" +updatedversion+ "). ¿Desea actualizar?")) {
							document.location.href = scripturl
						}
					}
				}
			}
		});
	};
};
if (GM_getValue('configurado') != version){
	GM_setValue('checkboxautoactualizar', true);
	GM_setValue('checkboxmenufoto', false);
	GM_setValue('checkboxreloj', false);
	GM_setValue('espera', 5);
	GM_setValue('radiofondo', true);
	GM_setValue('radiofondo1', false);
	GM_setValue('radiofondo2', false);
	GM_setValue('radiofondo3', false);
	GM_setValue('radiofondo3v2', false);
	GM_setValue('radiofondo4', false);
	GM_setValue('radiofondo5', false);
	GM_setValue('radiofondo6', false);
	GM_setValue('radiofondo7', false);
	GM_setValue('radiofondo8', false);
	GM_setValue('radiofondo9', false);
	GM_setValue('radiofondop', false);
	GM_setValue('checkboxfondofijo', false);
	GM_setValue('radiorediseño', true);
	GM_setValue('radiorediseño1', false);
	GM_setValue('radiorediseño2', false);
	GM_setValue('radiorediseño3', false);
	GM_setValue('radiorediseño4', false);
	GM_setValue('radiorediseño5', false);
	GM_setValue('radiorediseño6', false);
	GM_setValue('radiorediseño7', false);
	GM_setValue('radiorediseño8', false);
	GM_setValue('radiorediseño9', false);
	GM_setValue('radiorediseño10', false);
};
//-------------------------------------------------------------------------------------------//

caja = document.createElement("div");
caja.setAttribute("id","caja");

botonmenufoto = document.createElement("button");
botonmenufoto.appendChild(document.createTextNode("Menú de foto"));
botonmenufoto.setAttribute("onclick",function(){menufoto()});
botonmenufoto.addEventListener("click", function(){menufoto()}, true);

botonpasarpagina = document.createElement("button");
botonpasarpagina.appendChild(document.createTextNode("Ir a la página"));
botonpasarpagina.setAttribute("onclick",function(){Menupasarpagina()});
botonpasarpagina.addEventListener("click", function(){Menupasarpagina()}, true);

botonradio = document.createElement("button");
botonradio.appendChild(document.createTextNode("Radio"));
botonradio.setAttribute("onclick",function(){Radio()});
botonradio.addEventListener("click", function(){Radio()}, true);

botonxat = document.createElement("button");
botonxat.appendChild(document.createTextNode("TuentiXat"));
botonxat.setAttribute("onclick",function(){xat()});
botonxat.addEventListener("click", function(){xat()}, true);

botonmenu = document.createElement("button");
botonmenu.appendChild(document.createTextNode("Configuración"));
botonmenu.setAttribute("onclick",function(){Menu()});
botonmenu.addEventListener("click", function(){Menu()}, true);

caja.appendChild(botonmenufoto);
caja.appendChild(botonpasarpagina);
caja.appendChild(botonradio);
caja.appendChild(botonxat);
caja.appendChild(botonmenu);
document.getElementById("css_monitors").appendChild(caja);
//-------------------------------------------------------------------------------------------//

if (GM_getValue('checkboxmenufoto') == true) menufoto();
if (GM_getValue('radiofondo1') == true) document.body.style.backgroundImage = "url("+GM_getValue('textfondo')+")";
if (GM_getValue('radiofondo2') == true) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #E9EFF3");
if (GM_getValue('radiofondo3') == true) document.body.style.backgroundImage = "url(http://www.dominiotemporal.es/fondos_web/texturas/JoseRico/08_basicas.gif)";
if (GM_getValue('radiofondo3v2') == true){
	if (GM_getValue('checkboxfondofijo') == true){
		document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://www.minijuegos.com/imagenes/fondomj.gif) repeat-x fixed !important");
	}else{
		document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://www.minijuegos.com/imagenes/fondomj.gif) repeat-x !important");
	};
};
if (GM_getValue('radiofondo4') == true){
	if (GM_getValue('checkboxfondofijo') == true){
		document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x fixed #000000 !important");
	}else{
		document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x #000000 !important");
	};
};
if (GM_getValue('radiofondo5') == true) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #ABABAB");
if (GM_getValue('radiofondo6') == true) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #C1009A");
if (GM_getValue('radiofondo7') == true) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #64A3CF");
if (GM_getValue('radiofondo8') == true) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: black");
if (GM_getValue('radiofondo9') == true){
	if (GM_getValue('checkboxfondofijo') == true){
		document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) repeat fixed !important");
	}else{
		document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) repeat !important");
	};
};
if (GM_getValue('radiofondo10') == true){
	if (GM_getValue('checkboxfondofijo') == true){
		document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i184.photobucket.com/albums/x79/pixvirtual/us007/gURcMhcABve2.gif) repeat fixed !important");
	}else{
		document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i184.photobucket.com/albums/x79/pixvirtual/us007/gURcMhcABve2.gif) repeat !important");
	};
};
if (GM_getValue('radiofondop') == true) document.body.style.backgroundImage = "url(http://srv0110-07.oak1.imeem.com/g/p/a29385b55e5208eff4ce4b61da16e234_raw.gif)";
if (GM_getValue('checkboxfondofijo') == true) document.body.style.backgroundAttachment='fixed';

//Diseño "Nuevo Tuenti rediseño sutil" de jayjayjay_92 (http://userstyles.org/styles/17626)	
if (GM_getValue('radiorediseño1') == true) var css = ".main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;}\n .header, #subheader{margin:0 !important;}\n\n.actions a, .itemActions a, .itemActions span{margin-right:4px !important;}\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n        background: #FFF !important;\n        border: solid #ACD0EE !important;\n        border-width: 0 1px 1px 1px !important;\n}\n\n.item, #basic_information_form {\n        background: #FFF !important;\n        border: 1px solid #ACD0EE !important;\n        margin-top:-1px !important;\n}\n    .setting {\n        border: solid #ACD0EE !important;\n        border-width: 0px 1px 1px 1px !important;\n    }\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;}\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;}\n\n    div.loading {right:-40px !important;}\n\n    div .note {\n        background:#fbfbfb !important;\n        border:#fff !important;\n    }\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n        -moz-border-radius:5px !important;\n        -webkit-border-radius:5px !important;\n    }\n\n\n\n    #lightbox_overlay{background:#000 !important;}\n\n    #ban_photo_link{width:100% !important;}\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n        background:#f9f9f9 !important;\n    }\n	#top_videos .mediaInfo:hover{background:transparent !important}\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n        border: solid #ACD0EE 1px !important;\n        -moz-border-radius-topleft:5px !important;\n        -moz-border-radius-topright:5px !important;\n        -webkit-border-radius-topleft:5px !important;\n        -webkit-border-radius-topright:5px !important;\n    }\n\n    .item, #latest_photos .body{\n        padding:8px !important;\n    }\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#FFF !important;}\n\n    .photoTag{opacity:0.6 !important;}\n	\n.mod .body{border-top:0px solid #FFF !important;}\nr	\n.pager.light{\npadding-top:10px !important;\npadding-bottom:10px !important;}\n\n#networks .body, .login{\n        border: 1px solid #ACD0EE !important;\n        margin-top:-1px !important;}\n\nform fieldset.formbox {\n-moz-border-radius:0 !important;\n-webkit-border-radius:0 !important;\nmargin-top:-1px !important;}\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n{border:none !important;}\nul.subMenu a, ul.subMenu li, ul#options a{color:#888 !important;}\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n.loginCanvas #login{margin-top:-1px !important;}\n\n#latest_photos h3 {\n        border: solid #ACD0EE !important;\n        border-width: 1px 0 0 0 !important;\n\n}\n.mod.c .actions .dropDown{margin-top:1px !important;}\n\nimg[src=\"http://estaticosak1.tuenti.com/layout/web2/images/save.gif\"]{display:none !important;}\nform.eventChoices fieldset .option{margin-left:-1px !important;}";
//Diseño "tuentiblue" de ardo99 (http://userstyles.org/styles/18507)
if (GM_getValue('radiorediseño2') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: !important; color:black !important;} .views{color:transparent!important;} .body,.item {background:#ACD0Ee url()center center repeat-x !important; color:black !important; border:#000 b2b4 0px solid !important} .body a,.item a{color:black!important; text-decoration:none !important; font-weight: bold !important} .body a:hover,.item a:hover{color: grey ! important; background-color:!important} .body a:visited,.item a:visited{color:black!important} .main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;} .header, #subheader{margin:0 !important;} .actions a, .itemActions a, .itemActions span{margin-right:4px !important;} .container, #latest_photos, .blockedFriends, #banned_photos .body{ background: transparent!important; border: solid transparent !important; border-width: 0 1px 1px 1px !important; } .item, #basic_information_form { background: #ACD0Ee !important; border: 5px solid #acd0ee !important; margin-top:-1px !important; } .setting { border: solid #ACD0EE!important; border-width: 0px 1px 1px 1px !important; } .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;} #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;} div.loading {right:-40px !important;} div .note { background: #fbfbfb !important; border: #fff!important; } button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message { -moz-border-radius:20px !important;border: 5px red!important; -webkit-border-radius:20px !important; } #lightbox_overlay{background:#000!important;} #ban_photo_link{width:100% !important;} .item:hover, #latest_photos:hover, .mediaInfo:hover { background:#f9f9f9 !important; } #top_videos .mediaInfo:hover{background: transparent !important} .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{ border: transparent 3px !important; -moz-border-radius-topleft:20px !important; -moz-border-radius-topright:20px !important; -webkit-border-radius-topleft:20px !important; -webkit-border-radius-topright:20px !important; } .item, #latest_photos .body{ padding:3px !important; } td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;} .photoTag{opacity:0.6 !important;} .mod .body{border-top:0px solid #FFF !important;} r .pager.light{ padding-top:10px !important; padding-bottom:10px !important;} #networks .body, .login{ border: 1px solid #ACD0EE !important; margin-top:-1px !important;} form fieldset.formbox { -moz-border-radius:5 !important; -webkit-border-radius:5 !important; margin-top:-1px !important;} .mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting {border:none !important;} ul.subMenu a, ul.subMenu li, ul#options a{color:grey !important;} div.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;} .loginCanvas #login{margin-top:-1px !important;} #latest_photos h3 { border: solid transparent!important; border-width: 0px 0 0 0 !important; } .mod.c .actions .dropDown{margin-top:1px !important;}";
//Diseño "TuentiStyle" de draco1989 (http://userstyles.org/styles/18119)
if (GM_getValue('radiorediseño3') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D2E5F1 !important; color:black !important;} .views{color:black !important;} .item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body{background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg) top repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body a,.item a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#D2E5F1 !important} .body a:visited,.item a:visited{color:#dfdfdf!important} .viewMore{background: #D2E5F1 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#D2E5F1 !important} #breadcrumbs a:visited{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)top center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} blockquote p{color:#C0DCEB !important} blockquote {background:#4000c0 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#00ffa0 !important} #blog>.item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center top repeat-x !important; color:white !important; border:#00b2b4 1px solid !important}";
//Diseño "TuentiSkin" de alarico750 (http://userstyles.org/styles/19064)	
if (GM_getValue('radiorediseño4') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/} #main_info{background: #666666 !important; color:black !important;} .views{color:black !important;} .item {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center center repeat-x !important; color:#666666 !important; border:#015EB4 1px solid !important} .body{background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png) top repeat-x !important; color:#666666!important; border:#015EB4 1px solid !important} .body a,.item a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#666666 !important} .body a:visited,.item a:visited{color:#666666!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#C0C0C0 !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}";
//Diseño "Likern" de ShiveR (http://www.ultra-zone.es)
if (GM_getValue('radiorediseño5') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D1D1D1 !important; color:black; border:#000000 1px solid !important} .views{color:black !important;} .item {background:#D1D1D1 url()center center repeat-x !important; color:#D1D1D1 !important; border:#000000 1px solid !important} .body{background:#D1D1D1 url() top repeat-x !important; color:#D1D1D1!important; border:#000000 1px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#00000 !important} .body a:visited,.item a:visited{color:#000000!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#FF0000 url()top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#ffffff !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(#D1D1D1)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}";
//Diseño "Pinxil" de ShiveR (http://www.ultra-zone.es)
if (GM_getValue('radiorediseño6') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #FFBCF2 !important; color:white !important; border:#790061 3px solid !important} .views{color:black !important;} .item {background:#FFD0F6 !important; color:white !important; border:#790061 1px solid !important} .body{background:#FFD0F6!important; color:white !important; border:#790061 3px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #5c3273 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #fff !important;} .searchBar {background-color: #f8f4fa !important;border-color: #e0ceea !important;} ul#sections li a.active {background-color: #e5d5ed !important;border-color: #d0b5df !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }";
//Diseño "LoomySkin" de ShiveR (http://www.ultra-zone.es)
if (GM_getValue('radiorediseño7') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #64A3CF !important; color:white !important; border:#EBEBEB 3px solid !important} .views{color:black !important;} .item {background:#509BD0 !important; color:white !important; border:#ffffff 1px solid !important} .body{background:#64A3CF!important; color:white !important; border:#EBEBEB 3px solid !important} .body a,.item a{color:#00446E!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #282549 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #000000 !important;} .searchBar {background-color: #000000 !important;border-color: #4780AC !important;} ul#sections li a.active {background-color: #2270AC !important;border-color: #ffffff !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }";
//Diseño "TuentiRed" de Daniko (http://userstyles.org/styles/19955)
if (GM_getValue('radiorediseño8') == true) var css = "#main_info{background:  !important; color:black\n!important;}\n\n.views{color:red!important;}\n\n\n\n.body,.item {background: url(http://i05.pan.tuenti.com/i/3/600/o/N/35WmBozaW3BBXlAeI0o.0.jpg)center center repeat-x !important; color:black!important; border:#000\nb2b4 0px solid !important}\n\n.body a,.item a{color:black!important; text-decoration:none !important; font-weight:  bold  !important}\n\n.body a:hover,.item a:hover{color: #800000 ! important; background-color:!important}\n\n.body a:visited,.item a:visited{color:black!important}\n\n\n\n\n.main .mod.c.viewMore, #friends_updates .item{color: white ! important;}, .header , #subheader {padding:3px;}\n\n .header{background-color: red  ! important;}  , .subheader {margin:10 !important;}\n\n\n\n.actions  a, .itemActions  a, .itemActions span{margin-right:4px !important;}\n\n\n\n	.container , #latest_photos , .blockedFriends, #banned_photos .body{\n\n        background: transparent!important;\n\n        border: solid transparent !important;\n\n        border-width: 0 1px 1px 1px !important;\n\n}\n\n\n\n.item, #basic_information_form {\n\n        background:url (http://i05.pan.tuenti.com/i/3/600/o/N/35WmBozaW3BBXlAeI0o.0.jpg) !important;\n\n        border: 3px solid #000000 !important;\n\n        margin-top:-1px !important;\n\n}\n\n    .setting {\n\n        border: solid black!important;\n\n        border-width: 3px 3px 3px 3px  !important;\n\n    }\n\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:2px solid white !important;}\n\n\n\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background: white !important; padding-left:6px !important;}\n\n\n\n    div.loading {right:-40px !important;}\n\n\n\n    div .note {\n\n        background: #fbfbfb  !important;\n\n        border: #fff!important;\n\n    }\n\n\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n\n        -moz-border-radius:3px !important;border: 5px white!important;\n\n        -webkit-border-radius:7px !important;\n\n    }\n\n\n\n\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n\n\n    #ban_photo_link{width:100% !important;}\n\n\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n\n        background: #e24747 !important;\n\n    }\n\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n\n        border: transparent 3px !important;\n\n        -moz-border-radius-topleft:10px !important;\n\n        -moz-border-radius-topright:10px !important;\n\n        -webkit-border-radius-topleft:10px !important;\n\n        -webkit-border-radius-topright:10px !important;\n\n    }\n\n\n\n    .item, #latest_photos .body{\n\n        padding:3px !important;\n\n    }\n\n\n\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n\n\n    .photoTag{opacity:0.6 !important;}\n\n	\n\n.mod .body{border-top:0px solid #FFF !important;}\n\nr	\n\n.pager.light{\n\npadding-top:0px !important;\n\npadding-bottom:1px !important;}\n\n\n\n#networks .body, .login{\n\n        border: 1px solid #eeacac !important;\n\n        margin-top:-1px !important;}\n\n\n\nform fieldset.formbox {\n\n-moz-border-radius:3 !important;\n\n-webkit-border-radius:3 !important;\n\nmargin-top:-1px !important;}\n\n\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n\n{border:none !important;}\n\nul.subMenu a, ul.subMenu li, ul#options a{color:grey!important;}\n\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n\n.loginCanvas #login{margin-top:-1px !important;}\n\n\n\n#latest_photos h3 {\n\n        border: solid transparent!important;\n\n        border-width: 0px 0 0 0 !important;\n\n\n\n}\n\n.mod.c .actions .dropDown{margin-top:1px !important;}";
//Diseño "TuentiPink" de Daniko (http://userstyles.org/styles/19958)
if (GM_getValue('radiorediseño9') == true) var css = "#main_info{background: url(http://im170.ll.tuenti.com/i21/i/5/600/3/D/pXG7TtNna0VsLwIMmxQN.0.jpg) repeat  !important; color:black\n!important;}\n\n.views{color:white!important;}\n\n\n\n.body,.item {background: url(http://i49.pan.tuenti.com/i/7/600/1/s/7E2Gk6f2ZiOgmhKDnFzz.0.jpg)center center repeat !important; color:black!important; border:#000\n1px solid !important}\n\n.body a{color:white!important;},.item a{color:white!important; text-decoration:none !important; font-weight:  bold  !important}\n\n.body a:hover,.item a:hover{color: black !important; background-color: transparent !important;}\n\n.body a:visited,.item a:visited{color:#381233!important}\n\n\n\n\n.main .mod.c.viewMore, #friends_updates .item{color: white !important;}, .header{color: black !important;} , #subheader {padding:3px;}\n\n .header{background: url(http://i49.pan.tuenti.com/i/7/600/1/s/7E2Gk6f2ZiOgmhKDnFzz.0.jpg)  ! important;}  , .subheader {margin:10 !important;}\n\n\n\n.actions  a, .itemActions  a, .itemActions span {margin-right:4px !important;}\n\n\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n\n        background: transparent!important;\n\n        border: solid transparent !important;\n\n        border-width: 0px 1px 1px 1px !important;\n\n}\n\n\n\n.item, #basic_information_form {\n\n        background:url (http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) !important;\n\n        border: 2px solid black !important;\n\n        margin-top:-1px !important;\n\n}\n\n    .setting {\n\n        border: solid black!important;\n\n        border-width: 3px 3px 3px 3px  !important;\n\n    }\n\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:2px solid white !important;}\n\n\n\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background: white !important; padding-left:6px !important;}\n\n\n\n    div.loading {right:-40px !important;}\n\n\n\n    div .note {\n\n        background: #ff9dfc  !important;\n\n        border: #fff!important;\n\n    }\n\n\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n\n        -moz-border-radius:3px !important;border: 5px white!important;\n\n        -webkit-border-radius:7px !important;\n\n    }\n\n\n\n\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n\n\n    #ban_photo_link{width:100% !important;}\n\n\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n\n        background: #ff4ef9 !important;\n\n    }\n\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n\n        border: transparent 3px !important;\n\n        -moz-border-radius-topleft:10px !important;\n\n        -moz-border-radius-topright:10px !important;\n\n        -webkit-border-radius-topleft:10px !important;\n\n        -webkit-border-radius-topright:10px !important;\n\n    }\n\n\n\n    .item, #latest_photos .body{\n\n        padding:3px !important;\n\n    }\n\n\n\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n\n\n    .photoTag{opacity:0.6 !important;}\n\n	\n\n.mod .body{border-top:0px solid #FFF !important;}\n\nr	\n\n.pager.light{\n\npadding-top:0px !important;\n\npadding-bottom:1px !important;}\n\n\n\n#networks .body, .login{\n\n        border: 1px solid #eeacac !important;\n\n        margin-top:-1px !important;}\n\n\n\nform fieldset.formbox {\n\n-moz-border-radius:3 !important;\n\n-webkit-border-radius:3 !important;\n\nmargin-top:-1px !important;}\n\n\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n\n{border:none !important;}\n\nul.subMenu a, ul.subMenu li, ul#options a{color:grey!important;}\n\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n\n.loginCanvas #login{margin-top:-1px !important;}\n\n\n\n#latest_photos h3 {\n\n        border: solid transparent!important;\n\n        border-width: 0px 0 0 0 !important;\n\n\n\n}\n\n.mod.c .actions .dropDown{margin-top:1px !important;}";
//Diseño "tuentiblue II (PINK VERSION)" de ardo99 (http://userstyles.org/styles/20143)
if (GM_getValue('radiorediseño10') == true) var css = "#main_info{background:  !important; color:black  !important;}\n.views{color:transparent!important;}\n\n.body,.item {background:#FFCCFF url()center center repeat-x !important; color:black !important; border:white   2px solid !important}\n.body a,.item a{color:black!important; text-decoration:none !important; font-weight:  bold  !important}\n.body a:hover,.item a:hover{color: grey ! important; background-color:!important}\n.body a:visited,.item a:visited{color:black!important}\n\n\n.main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;}\n .header, #subheader{margin:10 !important;}\n\n.actions a, .itemActions a, .itemActions span{margin-right:4px !important;}\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n        background: transparent!important;\n        border: solid transparent !important;\n        border-width: 0 1px 1px 1px !important;\n}\n\n.item, #basic_information_form {\n        background: #FFCCFF !important;\n        border: 1px solid white !important;\n        margin-top:-1px !important;\n}\n    .setting {\n        border: solid white!important;\n        border-width: 0px 1px 1px 1px !important;\n    }\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid white !important;}\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;}\n\n    div.loading {right:-40px !important;}\n\n    div .note {\n        background: #fbfbfb  !important;\n        border: #fff!important;\n    }\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n        -moz-border-radius:7px !important;border: 5px black !important;\n        -webkit-border-radius:7px !important;\n    }\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n    #ban_photo_link{width:100% !important;}\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n        background:white !important;\n    }\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n        border: transparent 3px !important;\n        -moz-border-radius-topleft:10px !important;\n        -moz-border-radius-topright:10px !important;\n        -webkit-border-radius-topleft:10px !important;\n        -webkit-border-radius-topright:10px !important;\n    }\n\n    .item, #latest_photos .body{\n        padding:3px !important;\n    }\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n    .photoTag{opacity:0.6 !important;}\n	\n.mod .body{border-top:0px solid #FFF !important;}\nr	\n.pager.light{\npadding-top:0px !important;\npadding-bottom:0px !important;}\n\n#networks .body, .login{\n        border: 1px solid #FF99FF !important;\n        margin-top:-1px !important;}\n\nform fieldset.formbox {\n-moz-border-radius:3 !important;\n-webkit-border-radius:3 !important;\nmargin-top:-1px !important;}\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n{border:none !important;}\nul.subMenu a, ul.subMenu li, ul#options a{color:red  !important;}\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n.loginCanvas #login{margin-top:-1px !important;}\n\n#latest_photos h3 {\n        border: solid transparent!important;\n        border-width: 0px 0 0 0 !important;\n\n}\n.mod.c .actions .dropDown{margin-top:1px !important;}";


if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	head = document.getElementsByTagName("head");
	if (head.length > 0) head[0].innerHTML +='<style type="text/css">'+css+'</style>';
};
//-------------------------------------------------------------------------------------------//

function Menu(){
	if (document.getElementById('menu') == null){

		menu = document.createElement("div");
		menu.setAttribute("id","menu");
		menu.setAttribute("name","item");
		menu.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #64A3CF !important;");
		menu.setAttribute("class","container");
		menu.innerHTML += '<center><h2>Por favor, haga click en la imagen para ayudarnos a seguir con '+scriptname+'</h2><a href="http://www.gigasize.com/affiliates/?s=1655&amp;a=2738"><img alt="Gigasize : Banner Gigasize" height="90" src="http://gigasize.connexplace.com/en/tracking/display_content?a=2738&amp;c=48&amp;s=1655" style="border:none;" width="728" /></a></center><hr>'
		menu.innerHTML += '<br><center><p style="font-size:x-large;"><b><a href="http://tuentipack.co.cc/"><img src="http://img373.imageshack.us/img373/6977/tuentipackbanner.png"></a></b></p><br><br><p style="font-size:large;">Si tiene alguna duda, idea, etc. entre en la <b>web oficial: </b><a href="http://tuentipack.co.cc">http://tuentipack.co.cc</a></p></center><br>';
		menu.innerHTML += '<form style="text-align: right" action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="7684825"><input type="image" src="https://www.paypal.com/es_ES/ES/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal. La forma rápida y segura de pagar en Internet."><img alt="" border="0" src="https://www.paypal.com/es_ES/i/scr/pixel.gif" width="1" height="1"></form><br><h1>'+scriptname+' <b>v'+version+'</b> --> <a href="http://userscripts.org/scripts/show/43374">Ir a la web de descarga del script</a></h1><hr>';

		checkboxautoactualizar = document.createElement("input");
		checkboxautoactualizar.setAttribute("type","checkbox");
		checkboxautoactualizar.setAttribute("id","checkboxautoactualizar");
		if (GM_getValue('checkboxautoactualizar') == true) checkboxautoactualizar.setAttribute("checked","1");
		menu.appendChild(checkboxautoactualizar);
		menu.innerHTML += 'Buscar actualizaciones automáticamente (No recomendado para conexiones MUY lentas)<br>';

		checkboxmenufoto = document.createElement("input");
		checkboxmenufoto.setAttribute("type","checkbox");
		checkboxmenufoto.setAttribute("id","checkboxmenufoto");
		if (GM_getValue('checkboxmenufoto') == true) checkboxmenufoto.setAttribute("checked","1");
		menu.appendChild(checkboxmenufoto);
		menu.innerHTML += 'Menú de foto siempre abierto<br>';

		checkboxreloj = document.createElement("input");
		checkboxreloj.setAttribute("type","checkbox");
		checkboxreloj.setAttribute("id","checkboxreloj");
		if (GM_getValue('checkboxreloj') == true) checkboxreloj.setAttribute("checked","1");
		menu.appendChild(checkboxreloj);
		menu.innerHTML += 'Mostrar reloj flash<br>';
		menu.innerHTML += 'Tiempo de espera para activar el script <input type="text" maxlength="1" id="espera" size="1" onclick="javascript:this.focus();this.select();"/>segundos. (Se recomiendan 4s para conexiones rápidas, 6s para conexiones lentas). ';

		menu.innerHTML += '<hr><h1>Fondos:</h1><br>';
		formfondo = document.createElement("form");
		formfondo.setAttribute("name","formfondo");
		radiofondo = document.createElement("input");
		radiofondo.setAttribute("type","radio");
		radiofondo.setAttribute("name","radiofondo")
		radiofondo.setAttribute("id","radiofondo");
		if (GM_getValue('radiofondo') == true) radiofondo.setAttribute("checked","1");
		formfondo.appendChild(radiofondo);
		formfondo.innerHTML += 'Fondo normal<br>';

		radiofondo1 = document.createElement("input");
		radiofondo1.setAttribute("type","radio");
		radiofondo1.setAttribute("name","radiofondo")
		radiofondo1.setAttribute("id","radiofondo1");
		if (GM_getValue('radiofondo1') == true) radiofondo1.setAttribute("checked","1");
		formfondo.appendChild(radiofondo1);
		formfondo.innerHTML += 'Fondo personalizado:  Ruta: ';

		formfondo.innerHTML += '<input type="text" id="textfondo" size="32" name="textfondo" onclick="javascript:this.focus();this.select();"/><br>';
		if (GM_getValue('textfondo') == undefined) GM_setValue('textfondo',"");

		radiofondo2 = document.createElement("input");
		radiofondo2.setAttribute("type","radio");
		radiofondo2.setAttribute("name","radiofondo")
		radiofondo2.setAttribute("id","radiofondo2");
		if (GM_getValue('radiofondo2') == true) radiofondo2.setAttribute("checked","1");
		formfondo.appendChild(radiofondo2);
		formfondo.innerHTML += 'Fondo "Nuevo Tuenti rediseño sutil" de <b>jayjayjay_92</b> v1.29<br>';

		radiofondo3 = document.createElement("input");
		radiofondo3.setAttribute("type","radio");
		radiofondo3.setAttribute("name","radiofondo")
		radiofondo3.setAttribute("id","radiofondo3");
		if (GM_getValue('radiofondo3') == true) radiofondo3.setAttribute("checked","1");
		formfondo.appendChild(radiofondo3);
		formfondo.innerHTML += 'Fondo "tuentiblue" de <b>ardo99</b><br>';

		radiofondo3v2 = document.createElement("input");
		radiofondo3v2.setAttribute("type","radio");
		radiofondo3v2.setAttribute("name","radiofondo")
		radiofondo3v2.setAttribute("id","radiofondo3v2");
		if (GM_getValue('radiofondo3v2') == true) radiofondo3v2.setAttribute("checked","1");
		formfondo.appendChild(radiofondo3v2);
		formfondo.innerHTML += 'Fondo "tuentiblue v2" de <b>ardo99</b><br>';

		radiofondo4 = document.createElement("input");
		radiofondo4.setAttribute("type","radio");
		radiofondo4.setAttribute("name","radiofondo")
		radiofondo4.setAttribute("id","radiofondo4");
		if (GM_getValue('radiofondo4') == true) radiofondo4.setAttribute("checked","1");
		formfondo.appendChild(radiofondo4);
		formfondo.innerHTML += 'Fondo "TuentiStyle" de <b>draco1989</b> v1.2<br>';

		radiofondo5 = document.createElement("input");
		radiofondo5.setAttribute("type","radio");
		radiofondo5.setAttribute("name","radiofondo")
		radiofondo5.setAttribute("id","radiofondo5");
		if (GM_getValue('radiofondo5') == true) radiofondo5.setAttribute("checked","1");
		formfondo.appendChild(radiofondo5);
		formfondo.innerHTML += 'Fondo "Likern" de <b>Shiver</b><br>';

		radiofondo6 = document.createElement("input");
		radiofondo6.setAttribute("type","radio");
		radiofondo6.setAttribute("name","radiofondo")
		radiofondo6.setAttribute("id","radiofondo6");
		if (GM_getValue('radiofondo6') == true) radiofondo6.setAttribute("checked","1");
		formfondo.appendChild(radiofondo6);
		formfondo.innerHTML += 'Fondo "Pinxil" de <b>Shiver</b><br>';

		radiofondo7 = document.createElement("input");
		radiofondo7.setAttribute("type","radio");
		radiofondo7.setAttribute("name","radiofondo")
		radiofondo7.setAttribute("id","radiofondo7");
		if (GM_getValue('radiofondo7') == true) radiofondo7.setAttribute("checked","1");
		formfondo.appendChild(radiofondo7);
		formfondo.innerHTML += 'Fondo "LoomySkin" de <b>Shiver</b><br>';

		radiofondo8 = document.createElement("input");
		radiofondo8.setAttribute("type","radio");
		radiofondo8.setAttribute("name","radiofondo")
		radiofondo8.setAttribute("id","radiofondo8");
		if (GM_getValue('radiofondo8') == true) radiofondo8.setAttribute("checked","1");
		formfondo.appendChild(radiofondo8);
		formfondo.innerHTML += 'Fondo negro<br>';

		radiofondo9 = document.createElement("input");
		radiofondo9.setAttribute("type","radio");
		radiofondo9.setAttribute("name","radiofondo")
		radiofondo9.setAttribute("id","radiofondo9");
		if (GM_getValue('radiofondo9') == true) radiofondo9.setAttribute("checked","1");
		formfondo.appendChild(radiofondo9);
		formfondo.innerHTML += 'Fondo "TuentiPink" de <b>Daniko</b><br>';

		radiofondo10 = document.createElement("input");
		radiofondo10.setAttribute("type","radio");
		radiofondo10.setAttribute("name","radiofondo")
		radiofondo10.setAttribute("id","radiofondo10");
		if (GM_getValue('radiofondo10') == true) radiofondo10.setAttribute("checked","1");
		formfondo.appendChild(radiofondo10);
		formfondo.innerHTML += 'Fondo "tuentiblue II (PINK VERSION)" de <b>ardo99</b><br>';

		radiofondop = document.createElement("input");
		radiofondop.setAttribute("type","radio");
		radiofondop.setAttribute("name","radiofondo")
		radiofondop.setAttribute("id","radiofondop");
		if (GM_getValue('radiofondop') == true) radiofondop.setAttribute("checked","1");
		formfondo.appendChild(radiofondop);
		formfondo.innerHTML += 'Fondo panorámico de ciudad<br>';

		checkboxfondofijo = document.createElement("input");
		checkboxfondofijo.setAttribute("type","checkbox");
		checkboxfondofijo.setAttribute("id","checkboxfondofijo");
		if (GM_getValue('checkboxfondofijo') == true) checkboxfondofijo.setAttribute("checked","1");
		formfondo.appendChild(checkboxfondofijo);
		formfondo.innerHTML += 'Fondo fijo<br>';
		menu.appendChild(formfondo);

		menu.innerHTML += '<hr><h1>Diseños:</h1><br>';
		formrediseño = document.createElement("form");
		formrediseño.setAttribute("name","formrediseño");

		radiorediseño = document.createElement("input");
		radiorediseño.setAttribute("type","radio");
		radiorediseño.setAttribute("name","radiorediseño")
		radiorediseño.setAttribute("id","radiorediseño");
		if (GM_getValue('radiorediseño') == true) radiorediseño.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño);
		formrediseño.innerHTML += 'Diseño normal<br>';

		radiorediseño1 = document.createElement("input");
		radiorediseño1.setAttribute("type","radio");
		radiorediseño1.setAttribute("name","radiorediseño")
		radiorediseño1.setAttribute("id","radiorediseño1");
		if (GM_getValue('radiorediseño1') == true) radiorediseño1.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño1);
		formrediseño.innerHTML += 'Diseño "Nuevo Tuenti rediseño sutil" de <b>jayjayjay_92</b> v1.27 ---> <a href="http://userstyles.org/styles/17626">Web del diseño</a>.<br>';

		radiorediseño2 = document.createElement("input");
		radiorediseño2.setAttribute("type","radio");
		radiorediseño2.setAttribute("name","radiorediseño")
		radiorediseño2.setAttribute("id","radiorediseño2");
		if (GM_getValue('radiorediseño2') == true) radiorediseño2.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño2);
		formrediseño.innerHTML += 'Diseño "tuentiblue" de <b>ardo99</b> ---> <a href="http://userstyles.org/styles/18583>Web del diseño</a>.<br>';

		radiorediseño3 = document.createElement("input");
		radiorediseño3.setAttribute("type","radio");
		radiorediseño3.setAttribute("name","radiorediseño")
		radiorediseño3.setAttribute("id","radiorediseño3");
		if (GM_getValue('radiorediseño3') == true) radiorediseño3.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño3);
		formrediseño.innerHTML += 'Diseño "TuentiStyle" de <b>draco1989</b> v1.2 ---> <a href="http://userstyles.org/styles/18119">Web del diseño</a>.<br>';

		radiorediseño4 = document.createElement("input");
		radiorediseño4.setAttribute("type","radio");
		radiorediseño4.setAttribute("name","radiorediseño")
		radiorediseño4.setAttribute("id","radiorediseño4");
		if (GM_getValue('radiorediseño4') == true) radiorediseño4.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño4);
		formrediseño.innerHTML += 'Diseño "TuentiSkin" de <b>alarico750</b> ---> <a href="http://userstyles.org/styles/19064">Web del diseño</a>.<br>';

		radiorediseño5 = document.createElement("input");
		radiorediseño5.setAttribute("type","radio");
		radiorediseño5.setAttribute("name","radiorediseño")
		radiorediseño5.setAttribute("id","radiorediseño5");
		if (GM_getValue('radiorediseño5') == true) radiorediseño5.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño5);
		formrediseño.innerHTML += 'Diseño "Likern" de <b>Shiver</b> ---> <a href="http://www.ultra-zone.es/">Web del autor</a>.<br>';

		radiorediseño6 = document.createElement("input");
		radiorediseño6.setAttribute("type","radio");
		radiorediseño6.setAttribute("name","radiorediseño")
		radiorediseño6.setAttribute("id","radiorediseño6");
		if (GM_getValue('radiorediseño6') == true) radiorediseño6.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño6);
		formrediseño.innerHTML += 'Diseño "Pinxil" de <b>Shiver</b> ---> <a href="http://www.ultra-zone.es/">Web del autor</a>.<br>';

		radiorediseño7 = document.createElement("input");
		radiorediseño7.setAttribute("type","radio");
		radiorediseño7.setAttribute("name","radiorediseño")
		radiorediseño7.setAttribute("id","radiorediseño7");
		if (GM_getValue('radiorediseño7') == true) radiorediseño7.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño7);
		formrediseño.innerHTML += 'Diseño "LoomySkin" de <b>Shiver</b> ---> <a href="http://www.ultra-zone.es/">Web del autor</a>.<br>';

		radiorediseño8 = document.createElement("input");
		radiorediseño8.setAttribute("type","radio");
		radiorediseño8.setAttribute("name","radiorediseño")
		radiorediseño8.setAttribute("id","radiorediseño8");
		if (GM_getValue('radiorediseño8') == true) radiorediseño8.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño8);
		formrediseño.innerHTML += 'Diseño "TuentiRed" de <b>Daniko</b> ---> <a href="http://userstyles.org/styles/19955">Web del diseño</a>.<br>';

		radiorediseño9 = document.createElement("input");
		radiorediseño9.setAttribute("type","radio");
		radiorediseño9.setAttribute("name","radiorediseño")
		radiorediseño9.setAttribute("id","radiorediseño9");
		if (GM_getValue('radiorediseño9') == true) radiorediseño9.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño9);
		formrediseño.innerHTML += 'Diseño "TuentiPink" de <b>Daniko</b> ---> <a href="http://userstyles.org/styles/19958">Web del diseño</a>.<br>';

		radiorediseño10 = document.createElement("input");
		radiorediseño10.setAttribute("type","radio");
		radiorediseño10.setAttribute("name","radiorediseño")
		radiorediseño10.setAttribute("id","radiorediseño10");
		if (GM_getValue('radiorediseño10') == true) radiorediseño10.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño10);
		formrediseño.innerHTML += 'Diseño "tuentiblue II (PINK VERSION)" de <b>ardo99</b> ---> <a href="http://userstyles.org/styles/20143">Web del diseño</a>.<br>';

		menu.appendChild(formrediseño);
		menu.innerHTML += '<hr><h1>PasarFotos:</h1><br>PasarFotos de <b>To_Net</b> te permitirá ir a cualquier foto de las que estés viendo sin tener que pasar una a una o tener que pasarte por el album para pasarlas mas rapido.<br><img src="http://s3.amazonaws.com/uso_ss/icon/51461/thumb.bmp?1245063114" width="5%"><br><a href="http://userscripts.org/scripts/show/51461">Ir a la página del script</a>.';
		menu.innerHTML += '<hr><h1>Radio:</h1><br>La radio ha sido creada y recopilada por <b>DJMeu</b>, <b>Shiver</b> y <b>Nodsert</b>.<br><br><b>Las radios son:</b><br>Euro Dance<br>Europa FM<br>AH.FM - The Best in Trance & Progressive<br>MakinaMania<br>Reggaeton 94<br>RTVE<br>Cadena 100<br>Onda Cero<br>Kiss FM<br>Loca FM<br>FlaixFM<br>MasterFM<br>PQTP Radio Urbana<br>';
		menu.innerHTML += '<hr><h1>Webs recomendadas:</h1><br><center><a href="http://www.ultra-zone.es/"><img src="http://img17.imageshack.us/img17/9336/bannerteo.gif"></a><br> <a href="http://x-lacara.blogspot.com/"><img src="http://a.imagehost.org/0918/X-lacara.jpg"></a> </a><a href="http://www.territoriodd.com"><img src="http://a.imagehost.org/0509/tedd.png"></a><br> <a href="http://www.tuentiadictos.es/"><img src="http://img5.imageshack.us/img5/456/tuentiadictos2mr4.gif"></a></center><hr>';

		botonaceptar = document.createElement("button");
		botonaceptar.appendChild(document.createTextNode("Guardar"));
		botonaceptar.setAttribute("onclick",function(){aceptar()});
		botonaceptar.addEventListener("click", function(){aceptar()}, true);
		menu.appendChild(botonaceptar);

		botoncancelar = document.createElement("button");
		botoncancelar.appendChild(document.createTextNode("Cancelar"));
		botoncancelar.setAttribute("onclick",function(){cancelar()});
		botoncancelar.addEventListener("click", function(){cancelar()}, true);
		menu.appendChild(botoncancelar);

		label = document.createElement("label");
		label.innerHTML = '  ';
		menu.appendChild(label);

		botonactualizar = document.createElement("button");
		botonactualizar.appendChild(document.createTextNode("Actualización manual"));
		botonactualizar.setAttribute("onclick",function(){update()});
		botonactualizar.addEventListener("click", function(){update()}, true);
		menu.appendChild(botonactualizar);

		botoninstalar = document.createElement("button");
		botoninstalar.appendChild(document.createTextNode("Instalar la última versión"));
		botoninstalar.setAttribute("onclick",function(){instalar()});
		botoninstalar.addEventListener("click", function(){instalar()}, true);
		menu.appendChild(botoninstalar);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(menu, canvas);
		document.getElementById('textfondo').value = GM_getValue('textfondo');
		document.getElementById('espera').value = GM_getValue('espera');
	}else cancelar();
};
//-------------------------------------------------------------------------------------------//

function menufoto(){
	if (document.getElementById("menufoto") == null) {
		var menufoto = document.createElement("div");
		menufoto.setAttribute("id","menufoto");

		botondescargar = document.createElement("button");
		botondescargar.appendChild(document.createTextNode("Descargar"));
		botondescargar.setAttribute("onclick",function(){Descargar()});
		botondescargar.addEventListener("click", function(){Descargar()}, true);
		menufoto.appendChild(botondescargar);

		botonampliar = document.createElement("button");
		botonampliar.appendChild(document.createTextNode("Ampliar Foto"));
		botonampliar.setAttribute("onclick",function(){ampliar()});
		botonampliar.addEventListener("click", function(){ampliar()}, true);
		menufoto.appendChild(botonampliar);

		botonabrirfoto = document.createElement("button");
		botonabrirfoto.appendChild(document.createTextNode("Abrir"));
		botonabrirfoto.setAttribute("onclick",function(){abrirfoto()});
		botonabrirfoto.addEventListener("click", function(){abrirfoto()}, true);
		menufoto.appendChild(botonabrirfoto);

		botonpasarfotos = document.createElement("button");
		botonpasarfotos.appendChild(document.createTextNode("Ir a Foto Numero"));
		botonpasarfotos.setAttribute("onclick",function(){Pasarfotos()});
		botonpasarfotos.addEventListener("click", function(){Pasarfotos()}, true);
		menufoto.appendChild(botonpasarfotos);

		botonmostrarurl = document.createElement("button");
		botonmostrarurl.appendChild(document.createTextNode("Mostrar URL de la foto"));
		botonmostrarurl.setAttribute("onclick",function(){mostrarurl()});
		botonmostrarurl.addEventListener("click", function(){mostrarurl()}, true);
		menufoto.appendChild(botonmostrarurl);

		botonfotofondo = document.createElement("button");
		botonfotofondo.appendChild(document.createTextNode("Poner foto como fondo"));
		botonfotofondo.setAttribute("onclick",function(){fotofondo()});
		botonfotofondo.addEventListener("click", function(){fotofondo()}, true);
		menufoto.appendChild(botonfotofondo);

		botoncerrarmenufoto = document.createElement("button");
		botoncerrarmenufoto.appendChild(document.createTextNode("Cerrar"));
		botoncerrarmenufoto.setAttribute("onclick",function(){cerrarmenufoto()});
		botoncerrarmenufoto.addEventListener("click", function(){cerrarmenufoto()}, true);
		menufoto.appendChild(botoncerrarmenufoto);

		document.getElementById("css_monitors").appendChild(menufoto);

		function mostrarurl(){
			if (document.getElementById('photo_image') == null){
				alert('No se ha encontrado ninguna foto');
			}else{
				if (document.getElementById("divurl") == null) {
					var divurl = document.createElement("div");
					divurl.setAttribute("id","divurl");
					divurl.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #64A3CF !important;");

					cuadrourl = document.createElement("input");
					cuadrourl.setAttribute("id","cuadrourl");
					cuadrourl.setAttribute("readonly","readonly");
					cuadrourl.setAttribute("size","103");
					cuadrourl.setAttribute("onclick","javascript:this.focus();this.select();");
					cuadrourl.setAttribute("value",document.getElementById('photo_image').src);
					divurl.appendChild(cuadrourl);

					botonurl = document.createElement("button");
					botonurl.appendChild(document.createTextNode("Cerrar"));
					botonurl.setAttribute("onclick",function(){nomostrarurl()});
					botonurl.addEventListener("click", function(){nomostrarurl()}, true);
					divurl.appendChild(botonurl);

					canvas=document.getElementById('canvas');
					canvas.parentNode.insertBefore(divurl, canvas);
					document.getElementById('cuadrourl').select()
				}else nomostrarurl();
			};
			function nomostrarurl() document.getElementById('container').removeChild(document.getElementById('divurl'));
		};
	}else cerrarmenufoto();
};
function cerrarmenufoto(){
	document.getElementById("css_monitors").removeChild(document.getElementById('menufoto'));
	GM_setValue('checkboxmenufoto', false);
};
function abrirfoto(){
	if (document.getElementById('photo_image') == null){
		alert('No se ha encontrado ninguna foto');
	}else{
		document.location.href = document.getElementById('photo_image').src;
	};
};
function Descargar(){
	if (document.getElementById('photo_image') == null){
		alert('No se ha encontrado ninguna foto');
	}else{
		document.location.href = document.getElementById('photo_image').src + "?download";
	};
};
function ampliar(){
	if (document.getElementById('photo_image') == null){
		alert('No se ha encontrado ninguna foto');
	}else{
		document.getElementById('photo_and_tags').setAttribute("style","");
		document.getElementById('photo_image').setAttribute("width","2000%");
	};
};
function aceptar(){
	GM_setValue('checkboxautoactualizar', document.getElementById('checkboxautoactualizar').checked);
	GM_setValue('checkboxmenufoto', document.getElementById('checkboxmenufoto').checked);
	GM_setValue('checkboxreloj', document.getElementById('checkboxreloj').checked);
	GM_setValue('espera', document.getElementById('espera').value);
	GM_setValue('radiofondo', document.getElementById('radiofondo').checked);
	GM_setValue('radiofondo1', document.getElementById('radiofondo1').checked);
	GM_setValue('radiofondo2', document.getElementById('radiofondo2').checked);
	GM_setValue('radiofondo3', document.getElementById('radiofondo3').checked);
	GM_setValue('radiofondo3v2', document.getElementById('radiofondo3v2').checked);
	GM_setValue('radiofondo4', document.getElementById('radiofondo4').checked);
	GM_setValue('radiofondo5', document.getElementById('radiofondo5').checked);
	GM_setValue('radiofondo6', document.getElementById('radiofondo6').checked);
	GM_setValue('radiofondo7', document.getElementById('radiofondo7').checked);
	GM_setValue('radiofondo8', document.getElementById('radiofondo8').checked);
	GM_setValue('radiofondo9', document.getElementById('radiofondo9').checked);
	GM_setValue('radiofondo10', document.getElementById('radiofondo10').checked);
	GM_setValue('radiofondop', document.getElementById('radiofondop').checked);
	GM_setValue('checkboxfondofijo', document.getElementById('checkboxfondofijo').checked);
	GM_setValue('radiorediseño', document.getElementById('radiorediseño').checked);
	GM_setValue('radiorediseño1', document.getElementById('radiorediseño1').checked);
	GM_setValue('radiorediseño2', document.getElementById('radiorediseño2').checked);
	GM_setValue('radiorediseño3', document.getElementById('radiorediseño3').checked);
	GM_setValue('radiorediseño4', document.getElementById('radiorediseño4').checked);
	GM_setValue('radiorediseño5', document.getElementById('radiorediseño5').checked);
	GM_setValue('radiorediseño6', document.getElementById('radiorediseño6').checked);
	GM_setValue('radiorediseño7', document.getElementById('radiorediseño7').checked);
	GM_setValue('radiorediseño8', document.getElementById('radiorediseño8').checked);
	GM_setValue('radiorediseño9', document.getElementById('radiorediseño9').checked);
	GM_setValue('radiorediseño10', document.getElementById('radiorediseño10').checked);
	GM_setValue('textfondo', document.getElementById('textfondo').value);
	GM_setValue('configurado', version);
	alert('Su configuraci\u00f3n se ha guardado correctamente');
	location.reload();
};
function cancelar() document.getElementById('canvas').parentNode.removeChild(menu);
function Menupasarpagina(){
	if (document.getElementById("Menupasarpagina") == null) {
		var Menupasarpagina = document.createElement("div");
		Menupasarpagina.setAttribute("id","Menupasarpagina");
		Menupasarpagina.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #64A3CF !important;");

		cuadromenupasarpagina = document.createElement("input");
		cuadromenupasarpagina.setAttribute("id","cuadromenupasarpagina")

		Botonpasarpagina = document.createElement("button");
		Botonpasarpagina.appendChild(document.createTextNode("Ir"));
		Botonpasarpagina.setAttribute("onclick",function(){Pasarpagina()});
		Botonpasarpagina.addEventListener("click", function(){Pasarpagina()}, true);

		Botonpasarpagina2 = document.createElement("button");
		Botonpasarpagina2.appendChild(document.createTextNode("Cerrar"));
		Botonpasarpagina2.setAttribute("onclick",function(){NoPasarpagina()});
		Botonpasarpagina2.addEventListener("click", function(){NoPasarpagina()}, true);
 
		Menupasarpagina.innerHTML += 'Página número: ';    
		Menupasarpagina.appendChild(cuadromenupasarpagina);
		Menupasarpagina.appendChild(Botonpasarpagina);
		Menupasarpagina.appendChild(Botonpasarpagina2);
		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(Menupasarpagina, canvas);

		function Pasarpagina(){
			numero = document.getElementById('cuadromenupasarpagina').value - 1
			if (numero < 0) alert('Por favor, inserte un número mayor que 0'); else{
				if (document.location.href.substring(25,31)=="Search") {
					document.location.href = document.location.href + "&page_no=" + numero;
				}else{
					if (document.location.href.substring(25,31)=="Albums") {
						document.location.href = document.location.href + "&photos_page=" + numero;
					}else{	
						document.location.href = document.location.href + "&wall_page=" + numero;
					};
				};
				document.getElementById("css_monitors").removeChild(Menupasarpagina);
			};
		};
	}else NoPasarpagina();
};
function  NoPasarpagina() document.getElementById('container').removeChild(document.getElementById('Menupasarpagina'));
function fotofondo(){
	if (document.getElementById('photo_image') == null){
		alert('No se ha encontrado ninguna foto');
	}else{
		if (confirm("¿Estás seguro?")) {
			GM_setValue('textfondo', document.getElementById('photo_image').src);
			GM_setValue('radiofondo', false);
			GM_setValue('radiofondo1', true);
			GM_setValue('radiofondo2', false);
			GM_setValue('radiofondo3', false);
			GM_setValue('radiofondo3v2', false);
			GM_setValue('radiofondo4', false);
			GM_setValue('radiofondo5', false);
			GM_setValue('radiofondo6', false);
			GM_setValue('radiofondo7', false);
			GM_setValue('radiofondo8', false);
			GM_setValue('radiofondo9', false);
			GM_setValue('radiofondo10', false);
			location.reload();
		};
	};
};
//Script "PasarFotos"
//Autor:	To_Net
//Homepage	http://userscripts.org/scripts/show/51461
function Pasarfotos() {
	if (document.getElementById("respondedor") == null) {
		if (document.getElementById('photo_image') == null){
			alert('Debe estar en una p\u00e1gina de foto');;
		}else{
			var respondedor = document.createElement("div");
			respondedor.setAttribute("id","respondedor");
			respondedor.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #64A3CF !important;");

			var boton = document.createElement("button");
			boton.appendChild(document.createTextNode("Ir"));
			boton.setAttribute("onclick",function(){LanzaR()});
			boton.addEventListener("click", function(){LanzaR()}, true);

			var boton2 = document.createElement("button");
			boton2.appendChild(document.createTextNode("Cerrar"));
			boton2.setAttribute("onclick",function(){NoLanzaR()});
			boton2.addEventListener("click", function(){NoLanzaR()}, true);

			var casilla = document.createElement("input");
			casilla.setAttribute("type","text");
			casilla.setAttribute("maxlength",4);

			respondedor.innerHTML += 'Foto número: ';    
			respondedor.appendChild(casilla);
			respondedor.appendChild(boton);
			respondedor.appendChild(boton2);

			panel=document.createElement("div");
			panel.setAttribute("id","panel");
			canvas=document.getElementById('canvas');
			canvas.parentNode.insertBefore(panel, canvas);
			panel.appendChild(respondedor);

			function LanzaR(){
				var url= document.location.href;
				panel.removeChild(respondedor);

				if (url.substring(0,62)=="http://www.tuenti.com/#m=Photo&func=view_photo&collection_key="){
					url= url.replace("http://www.tuenti.com/#m=Photo&func=view_photo&","");
					var A= url.substring(0,25);

					var valor= casilla.value;
					var B= Math.floor(valor/25);
					var C=valor%25

					if (C==0){
						B=B-1;
						C=25;
					}

					var NuevoUrl="http://www.tuenti.com/#m=Albums&func=index&"+A+"&photo_albums_page=0&photos_page="+B
					document.location.href=(NuevoUrl);
					setTimeout(function(){PinchaR()},900)
				}

				function PinchaR(){
					var as = document.getElementsByTagName('a');
					fotos = new Array(as.length);
					var j=0;
					for(var i=0; i<as.length; i++) {
						var atributo = as[i].getAttribute('href');
						if (atributo.substring(0,9)==("#m=Photo&")){            
							fotos[j]=atributo;
							j++;
						}
					}

					var n=0;
					var fotos2=new Array(25);

					for (var k=0; k<fotos.length;k++){

						if (fotos[k]==fotos[k+1]){
							fotos2[n]=fotos[k];
							k++;
						}else{
							fotos2[n]=fotos[k];
						}
						n++;
					}

					var valor = casilla.value;

					var C=((valor%25)-1)

					if (C==-1){
						C=24;
					}
					document.location.href=(fotos2[C]);
				}
			}
		};
	}else NoLanzaR();
};
function NoLanzaR() document.getElementById('container').removeChild(document.getElementById('panel'));
function Radio(){
	if (document.getElementById("radio") == null) {
		var radio = document.createElement("div");
		radio.setAttribute("id","radio");
		radio.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #64A3CF !important;");
		radio.setAttribute("class","container");

		radioradio = document.createElement("input");
		radioradio.setAttribute("type","radio");
		radioradio.setAttribute("name","radioradio")
		radioradio.setAttribute("id","radioradio");
		radioradio.setAttribute("checked","1");
		radio.appendChild(radioradio);
		radio.innerHTML += '  Radio "Euro Dance"<br>';

		radioradio1 = document.createElement("input");
		radioradio1.setAttribute("type","radio");
		radioradio1.setAttribute("name","radioradio")
		radioradio1.setAttribute("id","radioradio1");
		radio.appendChild(radioradio1);
		radio.innerHTML += '  Radio "Europa FM"<br>';

		radioradio2 = document.createElement("input");
		radioradio2.setAttribute("type","radio");
		radioradio2.setAttribute("name","radioradio")
		radioradio2.setAttribute("id","radioradio2");
		radio.appendChild(radioradio2);
		radio.innerHTML += '  Radio "AH.FM - The Best in Trance & Progressive"<br>';

		radioradio3 = document.createElement("input");
		radioradio3.setAttribute("type","radio");
		radioradio3.setAttribute("name","radioradio")
		radioradio3.setAttribute("id","radioradio3");
		radio.appendChild(radioradio3);
		radio.innerHTML += '  Radio "MakinaMania"<br>';

		radioradio4 = document.createElement("input");
		radioradio4.setAttribute("type","radio");
		radioradio4.setAttribute("name","radioradio")
		radioradio4.setAttribute("id","radioradio4");
		radio.appendChild(radioradio4);
		radio.innerHTML += '  Radio "Reggaeton 94"<br>';

		radioradio5 = document.createElement("input");
		radioradio5.setAttribute("type","radio");
		radioradio5.setAttribute("name","radioradio")
		radioradio5.setAttribute("id","radioradio5");
		radio.appendChild(radioradio5);
		radio.innerHTML += '  Radio "RTVE"<br>';

		radioradio6 = document.createElement("input");
		radioradio6.setAttribute("type","radio");
		radioradio6.setAttribute("name","radioradio")
		radioradio6.setAttribute("id","radioradio6");
		radio.appendChild(radioradio6);
		radio.innerHTML += '  Radio "Cadena 100"<br>';

		radioradio7 = document.createElement("input");
		radioradio7.setAttribute("type","radio");
		radioradio7.setAttribute("name","radioradio")
		radioradio7.setAttribute("id","radioradio7");
		radio.appendChild(radioradio7);
		radio.innerHTML += '  Radio "Onda Cero"<br>';

		radioradio8 = document.createElement("input");
		radioradio8.setAttribute("type","radio");
		radioradio8.setAttribute("name","radioradio")
		radioradio8.setAttribute("id","radioradio8");
		radio.appendChild(radioradio8);
		radio.innerHTML += '  Radio "Kiss FM"<br>';

		radioradio9 = document.createElement("input");
		radioradio9.setAttribute("type","radio");
		radioradio9.setAttribute("name","radioradio")
		radioradio9.setAttribute("id","radioradio9");
		radio.appendChild(radioradio9);
		radio.innerHTML += '  Radio "Loca FM"<br>';

		radioradio10 = document.createElement("input");
		radioradio10.setAttribute("type","radio");
		radioradio10.setAttribute("name","radioradio")
		radioradio10.setAttribute("id","radioradio10");
		radio.appendChild(radioradio10);
		radio.innerHTML += '  Radio "FlaixFM"<br>'
;
		radioradio11 = document.createElement("input");
		radioradio11.setAttribute("type","radio");
		radioradio11.setAttribute("name","radioradio")
		radioradio11.setAttribute("id","radioradio11");
		radio.appendChild(radioradio11);
		radio.innerHTML += '  Radio "MasterFM"<br>';

		radioradio12 = document.createElement("input");
		radioradio12.setAttribute("type","radio");
		radioradio12.setAttribute("name","radioradio")
		radioradio12.setAttribute("id","radioradio12");
		radio.appendChild(radioradio12);
		radio.innerHTML += '  Radio "PQTP Radio Urbana"<br>';

		radioradiop = document.createElement("input");
		radioradiop.setAttribute("type","radio");
		radioradiop.setAttribute("name","radioradio")
		radioradiop.setAttribute("id","radioradiop");
		radio.appendChild(radioradiop);
		radio.innerHTML += '  Radio personalizada:  Ruta: <input type="text" id="textradio" size="32" onclick="javascript:this.focus();this.select();"/><br>';
		if (GM_getValue('textradio') == undefined) GM_setValue('textradio',"");

		botoniniciar = document.createElement("button");
		botoniniciar.appendChild(document.createTextNode("Iniciar radio"));
		botoniniciar.setAttribute("onclick",function(){iniciarradio()});
		botoniniciar.addEventListener("click", function(){iniciarradio()}, true);
		radio.appendChild(botoniniciar);

		botonnoiniciar = document.createElement("button");
		botonnoiniciar.appendChild(document.createTextNode("Cancelar"));
		botonnoiniciar.setAttribute("onclick",function(){noiniciarradio()});
		botonnoiniciar.addEventListener("click", function(){noiniciarradio()}, true);
		radio.appendChild(botonnoiniciar);
		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(radio, canvas);
		document.getElementById('textradio').value = GM_getValue('textradio');
	}else noiniciarradio();
};
function iniciarradio(){
	GM_setValue('textradio', document.getElementById('textradio').value);
	if(document.getElementById('radioradio').checked == true) radiosrc="http://scfire-ntc-aa04.stream.aol.com:80/stream/1024";
	if(document.getElementById('radioradio1').checked == true) radiosrc="http://antena3.stream.flumotion.com/antena3/europafm.mp3.m3u";
	if(document.getElementById('radioradio2').checked == true) radiosrc="http://fr.ah.fm:9000/";
	if(document.getElementById('radioradio3').checked == true) radiosrc="http://www.makinamania.com:8000/";
	if(document.getElementById('radioradio4').checked == true) radiosrc="mms://38.106.70.66/reggaeton_live";
	if(document.getElementById('radioradio5').checked == true) radiosrc="http://www.rtve.es/rne/audio/r1live.asx";
	if(document.getElementById('radioradio6').checked == true) radiosrc="http://cadena100.cope.stream.flumotion.com/cope/cadena100.asf.asx";
	if(document.getElementById('radioradio7').checked == true) radiosrc="http://ondacerolivewm.fplive.net/ondacerowmlive-live/oc_convencional";
	if(document.getElementById('radioradio8').checked == true) radiosrc="http://kissfm.en-directo.com/kissfm.asx";
	if(document.getElementById('radioradio9').checked == true) radiosrc="http://stream2.beatproducciones.com/castcontrol/playlist.php?id=14&type=asx";
	if(document.getElementById('radioradio10').checked == true) radiosrc="http://flaix.stream.flumotion.com/flaix/FLAIXfm.mp3.m3u";
	if(document.getElementById('radioradio11').checked == true) radiosrc="http://www.asawsistema.net/master.asx";
	if(document.getElementById('radioradio12').checked == true) radiosrc="http://repetidorva.pqtpradio.net:8000/FMUrban.m3u";
	if(document.getElementById('radioradiop').checked == true) radiosrc=document.getElementById('textradio').value;

	canvas.parentNode.removeChild(document.getElementById('radio'));

	if (document.getElementById("liradio") == null){
		liradio2=document.createElement("li");
		liradio2.setAttribute("id","liradio2");
		botonnoradio = document.createElement("button");
		botonnoradio.appendChild(document.createTextNode("Cerrar"));
		botonnoradio.setAttribute("onclick",function(){noradio()});
		botonnoradio.addEventListener("click", function(){noradio()}, true);
		liradio2.appendChild(botonnoradio);
		document.getElementsByClassName("settings")[0].insertBefore(liradio2, document.getElementsByClassName("settings")[0].firstChild);
	};

	if(document.getElementById("liradio") != null) document.getElementsByClassName("settings")[0].removeChild(document.getElementById("liradio"));
	liradio=document.createElement("li");
	liradio.setAttribute("id","liradio");

	document.getElementsByClassName("settings")[0].insertBefore(liradio, document.getElementsByClassName("settings")[0].firstChild);
	liradio.innerHTML += '<EMBED type="application/x-mplayer2" pluginspage="http://www.microsoft.com/windows/windowsmedia/en/Download/default.asp?tcode=9#location2" src="'+radiosrc+'" height="26" width="215" ShowGotoBar="0" TransparentAtStart="1" ShowControls="1" AutoStart="1" AllowScan="0" ShowAudioControls="0" EnableContextMenu="0" ShowPositionControls="0" ShowTracker="0" howStatusBar="0" AnimationAtStart="0" bbclient=0></EMBED>';
};
function noiniciarradio() canvas.parentNode.removeChild(document.getElementById('radio'));
function noradio(){
	if (document.getElementById("liradio") != null) document.getElementsByClassName("settings")[0].removeChild(document.getElementById("liradio2"));
	if (document.getElementById("liradio") != null) document.getElementsByClassName("settings")[0].removeChild(document.getElementById("liradio"));
};
function xat(){
	if (document.getElementById('divxat') == null){
		divxat = document.createElement("div");
		divxat.setAttribute("id","divxat");
		divxat.setAttribute("class","container");
		divxat.setAttribute("style","text-align: right; padding: 5px; position: absolute; display: block; z-index: 50; background-color: #64A3CF !important;");
                divxat.innerHTML += '<center><b>Rangos del chat</b><br><img src="http://a.imagehost.org/0592/rango.png"></center>';
		divxat.innerHTML += '<br><center><embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="540" height="405" name="chat" flashvars="id=66476594&rl=Castilian" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /></center>';
		divxat.innerHTML += '<br><hr><center><b>NORMAS DEL CHAT</b><br></center><P align=left><b>1ª-</b> No pedir ser CREADOR o MODERADOR. Para poder serlo te lo debe comunicar un CREADOR, si pides serlo serás banneado durante una hora.<br><b>2ª-</b> No hagas spam.<br><b>3ª-</b> No floodees, (Realiza los textos lo mas simplificados posibles y no escribas muchas veces el mismo mensaje).<br><b>4ª-</b> Si un MOD o CREADOR del xat te BANNEA, sera por algo ya que la permisibilidad suele ser alta. El ban no será retirado si no hay un buen motivo.<br><b>5ª-</b> Todas las personas deberán respetaran las normas.<br><b>6ª-</b> Se irán añadiendo a medida que surjan problemas.<br><b>7ª-</b> Respetar totalmente a todos los usuarios del chat.<br><b>8ª-</b> No insultes.<br><b>9ª-</b> No amenaces a nadie.<br><b>10ª-</b> Estas normas unicamente pueden ser modificadas por totalidad en cualquier momento por los creadores. Si tienes cualquier problema comunícaselo a cualquier MOD o CREADOR<br>';

		botonxatpestaña = document.createElement("button");
		botonxatpestaña.appendChild(document.createTextNode("Abrir en una nueva pestaña"));
		botonxatpestaña.setAttribute("onclick",function(){xatpestaña()});
		botonxatpestaña.addEventListener("click", function(){xatpestaña()}, true);

		divxat.appendChild(botonxatpestaña);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divxat, canvas);
		botonocultarxat = document.createElement("button");
		botonocultarxat.appendChild(document.createTextNode("Ocultar"));
		botonocultarxat.setAttribute("onclick",function(){ocultarxat()});
		botonocultarxat.addEventListener("click", function(){ocultarxat()}, true);
		divxat.appendChild(botonocultarxat); 
		botonnoxat = document.createElement("button");
		botonnoxat.appendChild(document.createTextNode("Cerrar"));
		botonnoxat.setAttribute("onclick",function(){noxat()});
		botonnoxat.addEventListener("click", function(){noxat()}, true);
		divxat.appendChild(botonnoxat);
	}else{
		if (document.getElementById('divxat').getAttribute("style").substring(78,79) == "-"){
			divxat.setAttribute("style","text-align: right; padding: 5px; position: absolute; display: block; z-index: 50; background-color: #64A3CF !important;");
			botonxat.removeChild(botonxat.firstChild);
			botonxat.appendChild(document.createTextNode("TuentiXat"));
		}else noxat();
	};
};
function noxat(){
	document.getElementById('canvas').parentNode.removeChild(document.getElementById('divxat'));
};
function ocultarxat(){
	divxat.setAttribute("style","text-align: right; padding: 5px; position: absolute; display: block; z-index: -1; background-color: #64A3CF !important;");
	botonxat.removeChild(botonxat.firstChild);
	botonxat.appendChild(document.createTextNode("TuentiXat(Oculto)"));
};
function xatpestaña(){
	noxat();
	GM_openInTab('http://xat.com/tuentipack');
};
//-------------------------------------------------------------------------------------------//

setTimeout(function(){espera()},GM_getValue('espera') * 1000);

function espera(){
	autoactualizar()
	if (GM_getValue('esperar') == 1) probarespera2()
	if (GM_getValue('checkboxreloj') == true) reloj()
	id()
	visitas()
};
function visitas(){
	//Autor:	To_Net&DJMeu
	visitas = document.getElementsByClassName("views")[0].firstChild.innerHTML;
	visitas2 = parseInt(visitas.replace(".",""));
	if (GM_getValue('visitas'+id) != undefined){
		nuevasvisitas = visitas2 - GM_getValue('visitas'+id);

		if (nuevasvisitas == visitas2){
			nuevasvisitas = 0;
		};

		document.getElementsByClassName("views")[0].firstChild.innerHTML=visitas+ "<font color=green> (+" +nuevasvisitas+ ")</font>";
	}else{
		document.getElementsByClassName("views")[0].firstChild.innerHTML=visitas+ "<font color=green> (+0)</font>";
	};
	GM_setValue('visitas'+id,visitas2);

};
function reloj(){
	reloj = document.createElement("div");
	reloj.setAttribute("id","caja");
	reloj.setAttribute("style","padding: 5px; position: fixed; display: block; z-index: 50; background-color: transparent !important;");
	reloj.innerHTML = '<table border="0"><tr><td><embed style="" src="http://www.crearunaweb.net/complementos/reloj06.swf" wmode="transparent" type="application/x-shockwave-flash" height="100" width="100"><param name=wmode value=transparent /></embed></td></tr><tr><td align="center">';
	if (GM_getValue('checkboxreloj') == true) document.getElementById("css_monitors").appendChild(reloj, document.getElementsByClassName("settings")[0].firstChild);
};
function id(){
	textid = document.getElementById('header_search_text_input').getAttribute('onfocus');
	idinicio = textid.indexOf('[')+1;
	idfin = textid.indexOf(']');
	id=textid.substring(idinicio,idfin);
};
// ==UserScript==
// @name		TPerso1
// @namespace		Javier
// @description		Script para personalizar el Tu by Berti
// @include		http://*.tuenti.com/*
// @exclude		http://*.tuenti.com/?m=login
// @version		15.6
// @require             http://userscripts.org/scripts/source/71448.user.js 
// ==/UserScript==

//-------------------------------------------------------------------------------------------//
// BY JAVIER
//-------------------------------------------------------------------------------------------//

version='15.6';
scripturl='http://userscripts.org/scripts/source/71448.user.js';
scripturl2='http://userscripts.org/scripts/show/71448';
scriptname="Personalizador del Tuenti";

//-------------------------------------------------------------------------------------------//

                var jax = 0;

 

 

//Incluir o AJAX

function include_dom(script_filename) {

    var html_doc = document.getElementsByTagName('head')[0];

    var js = document.createElement('script');

    js.setAttribute('language', 'javascript');

    js.setAttribute('type', 'text/javascript');

    js.setAttribute('src', script_filename);

    html_doc.appendChild(js);

    return false;

}


include_dom('http://*.tuenti.com/*');




 

window.addEventListener('load', function(){

        //Verificar se o user j? existe

        new Ajax.Request(servidor+"sidcheck.php",

                {

                method: 'post',

                postBody: 'sid='+mySID,

                onComplete: existeQ

                });

 

},false);;





















GM_registerMenuCommand(scriptname+ ': Buscar actualizaciones', update);
GM_registerMenuCommand(scriptname+ ': Ir a la p\u00e1gina del script', scriptpage);
function update(evt){
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/source/70461.meta.js',
		onload: f????H?O?????????unction(resp) {
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
			url: 'http://userscripts.org/scripts/source/70461.meta.js',
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
	GM_setValue('radiorediseño1', fal????H?O?????????se);
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
botonmenufoto.appendChild(document.createTextNode(""));
botonmenufoto.setAttribute("onclick",function(){menufoto()});
botonmenufoto.addEventListener("click", function(){menufoto()}, true);

botonpasarpagina = document.createElement("button");
botonpasarpagina.appendChild(document.createTextNode("__Ir a la página de comentarios__"));
botonpasarpagina.setAttribute("onclick",function(){Menupasarpagina()});
botonpasarpagina.addEventListener("click", function(){Menupasarpagina()}, true);



botonradio = document.createElement("button");
botonradio.appendChild(document.createTextNode("__radio__"));
botonradio.setAttribute("onclick",function(){radio()});
botonradio.addEventListener("click", function(){radio()}, true);

botonxat = document.createElement("button");
botonxat.appendChild(document.createTextNode("__Xat__"));
botonxat.setAttribute("onclick",function(){xat()});
botonxat.addEventListener("click", function(){xat()}, true);

botonmenu = document.createElement("button");
botonmenu.appendChild(document.createTextNode("__Configuración__"));
botonmenu.setAttribute("onclick",function(){Menu()});
botonmenu.addEventListener("click", function(){Menu()}, true);

caja.appendChild(botonmenufoto);
caja.appendChild(botonpasarpagina);
caja.appendChild(botonradio);
caja.appendChild(botonxat);
caja.appendChild(botonmenu);
document.getElementById("css_monitors").appendChild(caja);
//---------------------????H?O?????????----------------------------------------------------------------------//

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
	if (GM_getValue('checkboxf????H?O?????????ondofijo') == true){
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




	




if (GM_getValue('radiorediseño1') == true) var css = ".main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;}\n .header, #subheader{margin:0 !important;}\n\n.actions a, .itemActions a, .itemActions span{margin-right:4px !important;}\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n        background: #FFF !important;\n        border: solid #ACD0EE !important;\n        border-width: 0 1px 1px 1px !important;\n}\n\n.item, #basic_information_form {\n        background: #FFF !important;\n        border: 1px solid #ACD0EE !important;\n        margin-top:-1px !important;\n}\n    .setting {\n        border: solid #ACD0EE !important;\n        border-width: 0px 1px 1px 1px !important;\n    }\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #lo????H?O?????????gin {border:1px solid #ACD0EE !important;}\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;}\n\n    div.loading {right:-40px !important;}\n\n    div .note {\n        background:#fbfbfb !important;\n        border:#fff !important;\n    }\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n        -moz-border-radius:5px !important;\n        -webkit-border-radius:5px !important;\n    }\n\n\n\n    #lightbox_overlay{background:#000 !important;}\n\n    #ban_photo_link{width:100% !important;}\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n        background:#f9f9f9 !important;\n    }\n	#top_videos .mediaInfo:hover{background:transparent !important}\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n        border: solid #ACD0EE 1px !important;\n        -moz-border-radius-topleft:5px !important;\n        -moz-border-radius-topright:5px !important;\n        -webkit-border-radius-topleft:5px !important;\n        -webkit-border-radius-topright:5px !important;\n    }\n\n    .item, #latest_photos .body{\n        padding:8px !important;\n    }\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#FFF !important;}\n\n    .photoTag{opacity:0.6 !important;}\n	\n.mod .body{border-top:0px solid #FFF !important;}\nr	\n.pager.light{\npadding-top:10px !important;\npadding-bottom:10px !important;}\n\n#networks .body, .login{\n        border: 1px solid #ACD0EE !important;\n        margin-top:-1px !important;}\n\nform fieldset.formbox {\n-moz-border-radius:0 !important;\n-webkit-border-radius:0 !important;\nmargin-top:-1px !important;}\n\n.mod.d .searchResults h2, #basic_informa????H?O?????????tion_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n{border:none !important;}\nul.subMenu a, ul.subMenu li, ul#options a{color:#888 !important;}\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n.loginCanvas #login{margin-top:-1px !important;}\n\n#latest_photos h3 {\n        border: solid #ACD0EE !important;\n        border-width: 1px 0 0 0 !important;\n\n}\n.mod.c .actions .dropDown{margin-top:1px !important;}\n\nimg[src=\"http://estaticosak1.tuenti.com/layout/web2/images/save.gif\"]{display:none !important;}\nform.eventChoices fieldset .option{margin-left:-1px !important;}";

//Diseño "tuentiblue" de berti (http://userstyles.org/styles/18507)
if (GM_getValue('radiorediseño2') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: !important; color:black !important;} .views{color:transparent!important;} .body,.item {background:#ACD0Ee url()center center repeat-x !important; color:black !important; border:#000 b2b4 0px solid !important} .body a,.item a{color:black!important; text-decoration:none !important; font-weight: bold !important} .body a:hover,.item a:hover{color: grey ! important; background-color:!important} .body a:visited,.item a:visited{color:black!important} .main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;} .header, #subheader{margin:0 !important;} .actions a, .itemActions a, .itemActions span{margin-right:4px !important;} .container, #latest_photos, .blockedFriends, #banned_photos .body{ background: transparent!important; border: solid transparent !important; border-width: 0 1px 1px 1px !important; } .item, #basic_information_form { background: #ACD0Ee !important; border: 5px solid #acd0ee !important; margin-top:-1px !important; } .setting { border: solid #ACD0EE!important; border-width: 0px 1px 1px 1px !important; } .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;} #tags_l????H?O?????????ist h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;} div.loading {right:-40px !important;} div .note { background: #fbfbfb !important; border: #fff!important; } button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message { -moz-border-radius:20px !important;border: 5px red!important; -webkit-border-radius:20px !important; } #lightbox_overlay{background:#000!important;} #ban_photo_link{width:100% !important;} .item:hover, #latest_photos:hover, .mediaInfo:hover { background:#f9f9f9 !important; } #top_videos .mediaInfo:hover{background: transparent !important} .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{ border: transparent 3px !important; -moz-border-radius-topleft:20px !important; -moz-border-radius-topright:20px !important; -webkit-border-radius-topleft:20px !important; -webkit-border-radius-topright:20px !important; } .item, #latest_photos .body{ padding:3px !important; } td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;} .photoTag{opacity:0.6 !important;} .mod .body{border-top:0px solid #FFF !important;} r .pager.light{ padding-top:10px !important; padding-bottom:10px !important;} #networks .body, .login{ border: 1px solid #ACD0EE !important; margin-top:-1px !important;} form fieldset.formbox { -moz-border-radius:5 !important; -webkit-border-radius:5 !important; margin-top:-1px !important;} .mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting {border:none !important;} ul.subMenu a, ul.subMenu li, ul#options a{color:grey !important;} div.loginCanvas h1, div.needInvitesCanvas h1, div.p????H?O?????????asswordCanvas h1{display:none;} .loginCanvas #login{margin-top:-1px !important;} #latest_photos h3 { border: solid transparent!important; border-width: 0px 0 0 0 !important; } .mod.c .actions .dropDown{margin-top:1px !important;}";

//Diseño "TuentiStyle" de berti95 (http://userstyles.org/styles/18119)
if (GM_getValue('radiorediseño3') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D2E5F1 !important; color:black !important;} .views{color:black !important;} .item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body{background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg) top repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body a,.item a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#D2E5F1 !important} .body a:visited,.item a:visited{color:#dfdfdf!important} .viewMore{background: #D2E5F1 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#D2E5F1 !important} #breadcrumbs a:visited{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)top center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} blockquote p{color:#C0DCEB !important} blockquote {background:#4000c0 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#00ffa0 !important} #blog>.item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center top repeat-x !im????H?O?????????portant; color:white !important; border:#00b2b4 1px solid !important}";

//Diseño "TuentiSkin" de berti (http://userstyles.org/styles/19064)	
if (GM_getValue('radiorediseño4') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/} #main_info{background: #666666 !important; color:black !important;} .views{color:black !important;} .item {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center center repeat-x !important; color:#666666 !important; border:#015EB4 1px solid !important} .body{background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png) top repeat-x !important; color:#666666!important; border:#015EB4 1px solid !important} .body a,.item a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#666666 !important} .body a:visited,.item a:visited{color:#666666!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#C0C0C0 !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}"????H?O?????????;

//Diseño "Likern" de berti (http://www.ultra-zone.es)
if (GM_getValue('radiorediseño5') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D1D1D1 !important; color:black; border:#000000 1px solid !important} .views{color:black !important;} .item {background:#D1D1D1 url()center center repeat-x !important; color:#D1D1D1 !important; border:#000000 1px solid !important} .body{background:#D1D1D1 url() top repeat-x !important; color:#D1D1D1!important; border:#000000 1px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#00000 !important} .body a:visited,.item a:visited{color:#000000!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#FF0000 url()top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#ffffff !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(#D1D1D1)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}";

//Diseño "Pinxil" de berti (http://www.ultra-zone.es)
if (GM_getValue('radiorediseño6') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #FFBCF2 !important; color:white !important; border:#790061 3px solid !important} .view????H?O?????????s{color:black !important;} .item {background:#FFD0F6 !important; color:white !important; border:#790061 1px solid !important} .body{background:#FFD0F6!important; color:white !important; border:#790061 3px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #5c3273 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #fff !important;} .searchBar {background-color: #f8f4fa !important;border-color: #e0ceea !important;} ul#sections li a.active {background-color: #e5d5ed !important;border-color: #d0b5df !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }";

//Diseño "LoomySkin" de berti (http://www.ultra-zone.es)
if (GM_getValue('radiorediseño7') == true) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #64A3CF !important; color:white !important; border:#EBEBEB 3px solid !important} .views{color:black !important;} .item {background:#509BD0 !important; color:white !important; border:#ffffff 1px solid !important} .body{background:#64A3CF!important; color:white !important; border:#EBEBEB 3px solid !important} .body a,.item a{color:#00446E!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #282549 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #000000 !important;} .searchBar {background-color: #000000 !important;border-color: #4780AC !important;} ul#sections li a.active {background-color: #2270AC !important;border-color: #ffffff !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }";

//Diseño "TuentiRed" de Berti(http://userstyles.org/styles/19955)
if (GM_getValue('radiorediseño8') == true) var css = "#main_info{background:  !impo????H?O?????????rtant; color:black\n!important;}\n\n.views{color:red!important;}\n\n\n\n.body,.item {background: url(http://i05.pan.tuenti.com/i/3/600/o/N/35WmBozaW3BBXlAeI0o.0.jpg)center center repeat-x !important; color:black!important; border:#000\nb2b4 0px solid !important}\n\n.body a,.item a{color:black!important; text-decoration:none !important; font-weight:  bold  !important}\n\n.body a:hover,.item a:hover{color: #800000 ! important; background-color:!important}\n\n.body a:visited,.item a:visited{color:black!important}\n\n\n\n\n.main .mod.c.viewMore, #friends_updates .item{color: white ! important;}, .header , #subheader {padding:3px;}\n\n .header{background-color: red  ! important;}  , .subheader {margin:10 !important;}\n\n\n\n.actions  a, .itemActions  a, .itemActions span{margin-right:4px !important;}\n\n\n\n	.container , #latest_photos , .blockedFriends, #banned_photos .body{\n\n        background: transparent!important;\n\n        border: solid transparent !important;\n\n        border-width: 0 1px 1px 1px !important;\n\n}\n\n\n\n.item, #basic_information_form {\n\n        background:url (http://i05.pan.tuenti.com/i/3/600/o/N/35WmBozaW3BBXlAeI0o.0.jpg) !important;\n\n        border: 3px solid #000000 !important;\n\n        margin-top:-1px !important;\n\n}\n\n    .setting {\n\n        border: solid black!important;\n\n        border-width: 3px 3px 3px 3px  !important;\n\n    }\n\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:2px solid white !important;}\n\n\n\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background: white !important; padding-left:6px !important;}\n\n\n\n    div.loading {right:-40px !important;}\n\n\n\n    div .note {\n\n        background: #fbfbfb  !important;\n\n        border: #fff!important;\n\n    }\n\n\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n\n        -moz-border-radius:3px !important;border: 5px white!important;\n\n        -webkit-????H?O?????????border-radius:7px !important;\n\n    }\n\n\n\n\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n\n\n    #ban_photo_link{width:100% !important;}\n\n\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n\n        background: #e24747 !important;\n\n    }\n\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n\n        border: transparent 3px !important;\n\n        -moz-border-radius-topleft:10px !important;\n\n        -moz-border-radius-topright:10px !important;\n\n        -webkit-border-radius-topleft:10px !important;\n\n        -webkit-border-radius-topright:10px !important;\n\n    }\n\n\n\n    .item, #latest_photos .body{\n\n        padding:3px !important;\n\n    }\n\n\n\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n\n\n    .photoTag{opacity:0.6 !important;}\n\n	\n\n.mod .body{border-top:0px solid #FFF !important;}\n\nr	\n\n.pager.light{\n\npadding-top:0px !important;\n\npadding-bottom:1px !important;}\n\n\n\n#networks .body, .login{\n\n        border: 1px solid #eeacac !important;\n\n        margin-top:-1px !important;}\n\n\n\nform fieldset.formbox {\n\n-moz-border-radius:3 !important;\n\n-webkit-border-radius:3 !important;\n\nmargin-top:-1px !important;}\n\n\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n\n{border:none !important;}\n\nul.subMenu a, ul.subMenu li, ul#options a{color:grey!important;}\n\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n\n.loginCanvas #login{margin-top:-1px !important;}\n\n\n\n#latest_photos h3 {\n\n        border: solid transparent!important;\n\n     ????H?O?????????   border-width: 0px 0 0 0 !important;\n\n\n\n}\n\n.mod.c .actions .dropDown{margin-top:1px !important;}";

//Diseño "TuentiPink" de berti (http://userstyles.org/styles/19958)
if (GM_getValue('radiorediseño9') == true) var css = "#main_info{background: url(http://im170.ll.tuenti.com/i21/i/5/600/3/D/pXG7TtNna0VsLwIMmxQN.0.jpg) repeat  !important; color:black\n!important;}\n\n.views{color:white!important;}\n\n\n\n.body,.item {background: url(http://i49.pan.tuenti.com/i/7/600/1/s/7E2Gk6f2ZiOgmhKDnFzz.0.jpg)center center repeat !important; color:black!important; border:#000\n1px solid !important}\n\n.body a{color:white!important;},.item a{color:white!important; text-decoration:none !important; font-weight:  bold  !important}\n\n.body a:hover,.item a:hover{color: black !important; background-color: transparent !important;}\n\n.body a:visited,.item a:visited{color:#381233!important}\n\n\n\n\n.main .mod.c.viewMore, #friends_updates .item{color: white !important;}, .header{color: black !important;} , #subheader {padding:3px;}\n\n .header{background: url(http://i49.pan.tuenti.com/i/7/600/1/s/7E2Gk6f2ZiOgmhKDnFzz.0.jpg)  ! important;}  , .subheader {margin:10 !important;}\n\n\n\n.actions  a, .itemActions  a, .itemActions span {margin-right:4px !important;}\n\n\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n\n        background: transparent!important;\n\n        border: solid transparent !important;\n\n        border-width: 0px 1px 1px 1px !important;\n\n}\n\n\n\n.item, #basic_information_form {\n\n        background:url (http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) !important;\n\n        border: 2px solid black !important;\n\n        margin-top:-1px !important;\n\n}\n\n    .setting {\n\n        border: solid black!important;\n\n        border-width: 3px 3px 3px 3px  !important;\n\n    }\n\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:2px solid white !important;}\n\n\n\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background????H?O?????????: white !important; padding-left:6px !important;}\n\n\n\n    div.loading {right:-40px !important;}\n\n\n\n    div .note {\n\n        background: #ff9dfc  !important;\n\n        border: #fff!important;\n\n    }\n\n\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n\n        -moz-border-radius:3px !important;border: 5px white!important;\n\n        -webkit-border-radius:7px !important;\n\n    }\n\n\n\n\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n\n\n    #ban_photo_link{width:100% !important;}\n\n\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n\n        background: #ff4ef9 !important;\n\n    }\n\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n\n        border: transparent 3px !important;\n\n        -moz-border-radius-topleft:10px !important;\n\n        -moz-border-radius-topright:10px !important;\n\n        -webkit-border-radius-topleft:10px !important;\n\n        -webkit-border-radius-topright:10px !important;\n\n    }\n\n\n\n    .item, #latest_photos .body{\n\n        padding:3px !important;\n\n    }\n\n\n\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n\n\n    .photoTag{opacity:0.6 !important;}\n\n	\n\n.mod .body{border-top:0px solid #FFF !important;}\n\nr	\n\n.pager.light{\n\npadding-top:0px !important;\n\npadding-bottom:1px !important;}\n\n\n\n#networks .body, .login{\n\n        border: 1px solid #eeacac !important;\n\n        margin-top:-1px !important;}\n\n\n\nform fieldset.formbox {\n\n-moz-border-radius:3 !important;\n\n-webkit-border-radius:3 !important;\n\nmargin-top:-1px !important;}\n\n\n\n.mod.d .searchResul????H?O?????????ts h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n\n{border:none !important;}\n\nul.subMenu a, ul.subMenu li, ul#options a{color:grey!important;}\n\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n\n.loginCanvas #login{margin-top:-1px !important;}\n\n\n\n#latest_photos h3 {\n\n        border: solid transparent!important;\n\n        border-width: 0px 0 0 0 !important;\n\n\n\n}\n\n.mod.c .actions .dropDown{margin-top:1px !important;}";

//Diseño "tuentiblue II (PINK VERSION)" de berti (http://userstyles.org/styles/20143)
if (GM_getValue('radiorediseño10') == true) var css = "#main_info{background:  !important; color:black  !important;}\n.views{color:transparent!important;}\n\n.body,.item {background:#FFCCFF url()center center repeat-x !important; color:black !important; border:white   2px solid !important}\n.body a,.item a{color:black!important; text-decoration:none !important; font-weight:  bold  !important}\n.body a:hover,.item a:hover{color: grey ! important; background-color:!important}\n.body a:visited,.item a:visited{color:black!important}\n\n\n.main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;}\n .header, #subheader{margin:10 !important;}\n\n.actions a, .itemActions a, .itemActions span{margin-right:4px !important;}\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n        background: transparent!important;\n        border: solid transparent !important;\n        border-width: 0 1px 1px 1px !important;\n}\n\n.item, #basic_information_form {\n        background: #FFCCFF !important;\n        border: 1px solid white !important;\n        margin-top:-1px !important;\n}\n    .setting {\n        border: solid white!important;\n        border-width: 0px 1px 1px 1px !important;\n    }\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid white !important;}\n\n\n    #tags_list h3, .mod.c.videos h3, #alb????H?O?????????um_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;}\n\n    div.loading {right:-40px !important;}\n\n    div .note {\n        background: #fbfbfb  !important;\n        border: #fff!important;\n    }\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n        -moz-border-radius:7px !important;border: 5px black !important;\n        -webkit-border-radius:7px !important;\n    }\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n    #ban_photo_link{width:100% !important;}\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n        background:white !important;\n    }\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n        border: transparent 3px !important;\n        -moz-border-radius-topleft:10px !important;\n        -moz-border-radius-topright:10px !important;\n        -webkit-border-radius-topleft:10px !important;\n        -webkit-border-radius-topright:10px !important;\n    }\n\n    .item, #latest_photos .body{\n        padding:3px !important;\n    }\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n    .photoTag{opacity:0.6 !important;}\n	\n.mod .body{border-top:0px solid #FFF !important;}\nr	\n.pager.light{\npadding-top:0px !important;\npadding-bottom:0px !important;}\n\n#networks .body, .login{\n        border: 1px solid #FF99FF !important;\n        margin-top:-1px !important;}\n\nform fieldset.formbox {\n-moz-border-radius:3 !important;\n-webkit-border-radius:3 !important;\nmargin-top:-1px !important;}\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitat????H?O?????????ions h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n{border:none !important;}\nul.subMenu a, ul.subMenu li, ul#options a{color:red  !important;}\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n.loginCanvas #login{margin-top:-1px !important;}\n\n#latest_photos h3 {\n        border: solid transparent!important;\n        border-width: 0px 0 0 0 !important;\n\n}\n.mod.c .actions .dropDown{margin-top:1px !important;}";


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
		menu.innerHTML += '<center><h2>Por favor, haga click en la imagen para ayudarnos a seguir con '+scriptname+'</h2><a href="http://es.beruby.com/promocode/video/umu9Bn"><img alt="Gigasize : Banner Gigasize" height="90" src="http://www.enlace-de-empresas.com.ar/images/banner-beruby-728x90-es.gif" style="border:none;" width="728" /></a></center><hr>'


                
	menu.innerHTML += '<br><center><p style="font-size:x-large;"><b><a href="http://vageria.foroactivo.net/tu-personalite-h2.htm"><img src="http://s2.subirimagenes.com/otros/41950090.jpg"></a></b></p><br><br><p style="font-size:large;">Si tiene alguna duda, idea, etc. entre en la <b>web oficial: </b><a href="http://vageria.foroactivo.net/tu-personalite-h2.htm">http://vageria.foroactivo.net/tu-personalite-h2.htm</a></p></center><br>';	



		
   











????H?O?????????



















var dire = "http://vageria.foroactivo.net/Publididad-no-modificar-h9.htm" //página a cargar en la popup
var dias = 1 //días a los que caduca la cookie
var ancho = 250 //anchura de la ventana
var alto = 250 //altura de la ventana
if(document.cookie.indexOf('popupillo=false')<0){
	cad=new Date()
	cad.setTime(cad.getTime() + (dias*24*60*60*1000))
	expira="; expires=" + cad.toGMTString()
	document.cookie = "popupillo=false" + expira
	ventanita = window.open (dire,'ventanita','width=' + ancho +',height=' + alto)
}

		




  





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
		formfon????H?O?????????do = document.createElement("form");
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
		formfondo.innerHTML += 'Fondo "Nuevo Tuenti rediseño sutil" <b></b> v1.29<br>';

		radiofondo3 = document.createElement("input");
		radiofondo3.setAttribute("type","radio");
		radiofondo3.setAttribute("name","radiofondo")
		radiofondo3.setAttribute("id","radiofondo3");
		if (GM_getValue('radiofondo3') == true) radiofondo3.setAttribute("checked","1");
		formfondo.appendChild(radiofondo3);
		formfondo.innerHTML += 'Fondo "tuentiblue"  <b></b><br>';

		radiofondo3v2 = document.createElement("input");
		radiofondo3v2.setAttribute("type","radio");
		radiofondo3v2.setAttribute("name","radiofondo")
		radiofondo3v2.setAttribute("id","radiofondo3v2");
		if (GM_getValue('radiof????H?O?????????ondo3v2') == true) radiofondo3v2.setAttribute("checked","1");
		formfondo.appendChild(radiofondo3v2);
		formfondo.innerHTML += 'Fondo "tuentiblue v2"  <b></b><br>';

		radiofondo4 = document.createElement("input");
		radiofondo4.setAttribute("type","radio");
		radiofondo4.setAttribute("name","radiofondo")
		radiofondo4.setAttribute("id","radiofondo4");
		if (GM_getValue('radiofondo4') == true) radiofondo4.setAttribute("checked","1");
		formfondo.appendChild(radiofondo4);
		formfondo.innerHTML += 'Fondo "TuentiStyle"  <b></b> v1.2<br>';

		radiofondo5 = document.createElement("input");
		radiofondo5.setAttribute("type","radio");
		radiofondo5.setAttribute("name","radiofondo")
		radiofondo5.setAttribute("id","radiofondo5");
		if (GM_getValue('radiofondo5') == true) radiofondo5.setAttribute("checked","1");
		formfondo.appendChild(radiofondo5);
		formfondo.innerHTML += 'Fondo "Likern"  <b></b><br>';

		radiofondo6 = document.createElement("input");
		radiofondo6.setAttribute("type","radio");
		radiofondo6.setAttribute("name","radiofondo")
		radiofondo6.setAttribute("id","radiofondo6");
		if (GM_getValue('radiofondo6') == true) radiofondo6.setAttribute("checked","1");
		formfondo.appendChild(radiofondo6);
		formfondo.innerHTML += 'Fondo "Pinxil" <b></b><br>';

		radiofondo7 = document.createElement("input");
		radiofondo7.setAttribute("type","radio");
		radiofondo7.setAttribute("name","radiofondo")
		radiofondo7.setAttribute("id","radiofondo7");
		if (GM_getValue('radiofondo7') == true) radiofondo7.setAttribute("checked","1");
		formfondo.appendChild(radiofondo7);
		formfondo.innerHTML += 'Fondo "LoomySkin" <b></b><br>';

		radiofondo8 = document.createElement("input");
		radiofondo8.setAttribute("type","radio");
		radiofondo8.setAttribute("name","radiofondo")
		radiofondo8.setAttribute("id","radiofondo8");
		if (GM_getValue('radiofondo8') == true) radiofondo8.setAttribute("checked","1");
		formfondo.appendChild(radiofondo8);
		formfondo.innerHTML += 'Fondo negro<br>';

		ra????H?O?????????diofondo9 = document.createElement("input");
		radiofondo9.setAttribute("type","radio");
		radiofondo9.setAttribute("name","radiofondo")
		radiofondo9.setAttribute("id","radiofondo9");
		if (GM_getValue('radiofondo9') == true) radiofondo9.setAttribute("checked","1");
		formfondo.appendChild(radiofondo9);
		formfondo.innerHTML += 'Fondo "TuentiPink" <b></b><br>';

		radiofondo10 = document.createElement("input");
		radiofondo10.setAttribute("type","radio");
		radiofondo10.setAttribute("name","radiofondo")
		radiofondo10.setAttribute("id","radiofondo10");
		if (GM_getValue('radiofondo10') == true) radiofondo10.setAttribute("checked","1");
		formfondo.appendChild(radiofondo10);
		formfondo.innerHTML += 'Fondo "tuentiblue II (PINK VERSION)" <b></b><br>';

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
		formrediseño.appendChild(radioredise????H?O?????????o);
		formrediseño.innerHTML += 'Diseño normal<br>';

		radiorediseño1 = document.createElement("input");
		radiorediseño1.setAttribute("type","radio");
		radiorediseño1.setAttribute("name","radiorediseño")
		radiorediseño1.setAttribute("id","radiorediseño1");
		if (GM_getValue('radiorediseño1') == true) radiorediseño1.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño1);
		formrediseño.innerHTML += 'Diseño "Nuevo Tuenti rediseño sutil"  <b></b><br>';

		radiorediseño2 = document.createElement("input");
		radiorediseño2.setAttribute("type","radio");
		radiorediseño2.setAttribute("name","radiorediseño")
		radiorediseño2.setAttribute("id","radiorediseño2");
		if (GM_getValue('radiorediseño2') == true) radiorediseño2.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño2);
		formrediseño.innerHTML += 'Diseño "tuentiblue" <b></b><br>';

		radiorediseño3 = document.createElement("input");
		radiorediseño3.setAttribute("type","radio");
		radiorediseño3.setAttribute("name","radiorediseño")
		radiorediseño3.setAttribute("id","radiorediseño3");
		if (GM_getValue('radiorediseño3') == true) radiorediseño3.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño3);
		formrediseño.innerHTML += 'Diseño "TuentiStyle" <b></b><br>';

		radiorediseño4 = document.createElement("input");
		radiorediseño4.setAttribute("type","radio");
		radiorediseño4.setAttribute("name","radiorediseño")
		radiorediseño4.setAttribute("id","radiorediseño4");
		if (GM_getValue('radiorediseño4') == true) radiorediseño4.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño4);
		formrediseño.innerHTML += 'Diseño "TuentiSkin" <b></b><br>';

		radiorediseño5 = document.createElement("input");
		radiorediseño5.setAttribute("type","radio");
		radiorediseño5.setAttribute("name","radiorediseño")
		radiorediseño5.setAttribute("id","radiorediseño5");
		if (GM_getValue('radiorediseño5') == true) radioredi????H?O?????????seño5.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño5);
		formrediseño.innerHTML += 'Diseño "Likern" <b></b><br>';

		radiorediseño6 = document.createElement("input");
		radiorediseño6.setAttribute("type","radio");
		radiorediseño6.setAttribute("name","radiorediseño")
		radiorediseño6.setAttribute("id","radiorediseño6");
		if (GM_getValue('radiorediseño6') == true) radiorediseño6.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño6);
		formrediseño.innerHTML += 'Diseño "Pinxil" <b></b><br>';

		radiorediseño7 = document.createElement("input");
		radiorediseño7.setAttribute("type","radio");
		radiorediseño7.setAttribute("name","radiorediseño")
		radiorediseño7.setAttribute("id","radiorediseño7");
		if (GM_getValue('radiorediseño7') == true) radiorediseño7.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño7);
		formrediseño.innerHTML += 'Diseño "LoomySkin" <b></b><br>';

		radiorediseño8 = document.createElement("input");
		radiorediseño8.setAttribute("type","radio");
		radiorediseño8.setAttribute("name","radiorediseño")
		radiorediseño8.setAttribute("id","radiorediseño8");
		if (GM_getValue('radiorediseño8') == true) radiorediseño8.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño8);
		formrediseño.innerHTML += 'Diseño "TuentiRed"  <b></b><br>';

		radiorediseño9 = document.createElement("input");
		radiorediseño9.setAttribute("type","radio");
		radiorediseño9.setAttribute("name","radiorediseño")
		radiorediseño9.setAttribute("id","radiorediseño9");
		if (GM_getValue('radiorediseño9') == true) radiorediseño9.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño9);
		formrediseño.innerHTML += 'Diseño "TuentiPink" <b></b><br>';

		radiorediseño10 = document.createElement("input");
		radiorediseño10.setAttribute("type","radio");
		radiorediseño10.setAttribute("name","radiorediseño")
		radiorediseño10.setAttribute("id","radiored????H?O?????????iseño10");
		if (GM_getValue('radiorediseño10') == true) radiorediseño10.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño10);
		formrediseño.innerHTML += 'Diseño "tuentiblue II (PINK VERSION)" <b></b><br>';

		menu.appendChild(formrediseño);
		
		menu.innerHTML += '<hr><h1>Radio:</h1><br>La radio ha sido creada y recopilada por <b>Berti</b>.<br><br><b>Las radios son:</b><br>Euro Dance<br>Europa FM<br>AH.FM - The Best in Trance & Progressive<br>MakinaMania<br>Reggaeton 94<br>RTVE<br>Cadena 100<br>Onda Cero<br>Kiss FM<br>Loca FM<br>FlaixFM<br>MasterFM<br>PQTP Radio Urbana<br>';
		






   











		
             






		botonaceptar = document.createElement("button");
		botonaceptar.appendChild(document.createTextNode("_________________________________GUARDAR"));
		botonaceptar.setAttribute("onclick",function(){aceptar()});
		botonaceptar.addEventListener("click", function(){aceptar()}, true);
		menu.appendChild(botonaceptar);

		botoncancelar = document.createElement("button");
		botoncancelar.appendChild(document.createTextNode("_CANCELAR_"));
		botoncancelar.setAttribute("onclick",function(){cancelar()});
		botoncancelar.addEventListener("click", function(){cancelar()}, true);
		menu.appendChild(botoncancelar);

              ????H?O?????????  botonactualizar = document.createElement("button");
		botonactualizar.appendChild(document.createTextNode("_ACTULIZAR_"));
		botonactualizar.setAttribute("onclick",function(){update()});
		botonactualizar.addEventListener("click", function(){update()}, true);
		menu.appendChild(botonactualizar);

		botoninstalar = document.createElement("button");
		botoninstalar.appendChild(document.createTextNode("_INSTALAR LA ULTIMA VERSIÓN_"));
		botoninstalar.setAttribute("onclick",function(){instalar()});
		botoninstalar.addEventListener("click", function(){instalar()}, true);
		menu.appendChild(botoninstalar);


		label = document.createElement("label");
		label.innerHTML = '  ';
		menu.appendChild(label);


		

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(menu, canvas);
		document.getElementById('textfondo').value = GM_getValue('textfondo');
		document.getElementById('espera').value = GM_getValue('espera');
	}else cancelar();
};



//-------------------------------------------------------------------------------------------//

function radio(){
	if (document.getElementById('radio') == null){

		menu = document.createElement("div");
		menu.setAttribute("id","menu");
		menu.setAttribute("name","item");
		menu.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #64A3CF !important;");
		menu.setAttribute("class","container");



menu.innerHTML += '<br><center><p style="font-size:x-large;"><b><a href="http://tupersonalite.ourtoolbar.com/xpi"><img src="http://espaciohogar.com/wp-content/uploads/dgb.jpg"></a></b></p><br><br><p style=????H?O?????????"font-size:large;">PARA INSTALAR LA RADO HAZ CLIC EN LA FOTO </b><a href="http://tupersonalite.ourtoolbar.com/xpi">http://tupersonalite.ourtoolbar.com/xpi</a></p></center><br>';
   

        

		botoncancelar = document.createElement("button");
		botoncancelar.appendChild(document.createTextNode("__________CANCELAR_"));
		botoncancelar.setAttribute("onclick",function(){cancelar()});
		botoncancelar.addEventListener("click", function(){cancelar()}, true);
		menu.appendChild(botoncancelar);

           


		label = document.createElement("label");
		label.innerHTML = '  ';
		menu.appendChild(label);


		

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
		menufoto.appendCh????H?O?????????ild(botonabrirfoto);

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
					cuadrourl.se????H?O?????????tAttribute("onclick","javascript:this.focus();this.select();");
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
	GM_setValue('espera', document.getElementById(????H?O?????????'espera').value);
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
	GM_setValue('radiorediseño10', document.getElementById('radio????H?O?????????rediseño10').checked);
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
					if (document.location.href.substring(25,31)=="A????H?O?????????lbums") {
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



		botoncancelar = document.createElement("button");
		botoncancelar.appendChild(document.createTextNode("_CANCELAR_"));
		botoncancelar.setAttribute("onclick",function(){cancelar()});
		botoncancelar.addEventListener("click", function(){cancelar()}, true);
		menu.appendChild(botoncancelar);


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

		  ????H?O?????????      var boton = document.createElement("button");
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

			????H?O?????????		for (var k=0; k<fotos.length;k++){

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


	
	




function xat(){
	if (document.getElementById('divxat') == null){
		divxat = document.createElement("div");
		divxat.setAttribute("id","divxat");
		divxat.setAttribute("class","container");
		divxat.setAttribute("style","text-align: right; padding: 5px; position: absolute; display: block; z-index: 50; background-color: #64A3CF !important;");
                divxat.innerHTML += '<center><b>Rangos del chat</b><br><img src="http://a.imagehost.org/0592/rango.png"></center>';
		divxat.innerHTML += '<br><center><embed wmode="transparent" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="540" height="405" name="chat" flashvars="id=87270819&rl=Castilian" align="middle" allowscriptaccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /></center>';
		divxat.innerHTML += '<br><hr><center><b>NORMAS DEL CHAT</b><br></center><P align=left><b>1ª-</b> No pedir ser CREADOR o MODERADOR. Para poder serlo te lo debe comunicar un CREADOR, si pides serlo serás banneado durante una hora.<br><b>2ª-</b> No hagas spam.<br><b>3ª-</b> No floodees, (Realiza los textos lo mas simplificados posibles y no escribas muchas veces el mismo mensaje).<br><b>4ª-</b> Si un MOD o CREADOR del xat te BANNEA, sera por algo ya que la permisibilidad suele ser alta. El ban no será retirado si no hay un buen motivo.<br><b>5ª-</b> Todas las personas deberán respetaran las normas.<br><b>6ª-</b> Se irán añadiendo a medida que surjan problemas.<br><b>7ª-</b> Respetar totalmente a tod????H?O?????????os los usuarios del chat.<br><b>8ª-</b> No insultes.<br><b>9ª-</b> No amenaces a nadie.<br><b>10ª-</b> Estas normas unicamente pueden ser modificadas por totalidad en cualquier momento por los creadores. Si tienes cualquier problema comunícaselo a cualquier MOD o CREADOR<br>';

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
	botonxa????H?O?????????t.appendChild(document.createTextNode("TuentiXat(Oculto)"));
};
function xatpestaña(){
	noxat();
	GM_openInTab('http://vageria.foroactivo.net/CHAT-TU-PERSONALITI-h3.htm');
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
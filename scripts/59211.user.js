// ==UserScript==
// @name		TuentiPack
// @namespace		DJMeu
// @description		Script para personalizar el Tuenti
// @include		http://www.tuenti.com/*
// @exclude		http://*.tuenti.com/?m=login
// @version		2.0
// ==/UserScript==

version='2.0';
scriptname="TuentiPack";
//-------------------------------------------------------------------------------------------//

if (GM_getValue('configurado') != version) reset();
GM_addStyle('#lightbox{background-color:#eee; padding: 10px; border-bottom: 2px solid #666; border-right: 2px solid #666;} #lightboxDetails{font-size: 0.8em; padding-top: 0.4em;} #lightboxCaption{ float: left; } #keyboardMsg{ float: right; } #lightbox img{ border: none; } #overlay img{ border: none; }');
document.getElementsByTagName('head')[0].innerHTML += '<script type="text/javascript" src="http://www.huddletogether.com/projects/lightbox/lightbox.js"></script>';
function diseño(){
	if (document.getElementById('diseñomostrado') == null){
		if (document.getElementById('diseño') != null) document.getElementsByTagName('head')[0].removeChild(document.getElementById('diseño'));
		document.body.style.backgroundImage = "";
		document.body.style.backgroundAttachment=''

		if (GM_getValue('radiofondo1') == true) if(document.getElementsByTagName('body')[0] != null) document.body.style.backgroundImage = "url("+GM_getValue('textfondo')+")";
		if (GM_getValue('radiofondo2') == true) if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #E9EFF3");
		if (GM_getValue('radiofondo3') == true) if(document.getElementsByTagName('body')[0] != null) document.body.style.backgroundImage = "url(http://www.dominiotemporal.es/fondos_web/texturas/JoseRico/08_basicas.gif)";
		if (GM_getValue('radiofondo3v2') == true){
			if (GM_getValue('checkboxfondofijo') == true){
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://www.minijuegos.com/imagenes/fondomj.gif) repeat-x fixed !important");
			}else{
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://www.minijuegos.com/imagenes/fondomj.gif) repeat-x !important");
			};
		};
		if (GM_getValue('radiofondo4') == true){
			if (GM_getValue('checkboxfondofijo') == true){
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x fixed #000000 !important");
			}else{
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x #000000 !important");
			};
		};
		if (GM_getValue('radiofondo5') == true) if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #ABABAB");
		if (GM_getValue('radiofondo6') == true) if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #C1009A");
		if (GM_getValue('radiofondo7') == true) if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #64A3CF");
		if (GM_getValue('radiofondo8') == true) if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: black");
		if (GM_getValue('radiofondo9') == true){
			if (GM_getValue('checkboxfondofijo') == true){
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) repeat fixed !important");
			}else{
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) repeat !important");
			};
		};
		if (GM_getValue('radiofondo10') == true){
			if (GM_getValue('checkboxfondofijo') == true){
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i184.photobucket.com/albums/x79/pixvirtual/us007/gURcMhcABve2.gif) repeat fixed !important");
			}else{
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i184.photobucket.com/albums/x79/pixvirtual/us007/gURcMhcABve2.gif) repeat !important");
			};
		};
		if (GM_getValue('radiofondop') == true) if(document.getElementsByTagName('body')[0] != null) document.body.style.backgroundImage = "url(http://srv0110-07.oak1.imeem.com/g/p/a29385b55e5208eff4ce4b61da16e234_raw.gif)";
		if (GM_getValue('checkboxfondofijo') == true) if(document.getElementsByTagName('body')[0] != null) document.body.style.backgroundAttachment='fixed';

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

		document.getElementsByTagName('head')[0].innerHTML += '<style id="diseño">'+css+'</style>';
	};
};
//-------------------------------------------------------------------------------------------//

function Menu(){
	if (document.getElementById('divmenu') == null){
		if (document.getElementById('lightbox_overlay') == null){
			lightbox_overlay=document.createElement("div");
			lightbox_overlay.setAttribute("id","lightbox_overlay");
			lightbox_overlay.setAttribute("class","lightBoxOverlay");
			lightbox_overlay.setAttribute("style","opacity: 0.5; display: block;");
			document.getElementsByTagName('body')[0].appendChild(lightbox_overlay);
		}else{
			document.getElementById('lightbox_overlay').style.display = "block";
		};

		divlightBox = document.createElement("div")
		divlightBox.setAttribute("id","divlightBox");
		divlightBox.setAttribute("class","lightBoxWrapper");
		divlightBox.setAttribute("style","display: block; position: absolute; margin-left: -480px;");

		divmenu = document.createElement("div");
		divmenu.setAttribute("id","divmenu");
		divmenu.setAttribute("class","chatDockItem open active");
		divmenu.setAttribute("style","text-align: left; position: absolute; display: block; z-index: 20; background-color: #EBEBEB !important;");
		divmenu.innerHTML += '<div class="chatDockDialog open" style="width: 960px; position: static;"><div class="chatActions"><a title="Cerrar el menú de configuración de TuentiPack" href="javascript:void(0)" id="botonnomenu" class="chatClose"> </a></div><h3 title="Configuración de TuentiPack"><strong>Configuración de TuentiPack</strong></h3></div>';

		menu = document.createElement("div");
		menu.setAttribute("id","menu");
		menu.setAttribute("name","item");
		menu.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #EBEBEB !important;");
//		menu.setAttribute("class","container");
		menu.innerHTML += '<br><center><p style="font-size:x-large;"><b><a href="http://territoriodd.com/"><img src="http://webnox.es/sms/banner_tdd.png"></a></b></p><h5><i>(TuentiPack) Creado por DJMeu, To_Net, Shiver, Nodsert y DemonDary.</i></h5><br><br><p style="font-size:large;">Descargas Gratuitas de Videojuegos y Consolas en: <a href="http://territoriodd.com">http://territoriodd.com</a><br>TuentiPack VERSION 2.0 TerritorioDD Edition. Todas las ultimas novedades de TerritorioDD en portada!</p></center><br>';
		
//		checkboxiconos = document.createElement("input");
//		checkboxiconos.setAttribute("type","checkbox");
//		checkboxiconos.setAttribute("id","checkboxiconos");
//		if (GM_getValue('checkboxiconos') == true) checkboxiconos.setAttribute("checked","1");
//		menu.appendChild(checkboxiconos);
//		menu.innerHTML += 'Activar emoticonos.<br>';

		checkboxblog = document.createElement("input");
		checkboxblog.setAttribute("type","checkbox");
		checkboxblog.setAttribute("id","checkboxblog");
		if (GM_getValue('checkboxblog') == true) checkboxblog.setAttribute("checked","1");
		menu.appendChild(checkboxblog);
		menu.innerHTML += 'Mantener los blogs siempre abiertos.<br>';

		checkboxcontador = document.createElement("input");
		checkboxcontador.setAttribute("type","checkbox");
		checkboxcontador.setAttribute("id","checkboxcontador");
		if (GM_getValue('checkboxcontador') == true) checkboxcontador.setAttribute("checked","1");
		menu.appendChild(checkboxcontador);
		menu.innerHTML += 'Mostrar a la izquierda el número de usuarios online usando TuentiPack.<br>';

		checkboxreloj = document.createElement("input");
		checkboxreloj.setAttribute("type","checkbox");
		checkboxreloj.setAttribute("id","checkboxreloj");
		if (GM_getValue('checkboxreloj') == true) checkboxreloj.setAttribute("checked","1");
		menu.appendChild(checkboxreloj);
		menu.innerHTML += 'Mostrar reloj flash<br>';
		menu.innerHTML += 'Tiempo de espera para activar el script <input type="text" maxlength="1" id="espera" size="1" onclick="javascript:this.focus();this.select();"/>segundos. (Se recomiendan 4s para conexiones rápidas, 6s para conexiones lentas).<br>';

		menu.innerHTML += '<table><td align="right">';

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

		formfondo.innerHTML += '<input type="text" id="textfondo" size="100" name="textfondo" onclick="javascript:this.focus();this.select();"/><br>';
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

		menu.innerHTML += '</td><td align="left">';

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

		radiorediseño10 = document.createElement("input");
		radiorediseño10.setAttribute("type","radio");
		radiorediseño10.setAttribute("name","radiorediseño")
		radiorediseño10.setAttribute("id","radiorediseño10");
		if (GM_getValue('radiorediseño10') == true) radiorediseño10.setAttribute("checked","1");
		formrediseño.appendChild(radiorediseño10);
		formrediseño.innerHTML += 'Diseño "TerritorioDD" de <b>benekid</b> ---> Proximamente...<br>';

		
		menu.appendChild(formrediseño);

		menu.innerHTML += '<hr>';

		botoncrearcodigo = document.createElement("button");
		botoncrearcodigo.appendChild(document.createTextNode("Guardar y compartir diseño"));
		botoncrearcodigo.setAttribute("onclick",function(){crearcodigo()});
		botoncrearcodigo.addEventListener("click", function(){crearcodigo()}, true);
		menu.appendChild(botoncrearcodigo);

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

		botonreset = document.createElement("button");
		botonreset.appendChild(document.createTextNode("Configuración predeterminada"));
		botonreset.setAttribute("onclick",function(){reset(1)});
		botonreset.addEventListener("click", function(){reset(1)}, true);
		menu.appendChild(botonreset);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(menu, canvas);
		document.getElementById('textfondo').value = GM_getValue('textfondo');
		document.getElementById('espera').value = GM_getValue('espera');

		divmenu.appendChild(menu);

		divlightBox.appendChild(divmenu);
		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divlightBox, canvas);
		document.getElementById("botonnomenu").addEventListener("click", function(){cancelar()}, true);
	}else cancelar();
};
//-------------------------------------------------------------------------------------------//

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
		document.getElementById('photo_image').setAttribute("style","width: 100%");
	};
};
function aceptar(){
//	GM_setValue('checkboxiconos', document.getElementById('checkboxiconos').checked);
	GM_setValue('checkboxblog', document.getElementById('checkboxblog').checked);
	GM_setValue('checkboxcontador', document.getElementById('checkboxcontador').checked);
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
	location.reload();
};
function cancelar(){
	document.getElementById('canvas').parentNode.removeChild(document.getElementById('divlightBox'));
	document.getElementById('lightbox_overlay').style.display = "none";
};
function reset(recargar){
	GM_setValue('checkboxblog', false);
	GM_setValue('checkboxcontador', false);
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
	if (recargar == 1) location.reload()
};
function Menupasarpagina(){
	if (document.getElementById("Menupasarpagina") == null) {
		var Menupasarpagina = document.createElement("div");
		Menupasarpagina.setAttribute("id","Menupasarpagina");
		Menupasarpagina.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #538FBB !important;");

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
				if (document.getElementById('css_monitors') != null) document.getElementById("css_monitors").removeChild(Menupasarpagina);
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
//Script	"PasarFotos"
//Autor:	To_Net
//Homepage	http://userscripts.org/scripts/show/51461
function Pasarfotos() {
	if (document.getElementById("respondedor") == null) {
		if (document.getElementById('photo_image') == null){
			alert('Debe estar en una p\u00e1gina de foto');;
		}else{
			var respondedor = document.createElement("div");
			respondedor.setAttribute("id","respondedor");
			respondedor.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #538FBB !important;");

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
	if (document.getElementById("divradio") != null){
		if (document.getElementById('divradio').style.visibility == 'hidden'){
			document.getElementById('divradio').style.visibility = '';
			document.getElementById('botonradio').removeChild(document.getElementById('botonradio').firstChild);
	document.getElementById('botonradio').innerHTML += '<span>Radio <Img SRC="http://famfamfam.com/lab/icons/mini/icons/page_sound.gif" width="12" height="12" border="0"></span>';
		}else{
			menuradio()
		};
	}else{
		menuradio()
	};
};
function menuradio(){
	if (document.getElementById("radio") == null){
		var radio = document.createElement("div");
		radio.setAttribute("id","radio");
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

		radio.innerHTML += '  Radio "FlaixFM"<br>';
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
		botonnoiniciar.setAttribute("onclick",function(){removeDiv()});
		botonnoiniciar.addEventListener("click", function(){removeDiv()}, true);
		radio.appendChild(botonnoiniciar);
		appendDiv(radio,"Radio");
		document.getElementById('textradio').value = GM_getValue('textradio');
	}else removeDiv()();
};
function iniciarradio(){
	noradio()
	GM_setValue('textradio', document.getElementById('textradio').value);
	if(document.getElementById('radioradio').checked == true) radiosrc="http://scfire-ntc-aa04.stream.aol.com:80/stream/1024";
	if(document.getElementById('radioradio1').checked == true) radiosrc="http://antena3.stream.flumotion.com/antena3/europafm.mp3.m3u";
	if(document.getElementById('radioradio2').checked == true) radiosrc="http://fr.ah.fm:9000/";
	if(document.getElementById('radioradio3').checked == true) radiosrc="http://www.makinamania.com:8000/";
	if(document.getElementById('radioradio4').checked == true) radiosrc="mms://38.106.70.66/reggaeton_live";
	if(document.getElementById('radioradio5').checked == true) radiosrc="http://www.rtve.es/rne/audio/r1live.asx";
	if(document.getElementById('radioradio6').checked == true) radiosrc="http://cadena100.cope.stream.flumotion.com/cope/cadena100.asf.asx";
	if(document.getElementById('radioradio7').checked == true) radiosrc="http://ondacerolivewm.fplive.net/ondacerowmlive-live/oc_convencional";
	if(document.getElementById('radioradio8').checked == true) radiosrc="http://pointers.audiovideoweb.com/stcasx/ny60winlive7001/play.asx?authcode=c075a5fcf85f59a8e7c65307c1f9e771";
	if(document.getElementById('radioradio9').checked == true) radiosrc="http://stream2.beatproducciones.com/castcontrol/playlist.php?id=14&type=asx";
	if(document.getElementById('radioradio10').checked == true) radiosrc="http://flaix.stream.flumotion.com/flaix/FLAIXfm.mp3.m3u";
	if(document.getElementById('radioradio11').checked == true) radiosrc="http://www.asawsistema.net/master.asx";
	if(document.getElementById('radioradio12').checked == true) radiosrc="http://repetidorva.pqtpradio.net:8000/FMUrban.m3u";
	if(document.getElementById('radioradiop').checked == true) radiosrc=document.getElementById('textradio').value;

	removeDiv()
	var divradio = document.createElement("div");
	divradio.setAttribute("id","divradio");
	divradio.setAttribute("class","videoPlayer");
	divradio.setAttribute("style","width: 320px;");

	divradioheader = document.createElement("div");
	divradioheader.setAttribute("id","divradioheader");
	divradioheader.setAttribute("class","chatDockItem open active");
	divradioheader.setAttribute("style","text-align: left; block; z-index: 20; background-color: #EBEBEB !important;");
	divradioheader.innerHTML += '<div class="chatDockDialog open" style="width: 320px; position: static;"><div class="chatActions"><a title="Minimizar la radio" href="javascript:void(0)" id="botonocultarradio" class="chatMinimize"></a><a title="Cerrar la radio" href="javascript:void(0)" id="botonnoradio" class="chatClose"> </a></div><h3 title="Radio de TuentiPack"><strong>Radio de TuentiPack</strong></h3></div>';
	divradio.appendChild(divradioheader);
	divradioheader.innerHTML += '<EMBED type="application/x-mplayer2" pluginspage="http://www.microsoft.com/windows/windowsmedia/en/Download/default.asp?tcode=9#location2" src="'+radiosrc+'" height="26" width="320" ShowGotoBar="0" TransparentAtStart="1" ShowControls="1" AutoStart="1" AllowScan="0" ShowAudioControls="0" EnableContextMenu="0" ShowPositionControls="0" ShowTracker="0" howStatusBar="0" AnimationAtStart="0" bbclient=0></EMBED>';

	canvas=document.getElementById('canvas');
	canvas.parentNode.insertBefore(divradio, canvas);

	document.getElementById('botonocultarradio').addEventListener("click", function(){ocultarradio()}, true);
	document.getElementById('botonnoradio').addEventListener("click", function(){noradio()}, true);
};
function noradio(){
	if (document.getElementById('divradio') != null) document.getElementById('canvas').parentNode.removeChild(document.getElementById('divradio'));
};
function ocultarradio(){
	document.getElementById('divradio').style.visibility = 'hidden';
	document.getElementById('botonradio').removeChild(document.getElementById('botonradio').firstChild);
	document.getElementById('botonradio').innerHTML += '<span>Radio (Oculta) <Img SRC="http://famfamfam.com/lab/icons/mini/icons/page_sound.gif" width="12" height="12" border="0"></span>';
};
function xat(){
	if (document.getElementById('divxat') == null){
		if (document.getElementById('lightbox_overlay') == null){
			lightbox_overlay=document.createElement("div");
			lightbox_overlay.setAttribute("id","lightbox_overlay");
			lightbox_overlay.setAttribute("class","lightBoxOverlay");
			lightbox_overlay.setAttribute("style","opacity: 0.5; display: block;");
			document.getElementsByTagName('body')[0].appendChild(lightbox_overlay);
		}else{
			document.getElementById('lightbox_overlay').style.display = "block";
		};

		divlightBox = document.createElement("div")
		divlightBox.setAttribute("id","divlightBox");
		divlightBox.setAttribute("class","lightBoxWrapper");
		divlightBox.setAttribute("style","display: block; position: absolute; margin-left: -480px;");

		divxat = document.createElement("div");
		divxat.setAttribute("id","divxat");
		divxat.setAttribute("class","chatDockItem open active");
		divxat.setAttribute("style","text-align: left; position: absolute; display: block; z-index: 20; background-color: #EBEBEB !important;");
		divxat.innerHTML += '<div class="chatDockDialog open" style="width: 960px; position: static;"><div class="chatActions"><a title="Minimizar el TuentiXat" href="javascript:void(0)" id="botonocultarxat" class="chatMinimize"></a><a title="Abrir en una nueva pestaña" href="http://xat.com/tuentipackgroup" target="_blank" id="botonxatpestaña" class="chatMaximize"> </a><a title="Cerrar TuentiXat" href="javascript:void(0)" id="botonnoxat" class="chatClose"> </a></div><h3 title="Chat de los usuarios de TuentiPack"><strong>TuentiXat</strong></h3></div>';
		divxat.innerHTML += '<br><center><h2><b>Rangos del chat</b></h2><img src="http://a.imagehost.org/0592/rango.png" style="border: 0; background-color: transparent !important;"></center>';
		divxat.innerHTML += '<center><embed class="container" src="http://www.xatech.com/web_gear/chat/chat.swf" quality="high" width="640" height="480" name="chat" FlashVars="id=70237733&rl=Castilian" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://xat.com/update_flash.shtml" /></center>';
		divxat.innerHTML += '<br><hr><center><h2><b>NORMAS DEL CHAT</b></h2><br></center><P align=left>1ª- No hablar sobre ser CREADOR o MODERADOR con el STAFF. Para poder serlo te lo debe comunicar un CREADOR, si pides serlo serás banneado durante una hora.<br>2ª- No hagas spam (Publicidad de cualquier tipo).<br>3ª- No floodees (Realiza los textos lo mas simplificados posibles y no escribas muchas veces el mismo mensaje).<br>4ª- Si un MOD o CREADOR del xat te BANNEA, sera por algo ya que la permisibilidad suele ser alta. El ban no será retirado si no hay un buen motivo.<br>5ª- Todas las personas deberán respetaran las normas. Éstas se irán añadiendo a medida que surjan problemas.<br>6ª- No escribas con mayúsculas ya que significa que estás gritando<br>7ª- Respetar totalmente a todos los usuarios del chat.<br>8ª- No amenaces a nadie.<br>9ª- Estas normas pueden ser modificadas en cualquier momento por los creadores. Si tienes cualquier problema comunícaselo a cualquier MODERADOR o CREADOR.<br>10ª- Para no generar polémicas y peleas ideológicas intenta evitar hablar o discutir sobre temas de política o religión.<br><br>';

		divlightBox.appendChild(divxat);
		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divlightBox, canvas);
		document.getElementById("botonocultarxat").addEventListener("click", function(){ocultarxat()}, true);
		document.getElementById("botonxatpestaña").addEventListener("click", function(){noxat()}, true);
		document.getElementById("botonnoxat").addEventListener("click", function(){noxat()}, true);
	}else{
		if (document.getElementById('divxat').getAttribute("style").substring(0,1) == "v"){
			divxat.setAttribute("style","text-align: left; position: absolute; display: block; z-index: 20; background-color: #EBEBEB !important;");
			document.getElementById('botonxat').removeChild(document.getElementById('botonxat').firstChild);
			document.getElementById('botonxat').innerHTML += '<span>TuentiXat <Img SRC="http://famfamfam.com/lab/icons/mini/icons/icon_user.gif" width="12" height="12" border="0"></span>';

			if (document.getElementById('lightbox_overlay') == null){
				lightbox_overlay=document.createElement("div");
				lightbox_overlay.setAttribute("id","lightbox_overlay");
				lightbox_overlay.setAttribute("class","lightBoxOverlay");
				lightbox_overlay.setAttribute("style","opacity: 0.5; display: block;");
				document.getElementsByTagName('body')[0].appendChild(lightbox_overlay);
			}else{
				document.getElementById('lightbox_overlay').style.display = "block";
			};
		}else noxat();
	};
};
function noxat(){
	document.getElementById('canvas').parentNode.removeChild(document.getElementById('divlightBox'));
	document.getElementById('lightbox_overlay').style.display = "none";
};
function ocultarxat(){
	divxat.setAttribute("style","visibility: hidden; text-align: left; position: absolute; display: block; z-index: 20; background-color: #538FBB !important;");
	document.getElementById('botonxat').removeChild(document.getElementById('botonxat').firstChild);
	document.getElementById('botonxat').innerHTML += '<span>TuentiXat (Oculto) <Img SRC="http://famfamfam.com/lab/icons/mini/icons/icon_user.gif" width="12" height="12" border="0"></span>';
	document.getElementById('lightbox_overlay').style.display = "none";
};
function crearcodigo(){
	GM_setValue('checkboxblog', document.getElementById('checkboxblog').checked);
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

	if (GM_getValue('radiofondo') == true) F=0;
	if (GM_getValue('radiofondo1') == true) F=1;
	if (GM_getValue('radiofondo2') == true) F=2;
	if (GM_getValue('radiofondo3') == true) F=3;
	if (GM_getValue('radiofondo3v2') == true) F="3v2";
	if (GM_getValue('radiofondo4') == true) F=4;
	if (GM_getValue('radiofondo5') == true) F=5;
	if (GM_getValue('radiofondo6') == true) F=6;
	if (GM_getValue('radiofondo7') == true) F=7;
	if (GM_getValue('radiofondo8') == true) F=8;
	if (GM_getValue('radiofondo9') == true) F=9;
	if (GM_getValue('radiofondo10') == true) F=10;
	if (GM_getValue('radiofondop') == true) F="p";
	if (GM_getValue('checkboxfondofijo') == true) Q=1; else Q=0 ;
	if (GM_getValue('radiorediseño') == true) D=0;
	if (GM_getValue('radiorediseño1') == true) D=1;
	if (GM_getValue('radiorediseño2') == true) D=2;
	if (GM_getValue('radiorediseño3') == true) D=3;
	if (GM_getValue('radiorediseño4') == true) D=4;
	if (GM_getValue('radiorediseño5') == true) D=5;
	if (GM_getValue('radiorediseño6') == true) D=6;
	if (GM_getValue('radiorediseño7') == true) D=7;
	if (GM_getValue('radiorediseño8') == true) D=8;
	if (GM_getValue('radiorediseño9') == true) D=9;
	if (GM_getValue('radiorediseño10') == true) D=10;
	P=GM_getValue('textfondo');

	if (P.indexOf("https://") != -1) P=P.replace("https://","$s");
	if (P.indexOf("http://") != -1) P=P.replace("http://","$h");
	if (P.indexOf("www.") != -1) P=P.replace("www.","$w");
	textcrearcodigo="<TPCD>F="+F+";D="+D+";Q="+Q+";P="+P+";</TPCD>";

	preguntarporcodigo()
};
function preguntarporcodigo(){
	if (confirm("Ahora TuentiPack procederá a escribir acontinuación de sus intereses personales la información sobre sus estilos para que pueda compartirlos con otros usuarios. ¿Desea continuar?")){
		document.location.href=('http://www.tuenti.com/#m=Settings&func=view_interests');
		setTimeout(function(){escribircodigo()},1000)
		cancelar()
	};
};
function escribircodigo(){
	informacionpersonal= document.getElementById("personal_space_compose");;
	if (informacionpersonal.value.indexOf("<TPCD>") != -1){
		TPCDinicio=informacionpersonal.value.indexOf("<TPCD>");
		TPCDfin=informacionpersonal.value.indexOf("</TPCD>")+7;
		TPCD=informacionpersonal.value.substring(TPCDinicio,TPCDfin);
		informacionpersonal.value=informacionpersonal.value.replace(TPCD,"");
	};

	informacionpersonal.value=informacionpersonal.value+" "+textcrearcodigo;
	document.getElementById("personal_info_button").click();
	setTimeout(function(){Volver()},1000)
};
function Volver(){
	document.location.href=('http://www.tuenti.com/#m=Profile&func=index');
	location.reload()
};
function msn(){
	if (document.getElementById('divmsn') == null){
		var divmsn = document.createElement("div");
		divmsn.setAttribute("id","divmsn");
		divmsn.setAttribute("class","videoPlayer");
		divmsn.setAttribute("style","width: 320px;");


		var divmsnheader = document.createElement("div");
		divmsnheader.setAttribute("id","divmsnheader");
		divmsnheader.setAttribute("class","videoHeader");
		divmsnheader.innerHTML += '<a class="maximize" title="Maximizar" id="maximize_msn" href="javascript:void(0);">Maximizar</a>';
		divmsnheader.innerHTML += '<a class="minimize hide" title="Minimizar" id="minimize_msn" href="javascript:void(0);">Minimizar</a>';
		divmsnheader.innerHTML += '<a id="close_msn" class="cancelClose" href="javascript:void(0);">Cerrar</a>';
		divmsn.appendChild(divmsnheader);


		var msn = document.createElement("div");
		msn.setAttribute("style","text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;");

		msniframe = document.createElement("iframe");
		msniframe.setAttribute("id","prueba");
		msniframe.setAttribute("name","prueba");
		msniframe.setAttribute("width","100%");
		msniframe.setAttribute("height","227");
		msniframe.src = "http://www.haberbaz.com/gadget_msn.asp?d=__MSG_dil__";
//		msniframe.src = "http://mobile.live.com/?PreviewScreenWidth=176";
		msn.appendChild(msniframe);
		divmsn.appendChild(msn);

		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divmsn, canvas);

		document.getElementById('maximize_msn').addEventListener("click", function(){maximize_msn()}, true);
		document.getElementById('minimize_msn').addEventListener("click", function(){minimize_msn()}, true);
		document.getElementById('close_msn').addEventListener("click", function(){nomsn()}, true);


	}else nomsn();
};
function maximize_msn(){
	document.getElementById('maximize_msn').setAttribute("class","maximize hide");
	document.getElementById('minimize_msn').setAttribute("class","minimize");
	document.getElementById('divmsn').setAttribute("style","width: 480px; height: 500");
	msniframe.setAttribute("height","347");

};
function minimize_msn(){
	document.getElementById('minimize_msn').setAttribute("class","minimize hide");
	document.getElementById('maximize_msn').setAttribute("class","maximize");
	document.getElementById('divmsn').setAttribute("style","width: 320px;");
	msniframe.setAttribute("height","227");
};
function nomsn() document.getElementById('canvas').parentNode.removeChild(document.getElementById('divmsn'));
function about(){
	var Menuabout = document.createElement("div");
	Menuabout.setAttribute("id","Menuabout");
	Menuabout.innerHTML += '<center><Img SRC="http://webnox.es/sms/banner_tdd.png"><br><h1><b>Creado por DJMeu, To_Net, Shiver, Nodsert y DemonDary. (TuentiPack)</b><br>Ediccion TerritorioDD.com, creacion por Benekid</h1><br>';
	Menuabout.innerHTML += '<center><i><h3>¿Quiere contactar con nosotros?</h3></i><br><strong>...:::Contactos:::...</strong><P align=left><br><Img SRC="http://estaticos3.tuenti.com/layout/web2/images/favicon.20425.png"> Tuenti: Carlos Beneyto<br><Img SRC="http://miarroba.st/iconos_xp/16x16/pawn_glass_green.gif">MSN: bene_vlc@hotmail.com<br><Img SRC="http://miarroba.st/iconos/html.gif"> Web: <A HREF="http://www.territoriodd.com">http://www.territoriodd.com</A></a>';
	appendDiv(Menuabout,"Acerca de TP ed. TDD");
};
function quitareventos(){
	if (confirm("¿Estás seguro?")) {
		url=document.location.href;
		if (document.location.href != "http://www.tuenti.com/#m=Agenda&func=view_event_invitations") document.location.href="http://www.tuenti.com/#m=Agenda&func=view_event_invitations";
		setTimeout(function(){noeventos2()},GM_getValue('espera') * 1000 - 2000);
	};
};
function noeventos(){
	if (document.getElementById("event_change_rsvp_no") != null){
		document.getElementById("event_change_rsvp_no").click();
		setTimeout(function(){noeventos2()},1);
	}else document.location.href=url;
};
function noeventos2(){
	if (document.getElementById("event_change_rsvp_no") != null){
		document.getElementById("event_change_rsvp_no").click();
		setTimeout(function(){noeventos()},1);
	}else document.location.href=url;
};
//-------------------------------------------------------------------------------------------//

setTimeout(function(){espera()},GM_getValue('espera') * 1000);

function espera(){
	divizquierda()
	id()
	if (document.getElementsByClassName("views")[0] != null) visitas()
};
function visitas(){
	//Autor:	To_Net&DJMeu
	visitas=document.getElementsByClassName("views")[0].firstChild.innerHTML;
	visitas2=parseInt(visitas.replace(".",""));
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
function divizquierda(){
	divizquierda=document.createElement("div");
	divizquierda.setAttribute("id","caja");
	divizquierda.setAttribute("style","border: 0; padding: 5px; position: fixed; z-index: 50; background-color: transparent !important;");
	divizquierda.innerHTML += '<center><div id="divwhos"><a href="http://whos.amung.us/stats/1zjssxpk2p9u/"><img id="whos" src="http://whos.amung.us/widget/1zjssxpk2p9u.png" width="50%" border="0" title="Haz click para ver cuánta gente esta utilizando en este momento TuentiPack" style="border: 0; background-color: transparent !important;" /></a></div><c/enter><br>';
	if (GM_getValue('checkboxreloj') == true) divizquierda.innerHTML += '<div><table border="0"><tr><td><embed style="" src="http://www.crearunaweb.net/complementos/reloj06.swf" wmode="transparent" type="application/x-shockwave-flash" height="100" width="100"><param name=wmode value=transparent /></embed></td></tr><tr></div></center>';
	if (document.getElementsByClassName("settings")[0] != null) if (document.getElementById("css_monitors") != null) document.getElementById("css_monitors").appendChild(divizquierda, document.getElementsByClassName("settings")[0].firstChild);
	if (document.getElementById('whos') != null) if (GM_getValue('checkboxcontador') == true){document.getElementById('whos').style.display="block";}else{document.getElementById('whos').style.display="none";};
};
function id(){
	if (document.getElementById('header_search_text_input') != null){
		textid = document.getElementById('header_search_text_input').getAttribute('onfocus');
		idinicio = textid.indexOf('[')+1;
		idfin = textid.indexOf(']');
		id=textid.substring(idinicio,idfin);
	};
};
//-------------------------------------------------------------------------------------------//

setInterval(function(){if (document.getElementById('whos') != null) if (GM_getValue('checkboxcontador') == true) document.getElementById('whos').setAttribute("src","http://whos.amung.us/widget/1zjssxpk2p9u.png?"+Math.random());},20000);
setInterval(function(){avanzadas()},2000);
function avanzadas(){
	if (document.location.href == "http://www.tuenti.com/#m=Home&func=index") if (document.getElementById('friends_updates') != null) if (document.getElementById('TPNoticias') == null) TPNoticias()
	if (document.getElementById('sections') != null) if (document.getElementById('botonherramientas') == null) botones()
	if (GM_getValue('checkboxblog') == true) toggleblog()
	if (document.getElementById('event_invite_friends') != null) if (document.getElementById('botoninvitaratodos') == null) botoninvitaratodos()
//	if (GM_getValue('checkboxiconos') == true){
//		emoticonos(':D','<Img SRC="http://img512.imageshack.us/img512/8692/iconbiggrin.gif" border="0">');
//		emoticonos(':S','<Img SRC="http://img512.imageshack.us/img512/3135/iconconfused.gif" border="0">');
//	};
//	if (document.location.href.indexOf('Profile') != -1) if (document.location.href.indexOf('user_id') != -1)crearemoticonos()
//	ampliarfoto()
	if (document.location.href.indexOf('Profile') != -1) compartirestilo(); else diseño();
	if (document.getElementsByClassName('body informationList')[2] != null) if(document.getElementById('DQ') == null) DimeQuien()
	etiquetas()

	if (document.getElementById('canvas') != null){
		if (document.getElementById('diseñomostrado') == null){
			diseñomostrado=document.createElement("a");
			diseñomostrado.setAttribute("id","diseñomostrado");
			document.getElementById('canvas').appendChild(diseñomostrado);
		};
	};
};
//-------------------------------------------------------------------------------------------//

function botones(){
	document.getElementsByClassName("logo")[0].setAttribute("href","http://tuentipack.com/");
	document.getElementsByClassName("logo")[0].setAttribute("target","_blank");
	document.getElementsByClassName("logo")[0].setAttribute("onclick","");

	limenufoto=document.createElement("li");
	limenufoto.innerHTML += '<a id="botonherramientas" href="javascript:void(0)" title="Menú de foto de TuentiPack">Menú de foto</a><li id="menufoto" class="hide" style="position: fixed; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;"><a id="botondescargar" href="javascript:void(0)"><span">Descargar <Img SRC="http://famfamfam.com/lab/icons/silk/icons/disk.png" width="12" height="12" style="border: 0px"></span></a><a id="botonampliar" href="javascript:void(0)"><span>Ampliar <Img SRC="http://famfamfam.com/lab/icons/silk/icons/magnifier.png" width="12" height="12" border="0"></span></a><a id="botonabrirfoto" href="javascript:void(0)"><span>Abrir <Img SRC="http://famfamfam.com/lab/icons/silk/icons/control_play.png" width="12" height="12" border="0"></span></a><a id="botonpasarfotos" href="javascript:void(0)"><span>Ir a la foto <Img SRC="http://famfamfam.com/lab/icons/mini/icons/action_forward.gif" width="12" height="12" border="0"></span></a><a id="botonmostrarurl" href="javascript:void(0)"><span>Mostrar ruta <Img SRC="http://famfamfam.com/lab/icons/mini/icons/icon_link.gif" width="12" height="12" border="0"></span></a><a id="botonfotofondo" href="javascript:void(0)"><span>Poner como fondo <Img SRC="http://famfamfam.com/lab/icons/mini/icons/icon_monitor_pc.gif" width="12" height="12" border="0"></span></a></li></ul>';
	document.getElementsByClassName("settings")[0].insertBefore(limenufoto,document.getElementById('tab_settings').parentNode);
	limenufoto.addEventListener("mouseover", function(){mostrar("menufoto")}, true);
	limenufoto.addEventListener("mouseout", function(){ocultar("menufoto")}, true);
	document.getElementById("botondescargar").addEventListener("click", function(){Descargar()}, true);
	document.getElementById("botonampliar").addEventListener("click", function(){ampliar()}, true);
	document.getElementById("botonabrirfoto").addEventListener("click", function(){abrirfoto()}, true);
	document.getElementById("botonpasarfotos").addEventListener("click", function(){Pasarfotos()}, true);
	document.getElementById("botonmostrarurl").addEventListener("click", function(){mostrarurl()}, true);
	document.getElementById("botonfotofondo").addEventListener("click", function(){fotofondo()}, true);

	liherramientas=document.createElement("li");
//	liherramientas.innerHTML += '<a id="botonherramientas" href="javascript:void(0)" title="Herramietas de TuentiPack">Herramientas</a><li id="herramientas" class="hide" style="position: fixed; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;"><a id="botonpasarpagina" href="javascript:void(0)"><span>Ir a la página <Img SRC="http://famfamfam.com/lab/icons/mini/icons/action_go.gif" width="12" height="12" border="0"></span></a><a id="botonradio" href="javascript:void(0)"><span>Radio <Img SRC="http://famfamfam.com/lab/icons/mini/icons/page_sound.gif" width="12" height="12" border="0"></span></a><a id="botonxat" href="javascript:void(0)"><span>TuentiXat <Img SRC="http://famfamfam.com/lab/icons/mini/icons/icon_user.gif" width="12" height="12" border="0"></span></a><a id="botonmsn" href="javascript:void(0)"><span>TuentiMSN <Img SRC="http://www.seodeseo.com/wp-content/plugins/wp-o-matic/cache/5e210_foto-msn-icono-31.jpg" width="12" height="12" border="0"></span><a id="botonemoticonos" href="javascript:void(0)"><span>Emoticonos <Img SRC="http://famfamfam.com/lab/icons/silk/icons/emoticon_grin.png" width="12" height="12" border="0"></span></a><a id="botonborrareventos" href="javascript:void(0)"><span>Borrar eventos <Img SRC="http://famfamfam.com/lab/icons/mini/icons/action_stop.gif" width="12" height="12" border="0"></span></a></li></ul>';
	liherramientas.innerHTML += '<a id="botonherramientas" href="javascript:void(0)" title="Herramietas de TuentiPack">Herramientas</a><li id="herramientas" class="hide" style="position: fixed; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;"><a id="botonpasarpagina" href="javascript:void(0)"><span>Ir a la página <Img SRC="http://famfamfam.com/lab/icons/mini/icons/action_go.gif" width="12" height="12" border="0"></span></a><a id="botonradio" href="javascript:void(0)"><span>Radio <Img SRC="http://famfamfam.com/lab/icons/mini/icons/page_sound.gif" width="12" height="12" border="0"></span></a><a id="botonxat" href="javascript:void(0)"><span>TuentiXat <Img SRC="http://famfamfam.com/lab/icons/mini/icons/icon_user.gif" width="12" height="12" border="0"></span></a><a id="botonmsn" href="javascript:void(0)"><span>TuentiMSN <Img SRC="http://www.seodeseo.com/wp-content/plugins/wp-o-matic/cache/5e210_foto-msn-icono-31.jpg" width="12" height="12" border="0"></span></a><a id="botonborrareventos" href="javascript:void(0)"><span>Borrar eventos <Img SRC="http://famfamfam.com/lab/icons/mini/icons/action_stop.gif" width="12" height="12" border="0"></span></a></li></ul>';
	document.getElementsByClassName("settings")[0].insertBefore(liherramientas,document.getElementById('tab_settings').parentNode);
	liherramientas.addEventListener("mouseover", function(){mostrar("herramientas")}, true);
	liherramientas.addEventListener("mouseout", function(){ocultar("herramientas")}, true);
	document.getElementById("botonpasarpagina").addEventListener("click", function(){Menupasarpagina()}, true);
	document.getElementById("botonradio").addEventListener("click", function(){Radio()}, true);
	document.getElementById("botonxat").addEventListener("click", function(){xat()}, true);
	document.getElementById("botonmsn").addEventListener("click", function(){msn()}, true);
	document.getElementById("botonborrareventos").addEventListener("click", function(){quitareventos()}, true);

	liconfiguracion=document.createElement("li");
	liconfiguracion.innerHTML += '<a id="botonconfiguracion" href="javascript:void(0)" title="Abre el menú de configuración de TuentiPack">Configuración</a><li id="configuracion" class="hide" style="position: fixed; text-align: right; padding: 5px; display: block; z-index: 50; background-color: #538FBB !important;"><a id="editar" href="javascript:void(0)"><span>Editar Tuenti <Img SRC="http://famfamfam.com/lab/icons/mini/icons/icon_wand.gif" width="12" height="12" border="0"></span></a><a id="about" href="javascript:void(0)"><span>Acerca de... <Img SRC="http://famfamfam.com/lab/icons/mini/icons/icon_info.gif" width="12" height="12" border="0"></span></a></li></ul>';
	document.getElementsByClassName("settings")[0].insertBefore(liconfiguracion,document.getElementById('tab_settings').parentNode);
	liconfiguracion.addEventListener("mouseover", function(){mostrar("configuracion")}, true);
	liconfiguracion.addEventListener("mouseout", function(){ocultar("configuracion")}, true);
	document.getElementById("editar").addEventListener("click", function(){Menu()}, true);
	document.getElementById("about").addEventListener("click", function(){about()}, true);
};
function mostrarurl(){
	if (document.getElementById('photo_image') == null){
		alert('No se ha encontrado ninguna foto');
	}else{
		if (document.getElementById("divurl") == null) {
			var divurl = document.createElement("div");
			divurl.setAttribute("id","divurl");
			divurl.setAttribute("style","padding: 5px; position: absolute; display: block; z-index: 50; background-color: #538FBB !important;");
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
function TPNoticias(){
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: 'http://territoriodd.com/tuenti.php',
	    onload: function(noticias) {
	        noticias = noticias.responseText;
		divnoticias=document.createElement("div");
		divnoticias.setAttribute("class","mod d hslice");
		divnoticias.setAttribute("id","TPNoticias");
		divnoticias.innerHTML += '<h3>Novedades de TerritorioDD.com</h3><div class="mod d hslice">'+noticias+'</div>';
		if (document.getElementById('friends_updates') != null) if (document.getElementById('TPNoticias') == null) document.getElementById('friends_updates').parentNode.insertBefore(divnoticias,document.getElementById('friends_updates'));
		//if (document.getElementById('friends_updates') != null) if (document.getElementById('TPNoticias') == null) document.getElementById('friends_updates').parentNode.appendChild(divnoticias);
	    }
	});
};
function mostrar(li){
	if (document.getElementById(li).getAttribute("class") == "hide"){
		document.getElementById(li).setAttribute("class","");
	};
};
function ocultar(li){
	if (document.getElementById(li).getAttribute("class") != "hide"){
		document.getElementById(li).setAttribute("class","hide");
	};
};
/*
function ampliarfoto(){
	if (document.getElementsByClassName('additionalActionsMenu')[0] != null){
		if (document.getElementById('botonampliarfoto') == null){
			var botonampliarfoto = document.createElement("li");
			botonampliarfoto.setAttribute("id","botonampliarfoto");
			botonampliarfoto.setAttribute("onclick",function(){ampliarfoto2(0)});
			botonampliarfoto.addEventListener("click", function(){ampliarfoto2(0)}, true);
			document.getElementsByClassName('additionalActionsMenu')[0].firstChild.appendChild(botonampliarfoto);

			var spanampliarfoto = document.createElement("a");
			spanampliarfoto.appendChild(document.createTextNode("Ampliar foto principal"));
			spanampliarfoto.setAttribute("href","javascript:void(0)");
			botonampliarfoto.appendChild(spanampliarfoto);
			botonampliarfoto.addEventListener("click", function(){mostrar("ampliarfoto(0)")}, true);
		};
	};
};
function ampliarfoto(num){
	textveramigos=document.getElementsByClassName('buttons')[num].firstChild.getAttribute("id");
	idveramigos=textveramigos.substring(18,100);
	GM_openInTab('http://www.tuenti.com/#m=Search&func=index&scope=friends_in_common&other_user='+idveramigos);
};
*/
function DimeQuien(){
	dqdiv=document.getElementsByClassName('body informationList')[2];
	if (dqdiv.innerHTML.indexOf("TPDQ") != -1){
		dqinicio=dqdiv.innerHTML.indexOf("TPDQ")+8;
		dqfin=dqdiv.innerHTML.indexOf("/TPDQ")-4;
		dqcode=dqdiv.innerHTML.substring(dqinicio,dqfin);
		document.getElementsByClassName('body informationList')[2].innerHTML += '<img id="DQ" src="http://www.dimequien.com/imgs/'+dqcode+'.jpg" />';
	};
};
function compartirestilo(){
	if (document.getElementsByClassName('body informationList')[2] != null){
		if (document.getElementsByClassName('body informationList')[2].innerHTML.indexOf("TPCD") != -1){
			cediv=document.getElementsByClassName('body informationList')[2];
			ceinicio=cediv.innerHTML.indexOf("TPCD")+8;
			cefin=cediv.innerHTML.indexOf("/TPCD")-4;
			cecode=cediv.innerHTML.substring(ceinicio,cefin);

			cefinicio=cecode.indexOf("F")+2;
			ceffin=cecode.indexOf(";",cefinicio);
			cef=cecode.substring(cefinicio,ceffin);

			cedinicio=cecode.indexOf("D")+2;
			cedfin=cecode.indexOf(";",cedinicio);
			ced=cecode.substring(cedinicio,cedfin);

			ceqinicio=cecode.indexOf("Q")+2;
			ceqfin=cecode.indexOf(";",ceqinicio);
			ceq=cecode.substring(ceqinicio,ceqfin);

			cepinicio=cecode.indexOf("P")+2;
			cepfin=cecode.indexOf(";",cepinicio);
			cep=cecode.substring(cepinicio,cepfin);

			if (cep.indexOf("$s") != -1) cep=cep.replace("$s","https://");
			if (cep.indexOf("$h") != -1) cep=cep.replace("$h","http://");
			if (cep.indexOf("$w") != -1) cep=cep.replace("$w","www.");

			mostrarestilo()
		}else{
			if (document.getElementById('diseño') != null) document.getElementsByTagName('head')[0].removeChild(document.getElementById('diseño'));
			document.body.style.backgroundImage = "";
			document.body.style.backgroundAttachment=''
			document.getElementsByTagName('body')[0].setAttribute("style", "background-color: white");

		};
	}else{
		if (document.getElementById('diseño') != null) document.getElementsByTagName('head')[0].removeChild(document.getElementById('diseño'));
		document.body.style.backgroundImage = "";
		document.body.style.backgroundAttachment=''
		document.getElementsByTagName('body')[0].setAttribute("style", "background-color: white");

	};
};
function mostrarestilo(){
	if (document.getElementById('diseñomostrado') == null){
		if (document.getElementById('diseño') != null) document.getElementsByTagName('head')[0].removeChild(document.getElementById('diseño'));
		document.body.style.backgroundImage = "";
		document.body.style.backgroundAttachment=''
		document.getElementsByTagName('body')[0].setAttribute("style", "background-color: white");

		if (cef == 1) if(document.getElementsByTagName('body')[0] != null) document.body.style.backgroundImage = "url("+cep+")";
		if (cef == 2) if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #E9EFF3");
		if (cef == 3) if(document.getElementsByTagName('body')[0] != null) document.body.style.backgroundImage = "url(http://www.dominiotemporal.es/fondos_web/texturas/JoseRico/08_basicas.gif)";
		if (cef == "3v2"){
			if (ceq == 1){
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://www.minijuegos.com/imagenes/fondomj.gif) repeat-x fixed !important");
			}else{
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://www.minijuegos.com/imagenes/fondomj.gif) repeat-x !important");
			};
		};
		if (cef == 4){
			if (ceq == 1){
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x fixed #000000 !important");
			}else{
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i39.tinypic.com/fdd1g5.jpg) repeat-x #000000 !important");
			};
		};
		if (cef == 5) if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #ABABAB");
		if (cef == 6) if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #C1009A");
		if (cef == 7) if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: #64A3CF");
		if (cef == 8) if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background-color: black");
		if (cef == 9){
			if (ceq == 1){
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) repeat fixed !important");
			}else{
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) repeat !important");
			};
		};
		if (cef == 10){
			if (ceq == 1){
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i184.photobucket.com/albums/x79/pixvirtual/us007/gURcMhcABve2.gif) repeat fixed !important");
			}else{
				if(document.getElementsByTagName('body')[0] != null) document.getElementsByTagName('body')[0].setAttribute("style", "background: url(http://i184.photobucket.com/albums/x79/pixvirtual/us007/gURcMhcABve2.gif) repeat !important");
			};
		};
		if (cef == "p") if(document.getElementsByTagName('body')[0] != null) document.body.style.backgroundImage = "url(http://srv0110-07.oak1.imeem.com/g/p/a29385b55e5208eff4ce4b61da16e234_raw.gif)";
		if (ceq == 1) if(document.getElementsByTagName('body')[0] != null) document.body.style.backgroundAttachment='fixed';

		//Diseño "Nuevo Tuenti rediseño sutil" de jayjayjay_92 (http://userstyles.org/styles/17626)	
		if (ced == 1) var css = ".main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;}\n .header, #subheader{margin:0 !important;}\n\n.actions a, .itemActions a, .itemActions span{margin-right:4px !important;}\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n        background: #FFF !important;\n        border: solid #ACD0EE !important;\n        border-width: 0 1px 1px 1px !important;\n}\n\n.item, #basic_information_form {\n        background: #FFF !important;\n        border: 1px solid #ACD0EE !important;\n        margin-top:-1px !important;\n}\n    .setting {\n        border: solid #ACD0EE !important;\n        border-width: 0px 1px 1px 1px !important;\n    }\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;}\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;}\n\n    div.loading {right:-40px !important;}\n\n    div .note {\n        background:#fbfbfb !important;\n        border:#fff !important;\n    }\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n        -moz-border-radius:5px !important;\n        -webkit-border-radius:5px !important;\n    }\n\n\n\n    #lightbox_overlay{background:#000 !important;}\n\n    #ban_photo_link{width:100% !important;}\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n        background:#f9f9f9 !important;\n    }\n	#top_videos .mediaInfo:hover{background:transparent !important}\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n        border: solid #ACD0EE 1px !important;\n        -moz-border-radius-topleft:5px !important;\n        -moz-border-radius-topright:5px !important;\n        -webkit-border-radius-topleft:5px !important;\n        -webkit-border-radius-topright:5px !important;\n    }\n\n    .item, #latest_photos .body{\n        padding:8px !important;\n    }\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#FFF !important;}\n\n    .photoTag{opacity:0.6 !important;}\n	\n.mod .body{border-top:0px solid #FFF !important;}\nr	\n.pager.light{\npadding-top:10px !important;\npadding-bottom:10px !important;}\n\n#networks .body, .login{\n        border: 1px solid #ACD0EE !important;\n        margin-top:-1px !important;}\n\nform fieldset.formbox {\n-moz-border-radius:0 !important;\n-webkit-border-radius:0 !important;\nmargin-top:-1px !important;}\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n{border:none !important;}\nul.subMenu a, ul.subMenu li, ul#options a{color:#888 !important;}\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n.loginCanvas #login{margin-top:-1px !important;}\n\n#latest_photos h3 {\n        border: solid #ACD0EE !important;\n        border-width: 1px 0 0 0 !important;\n\n}\n.mod.c .actions .dropDown{margin-top:1px !important;}\n\nimg[src=\"http://estaticosak1.tuenti.com/layout/web2/images/save.gif\"]{display:none !important;}\nform.eventChoices fieldset .option{margin-left:-1px !important;}";
		//Diseño "tuentiblue" de ardo99 (http://userstyles.org/styles/18507)
		if (ced == 2) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: !important; color:black !important;} .views{color:transparent!important;} .body,.item {background:#ACD0Ee url()center center repeat-x !important; color:black !important; border:#000 b2b4 0px solid !important} .body a,.item a{color:black!important; text-decoration:none !important; font-weight: bold !important} .body a:hover,.item a:hover{color: grey ! important; background-color:!important} .body a:visited,.item a:visited{color:black!important} .main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;} .header, #subheader{margin:0 !important;} .actions a, .itemActions a, .itemActions span{margin-right:4px !important;} .container, #latest_photos, .blockedFriends, #banned_photos .body{ background: transparent!important; border: solid transparent !important; border-width: 0 1px 1px 1px !important; } .item, #basic_information_form { background: #ACD0Ee !important; border: 5px solid #acd0ee !important; margin-top:-1px !important; } .setting { border: solid #ACD0EE!important; border-width: 0px 1px 1px 1px !important; } .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid #ACD0EE !important;} #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;} div.loading {right:-40px !important;} div .note { background: #fbfbfb !important; border: #fff!important; } button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message { -moz-border-radius:20px !important;border: 5px red!important; -webkit-border-radius:20px !important; } #lightbox_overlay{background:#000!important;} #ban_photo_link{width:100% !important;} .item:hover, #latest_photos:hover, .mediaInfo:hover { background:#f9f9f9 !important; } #top_videos .mediaInfo:hover{background: transparent !important} .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{ border: transparent 3px !important; -moz-border-radius-topleft:20px !important; -moz-border-radius-topright:20px !important; -webkit-border-radius-topleft:20px !important; -webkit-border-radius-topright:20px !important; } .item, #latest_photos .body{ padding:3px !important; } td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;} .photoTag{opacity:0.6 !important;} .mod .body{border-top:0px solid #FFF !important;} r .pager.light{ padding-top:10px !important; padding-bottom:10px !important;} #networks .body, .login{ border: 1px solid #ACD0EE !important; margin-top:-1px !important;} form fieldset.formbox { -moz-border-radius:5 !important; -webkit-border-radius:5 !important; margin-top:-1px !important;} .mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting {border:none !important;} ul.subMenu a, ul.subMenu li, ul#options a{color:grey !important;} div.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;} .loginCanvas #login{margin-top:-1px !important;} #latest_photos h3 { border: solid transparent!important; border-width: 0px 0 0 0 !important; } .mod.c .actions .dropDown{margin-top:1px !important;}";
		//Diseño "TuentiStyle" de draco1989 (http://userstyles.org/styles/18119)
		if (ced == 3) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D2E5F1 !important; color:black !important;} .views{color:black !important;} .item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body{background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg) top repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} .body a,.item a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#D2E5F1 !important} .body a:visited,.item a:visited{color:#dfdfdf!important} .viewMore{background: #D2E5F1 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#D2E5F1 !important} #breadcrumbs a:visited{color:#dfdfdf!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)top center repeat-x !important; color:white !important; border:#00b2b4 1px solid !important} blockquote p{color:#C0DCEB !important} blockquote {background:#4000c0 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#00ffa0 !important} #blog>.item {background:#717171 url(http://i39.tinypic.com/fdd1g5.jpg)center top repeat-x !important; color:white !important; border:#00b2b4 1px solid !important}";
		//Diseño "TuentiSkin" de alarico750 (http://userstyles.org/styles/19064)	
		if (ced == 4) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/} #main_info{background: #666666 !important; color:black !important;} .views{color:black !important;} .item {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center center repeat-x !important; color:#666666 !important; border:#015EB4 1px solid !important} .body{background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png) top repeat-x !important; color:#666666!important; border:#015EB4 1px solid !important} .body a,.item a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#666666 !important} .body a:visited,.item a:visited{color:#666666!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#C0C0C0 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#C0C0C0 !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(http://img523.imageshack.us/img523/7932/sinttulo1r.png)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}";
		//Diseño "Likern" de ShiveR (http://www.ultra-zone.es)
		if (ced == 5) var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Generales*/ #main_info{background: #D1D1D1 !important; color:black; border:#000000 1px solid !important} .views{color:black !important;} .item {background:#D1D1D1 url()center center repeat-x !important; color:#D1D1D1 !important; border:#000000 1px solid !important} .body{background:#D1D1D1 url() top repeat-x !important; color:#D1D1D1!important; border:#000000 1px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .body a:hover,.item a:hover{color:#000!important; background-color:#00000 !important} .body a:visited,.item a:visited{color:#000000!important} .viewMore{background: #666666 !important; color:black !important} .viewMore a,.viewMore a:visited{color:black !important} /* Vista foto*/ #breadcrumbs a{color:#666666!important; text-decoration:none !important; font-weight:bold !important} #breadcrumbs a:hover{color:#000!important; background-color:#666666 !important} #breadcrumbs a:visited{color:#666666!important; text-decoration:none !important; font-weight:bold !important} .breadcrumbs,.breadcrumbs>.arrow,.breadcrumbs>.count{color:white !important;} /* Perfil*/ #friends>.body {background:#FF0000 url()top center repeat-x !important; color:#666666 !important; border:#0976B4 1px solid !important} blockquote p{color:#ffffff !important} blockquote {background:#666666 !important} .informationList>dl>dt,.date {color:black !important} blockquote>.author>.date {color:#666666 !important} #blog>.item {background:#666666 url(#D1D1D1)center top repeat-x !important; color:#666666 !important; border:#00b2b4 1px solid !important}";
		//Diseño "Pinxil" de ShiveR (http://www.ultra-zone.es)
		if (ced == 6) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #FFBCF2 !important; color:white !important; border:#790061 3px solid !important} .views{color:black !important;} .item {background:#FFD0F6 !important; color:white !important; border:#790061 1px solid !important} .body{background:#FFD0F6!important; color:white !important; border:#790061 3px solid !important} .body a,.item a{color:#000000!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #5c3273 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #fff !important;} .searchBar {background-color: #f8f4fa !important;border-color: #e0ceea !important;} ul#sections li a.active {background-color: #e5d5ed !important;border-color: #d0b5df !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }";
		//Diseño "LoomySkin" de ShiveR (http://www.ultra-zone.es)
		if (ced == 7) var css = "@namespace url(http://www.w3.org/1999/xhtml); #main_info{background: #64A3CF !important; color:white !important; border:#EBEBEB 3px solid !important} .views{color:black !important;} .item {background:#509BD0 !important; color:white !important; border:#ffffff 1px solid !important} .body{background:#64A3CF!important; color:white !important; border:#EBEBEB 3px solid !important} .body a,.item a{color:#00446E!important; text-decoration:none !important; font-weight:bold !important} .actions span {color: #753f93 !important;}a,h2,h3,h4,h5,li,a small {color: #282549 !important;} #pageHeader a {color: #ede3f3 !important;}#pageHeader a:hover {color: #000000 !important;} .searchBar {background-color: #000000 !important;border-color: #4780AC !important;} ul#sections li a.active {background-color: #2270AC !important;border-color: #ffffff !important;} ul#sections a {border-color: #e5d5ed !important;}ul#sections a:hover  .dpBody {border-color: #b488cc !important;} }";
		//Diseño "TuentiRed" de Daniko (http://userstyles.org/styles/19955)
		if (ced == 8) var css = "#main_info{background:  !important; color:black\n!important;}\n\n.views{color:red!important;}\n\n\n\n.body,.item {background: url(http://i05.pan.tuenti.com/i/3/600/o/N/35WmBozaW3BBXlAeI0o.0.jpg)center center repeat-x !important; color:black!important; border:#000\nb2b4 0px solid !important}\n\n.body a,.item a{color:black!important; text-decoration:none !important; font-weight:  bold  !important}\n\n.body a:hover,.item a:hover{color: #800000 ! important; background-color:!important}\n\n.body a:visited,.item a:visited{color:black!important}\n\n\n\n\n.main .mod.c.viewMore, #friends_updates .item{color: white ! important;}, .header , #subheader {padding:3px;}\n\n .header{background-color: red  ! important;}  , .subheader {margin:10 !important;}\n\n\n\n.actions  a, .itemActions  a, .itemActions span{margin-right:4px !important;}\n\n\n\n	.container , #latest_photos , .blockedFriends, #banned_photos .body{\n\n        background: transparent!important;\n\n        border: solid transparent !important;\n\n        border-width: 0 1px 1px 1px !important;\n\n}\n\n\n\n.item, #basic_information_form {\n\n        background:url (http://i05.pan.tuenti.com/i/3/600/o/N/35WmBozaW3BBXlAeI0o.0.jpg) !important;\n\n        border: 3px solid #000000 !important;\n\n        margin-top:-1px !important;\n\n}\n\n    .setting {\n\n        border: solid black!important;\n\n        border-width: 3px 3px 3px 3px  !important;\n\n    }\n\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:2px solid white !important;}\n\n\n\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background: white !important; padding-left:6px !important;}\n\n\n\n    div.loading {right:-40px !important;}\n\n\n\n    div .note {\n\n        background: #fbfbfb  !important;\n\n        border: #fff!important;\n\n    }\n\n\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n\n        -moz-border-radius:3px !important;border: 5px white!important;\n\n        -webkit-border-radius:7px !important;\n\n    }\n\n\n\n\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n\n\n    #ban_photo_link{width:100% !important;}\n\n\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n\n        background: #e24747 !important;\n\n    }\n\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n\n        border: transparent 3px !important;\n\n        -moz-border-radius-topleft:10px !important;\n\n        -moz-border-radius-topright:10px !important;\n\n        -webkit-border-radius-topleft:10px !important;\n\n        -webkit-border-radius-topright:10px !important;\n\n    }\n\n\n\n    .item, #latest_photos .body{\n\n        padding:3px !important;\n\n    }\n\n\n\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n\n\n    .photoTag{opacity:0.6 !important;}\n\n	\n\n.mod .body{border-top:0px solid #FFF !important;}\n\nr	\n\n.pager.light{\n\npadding-top:0px !important;\n\npadding-bottom:1px !important;}\n\n\n\n#networks .body, .login{\n\n        border: 1px solid #eeacac !important;\n\n        margin-top:-1px !important;}\n\n\n\nform fieldset.formbox {\n\n-moz-border-radius:3 !important;\n\n-webkit-border-radius:3 !important;\n\nmargin-top:-1px !important;}\n\n\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n\n{border:none !important;}\n\nul.subMenu a, ul.subMenu li, ul#options a{color:grey!important;}\n\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n\n.loginCanvas #login{margin-top:-1px !important;}\n\n\n\n#latest_photos h3 {\n\n        border: solid transparent!important;\n\n        border-width: 0px 0 0 0 !important;\n\n\n\n}\n\n.mod.c .actions .dropDown{margin-top:1px !important;}";
		//Diseño "TuentiPink" de Daniko (http://userstyles.org/styles/19958)
		if (ced == 9) var css = "#main_info{background: url(http://im170.ll.tuenti.com/i21/i/5/600/3/D/pXG7TtNna0VsLwIMmxQN.0.jpg) repeat  !important; color:black\n!important;}\n\n.views{color:white!important;}\n\n\n\n.body,.item {background: url(http://i49.pan.tuenti.com/i/7/600/1/s/7E2Gk6f2ZiOgmhKDnFzz.0.jpg)center center repeat !important; color:black!important; border:#000\n1px solid !important}\n\n.body a{color:white!important;},.item a{color:white!important; text-decoration:none !important; font-weight:  bold  !important}\n\n.body a:hover,.item a:hover{color: black !important; background-color: transparent !important;}\n\n.body a:visited,.item a:visited{color:#381233!important}\n\n\n\n\n.main .mod.c.viewMore, #friends_updates .item{color: white !important;}, .header{color: black !important;} , #subheader {padding:3px;}\n\n .header{background: url(http://i49.pan.tuenti.com/i/7/600/1/s/7E2Gk6f2ZiOgmhKDnFzz.0.jpg)  ! important;}  , .subheader {margin:10 !important;}\n\n\n\n.actions  a, .itemActions  a, .itemActions span {margin-right:4px !important;}\n\n\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n\n        background: transparent!important;\n\n        border: solid transparent !important;\n\n        border-width: 0px 1px 1px 1px !important;\n\n}\n\n\n\n.item, #basic_information_form {\n\n        background:url (http://im158.ll.tuenti.com/i44/i/7/600/2/N/qKguGqH2uiBs9re_WfZw.0.jpg) !important;\n\n        border: 2px solid black !important;\n\n        margin-top:-1px !important;\n\n}\n\n    .setting {\n\n        border: solid black!important;\n\n        border-width: 3px 3px 3px 3px  !important;\n\n    }\n\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:2px solid white !important;}\n\n\n\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background: white !important; padding-left:6px !important;}\n\n\n\n    div.loading {right:-40px !important;}\n\n\n\n    div .note {\n\n        background: #ff9dfc  !important;\n\n        border: #fff!important;\n\n    }\n\n\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n\n        -moz-border-radius:3px !important;border: 5px white!important;\n\n        -webkit-border-radius:7px !important;\n\n    }\n\n\n\n\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n\n\n    #ban_photo_link{width:100% !important;}\n\n\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n\n        background: #ff4ef9 !important;\n\n    }\n\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n\n        border: transparent 3px !important;\n\n        -moz-border-radius-topleft:10px !important;\n\n        -moz-border-radius-topright:10px !important;\n\n        -webkit-border-radius-topleft:10px !important;\n\n        -webkit-border-radius-topright:10px !important;\n\n    }\n\n\n\n    .item, #latest_photos .body{\n\n        padding:3px !important;\n\n    }\n\n\n\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n\n\n    .photoTag{opacity:0.6 !important;}\n\n	\n\n.mod .body{border-top:0px solid #FFF !important;}\n\nr	\n\n.pager.light{\n\npadding-top:0px !important;\n\npadding-bottom:1px !important;}\n\n\n\n#networks .body, .login{\n\n        border: 1px solid #eeacac !important;\n\n        margin-top:-1px !important;}\n\n\n\nform fieldset.formbox {\n\n-moz-border-radius:3 !important;\n\n-webkit-border-radius:3 !important;\n\nmargin-top:-1px !important;}\n\n\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n\n{border:none !important;}\n\nul.subMenu a, ul.subMenu li, ul#options a{color:grey!important;}\n\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n\n.loginCanvas #login{margin-top:-1px !important;}\n\n\n\n#latest_photos h3 {\n\n        border: solid transparent!important;\n\n        border-width: 0px 0 0 0 !important;\n\n\n\n}\n\n.mod.c .actions .dropDown{margin-top:1px !important;}";
		//Diseño "tuentiblue II (PINK VERSION)" de ardo99 (http://userstyles.org/styles/20143)
		if (ced == 10) var css = "#main_info{background:  !important; color:black  !important;}\n.views{color:transparent!important;}\n\n.body,.item {background:#FFCCFF url()center center repeat-x !important; color:black !important; border:white   2px solid !important}\n.body a,.item a{color:black!important; text-decoration:none !important; font-weight:  bold  !important}\n.body a:hover,.item a:hover{color: grey ! important; background-color:!important}\n.body a:visited,.item a:visited{color:black!important}\n\n\n.main .mod.c .viewMore, #friends_updates .item, .header, #subheader {padding:3px;}\n .header, #subheader{margin:10 !important;}\n\n.actions a, .itemActions a, .itemActions span{margin-right:4px !important;}\n\n	.container, #latest_photos, .blockedFriends, #banned_photos .body{\n        background: transparent!important;\n        border: solid transparent !important;\n        border-width: 0 1px 1px 1px !important;\n}\n\n.item, #basic_information_form {\n        background: #FFCCFF !important;\n        border: 1px solid white !important;\n        margin-top:-1px !important;\n}\n    .setting {\n        border: solid white!important;\n        border-width: 0px 1px 1px 1px !important;\n    }\n    .mod.f, #top_videos .mod.c.videos, .loginCanvas #login {border:1px solid white !important;}\n\n\n    #tags_list h3, .mod.c.videos h3, #album_list h3, #wall h3 { background:#D2E5F1 !important; padding-left:6px !important;}\n\n    div.loading {right:-40px !important;}\n\n    div .note {\n        background: #fbfbfb  !important;\n        border: #fff!important;\n    }\n\n    button, input, textarea, .status, .mod, .avatar, .pager.light a, .pager.light span, select, .pager.light a, .pager.light span, #change_password_message  {\n        -moz-border-radius:7px !important;border: 5px black !important;\n        -webkit-border-radius:7px !important;\n    }\n\n\n\n    #lightbox_overlay{background:#000!important;}\n\n    #ban_photo_link{width:100% !important;}\n\n    .item:hover,  #latest_photos:hover, .mediaInfo:hover  {\n        background:white !important;\n    }\n	#top_videos .mediaInfo:hover{background: transparent !important}\n\n    .main .main h3, #friends_updates h3, #messages_box_content h3, #avatar_form h3, .mod.form h3, #networks h3, #ignored_friend_requests h3, #pending_friend_requests, #blocked_users h3, #banned_photos h3, #wall h3, .loginCanvas h2,.needInvitesCanvas h2, .passwordCanvas h2{\n        border: transparent 3px !important;\n        -moz-border-radius-topleft:10px !important;\n        -moz-border-radius-topright:10px !important;\n        -webkit-border-radius-topleft:10px !important;\n        -webkit-border-radius-topright:10px !important;\n    }\n\n    .item, #latest_photos .body{\n        padding:3px !important;\n    }\n\n\n    td .item, td .item:hover ,td .item .item:hover, td[colspan=\"3\"]{background:#fff!important;}\n\n    .photoTag{opacity:0.6 !important;}\n	\n.mod .body{border-top:0px solid #FFF !important;}\nr	\n.pager.light{\npadding-top:0px !important;\npadding-bottom:0px !important;}\n\n#networks .body, .login{\n        border: 1px solid #FF99FF !important;\n        margin-top:-1px !important;}\n\nform fieldset.formbox {\n-moz-border-radius:3 !important;\n-webkit-border-radius:3 !important;\nmargin-top:-1px !important;}\n\n.mod.d .searchResults h2, #basic_information_form .setting, .blockedFriends .item, td .item, #invitations h3, .sidebar .mod.form h3, #latest_photos h3, .network .setting\n{border:none !important;}\nul.subMenu a, ul.subMenu li, ul#options a{color:red  !important;}\ndiv.loginCanvas h1, div.needInvitesCanvas h1, div.passwordCanvas h1{display:none;}\n.loginCanvas #login{margin-top:-1px !important;}\n\n#latest_photos h3 {\n        border: solid transparent!important;\n        border-width: 0px 0 0 0 !important;\n\n}\n.mod.c .actions .dropDown{margin-top:1px !important;}";

		document.getElementsByTagName('head')[0].innerHTML += '<style id="diseño">'+css+'</style>';
	};
};
function emoticonos(palabra,html){
	if (document.getElementById('create_wall_post_form') != null) if (document.getElementById('create_wall_post_form').getAttribute("class") != "form") document.getElementById('create_wall_post_form').setAttribute("class","form");
	if (document.getElementById('diseñomostrado') == null){
		if (document.getElementById('container') != null){
			if (document.getElementById('wall') != null) document.getElementById('wall').lastChild.innerHTML=document.getElementById('wall').lastChild.innerHTML.replace(palabra,html);
			if (document.getElementById('profile_status_text') != null) document.getElementById('profile_status_text').innerHTML=document.getElementById('profile_status_text').innerHTML.replace(palabra,html);
		};
	};
};
function crearemoticonos(){
	if (GM_getValue('checkboxiconos') == true){
		if (document.getElementById('diseñomostrado') == null){
			if (document.getElementsByClassName('avatarFix')[0] != null){
				divemoticonos = document.createElement("div");
				divemoticonos.setAttribute("id","divemoticonos");
				document.getElementsByClassName('avatarFix')[0].parentNode.insertBefore(divemoticonos,document.getElementsByClassName('avatarFix')[0]);

				botonD = document.createElement("button");
				botonD.setAttribute("onclick",function(){emoticon(':D')});
				botonD.addEventListener("click", function(){emoticon(':D')}, true);
				divemoticonos.appendChild(botonD);
				imagenbotonD = document.createElement("img");
				imagenbotonD.setAttribute("src","http://img512.imageshack.us/img512/8692/iconbiggrin.gif");
				botonD.appendChild(imagenbotonD)

				botonS = document.createElement("button");
				botonS.setAttribute("onclick",function(){emoticon(':S')});
				botonS.addEventListener("click", function(){emoticon(':S')}, true);
				divemoticonos.appendChild(botonS);
				imagenbotonS = document.createElement("img");
				imagenbotonS.setAttribute("src","http://img512.imageshack.us/img512/3135/iconconfused.gif");
				botonS.appendChild(imagenbotonS)

				botonB = document.createElement("button");
				botonB.setAttribute("onclick",function(){emoticon('B)')});
				botonB.addEventListener("click", function(){emoticon('B)')}, true);
				divemoticonos.appendChild(botonB);
				imagenbotonB = document.createElement("img");
				imagenbotonB.setAttribute("src","http://img512.imageshack.us/img512/361/iconcool.gif");
				botonB.appendChild(imagenbotonB)

				botonl = document.createElement("button");
				botonl.setAttribute("onclick",function(){emoticon(':(')});
				botonl.addEventListener("click", function(){emoticon(':(')}, true);
				divemoticonos.appendChild(botonl);
				imagenbotonl = document.createElement("img");
				imagenbotonl.setAttribute("src","http://img261.imageshack.us/img261/4589/iconcryc.gif");
				botonl.appendChild(imagenbotonl)

				botonoo = document.createElement("button");
				botonoo.setAttribute("onclick",function(){emoticon('o.o')});
				botonoo.addEventListener("click", function(){emoticon('o.o')}, true);
				divemoticonos.appendChild(botonoo);
				imagenbotonoo = document.createElement("img");
				imagenbotonoo.setAttribute("src","http://img512.imageshack.us/img512/116/iconeekm.gif");
				botonoo.appendChild(imagenbotonoo)

				botone = document.createElement("button");
				botone.setAttribute("onclick",function(){emoticon('¬¬')});
				botone.addEventListener("click", function(){emoticon('¬¬')}, true);
				divemoticonos.appendChild(botone);
				imagenbotone = document.createElement("img");
				imagenbotone.setAttribute("src","http://img512.imageshack.us/img512/6528/iconevili.gif");
				botone.appendChild(imagenbotone)

				botonlol = document.createElement("button");
				botonlol.setAttribute("onclick",function(){emoticon('LoL')});
				botonlol.addEventListener("click", function(){emoticon('LoL')}, true);
				divemoticonos.appendChild(botonlol);
				imagenbotonlol = document.createElement("img");
				imagenbotonlol.setAttribute("src","http://img44.imageshack.us/img44/9360/iconlolq.gif");
				botonlol.appendChild(imagenbotonlol)
			};
		};
	};
};
function emoticon(texto){ 
	document.getElementById('wall_post_body').value=document.getElementById('wall_post_body').value+texto
}
function etiquetas(){
	if (document.getElementById('tag_entries') != null){
		if (document.getElementById('etiquetas') == null){
			document.getElementById('tag_entries').innerHTML += '<li class="highlight" id="etiquetas"><a href="javascript:void(0);">Mostrar todas las etiquetas</a></li>';
			document.getElementById('etiquetas').addEventListener("click", function(){etiquetas2()}, true);
		};
	};
};
function etiquetas2(){
	if (document.getElementById('diseñoetiquetas') == null){
		var cssetiquetas = ".photoTag {-moz-border-radius-bottomleft:5px;-moz-border-radius-bottomright:5px;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;border:2px solid #66A5E1 !important;}";
		document.getElementsByTagName('head')[0].innerHTML += '<style id="diseñoetiquetas">'+cssetiquetas+'</style>';
	}else{
		document.getElementsByTagName('head')[0].removeChild(document.getElementById('diseñoetiquetas'));
	};
};
function toggleblog(){
	if (document.getElementById('show_blog_entry_click') != null){
		if (document.getElementById('show_blog_entry_click').getAttribute("class") != "hide"){
			document.getElementById('show_blog_entry').setAttribute("style","overflow: hidden; height: auto;");
			document.getElementById('show_blog_entry').setAttribute("class","");
			document.getElementById('show_blog_entry_click').firstChild.setAttribute("class","hide");
			document.getElementById('show_blog_entry_click').lastChild.setAttribute("class","");
		};
	};
};
function botoninvitaratodos(){
	document.getElementById('event_invite_friends').lastChild.lastChild.appendChild(document.createTextNode('   '));
	var botoninvitaratodos
=document.createElement('button');
	botoninvitaratodos.setAttribute("id","botoninvitaratodos");
	botoninvitaratodos.setAttribute("class","send");
	botoninvitaratodos.innerHTML += '<spam>Todos</spam>';
	botoninvitaratodos.addEventListener("click", function(){invitaratodos()}, true);
	document.getElementById('event_invite_friends').lastChild.lastChild.appendChild(botoninvitaratodos
);
};
function invitaratodos(){
	totalItemsEvento = document.getElementsByClassName("add").length;
	var botonocultoevento = new Array(totalItemsEvento);
	for (foramigosevento = 0; foramigosevento < totalItemsEvento;foramigosevento++){
		botonocultoevento[foramigosevento] = document.createElement("button");
		var X2 = 'document.getElementsByClassName("add")['+(0)+'].parentNode.parentNode.parentNode';
		XX = document.getElementsByClassName("add")[0].parentNode.parentNode.parentNode.getAttribute("onclick");
		XXX = XX.substring(0,33);
		XXX2 = XX.substring(37,48);

		botonocultoevento[foramigosevento].setAttribute("onclick",XXX+X2+XXX2);
		document.getElementById("event_invite_friends").appendChild(botonocultoevento[foramigosevento]);
		botonocultoevento[foramigosevento].click();
		document.getElementById("event_invite_friends").removeChild(botonocultoevento[foramigosevento]);
	};
};

function appendDiv(elemento,titulo){
	if (document.getElementById('div') == null){
		if (document.getElementById('lightbox_overlay') == null){
			lightbox_overlay=document.createElement("div");
			lightbox_overlay.setAttribute("id","lightbox_overlay");
			lightbox_overlay.setAttribute("class","lightBoxOverlay");
			lightbox_overlay.setAttribute("style","opacity: 0.5; display: block;");
			document.getElementsByTagName('body')[0].appendChild(lightbox_overlay);
		}else{
			document.getElementById('lightbox_overlay').style.display = "block";
		};

		var divlightBox = document.createElement("div")
		divlightBox.setAttribute("id","divlightBox");
		divlightBox.setAttribute("class","lightBoxWrapper");
		divlightBox.setAttribute("style","display: block; position: absolute; margin-left: -480px;");

		var div = document.createElement("div");
		div.setAttribute("id","divxat");
		div.setAttribute("class","chatDockItem open active");
		div.setAttribute("style","text-align: left; display: block; z-index: 20; background-color: #EBEBEB !important;");
		div.innerHTML += '<div class="chatDockDialog open" style="width: 960px; position: static;"><div class="chatActions"><a title="Cerrar" href="javascript:void(0)" id="botonnodiv" class="chatClose"> </a></div><h3 title="'+titulo+'"><strong>'+titulo+'</strong></h3></div>';
		div.appendChild(elemento);

		divlightBox.appendChild(div);
		canvas=document.getElementById('canvas');
		canvas.parentNode.insertBefore(divlightBox, canvas);
		document.getElementById("botonnodiv").addEventListener("click", function(){removeDiv()}, true);
	}else removeDiv();
};
function removeDiv(){
	if (document.getElementById('divlightBox') != null) document.getElementById('canvas').parentNode.removeChild(document.getElementById('divlightBox'));
	if (document.getElementById('lightbox_overlay') != null) document.getElementById('lightbox_overlay').style.display = "none";
};